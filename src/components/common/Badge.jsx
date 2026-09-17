import React from 'react';
import { CheckCircle, AlertTriangle, ShieldAlert } from 'lucide-react';

const BADGE_STYLES = {
  safe: {
    bg: 'bg-[rgba(34,197,94,0.12)]',
    border: 'border-[#22C55E]/40',
    text: 'text-[#22C55E]',
    icon: CheckCircle,
  },
  warning: {
    bg: 'bg-[rgba(245,158,11,0.12)]',
    border: 'border-[#F59E0B]/40',
    text: 'text-[#F59E0B]',
    icon: AlertTriangle,
  },
  danger: {
    bg: 'bg-[rgba(238,74,74,0.12)]',
    border: 'border-[#EE4A4A]/40',
    text: 'text-[#EE4A4A]',
    icon: ShieldAlert,
  },
};

export default function Badge({ variant = 'safe', label, showIcon = true, className = '' }) {
  const config = BADGE_STYLES[variant] || BADGE_STYLES.safe;
  const IconComponent = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm transition-all duration-200 ${config.bg} ${config.border} ${config.text} ${className}`}
    >
      {showIcon && <IconComponent className="w-3.5 h-3.5 shrink-0" />}
      <span>{label}</span>
    </span>
  );
}