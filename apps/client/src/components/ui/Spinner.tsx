import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const spinnerVariants = cva('flex flex-col items-center justify-center gap-3', {
  variants: {
    fullPage: {
      true: 'fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm w-screen h-screen',
      false: 'relative w-full py-8',
    },
  },
  defaultVariants: {
    fullPage: false,
  },
});

const iconSizes: Record<string, number> = {
  sm: 18,
  md: 32,
  lg: 48,
};

export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  size?: 'sm' | 'md' | 'lg';
  tip?: string;
  className?: string;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  tip,
  fullPage,
  className,
  color = '#D4A853', // Matching your brand gold/gold-ish color
}) => {
  const antIcon = <LoadingOutlined style={{ fontSize: iconSizes[size], color }} spin />;

  return (
    <div className={cn(spinnerVariants({ fullPage }), className)}>
      <Spin
        indicator={antIcon}
        tip={tip && <span className="text-sm font-medium text-[#6B6B6B]">{tip}</span>}
      />
    </div>
  );
};

export default Spinner;
