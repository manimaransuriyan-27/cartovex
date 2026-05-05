import React, { forwardRef, memo, useState } from 'react';
import { EyeInvisibleOutlined, EyeOutlined, LockOutlined } from '@ant-design/icons';
import { cn } from '@/shared/utils';

export interface PasswordInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  hasError?: boolean;
}

/**
 * PasswordInput — password field with visibility toggle.
 * Internally tracks focus so the border highlight covers both
 * the input and the toggle button area.
 */
const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, hasError, onFocus, onBlur, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const [focused, setFocused] = useState(false);

    return (
      <div
        className={cn(
          'flex items-center gap-2.5 h-11 px-3.5 rounded-xl border transition-all duration-200',
          'bg-slate-50 dark:bg-white/5',
          focused
            ? 'border-slate-100 dark:border-zinc-500 ring-2 ring-slate-200 dark:ring-zinc-700'
            : 'border-slate-200 dark:border-zinc-700',
          hasError && 'border-red-100 ring-2 ring-red-100 dark:ring-red-900/30',
        )}
      >
        {/* Lock icon prefix */}
        <span className="text-slate-400 dark:text-zinc-500 flex items-center text-base shrink-0">
          <LockOutlined />
        </span>

        <input
          ref={ref}
          type={visible ? 'text' : 'password'}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          className={cn(
            'flex-1 bg-transparent outline-none text-sm',
            'text-slate-800 dark:text-zinc-100',
            'placeholder:text-slate-400 dark:placeholder:text-zinc-600',
            className,
          )}
          {...props}
        />

        {/* Toggle visibility button */}
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setVisible((v) => !v)}
          className="text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300 flex items-center text-base shrink-0 transition-colors duration-150"
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        </button>
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export default memo(PasswordInput);
