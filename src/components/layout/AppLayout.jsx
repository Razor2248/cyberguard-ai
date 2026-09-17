'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

/**
 * AppLayout
 *
 * Shared shell for every route: sticky Header, collapsible Sidebar (off-canvas
 * on mobile), a centered main content area, Footer, and a fixed mount point
 * for the ChatDrawer widget.
 *
 * @param {React.ReactNode} children
 * @param {object} headerProps - forwarded to <Header /> (isResultPage, isLoggedIn, user, ...)
 * @param {React.ReactNode} chatDrawer - the ChatDrawer widget instance to mount bottom-right
 * @param {() => void} onReportClick - forwarded to <Footer />
 */
export default function AppLayout({ children, headerProps = {}, chatDrawer = null, onReportClick }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080C15] text-[#F1F5F9]">
      <div className="flex min-h-screen w-full">
        {/* Sidebar — desktop/tablet: static column. Mobile: off-canvas drawer. */}
        <div className="hidden md:flex">
          <Sidebar />
        </div>

        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            {/* Backdrop */}
            <button
              type="button"
              aria-label="Đóng menu"
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            {/* Drawer */}
            <div className="relative z-10 flex h-full animate-[slideIn_0.2s_ease-out]">
              <Sidebar defaultCollapsed={false} />
              <button
                type="button"
                aria-label="Đóng menu"
                onClick={() => setMobileSidebarOpen(false)}
                className="absolute right-[-2.75rem] top-4 flex h-9 w-9 items-center justify-center
                           rounded-[0.5rem] border border-border-subtle bg-surface-elevated text-text-primary/70"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {/* Main column */}
        <div className="flex min-h-screen w-full min-w-0 flex-1 flex-col">
          <div className="relative">
            {/* Mobile menu trigger — floats over the sticky Header, left edge */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Mở menu điều hướng"
              className="absolute left-2 top-1/2 z-50 flex h-9 w-9 -translate-y-1/2 items-center justify-center
                         rounded-[0.5rem] text-text-primary/70 hover:bg-primary/15 hover:text-text-primary md:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="pl-12 md:pl-0">
              <Header {...headerProps} />
            </div>
          </div>

          <main className="w-full flex-1 px-4 py-6 sm:px-6 sm:py-8">
            <div className="mx-auto w-full max-w-[75rem]">{children}</div>
          </main>

          <Footer onReportClick={onReportClick} />
        </div>
      </div>

      {/* ChatDrawer mount point — fixed bottom-right, above everything else */}
      <div id="chat-drawer-root" className="fixed bottom-6 right-6 z-[60]">
        {chatDrawer}
      </div>
    </div>
  );
}
