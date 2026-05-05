import ForgotPasswordForm from '@/features/auth/components/ForgotPasswordForm';
import { type ForgotPasswordFormData } from '@/shared/validators';
import React from 'react';

interface ForgotPasswordPageProps {
  onForgotPassword?: (values: ForgotPasswordFormData) => Promise<void>;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onForgotPassword }) => (
  <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 sm:px-12 bg-white dark:bg-[#0f0f0f] transition-colors duration-500">
    <div className="w-full max-w-[420px]">
      <div className="mb-10 text-left">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
          Forgot password?
        </h1>
        <p className="text-base text-slate-500 dark:text-zinc-400">
          Enter your email and we'll send you a reset link.
        </p>
      </div>
      <ForgotPasswordForm onSubmit={onForgotPassword} />
    </div>
  </div>
);

export default ForgotPasswordPage;
