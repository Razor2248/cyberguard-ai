'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  History,
  User,
  HelpCircle,
  FileText,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

const MENU_ITEMS = [
  { label: 'Tổng quan', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Lịch sử quét', href: '/history', icon: History },
  { label: 'Thông tin cá nhân', href: '/profile', icon: User },
  { label: 'Trợ giúp & Tài liệu', href: '/help', icon: HelpCircle },
  { label: 'Điều khoản & Chính sách', href: '/terms', icon: FileText },
];

export default function Sidebar({ defaultCollapsed = false }) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const pathname = usePathname();

  return (
    <aside
      className={[
        'sticky top-0 z-40 flex h-screen shrink-0 flex-col select-none p-3 font-[Inter]',
        'transition-[width] duration-300 ease-in-out',
        collapsed ? 'w-20' : 'w-64',
      ].join(' ')}
    >
      {/* Khung kính nổi (Floating Glass Card) */}
      <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0B132B]/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        
        {/* Menu Navigation */}
        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden p-2 pt-5">
          {MENU_ITEMS.map((item) => {
            const isActive =
              item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href);
            const Icon = item.icon;

            return (
              <div key={item.href} className="group relative flex justify-center">
                <Link
                  href={item.href}
                  className={[
                    'group relative flex items-center transition-all duration-200 rounded-xl',
                    // Khi thu gọn: Ép cứng ô vuông cân đối (h-10 w-10)
                    collapsed ? 'h-10 w-10 justify-center p-0' : 'h-10 w-full gap-3 px-3.5',
                    isActive
                      ? [
                          'bg-gradient-to-r from-[#1F70D3]/20 via-[#559AEF]/12 to-[#1F70D3]/5',
                          'border border-[#559AEF]/25',
                          'shadow-[0_2px_12px_rgba(31,112,211,0.15)]',
                          'text-[#F1F5F9]',
                        ].join(' ')
                      : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200',
                  ].join(' ')}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-all duration-200 ${
                      isActive
                        ? 'text-[#559AEF]'
                        : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                    aria-hidden="true"
                  />

                  {!collapsed && (
                    <span className="truncate whitespace-nowrap text-xs font-medium tracking-wide">
                      {item.label}
                    </span>
                  )}
                </Link>

                {/* Tooltip khi thu gọn */}
                {collapsed && (
                  <span
                    className="pointer-events-none absolute left-[calc(100%+0.75rem)] top-1/2 z-50 -translate-y-1/2
                               whitespace-nowrap rounded-lg border border-white/15 bg-[#0B132B]/90 backdrop-blur-xl
                               px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-2xl
                               transition-opacity duration-200 group-hover:opacity-100"
                  >
                    {item.label}
                  </span>
                )}
              </div>
            );
          })}
        </nav>

        {/* Nút Thu gọn / Mở rộng */}
        <div className="p-2 border-t border-white/[0.08] flex justify-center">
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? 'Mở rộng thanh bên' : 'Thu gọn thanh bên'}
            className={[
              'flex items-center rounded-xl text-xs font-medium text-slate-400 transition-colors hover:bg-white/[0.04] hover:text-white',
              collapsed ? 'h-10 w-10 justify-center p-0' : 'w-full gap-3 px-3 py-2',
            ].join(' ')}
          >
            {collapsed ? (
              <ChevronsRight className="h-4 w-4 shrink-0" />
            ) : (
              <>
                <ChevronsLeft className="h-4 w-4 shrink-0" />
                <span className="truncate whitespace-nowrap">Thu gọn</span>
              </>
            )}
          </button>
        </div>

      </div>
    </aside>
  );
}