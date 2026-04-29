import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const titleVariants = cva('font-semibold text-[#1A1A1A] leading-tight m-0', {
  variants: {
    size: {
      sm: 'text-base',
      md: 'text-xl',
      lg: 'text-2xl',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: { size: 'md', align: 'left' },
});

export interface SectionTitleProps extends VariantProps<typeof titleVariants> {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  action,
  size,
  align,
  className,
}) => (
  <div className={cn('flex justify-between items-end mb-6', className)}>
    <div>
      <h2 className={cn(titleVariants({ size, align }))}>{title}</h2>
      {subtitle && <p className="text-xs text-[#6B6B6B] mt-1">{subtitle}</p>}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);

export default SectionTitle;
