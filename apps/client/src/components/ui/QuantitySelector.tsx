import React from 'react';
import { InputNumber } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { cn } from '../../lib/utils';

export interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number | null) => void;
  size?: 'sm' | 'md';
  className?: string;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  min = 1,
  max = 99,
  onChange,
  size = 'md',
  className,
}) => {
  return (
    <InputNumber
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      // Mapping your custom 'sm'/'md' to Ant Design's 'small'/'middle'
      size={size === 'sm' ? 'small' : 'middle'}
      className={cn(
        // Custom styling to match your design
        'flex items-center text-center font-medium border-[#E8E8E2]',
        '[&_.ant-input-number-input]:text-center',
        className,
      )}
      // Using Ant Design Icons for the controls
      controls={{
        upIcon: <PlusOutlined />,
        downIcon: <MinusOutlined />,
      }}
      // Ensure the controls are always visible and styled like your design
      variant="outlined"
      style={{ width: size === 'sm' ? 100 : 120 }}
    />
  );
};

export default QuantitySelector;
