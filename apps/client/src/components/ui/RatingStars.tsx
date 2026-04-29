import React from 'react';
import { Rate } from 'antd';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

// We use a mapping for font-size since Ant Design uses CSS for Star sizing
const starSizes: Record<string, string> = {
  sm: '12px',
  md: '14px',
  lg: '18px',
};

const wrapVariants = cva('flex items-center gap-2');

export interface RatingStarsProps extends VariantProps<typeof wrapVariants> {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  reviewCount,
  size = 'md',
  className,
}) => {
  return (
    <div className={cn(wrapVariants(), className)}>
      <Rate
        disabled
        allowHalf
        value={rating}
        style={{
          fontSize: starSizes[size],
          color: '#D4A853',
        }}
        className="flex leading-none [&_.ant-rate-star]:margin-inline-end-[2px]"
      />

      {reviewCount !== undefined && (
        <span className="text-xs text-[#6B6B6B] leading-none">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
};

export default RatingStars;
