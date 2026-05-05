import React, { forwardRef, memo, useState } from 'react';
import { cn } from '@/shared/utils';

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'prefix'
> {
  prefix?: React.ReactNode;
  hasError?: boolean;
}

/**
 * StyledInput — base text input with optional leading icon (prefix).
 *
 * Controlled focus state is managed internally so the border
 * highlight works even when the prefix icon is clicked.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, prefix, hasError, onFocus, onBlur, ...props }, ref) => {
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
        {prefix && (
          <span className="text-slate-400 dark:text-zinc-500 flex items-center text-base shrink-0">
            {prefix}
          </span>
        )}
        <input
          ref={ref}
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
      </div>
    );
  },
);

Input.displayName = 'Input';

export default memo(Input);
