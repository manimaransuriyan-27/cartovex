import { DingdingOutlined } from '@ant-design/icons';
import React from 'react';

const LeftPanel: React.FC = () => {
  return (
    <div
      className="hidden lg:flex lg:w-[45%] bg-[#1A1A1A] flex-col justify-between 
  lg:px-[clamp(1.5rem,3.5vw,5rem)] lg:py-[clamp(1.5rem,4vh,4.5rem)] 
  xl:px-[clamp(2rem,4vw,6rem)] xl:py-[clamp(1.75rem,5vh,5rem)] 
  2xl:px-[clamp(2.5rem,4.5vw,7rem)] 2xl:py-[clamp(2rem,5.5vh,5.5rem)] 
  relative overflow-hidden"
    >
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-1">
        <DingdingOutlined style={{ color: '#F53838', fontSize: 40 }} />
        <span className="text-2xl font-bold text-white tracking-tight mt-0.5">
          Cartovex
        </span>
      </div>

      {/* Quote */}
      <div className="relative z-10 flex flex-col gap-6">
        <h2 className="text-4xl font-semibold text-white leading-tight">
          Your favourite products,
          <br />
          delivered fast.
        </h2>
        <p className="text-base text-[#A1A1AA] leading-relaxed max-w-md">
          Thousands of products, exclusive deals, and a seamless shopping experience — all
          in one place.
        </p>

        {/* Stats row */}
        <div className="flex gap-10 mt-8">
          {[
            { value: '50K+', label: 'Products' },
            { value: '2M+', label: 'Customers' },
            { value: '4.9', label: 'Rating' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col gap-1">
              <p className="text-3xl font-bold text-white">{value}</p>
              <p className="text-sm font-medium text-[#71717A] tracking-wide uppercase">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom tag */}
      <p className="relative z-10 text-sm text-[#71717A] font-medium">
        © {new Date().getFullYear()} Cartovex. All rights reserved.
      </p>
    </div>
  );
};

export default LeftPanel;
