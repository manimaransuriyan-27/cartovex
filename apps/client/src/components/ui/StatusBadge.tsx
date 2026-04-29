import React from 'react';
import { Tag } from 'antd';
import {
  ClockCircleOutlined,
  SettingOutlined,
  TruckOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import type { BadgeStatus } from '../../types';
import { cn } from '../../lib/utils';

/**
 * Map our status to Ant Design's preset colors and icons
 * Ant Design Tag "color" prop supports: success, processing, error, default, warning
 */
const STATUS_CONFIG: Record<
  BadgeStatus,
  { color: string; icon: React.ReactNode; label: string }
> = {
  pending: {
    color: 'warning',
    icon: <ClockCircleOutlined />,
    label: 'Pending',
  },
  processing: {
    color: 'processing',
    icon: <SettingOutlined spin />, // Added spin for a "processing" feel
    label: 'Processing',
  },
  shipped: {
    color: 'cyan',
    icon: <TruckOutlined />,
    label: 'Shipped',
  },
  delivered: {
    color: 'success',
    icon: <CheckCircleOutlined />,
    label: 'Delivered',
  },
  cancelled: {
    color: 'error',
    icon: <CloseCircleOutlined />,
    label: 'Cancelled',
  },
};

export interface StatusBadgeProps {
  status: BadgeStatus;
  showIcon?: boolean;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  showIcon = true,
  className,
}) => {
  const { color, icon, label } = STATUS_CONFIG[status];

  return (
    <Tag
      color={color}
      icon={showIcon ? icon : null}
      className={cn(
        'm-0 flex w-fit items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium border-none',
        className,
      )}
    >
      {label}
    </Tag>
  );
};

export default StatusBadge;
