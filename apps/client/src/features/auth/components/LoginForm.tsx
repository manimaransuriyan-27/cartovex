import { Button, Input, PasswordInput } from '@/shared/components';
import { loginSchema, type LoginFormData } from '@/shared/validators';
import { MailOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AuthField from './AuthField';
import { useTheme } from '@/app/context';

interface LoginFormProps {
  /** Called after successful schema validation. Throw to surface an error toast. */
  onSubmit?: (values: LoginFormData) => Promise<void>;
}

/**
 * LoginForm — owns the form state, validation, and submission.
 *
 * React Hook Form + Zod replaces Ant Design Form entirely.
 * The component is self-contained: no parent needs to wire up
 * any state or handlers beyond the optional onSubmit callback.
 */
const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const emailId = useId();
  const passwordId = useId();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit', // validate on submit
    reValidateMode: 'onChange', // re-validate live after first submit attempt
  });

  const onValid = async (values: LoginFormData) => {
    if (!onSubmit) return;
    try {
      setLoading(true);
      await onSubmit(values);
    } finally {
      setLoading(false);
    }
  };

  const { toggleTheme } = useTheme();

  return (
    <>
      {/* <div>
    <button onClick={toggleTheme}>Theme</button>
  </div> */}
      <form onSubmit={handleSubmit(onValid)} noValidate>
        <div className="flex flex-col gap-5">
          {/* ── Email ── */}
          <AuthField
            label="Email address"
            error={errors.email?.message}
            htmlFor={emailId}
          >
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

          {/* ── Password ── */}
          <AuthField
            label="Password"
            error={errors.password?.message}
            htmlFor={passwordId}
          >
            <PasswordInput
              id={passwordId}
              hasError={!!errors.password}
              placeholder="••••••••"
              autoComplete="current-password"
              {...register('password')}
            />
          </AuthField>

          {/* ── Submit ── */}
          <Button
            variant="secondary"
            loading={loading}
            type="submit"
            className="w-full h-12 mt-3 rounded-xl text-base font-semibold transition-all duration-300 !text-slate-500 hover:!text-slate-700 dark:hover:!text-white"
          >
            Sign in
          </Button>

          <p className="text-center">
            <Link
              to="/forgot-password"
              className="text-xs !text-slate-400 dark:!text-zinc-500 hover:!text-slate-900 dark:hover:!text-white transition-colors duration-200"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
