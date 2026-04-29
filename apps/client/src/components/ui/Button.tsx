import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium rounded-md border transition-all duration-150',
    'cursor-pointer select-none whitespace-nowrap',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'active:scale-[0.98]',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-[#1A1A1A] text-white border-[#1A1A1A]',
          'hover:bg-[#333] hover:border-[#333]',
        ],
        outline: ['bg-transparent text-[#1A1A1A] border-[#1A1A1A]', 'hover:bg-[#F7F7F5]'],
        ghost: [
          'bg-transparent text-[#2D2D2D] border-[#E8E8E2]',
          'hover:bg-[#F7F7F5] hover:border-[#D0D0C8]',
        ],
        danger: [
          'bg-[#E74C3C] text-white border-[#E74C3C]',
          'hover:bg-[#C0392B] hover:border-[#C0392B]',
        ],
        accent: [
          'bg-[#D4A853] text-white border-[#D4A853]',
          'hover:bg-[#BC9445] hover:border-[#BC9445]',
        ],
      },
      size: {
        sm: 'h-8  px-3 text-xs',
        md: 'h-10 px-5 text-sm',
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
export default Button;
