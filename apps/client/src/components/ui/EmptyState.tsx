import { InboxOutlined } from '@ant-design/icons';
import { Empty } from 'antd';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '../../lib/utils';
import Button from './Button';

const wrapVariants = cva('flex items-center justify-center', {
  variants: {
    padding: {
      sm: 'py-10 px-4',
      md: 'py-16 px-6',
      lg: 'py-24 px-8',
    },
  },
  defaultVariants: { padding: 'md' },
});

export interface EmptyStateProps extends VariantProps<typeof wrapVariants> {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  icon,
  padding,
  className,
}) => {
  return (
    <div className={cn(wrapVariants({ padding }), className)}>
      <Empty
        // Ant Design uses "image" prop for the icon/illustration
        image={
          icon ?? (
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F0F0EC]">
              <InboxOutlined style={{ fontSize: 24, color: '#6B6B6B' }} />
            </div>
          )
        }
        // We combine title and description into the description slot for better styling control
        description={
          <div className="mt-2">
            <p className="mb-1 text-[15px] font-semibold text-[#1A1A1A]">{title}</p>
            {description && (
              <p className="mx-auto max-w-xs text-sm text-[#6B6B6B]">{description}</p>
            )}
          </div>
        }
      >
        {actionLabel && onAction && (
          <Button
            size="md"
            onClick={onAction}
            className="mt-2 border-[#E8E8E2] text-[#1A1A1A] hover:text-[#D4A853] hover:border-[#D4A853]"
          >
            {actionLabel}
          </Button>
        )}
      </Empty>
    </div>
  );
};

export default EmptyState;
