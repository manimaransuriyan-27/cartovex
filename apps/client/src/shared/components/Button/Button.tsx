import { cn } from '@/shared/utils';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium rounded-lg border transition-all duration-300',
    'cursor-pointer select-none whitespace-nowrap',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'active:scale-[0.98] relative z-10',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-[#1A1A1A] text-white border-[#1A1A1A]',
          'hover:bg-[#333] hover:border-[#333]',
          'dark:bg-white dark:text-black dark:border-white dark:hover:bg-zinc-200',
        ],
        secondary: [
          'bg-slate-200 text-slate-700 border-transparent',
          'hover:bg-slate-300',
          'dark:bg-white/10 dark:text-white dark:hover:bg-white/20',
        ],
        outline: [
          'bg-transparent text-[#1A1A1A] border-[#1A1A1A]',
          'dark:text-white dark:border-zinc-700 dark:hover:bg-zinc-800',
        ],
        ghost: [
          'bg-transparent text-[#2D2D2D] border-transparent',
          'hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-white/5',
        ],
        danger: [
          'bg-red-600 text-white border-red-600',
          'hover:bg-red-700 dark:hover:bg-red-500',
        ],
        accent: [
          'bg-[#D4A853] text-white border-[#D4A853]',
          'hover:bg-[#BC9445]',
          'dark:bg-amber-600 dark:border-amber-600 dark:hover:bg-amber-500',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-7 text-base',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  },
);

export interface AppButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    {
      children,
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      disabled,
      icon,
      iconPosition = 'left',
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
      >
        {loading ? (
          <Spin indicator={<LoadingOutlined spin />} size="small" />
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className="flex items-center">{icon}</span>
            )}
            {children}
            {icon && iconPosition === 'right' && (
              <span className="flex items-center">{icon}</span>
            )}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = 'AppButton';

export default React.memo(Button);
