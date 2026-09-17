'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import AppLayout from '@/components/layout/AppLayout';
import Badge from '@/components/common/Badge';
import {
  Search,
  Download,
  ChevronRight,
  Globe,
  Mail,
  Phone,
  MessageSquare,
  ArrowUpRight,
  ChevronLeft,
  FileQuestion,
  Loader2
} from 'lucide-react';

const MOCK_DATA = {
  stats: {
    total_scans: 1284,
    threats_found: 142,
    reports_sent: 8,
    saved_items: 6
  },
  scan_history: [
    {
      id: "SC-10824",
      timestamp: "31/08/2026 14:32:05",
      type: "url",
      source_name: "URL",
      target: "https://secure-vietcombank-login.xyz/verify",
      riskLevel: "danger",
      risk_label: "Mối đe dọa"
    },
    {
      id: "SC-10823",
      timestamp: "31/08/2026 13:18:44",
      type: "email",
      source_name: "Email",
      target: "hr-notification@internal-company.com.vn",
      riskLevel: "safe",
      risk_label: "An toàn"
    },
    {
      id: "SC-10822",
      timestamp: "30/08/2026 09:55:11",
      type: "phone",
      source_name: "Số điện thoại",
      target: "+84 28 8888 9999",
      riskLevel: "warning",
      risk_label: "Đáng ngờ"
    },
    {
      id: "SC-10821",
      timestamp: "30/08/2026 08:02:37",
      type: "email",
      source_name: "Email",
      target: "service@paypal-security-alert.net",
      riskLevel: "safe",
      risk_label: "An toàn"
    },
    {
      id: "SC-10820",
      timestamp: "29/08/2026 22:14:59",
      type: "url",
      source_name: "URL",
      target: "http://shopee-khuyen-mai-iphone16.store",
      riskLevel: "danger",
      risk_label: "Mối đe dọa"
    },
    {
      id: "SC-10819",
      timestamp: "29/08/2026 17:40:23",
      type: "sms",
      source_name: "Tin nhắn",
      target: "[Mã OTP] Ma xac thuc cua ban la 592811. Vui long khong chia se...",
      riskLevel: "safe",
      risk_label: "An toàn"
    },
    {
      id: "SC-10818",
      timestamp: "28/08/2026 11:07:50",
      type: "phone",
      source_name: "Số điện thoại",
      target: "+84 90 1234 567",
      riskLevel: "danger",
      risk_label: "Mối đe dọa"
    },
    {
      id: "SC-10817",
      timestamp: "28/08/2026 10:33:14",
      type: "sms",
      source_name: "Tin nhắn",
      target: "Yêu cầu cung cấp OTP kích hoạt ví VNeID",
      riskLevel: "warning",
      risk_label: "Đáng ngờ"
    },
    {
      id: "SC-10816",
      timestamp: "27/08/2026 16:21:08",
      type: "email",
      source_name: "Email",
      target: "billing-support@google.com",
      riskLevel: "safe",
      risk_label: "An toàn"
    },
    {
      id: "SC-10815",
      timestamp: "27/08/2026 09:44:32",
      type: "url",
      source_name: "URL",
      target: "https://chinhphu.vn/thong-tin-chi-dao",
      riskLevel: "safe",
      risk_label: "An toàn"
    }
  ],
  reports_sent: [
    {
      id: "RP-301",
      timestamp: "31/08/2026 15:10:00",
      type: "url",
      source_name: "URL",
      target: "https://secure-vietcombank-login.xyz/verify",
      riskLevel: "danger",
      risk_label: "Mối đe dọa"
    }
  ],
  saved_results: [
    {
      id: "SV-501",
      timestamp: "31/08/2026 14:35:00",
      type: "url",
      source_name: "URL",
      target: "https://secure-vietcombank-login.xyz/verify",
      riskLevel: "danger",
      risk_label: "Mối đe dọa"
    }
  ]
};

const TYPE_ICONS = {
  url: Globe,
  email: Mail,
  phone: Phone,
  sms: MessageSquare,
};

const formatBadgeLabel = (label, riskLevel) => {
  if (!label) {
    if (riskLevel === 'danger') return 'Mối đe dọa';
    if (riskLevel === 'warning') return 'Đáng ngờ';
    return 'An toàn';
  }
  const clean = label.trim().toLowerCase();
  if (clean.includes('đe dọa') || clean.includes('danger')) return 'Mối đe dọa';
  if (clean.includes('đáng ngờ') || clean.includes('warning')) return 'Đáng ngờ';
  if (clean.includes('an toàn') || clean.includes('safe')) return 'An toàn';
  return clean.charAt(0).toUpperCase() + clean.slice(1);
};

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState('scans');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState('all');
  const [selectedResult, setSelectedResult] = useState('all');
  const [selectedTime, setSelectedTime] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const currentList = useMemo(() => {
    if (activeTab === 'scans') return MOCK_DATA.scan_history;
    if (activeTab === 'reports') return MOCK_DATA.reports_sent;
    return MOCK_DATA.saved_results;
  }, [activeTab]);

  const filteredList = useMemo(() => {
    return currentList.filter((item) => {
      const target = item.target.toLowerCase();
      const timestamp = item.timestamp.toLowerCase();
      const sourceName = item.source_name.toLowerCase();
      const query = searchQuery.toLowerCase().trim();

      const matchSearch =
        query === '' ||
        target.includes(query) ||
        timestamp.includes(query) ||
        sourceName.includes(query);

      const matchSource = selectedSource === 'all' || item.type === selectedSource;
      const matchResult = selectedResult === 'all' || item.riskLevel === selectedResult;

      return matchSearch && matchSource && matchResult;
    });
  }, [currentList, searchQuery, selectedSource, selectedResult]);

  const handleTabChange = (tab) => {
    setIsLoading(true);
    setActiveTab(tab);
    setCurrentPage(1);
    setTimeout(() => setIsLoading(false), 150);
  };

  return (
    <AppLayout>
      <div className="space-y-6 text-[#F1F5F9]">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-300 transition-colors">TRANG CHỦ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-400">LỊCH SỬ QUÉT</span>
        </nav>

        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-medium tracking-wider text-[#559AEF] uppercase">CYBERGUARD AI</span>
            <h1 className="text-lg md:text-xl font-semibold tracking-wide text-[#F1F5F9] mt-0.5">
              Lịch sử & Hoạt động
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Tất cả lượt quét, báo cáo đã gửi và kết quả đã lưu
            </p>
          </div>

          <button
            type="button"
            onClick={() => alert('Xuất danh sách thành công dưới dạng CSV.')}
            className="self-start md:self-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#1E2B45] bg-[rgba(20,29,48,0.50)] hover:border-[#559AEF] hover:text-[#559AEF] text-xs font-medium transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>[ Xuất CSV ]</span>
          </button>
        </div>

        {/* Stats Counter Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl border border-[#1E2B45] bg-[rgba(17,71,159,0.10)] backdrop-blur-sm">
            <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">TỔNG LƯỢT QUÉT</div>
            <div className="text-xl font-bold tracking-tight text-white mt-1">
              {MOCK_DATA.stats.total_scans.toLocaleString('vi-VN')}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[#1E2B45] bg-[rgba(17,71,159,0.10)] backdrop-blur-sm">
            <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">MỐI ĐE DỌA</div>
            <div className="text-xl font-bold tracking-tight text-[#EE4A4A] mt-1">
              {MOCK_DATA.stats.threats_found}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[#1E2B45] bg-[rgba(17,71,159,0.10)] backdrop-blur-sm">
            <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">BÁO CÁO ĐÃ GỬI</div>
            <div className="text-xl font-bold tracking-tight text-white mt-1">
              {MOCK_DATA.stats.reports_sent}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[#1E2B45] bg-[rgba(17,71,159,0.10)] backdrop-blur-sm">
            <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">ĐÃ LƯU</div>
            <div className="text-xl font-bold tracking-tight text-white mt-1">
              {MOCK_DATA.stats.saved_items}
            </div>
          </div>
        </div>

        {/* Tabs Switcher */}
        <div className="flex border-b border-[#1E2B45] gap-8 text-sm">
          <button
            type="button"
            onClick={() => handleTabChange('scans')}
            className={`pb-3 font-medium transition-all relative ${
              activeTab === 'scans' ? 'text-[#559AEF]' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Lịch sử quét
            {activeTab === 'scans' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#559AEF] shadow-[0_0_8px_#559AEF]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('reports')}
            className={`pb-3 font-medium transition-all relative ${
              activeTab === 'reports' ? 'text-[#559AEF]' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Báo cáo đã gửi
            {activeTab === 'reports' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#559AEF] shadow-[0_0_8px_#559AEF]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('saved')}
            className={`pb-3 font-medium transition-all relative ${
              activeTab === 'saved' ? 'text-[#559AEF]' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Kết quả đã lưu
            {activeTab === 'saved' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#559AEF] shadow-[0_0_8px_#559AEF]" />
            )}
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm theo URL, email, số điện thoại hoặc nội dung tin nhắn..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[rgba(20,29,48,0.50)] border border-[#1E2B45] text-xs md:text-sm text-[#F1F5F9] placeholder:text-slate-500 focus:outline-none focus:border-[#559AEF] focus:ring-2 focus:ring-[#559AEF]/30 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="px-3 py-2.5 rounded-lg bg-[rgba(20,29,48,0.50)] border border-[#1E2B45] text-xs text-slate-300 focus:outline-none focus:border-[#559AEF]"
            >
              <option value="all">Loại nguồn: Tất cả</option>
              <option value="url">URL</option>
              <option value="email">Email</option>
              <option value="phone">Số điện thoại</option>
              <option value="sms">Tin nhắn</option>
            </select>

            <select
              value={selectedResult}
              onChange={(e) => setSelectedResult(e.target.value)}
              className="px-3 py-2.5 rounded-lg bg-[rgba(20,29,48,0.50)] border border-[#1E2B45] text-xs text-slate-300 focus:outline-none focus:border-[#559AEF]"
            >
              <option value="all">Kết quả: Tất cả</option>
              <option value="safe">An toàn</option>
              <option value="warning">Đáng ngờ</option>
              <option value="danger">Mối đe dọa</option>
            </select>

            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="px-3 py-2.5 rounded-lg bg-[rgba(20,29,48,0.50)] border border-[#1E2B45] text-xs text-slate-300 focus:outline-none focus:border-[#559AEF]"
            >
              <option value="all">Thời gian: Tất cả</option>
              <option value="7d">7 ngày gần nhất</option>
              <option value="30d">30 ngày gần nhất</option>
            </select>
          </div>
        </div>

        {/* Main Data Table */}
        <div className="rounded-xl border border-[#1E2B45] bg-[#0D1420]/70 overflow-hidden backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1E2B45] bg-[#141F30]/60 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                  <th className="py-3 px-4 w-[180px]">NGÀY / GIỜ</th>
                  <th className="py-3 px-4">LOẠI NGUỒN ĐẦU VÀO</th>
                  <th className="py-3 px-4 text-center w-[220px]">KẾT QUẢ QUÉT</th>
                  <th className="py-3 px-4 text-right w-[150px]">THAO TÁC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2B45]/60 text-xs">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#559AEF] mb-2" />
                      Đang tải dữ liệu lịch sử...
                    </td>
                  </tr>
                ) : filteredList.length > 0 ? (
                  filteredList.map((row) => {
                    const Icon = TYPE_ICONS[row.type] || Globe;
                    return (
                      <tr key={row.id} className="hover:bg-[rgba(31,112,211,0.06)] transition-colors group">
                        <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                          {row.timestamp}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="p-1.5 rounded bg-[rgba(20,29,48,0.60)] border border-[#1E2B45] text-slate-400">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <span className="font-medium text-slate-300 mr-2">{row.source_name}</span>
                              <span className="text-slate-500 text-[11px] truncate max-w-[280px] inline-block align-middle font-mono">
                                {row.target}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          <Badge
                            variant={row.riskLevel}
                            label={formatBadgeLabel(row.risk_label, row.riskLevel)}
                            showIcon
                          />
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <Link
                            href={`/result?id=${row.id}`}
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-[#559AEF] transition-colors group-hover:underline"
                          >
                            <span>Xem báo cáo</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-500">
                      <FileQuestion className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      Không tìm thấy bản ghi nào khớp với điều kiện tìm kiếm.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 pt-2">
          <div>
            Hiển thị <span className="text-slate-200 font-medium">1–{filteredList.length}</span> trong tổng số{' '}
            <span className="text-slate-200 font-medium">{MOCK_DATA.stats.total_scans.toLocaleString('vi-VN')}</span> kết quả
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              className="p-1.5 rounded border border-[#1E2B45] text-slate-400 hover:border-[#559AEF] hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              className="w-7 h-7 rounded border border-[#1F70D3] bg-[#1F70D3] text-white font-medium shadow-[0_0_8px_rgba(85,154,239,0.35)]"
            >
              1
            </button>
            <button
              type="button"
              className="w-7 h-7 rounded border border-[#1E2B45] text-slate-400 hover:border-[#559AEF] hover:text-white transition-colors"
            >
              2
            </button>
            <button
              type="button"
              className="w-7 h-7 rounded border border-[#1E2B45] text-slate-400 hover:border-[#559AEF] hover:text-white transition-colors"
            >
              3
            </button>
            <span className="px-1 text-slate-500">...</span>
            <button
              type="button"
              className="w-7 h-7 rounded border border-[#1E2B45] text-slate-400 hover:border-[#559AEF] hover:text-white transition-colors"
            >
              129
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}