import { Button, Input, PasswordInput } from '@/shared/components';
import { type RegisterFormData, registerSchema } from '@/shared/validators';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthField from './AuthField';

interface RegisterFormProps {
  onSubmit?: (values: RegisterFormData) => Promise<void>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onValid = async (values: RegisterFormData) => {
    if (!onSubmit) return;
    try {
      setLoading(true);
      await onSubmit(values);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onValid)} noValidate>
      <div className="flex flex-col gap-5">
        {/* ── Full Name ── */}
        <AuthField label="Full name" error={errors.name?.message} htmlFor={nameId}>
          <Input
            id={nameId}
            type="text"
            prefix={<UserOutlined />}
            hasError={!!errors.name}
            placeholder="John Doe"
            autoComplete="name"
            {...register('name')}
          />
        </AuthField>

        {/* ── Email ── */}
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

        {/* ── Password ── */}
        <AuthField label="Password" error={errors.password?.message} htmlFor={passwordId}>
          <PasswordInput
            id={passwordId}
            hasError={!!errors.password}
            placeholder="Min. 8 characters"
            autoComplete="new-password"
            {...register('password')}
          />
        </AuthField>

        {/* ── Confirm Password ── */}
        <AuthField
          label="Confirm password"
          error={errors.confirmPassword?.message}
          htmlFor={confirmPasswordId}
        >
          <PasswordInput
            id={confirmPasswordId}
            hasError={!!errors.confirmPassword}
            placeholder="Repeat your password"
            autoComplete="new-password"
            {...register('confirmPassword')}
          />
        </AuthField>

        {/* ── Submit ── */}
        <Button
          variant="secondary"
          loading={loading}
          type="submit"
          className="w-full h-12 mt-3 rounded-xl text-base font-semibold transition-all duration-300 !text-slate-500 hover:!text-slate-700 dark:hover:!text-white"
        >
          Create account
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
