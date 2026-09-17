import React from 'react';
import Link from 'next/link';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#1E2B45] bg-[#080C15]/80 backdrop-blur-md mt-auto">
      <div className="max-w-[75rem] mx-auto px-6 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        {/* Bản quyền */}
        <div className="flex items-center gap-2">
          <span>© 2026 <strong className="text-slate-200 font-semibold">CyberGuard</strong>. All rights reserved.</span>
        </div>

        {/* Links điều hướng nhanh */}
        <div className="flex items-center gap-6">
          <Link href="/guide" className="hover:text-[#559AEF] transition-colors">
            Cẩm nang nhận diện
          </Link>
          <Link href="/terms" className="hover:text-[#559AEF] transition-colors">
            Điều khoản & Chính sách
          </Link>
          <button 
            type="button" 
            className="flex items-center gap-1.5 hover:text-[#EE4A4A] transition-colors"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Báo cáo sự cố</span>
          </button>
        </div>

        {/* Trạng thái hệ thống */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]"></span>
          </span>
          <span className="text-slate-300 font-medium">System Operational</span>
        </div>
      </div>
    </footer>
  );
}