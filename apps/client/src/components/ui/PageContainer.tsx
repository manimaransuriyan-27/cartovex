import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const containerVariants = cva('mx-auto w-full px-6', {
  variants: {
    maxWidth: {
      sm: 'max-w-2xl',
      md: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      full: 'max-w-full',
    },
  },
  defaultVariants: { maxWidth: 'xl' },
});

export interface PageContainerProps extends VariantProps<typeof containerVariants> {
  children: React.ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  maxWidth,
  className,
}) => <div className={cn(containerVariants({ maxWidth }), className)}>{children}</div>;

export default PageContainer;
