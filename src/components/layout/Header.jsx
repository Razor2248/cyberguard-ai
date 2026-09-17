'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Shield, ArrowLeft, Globe, ChevronDown, BookOpen, History } from 'lucide-react';

function useClickOutside(ref, onOutside) {
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onOutside();
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, onOutside]);
}

/**
 * Header chuẩn hóa theo Wireframe
 */
export default function Header({
  isResultPage = false,
  isLoggedIn = false,
  user = { name: 'Nguyễn Tuấn', avatarUrl: '' },
  onRescan,
  initialScanValue = 'https://vietcombank.com.vn/dang-nhap',
}) {
  const [scanValue, setScanValue] = useState(initialScanValue);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setMenuOpen(false));

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-[#1E2B45] bg-[rgba(8,12,21,0.95)] px-6 backdrop-blur-md font-[Inter] select-none">
      {/* KHỐI TRÁI: Nút Quay lại (nếu có) + Brand Logo */}
      <div className="flex shrink-0 items-center gap-4">
        {isResultPage && (
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E2B45] bg-[rgba(20,29,48,0.5)] px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-[#559AEF] hover:text-[#559AEF]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Quay lại</span>
          </button>
        )}

        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(31,112,211,0.15)] border border-[#559AEF]/30">
            <Shield className="h-4 w-4 text-[#559AEF]" />
          </span>
          <span className="text-sm font-bold tracking-wider text-[#F1F5F9]">
            CYBERGUARD AI
          </span>
        </Link>
      </div>

      {/* KHỐI GIỮA: Thanh quét lại trên trang Kết quả */}
      {isResultPage && (
        <div className="mx-6 flex flex-1 items-center justify-center max-w-xl">
          <div className="relative flex w-full items-center">
            <div className="pointer-events-none absolute left-3 text-slate-400">
              <Globe className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={scanValue}
              onChange={(e) => setScanValue(e.target.value)}
              placeholder="Nhập URL hoặc email cần quét..."
              className="h-10 w-full rounded-lg border border-[#1E2B45] bg-[rgba(20,29,48,0.6)] pl-9 pr-24 font-mono text-xs text-[#F1F5F9] placeholder:text-slate-500 focus:border-[#559AEF] focus:outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => onRescan?.(scanValue)}
              className="absolute right-1.5 h-7 rounded-md bg-[#1F70D3] px-3 text-xs font-medium text-white shadow-sm hover:bg-[#1757A6] transition-colors"
            >
              Quét lại
            </button>
          </div>
        </div>
      )}

      {/* KHỐI PHẢI: Menu điều hướng & Trạng thái Auth */}
      <div className="flex shrink-0 items-center gap-3">
        {/* Link Hướng dẫn (chỉ hiện ở Default state) */}
        {!isResultPage && (
          <Link
            href="/guide"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E2B45] bg-[rgba(20,29,48,0.4)] px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-[#559AEF] hover:text-[#559AEF] transition-all"
          >
            <BookOpen className="h-3.5 w-3.5 text-slate-400" />
            <span>Hướng dẫn</span>
          </Link>
        )}

        {/* Link Lịch sử quét (luôn hiện trên mọi state) */}
        <Link
          href="/history"
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E2B45] bg-[rgba(20,29,48,0.4)] px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-[#559AEF] hover:text-[#559AEF] transition-all"
        >
          <History className="h-3.5 w-3.5 text-slate-400" />
          <span>Lịch sử quét</span>
        </Link>

        {/* Trạng thái chưa Login: Nút Đăng nhập & Đăng ký */}
        {!isLoggedIn ? (
          <div className="flex items-center gap-2 pl-1">
            <Link
              href="/login"
              className="rounded-lg border border-[#1E2B45] bg-[rgba(20,29,48,0.5)] px-3.5 py-1.5 text-xs font-medium text-slate-200 hover:border-[#559AEF] hover:text-white transition-all"
            >
              Đăng nhập
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-[#1F70D3] px-3.5 py-1.5 text-xs font-semibold text-white shadow-[0_0_10px_rgba(85,154,239,0.3)] hover:bg-[#1757A6] transition-all"
            >
              Đăng ký
            </Link>
          </div>
        ) : (
          /* Trạng thái đã Login: User Profile Dropdown */
          <div className="relative pl-1" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 rounded-lg border border-[#1E2B45] bg-[rgba(20,29,48,0.5)] px-2.5 py-1.5 hover:border-[#559AEF] transition-all"
            >
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="h-6 w-6 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1F70D3] text-[10px] font-bold text-white uppercase">
                  {user.name?.split(' ').map((n) => n[0]).slice(0, 2).join('') || 'NT'}
                </span>
              )}
              <span className="text-xs font-medium text-slate-200">{user.name}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-[calc(100%+0.5rem)] w-44 overflow-hidden rounded-lg border border-[#1E2B45] bg-[#0D1420] shadow-xl text-xs z-50">
                <Link
                  href="/profile"
                  className="block px-4 py-2.5 text-slate-300 hover:bg-[rgba(31,112,211,0.15)] hover:text-white transition-colors"
                >
                  Thông tin cá nhân
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2.5 text-slate-300 hover:bg-[rgba(31,112,211,0.15)] hover:text-white transition-colors"
                >
                  Cài đặt
                </Link>
                <button
                  type="button"
                  onClick={() => alert('Đăng xuất')}
                  className="block w-full border-t border-[#1E2B45] px-4 py-2.5 text-left text-[#EE4A4A] hover:bg-[rgba(238,74,74,0.1)] transition-colors"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}