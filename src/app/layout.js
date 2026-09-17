import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
});

export const metadata = {
  title: 'CyberGuard AI',
  description: 'CyberGuard AI Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#060913] text-[#F1F5F9] antialiased min-h-screen relative overflow-x-hidden m-0 p-0`}>
        {/* Nguồn sáng nền xuyên kính mờ */}
        <div className="fixed -top-20 -left-20 h-[500px] w-[500px] rounded-full bg-[#1F70D3]/30 blur-[130px] pointer-events-none -z-10" />
        <div className="fixed top-1/2 -left-20 h-[450px] w-[450px] rounded-full bg-[#38BDF8]/20 blur-[130px] pointer-events-none -z-10" />
        
        {children}
      </body>
    </html>
  );
}