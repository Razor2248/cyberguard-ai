'use client';

import { forwardRef } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';

/**
 * Design tokens — CyberGuard AI / Dark Sci-Fi theme
 * Keep these in sync with the Design System Specs.
 */
const SIZE_STYLES = {
  sm: 'h-8 px-3 text-xs rounded-[0.375rem] gap-1.5',
  md: 'h-11 px-5 text-sm font-semibold rounded-[0.5rem] gap-2',
  lg: 'h-12 w-full px-6 text-base font-semibold rounded-[0.5rem] gap-2',
};

const ICON_SIZE = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-4 w-4',
};

const VARIANT_STYLES = {
  primary:
    'bg-[#1F70D3] text-[#F1F5F9] border border-transparent ' +
    'hover:bg-[#1757A6] hover:shadow-[0_0_1rem_rgba(85,154,239,0.35)] ' +
    'active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#559AEF]',
  danger:
    'bg-[#AA2929] text-[#F1F5F9] border border-transparent ' +
    'hover:bg-[#882020] active:scale-[0.98] ' +
    'focus-visible:ring-2 focus-visible:ring-[#EE4A4A]',
  ghost:
    'bg-transparent text-[#F1F5F9]/70 border border-[#1E2B45] ' +
    'hover:bg-[rgba(31,112,211,0.15)] hover:text-[#F1F5F9] hover:border-[#2E4166] ' +
    'focus-visible:ring-2 focus-visible:ring-[#559AEF]',
  retry:
    'bg-[rgba(17,71,159,0.1)] text-[#559AEF] border border-[#559AEF] ' +
    'hover:bg-[#1F70D3] hover:text-[#F1F5F9] ' +
    'focus-visible:ring-2 focus-visible:ring-[#559AEF]',
};

const DISABLED_STYLES =
  'bg-[rgba(20,29,48,0.25)] text-[#F1F5F9]/25 border border-transparent ' +
  'cursor-not-allowed shadow-none active:scale-100';

/**
 * Button
 *
 * @param {'sm'|'md'|'lg'} size
 * @param {'primary'|'danger'|'ghost'|'retry'} variant
 * @param {boolean} isLoading - shows a spinning Loader2 icon, disables the button
 * @param {boolean} isRetry - shows a RefreshCw icon (ignored while isLoading)
 * @param {boolean} disabled
 */
const Button = forwardRef(function Button(
  {
    children,
    size = 'md',
    variant = 'primary',
    isLoading = false,
    isRetry = false,
    disabled = false,
    className = '',
    type = 'button',
    ...props
  },
  ref
) {
  const isDisabled = disabled || isLoading;
  const iconSize = ICON_SIZE[size];

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      className={[
        'font-[Inter] inline-flex select-none items-center justify-center whitespace-nowrap',
        'transition-all duration-200 ease-out',
        'focus:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[#080C15]',
        SIZE_STYLES[size],
        isDisabled ? DISABLED_STYLES : VARIANT_STYLES[variant],
        className,
      ].join(' ')}
      {...props}
    >
      {isLoading && <Loader2 className={`${iconSize} animate-spin`} aria-hidden="true" />}
      {!isLoading && isRetry && <RefreshCw className={iconSize} aria-hidden="true" />}
      {children}
    </button>
  );
});

export default Button;
