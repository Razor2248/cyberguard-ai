'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import mockData from '@/data/mock_dashboard.json';
import {
  Search,
  Globe,
  MessageSquareWarning,
  MailWarning,
  PhoneCall,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Users,
  Plus,
  ChevronRight,
  BarChart3,
  Activity,
  Bell,
  UserCircle
} from 'lucide-react';

const SCAN_TABS = [
  { id: 'url', label: 'Liên kết URL', icon: Globe, placeholder: 'Nhập đường dẫn trang web nghi ngờ (vd: https://shopee-nhan-qua.xyz)...' },
  { id: 'sms', label: 'Tin nhắn SMS', icon: MessageSquareWarning, placeholder: 'Dán toàn bộ nội dung tin nhắn lừa đảo...' },
  { id: 'email', label: 'Email', icon: MailWarning, placeholder: 'Dán tiêu đề hoặc nội dung email giả mạo...' },
  { id: 'phone', label: 'Số điện thoại', icon: PhoneCall, placeholder: 'Nhập số thuê bao spam / giả mạo...' },
];

const TYPE_ICONS = {
  url: Globe,
  email: MailWarning,
  phone: PhoneCall,
  sms: MessageSquareWarning,
};

const getRiskLabel = (riskLevel) => {
  if (riskLevel === 'danger') return 'Mối đe dọa';
  if (riskLevel === 'warning') return 'Đáng ngờ';
  return 'An toàn';
};

const getRiskBadgeVariant = (riskLevel) => {
  if (riskLevel === 'danger') return 'danger';
  if (riskLevel === 'warning') return 'warning';
  return 'safe';
};

const DonutChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;
  
  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle = endAngle;
    
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);
    
    const x1 = 50 + 40 * Math.cos(startRad);
    const y1 = 50 + 40 * Math.sin(startRad);
    const x2 = 50 + 40 * Math.cos(endRad);
    const y2 = 50 + 40 * Math.sin(endRad);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    
    return (
      <path
        key={index}
        d={pathData}
        fill={item.color}
        className="transition-opacity hover:opacity-80"
      />
    );
  });

  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-40 md:h-40">
        {segments}
        <circle cx="50" cy="50" r="25" fill="#0D1420" />
      </svg>
      <div className="space-y-1.5 text-xs">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-slate-300">{item.label}</span>
            <span className="text-slate-500 font-mono">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const BarChart = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.scans));
  
  return (
    <div className="flex items-end justify-between gap-2 h-32 md:h-40 pt-4">
      {data.map((item, index) => {
        const heightPercent = (item.scans / maxValue) * 100;
        return (
          <div key={index} className="flex flex-col items-center gap-2 flex-1">
            <div className="w-full relative flex items-end justify-center h-full">
              <div
                className="w-full max-w-[40px] rounded-t-md bg-gradient-to-t from-[#1F70D3] to-[#559AEF] transition-all duration-300 hover:from-[#1757A6] hover:to-[#3B82F6]"
                style={{ height: `${heightPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 font-medium">{item.day}</span>
          </div>
        );
      })}
    </div>
  );
};

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('url');
  const [inputValue, setInputValue] = useState('');

  const currentTab = SCAN_TABS.find((tab) => tab.id === activeTab);

  const handleQuickScan = () => {
    if (!inputValue.trim()) return;
    router.push('/scan/loading');
  };

  const statsCards = [
    {
      label: 'Tổng lượt quét',
      value: mockData.stats.totalScans.toLocaleString('vi-VN'),
      icon: Search,
      color: 'text-[#559AEF]',
      bgColor: 'bg-[rgba(31,112,211,0.10)]',
    },
    {
      label: 'Mối đe dọa đang hoạt động',
      value: mockData.stats.activeThreats,
      icon: AlertTriangle,
      color: 'text-[#EE4A4A]',
      bgColor: 'bg-[rgba(238,74,74,0.10)]',
    },
    {
      label: 'Mối đe dọa đã chặn',
      value: mockData.stats.blockedThreats,
      icon: ShieldCheck,
      color: 'text-[#22C55E]',
      bgColor: 'bg-[rgba(34,197,94,0.10)]',
    },
    {
      label: 'Điểm rủi ro',
      value: `${mockData.stats.riskScore}/100`,
      icon: TrendingUp,
      color: 'text-[#F59E0B]',
      bgColor: 'bg-[rgba(245,158,11,0.10)]',
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Banner điểm bảo mật */}
        <div className="rounded-xl border border-[#1E2B45] bg-[#0D1420]/70 backdrop-blur-md p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1F70D3] to-[#559AEF] flex items-center justify-center">
                <UserCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-base md:text-lg font-semibold text-[#F1F5F9]">
                  Xin chào, {mockData.user.name}
                </h2>
                <p className="text-xs text-slate-400">Bảo vệ gia đình bạn an toàn</p>
              </div>
            </div>
            
            <div className="flex-1" />
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl md:text-3xl font-bold text-[#F1F5F9]">
                  {mockData.user.securityScore}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400">
                  Điểm bảo mật
                </div>
              </div>
              <Badge
                variant={mockData.user.riskLevel}
                label={mockData.user.riskLevel === 'safe' ? 'AN TOÀN' : mockData.user.riskLevel === 'warning' ? 'ĐÁNG NGHI' : 'NGUY HIỂM'}
                showIcon
              />
            </div>
          </div>
        </div>

        {/* Ô Quét nhanh */}
        <div className="rounded-xl border border-[#1E2B45] bg-[#0D1420]/70 backdrop-blur-md p-4 md:p-6">
          <h3 className="text-sm font-semibold text-[#F1F5F9] mb-4">Quét nhanh</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {SCAN_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setInputValue('');
                  }}
                  type="button"
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#1F70D3] text-white shadow-[0_0_1rem_rgba(85,154,239,0.35)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#141F30]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={currentTab?.placeholder}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-[rgba(20,29,48,0.50)] border border-[#1E2B45] text-[#F1F5F9] placeholder:text-slate-500 text-sm focus:outline-none focus:border-[#559AEF] focus:ring-2 focus:ring-[#559AEF]/30 transition-all"
              />
            </div>
            <Button
              size="md"
              variant="primary"
              onClick={handleQuickScan}
              disabled={!inputValue.trim()}
            >
              <span>Quét</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* 4 thẻ số liệu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="p-4 rounded-xl border border-[#1E2B45] bg-[#0D1420]/70 backdrop-blur-md"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400">
                    {stat.label}
                  </span>
                </div>
                <div className="text-xl md:text-2xl font-bold text-[#F1F5F9]">
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* Khối Gia đình tóm tắt */}
        <div className="rounded-xl border border-[#1E2B45] bg-[#0D1420]/70 backdrop-blur-md p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#559AEF]" />
              <h3 className="text-sm font-semibold text-[#F1F5F9]">Gia đình</h3>
            </div>
            <button
              type="button"
              onClick={() => router.push('/family')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(31,112,211,0.15)] border border-[#1E2B45] text-[#559AEF] hover:bg-[rgba(31,112,211,0.25)] text-xs font-medium transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm người thân</span>
            </button>
          </div>
          
          {/* Ticker cảnh báo */}
          <div className="mb-4 p-3 rounded-lg bg-[rgba(238,74,74,0.08)] border border-[rgba(238,74,74,0.2)]">
            <div className="flex items-center gap-2 text-xs">
              <Bell className="w-4 h-4 text-[#EE4A4A]" />
              <span className="text-[#EE4A4A] font-medium">
                Cảnh báo: Phát hiện 2 mối đe dọa mới trong 24 giờ qua
              </span>
            </div>
          </div>

          {/* 3 card thành viên */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {[
              { name: 'Bố', role: 'Trưởng nhóm', score: 92, riskLevel: 'safe' },
              { name: 'Mẹ', role: 'Thành viên', score: 85, riskLevel: 'safe' },
              { name: 'Em', role: 'Thành viên', score: 68, riskLevel: 'warning' },
            ].map((member, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border border-[#1E2B45] bg-[rgba(20,29,48,0.50)]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1F70D3] to-[#559AEF] flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{member.name[0]}</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#F1F5F9]">{member.name}</div>
                    <div className="text-[10px] text-slate-400">{member.role}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-400">
                    Điểm: <span className="text-[#F1F5F9] font-medium">{member.score}</span>
                  </div>
                  <Badge
                    variant={member.riskLevel}
                    label={member.riskLevel === 'safe' ? 'AN TOÀN' : 'ĐÁNG NGHI'}
                    showIcon={false}
                    className="text-[9px] px-2 py-0.5"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Bảng Lịch sử gần đây của gia đình */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1E2B45] text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  <th className="py-2 px-3">Thành viên</th>
                  <th className="py-2 px-3">Loại</th>
                  <th className="py-2 px-3">Nội dung</th>
                  <th className="py-2 px-3 text-center">Kết quả</th>
                  <th className="py-2 px-3 text-right">Thời gian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2B45]/60 text-xs">
                {[
                  { member: 'Bố', type: 'URL', target: 'https://secure-vietcombank-login.xyz', riskLevel: 'danger', time: '14:32' },
                  { member: 'Mẹ', type: 'Email', target: 'service@paypal-security-alert.net', riskLevel: 'safe', time: '13:18' },
                  { member: 'Em', type: 'SMS', target: 'Tin nhắn trúng thưởng 50 triệu', riskLevel: 'warning', time: '09:55' },
                ].map((row, index) => {
                  const Icon = TYPE_ICONS[row.type.toLowerCase()] || Globe;
                  return (
                    <tr key={index} className="hover:bg-[rgba(31,112,211,0.06)] transition-colors">
                      <td className="py-2.5 px-3 font-medium text-slate-300">{row.member}</td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-slate-400">{row.type}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-slate-400 truncate max-w-[200px]">{row.target}</td>
                      <td className="py-2.5 px-3 text-center">
                        <Badge
                          variant={getRiskBadgeVariant(row.riskLevel)}
                          label={getRiskLabel(row.riskLevel)}
                          showIcon={false}
                          className="text-[9px] px-2 py-0.5"
                        />
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-500 font-mono text-[10px]">{row.time}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bảng Quét gần đây + Biểu đồ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Bảng Quét gần đây */}
          <div className="rounded-xl border border-[#1E2B45] bg-[#0D1420]/70 backdrop-blur-md p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#559AEF]" />
                <h3 className="text-sm font-semibold text-[#F1F5F9]">Quét gần đây</h3>
              </div>
              <Link
                href="/history"
                className="inline-flex items-center gap-1 text-xs font-medium text-[#559AEF] hover:text-[#3B82F6] transition-colors"
              >
                <span>Xem tất cả</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            
            <div className="space-y-2">
              {mockData.recentScans.slice(0, 5).map((scan) => {
                const Icon = TYPE_ICONS[scan.type] || Globe;
                return (
                  <div
                    key={scan.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-[#1E2B45] bg-[rgba(20,29,48,0.50)] hover:bg-[rgba(31,112,211,0.08)] transition-colors"
                  >
                    <div className="p-2 rounded bg-[rgba(20,29,48,0.60)] border border-[#1E2B45]">
                      <Icon className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-slate-300 truncate">{scan.target}</div>
                      <div className="text-[10px] text-slate-500">{scan.timestamp}</div>
                    </div>
                    <Badge
                      variant={getRiskBadgeVariant(scan.riskLevel)}
                      label={getRiskLabel(scan.riskLevel)}
                      showIcon={false}
                      className="text-[9px] px-2 py-0.5"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Biểu đồ Phân loại đe dọa */}
          <div className="rounded-xl border border-[#1E2B45] bg-[#0D1420]/70 backdrop-blur-md p-4 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-[#559AEF]" />
              <h3 className="text-sm font-semibold text-[#F1F5F9]">Phân loại đe dọa</h3>
            </div>
            <DonutChart data={mockData.threatCategories} />
          </div>
        </div>

        {/* Biểu đồ Hoạt động trong tuần */}
        <div className="rounded-xl border border-[#1E2B45] bg-[#0D1420]/70 backdrop-blur-md p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#559AEF]" />
            <h3 className="text-sm font-semibold text-[#F1F5F9]">Hoạt động trong tuần</h3>
          </div>
          <BarChart data={mockData.weeklyActivity} />
        </div>

        {/* Khối Cảnh báo */}
        <div className="rounded-xl border border-[#1E2B45] bg-[#0D1420]/70 backdrop-blur-md p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-[#559AEF]" />
            <h3 className="text-sm font-semibold text-[#F1F5F9]">Cảnh báo gần đây</h3>
          </div>
          
          <div className="space-y-2">
            {mockData.alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-3 p-3 rounded-lg border border-[#1E2B45] bg-[rgba(20,29,48,0.50)]"
              >
                <Bell className={`w-4 h-4 mt-0.5 shrink-0 ${
                  alert.riskLevel === 'danger' ? 'text-[#EE4A4A]' : 'text-[#F59E0B]'
                }`} />
                <div className="flex-1">
                  <div className="text-xs text-slate-300">{alert.message}</div>
                  <div className="text-[10px] text-slate-500 mt-1">{alert.timestamp}</div>
                </div>
                <Badge
                  variant={alert.riskLevel}
                  label={alert.riskLevel === 'danger' ? 'NGUY HIỂM' : 'ĐÁNG NGHI'}
                  showIcon={false}
                  className="text-[9px] px-2 py-0.5"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
