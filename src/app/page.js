'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import Badge from '@/components/common/Badge';
import { 
  Search, 
  Globe, 
  MessageSquareWarning, 
  MailWarning, 
  PhoneCall, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Users,
  Sparkles
} from 'lucide-react';

const SCAN_TABS = [
  { id: 'url', label: 'Liên kết URL', icon: Globe, placeholder: 'Nhập đường dẫn trang web nghi ngờ (vd: https://shopee-nhan-qua.xyz)...' },
  { id: 'sms', label: 'Tin nhắn SMS', icon: MessageSquareWarning, placeholder: 'Dán toàn bộ nội dung tin nhắn lừa đảo...' },
  { id: 'email', label: 'Email', icon: MailWarning, placeholder: 'Dán tiêu đề hoặc nội dung email giả mạo...' },
  { id: 'phone', label: 'Số điện thoại', icon: PhoneCall, placeholder: 'Nhập số thuê bao spam / giả mạo...' },
];

const SAMPLE_TAGS = [
  { label: 'vietcombank-login-online.xyz', type: 'url' },
  { label: 'Tin nhắn trúng thưởng 50 triệu', type: 'sms' },
  { label: '+84 28 8888 9999 (Giả mạo cơ quan)', type: 'phone' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('url');
  const [inputValue, setInputValue] = useState('');

  const currentTab = SCAN_TABS.find((tab) => tab.id === activeTab);

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center space-y-10 py-6 text-center">
        {/* Hero Section */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex justify-center">
            <Badge variant="safe" label="Cơ chế bảo vệ AI đa tầng kích hoạt" showIcon />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#F1F5F9] leading-tight">
            Hệ thống phân tích & cảnh báo an toàn trực tuyến
          </h1>
          <p className="text-sm md:text-base text-slate-400">
            Kiểm tra và phát hiện nhanh mã độc, trang web giả mạo ngân hàng và số điện thoại lừa đảo bằng trí tuệ nhân tạo.
          </p>
        </div>

        {/* Khung Scan Đa Tầng */}
        <div className="w-full max-w-3xl rounded-xl border border-[#1E2B45] bg-[#0D1420]/80 backdrop-blur-md p-6 shadow-2xl space-y-5 text-left">
          {/* Tabs chuyển loại quét */}
          <div className="flex flex-wrap gap-2 border-b border-[#1E2B45] pb-4">
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
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
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

          {/* Ô Input quét + Nút bắt đầu */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={currentTab?.placeholder}
                className="w-full pl-12 pr-4 py-3.5 rounded-lg bg-[rgba(20,29,48,0.50)] border border-[#1E2B45] text-[#F1F5F9] placeholder:text-slate-500 text-sm focus:outline-none focus:border-[#559AEF] focus:ring-2 focus:ring-[#559AEF]/30 transition-all"
              />
            </div>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#1F70D3] hover:bg-[#1757A6] text-white text-sm font-semibold transition-all shadow-[0_0_1rem_rgba(85,154,239,0.35)] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Phân tích ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tag mẫu kiểm tra nhanh */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            <span className="text-slate-400">Mẫu quét nhanh:</span>
            {SAMPLE_TAGS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setActiveTab(sample.type);
                  setInputValue(sample.label);
                }}
                className="px-2.5 py-1 rounded bg-[#141F30] border border-[#1E2B45] text-slate-300 hover:border-[#559AEF] hover:text-[#559AEF] transition-all"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Khối thống kê bên dưới */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl pt-4">
          <div className="p-4 rounded-lg border border-[#1E2B45] bg-[rgba(17,71,159,0.06)] flex items-center gap-4 text-left">
            <div className="p-3 rounded-lg bg-[#1F70D3]/15 text-[#559AEF]">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-100">1.2M+</div>
              <div className="text-xs text-slate-400">Yêu cầu đã được rà quét</div>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-[#1E2B45] bg-[rgba(17,71,159,0.06)] flex items-center gap-4 text-left">
            <div className="p-3 rounded-lg bg-[#22C55E]/15 text-[#22C55E]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-100">99.8%</div>
              <div className="text-xs text-slate-400">Tỷ lệ phát hiện chính xác</div>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-[#1E2B45] bg-[rgba(17,71,159,0.06)] flex items-center gap-4 text-left">
            <div className="p-3 rounded-lg bg-[#F59E0B]/15 text-[#F59E0B]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-100">24/7</div>
              <div className="text-xs text-slate-400">Bảo vệ an toàn gia đình</div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}