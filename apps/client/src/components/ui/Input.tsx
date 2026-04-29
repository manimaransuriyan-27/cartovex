import { LockOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { cva } from 'class-variance-authority';

interface StyledTextInputProps {
  type?: string;
  icon: React.ReactNode;
  isFocused?: boolean;
  onFocusChange: (focused: boolean) => void;
  // Injected automatically by Ant Design Form.Item — do not pass manually
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const inputWrapCva = cva([
  'flex items-center gap-3 px-4 h-12 w-full',
  'border rounded-xl transition-all duration-300 ease-in-out',
  'text-base',
]);

const StyledTextInput: React.FC<StyledTextInputProps> = ({
  type = 'text',
  icon,
  isFocused = false,
  onFocusChange,
  value,
  onChange,
}) => (
  <div
    className={cn(
      inputWrapCva(),
      isFocused
        ? 'border-[#D9D9D9] bg-white shadow-[0_0_0_4px_rgba(26,26,26,0.06)]'
        : 'border-[#E8E8E2] bg-[#FAFAFA] hover:border-[#D0D0C8]',
    )}
  >
    <span style={{ fontSize: 16, color: isFocused ? '#A1A1AA' : '#D9D9D9' }}>{icon}</span>
    <input
      type={type}
      value={value ?? ''}
      onChange={onChange}
      onFocus={() => onFocusChange(true)}
      onBlur={() => onFocusChange(false)}
      className="flex-1 bg-transparent border-none outline-none text-[#1A1A1A]"
    />
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// StyledPasswordInput
// Extract to: components/ui/StyledPasswordInput.tsx
// Re-use in: LoginPage, RegisterPage (password + confirmPassword)
//
// NOTE: Same Form.Item binding fix as StyledTextInput. The show/hide toggle
// state is encapsulated here so callers don't need to manage it.
// ─────────────────────────────────────────────────────────────────────────────
interface StyledPasswordInputProps {
  isFocused: boolean;
  onFocusChange: (focused: boolean) => void;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledPasswordInput: React.FC<StyledPasswordInputProps> = ({
  isFocused,
  onFocusChange,
  value,
  onChange,
}) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <div
      className={cn(
        inputWrapCva(),
        isFocused
          ? 'border-[#D9D9D9] bg-white shadow-[0_0_0_4px_rgba(26,26,26,0.06)]'
          : 'border-[#E8E8E2] bg-[#FAFAFA] hover:border-[#D0D0C8]',
      )}
    >
      <LockOutlined style={{ fontSize: 16, color: isFocused ? '#A1A1AA' : '#D9D9D9' }} />
      <input
        type={showPass ? 'text' : 'password'}
        value={value ?? ''}
        onChange={onChange}
        onFocus={() => onFocusChange(true)}
        onBlur={() => onFocusChange(false)}
        className="flex-1 bg-transparent border-none outline-none text-[#1A1A1A] tracking-widest"
      />
      <button
        type="button"
        onClick={() => setShowPass((p) => !p)}
        className="text-[#A1A1AA] hover:text-[#1A1A1A] transition-colors"
      >
        {showPass ? (
          <EyeInvisibleOutlined
            style={{ fontSize: 16, color: isFocused ? '#A1A1AA' : '#D9D9D9' }}
          />
        ) : (
          <EyeOutlined
            style={{ fontSize: 16, color: isFocused ? '#A1A1AA' : '#D9D9D9' }}
          />
        )}
      </button>
    </div>
  );
};

export { StyledTextInput, StyledPasswordInput };
