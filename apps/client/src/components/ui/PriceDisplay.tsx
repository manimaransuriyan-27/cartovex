import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const priceVariants = cva('font-semibold text-[#1A1A1A]', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-lg',
      lg: 'text-2xl',
    },
  },
  defaultVariants: { size: 'md' },
});

const originalVariants = cva('line-through text-[#6B6B6B]', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: { size: 'md' },
});

export interface PriceDisplayProps extends VariantProps<typeof priceVariants> {
  price: number;
  originalPrice?: number;
  className?: string;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  originalPrice,
  size,
  className,
}) => {
  const discount =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  return (
    <div className={cn('flex items-baseline gap-2 flex-wrap', className)}>
      <span className={cn(priceVariants({ size }))}>${price.toFixed(2)}</span>

      {originalPrice && originalPrice > price && (
        <span className={cn(originalVariants({ size }))}>
          ${originalPrice.toFixed(2)}
        </span>
      )}

      {discount && (
        <span className="text-[10px] font-semibold bg-red-100 text-red-500 px-1.5 py-0.5 rounded">
          -{discount}%
        </span>
      )}
    </div>
  );
};

export default PriceDisplay;
