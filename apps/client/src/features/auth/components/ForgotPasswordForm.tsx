import { Button, Input } from '@/shared/components';
import { type ForgotPasswordFormData, forgotPasswordSchema } from '@/shared/validators';
import { MailOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AuthField from './AuthField';

interface ForgotPasswordFormProps {
  /** Resolve normally on success, throw to surface an error. */
  onSubmit?: (values: ForgotPasswordFormData) => Promise<void>;
}

/**
 * ForgotPasswordForm
 *
 * Two visual states:
 *   1. "request" — email input + submit button
 *   2. "sent"    — confirmation message (no sensitive info)
 *
 * The parent controls the actual API call via onSubmit.
 * This component only manages local loading + state transition.
 */
const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSubmit }) => {
  const emailId = useId();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onValid = async (values: ForgotPasswordFormData) => {
    try {
      setLoading(true);
      await onSubmit?.(values);
      setSubmittedEmail(values.email);
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  /* ── Success state ── */
  if (sent) {
    return (
      <div className="flex flex-col gap-6">
        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center">
          <MailOutlined className="text-xl text-slate-500 dark:text-zinc-400" />
        </div>

        <div>
          <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
            We sent a password reset link to{' '}
            <span className="font-semibold text-slate-900 dark:text-white">
              {submittedEmail}
            </span>
            . Check your inbox and follow the instructions.
          </p>
          <p className="text-xs text-slate-400 dark:text-zinc-500 mt-2">
            Didn't receive it? Check your spam folder or{' '}
            <button
              type="button"
              onClick={() => setSent(false)}
              className="underline underline-offset-2 hover:text-slate-700 dark:hover:text-zinc-200 transition-colors duration-150"
            >
              try again
            </button>
            .
          </p>
        </div>

        <Link
          to="/auth/login"
          className="text-sm font-semibold text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
        >
          ← Back to sign in
        </Link>
      </div>
    );
  }

  /* ── Request state ── */
  return (
    <form onSubmit={handleSubmit(onValid)} noValidate>
      <div className="flex flex-col gap-5">
        <AuthField label="Email address" error={errors.email?.message} htmlFor={emailId}>
          <Input
            id={emailId}
            type="email"
            prefix={<MailOutlined />}
            hasError={!!errors.email}
            placeholder="you@example.com"
            autoComplete="email"
            {...register('email')}
          />
        </AuthField>

        <Button
          variant="secondary"
          loading={loading}
          type="submit"
          className="w-full h-12 mt-1 rounded-xl text-base font-semibold transition-all duration-300 !text-slate-500 hover:!text-slate-700 dark:hover:!text-white"
        >
          Send reset link
        </Button>

        <p className="text-center text-sm">
          <Link
            to="/login"
            className="text-xs  !text-slate-400 dark:!text-zinc-500 hover:!text-slate-900 dark:hover:!text-white transition-colors duration-200"
          >
            Back to Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
