import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { Form, message } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthField from '../../components/auth/AuthField';
import Button from '../../components/ui/Button';
import { StyledPasswordInput, StyledTextInput } from '../../components/ui/Input';
import type { RegisterRequest } from '../../types';
import { registerSchema, type RegisterFormData } from '../../validators';

interface RegisterPageProps {
  onRegister?: (values: RegisterRequest) => Promise<void>;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm<RegisterFormData>();
  const [loading, setLoading] = useState(false);

  // Focus states
  const [nameFocus, setNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const [confirmPassFocus, setConfirmPassFocus] = useState(false);

  // Local error state — same reactive pattern as LoginPage
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>(
    {},
  );

  const clearFieldError = (field: keyof RegisterFormData) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    form.setFields([{ name: field, errors: [] }]);
  };

  const setFieldError = (field: keyof RegisterFormData, msg: string) => {
    setErrors((prev) => ({ ...prev, [field]: msg }));
    form.setFields([{ name: field, errors: [msg] }]);
  };

  const onFinish = async (values: RegisterFormData) => {
    // 1. Run Zod validation
    const result = registerSchema.safeParse(values);

    if (!result.success) {
      // 2. Map Zod field errors into local state so the UI re-renders
      const fieldErrors = result.error.flatten().fieldErrors;
      const next: Partial<Record<keyof RegisterFormData, string>> = {};

      Object.entries(fieldErrors).forEach(([name, errs]) => {
        const key = name as keyof RegisterFormData;
        const msg = errs?.[0] ?? '';
        next[key] = msg;
        form.setFields([{ name: key, errors: [msg] }]);
      });

      setErrors(next);
      return;
    }

    // 3. Shape payload — confirmPassword is a form-only field, never sent
    const payload: RegisterRequest = {
      name: result.data.name,
      email: result.data.email,
      password: result.data.password,
    };

    // 4. Call the handler
    try {
      setLoading(true);
      await onRegister?.(payload);
      message.success('Account created! Welcome aboard.');
      navigate('/login');
    } catch (err: any) {
      if (err?.response?.status === 409) {
        setFieldError('email', 'An account with this email already exists.');
      } else {
        message.error('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 sm:px-12">
      <div className="w-full max-w-105">
        {/* ── Heading ─────────────────────────────────────────────────── */}
        <div className="mb-10 text-left">
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2 tracking-tight">
            Create an account
          </h1>
          <p className="text-base text-[#71717A]">
            Already have an account?{' '}
            <Link
              to="/auth/login"
              className="font-semibold hover:!text-[#1A1A1A] !text-[#71717A] transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* ── Form ─────────────────────────────────────────────────────── */}
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
          validateTrigger="onSubmit"
          noValidate
          initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
          onValuesChange={(changedValues) => {
            const field = Object.keys(changedValues)[0] as
              | keyof RegisterFormData
              | undefined;
            if (field) clearFieldError(field);
          }}
        >
          <div className="flex flex-col gap-5">
            {/* ── Full Name ────────────────────────────────────────────── */}
            <AuthField label="Full name" error={errors.name}>
              <Form.Item name="name" noStyle>
                <StyledTextInput
                  type="text"
                  icon={<UserOutlined />}
                  isFocused={nameFocus}
                  onFocusChange={setNameFocus}
                />
              </Form.Item>
            </AuthField>

            {/* ── Email ────────────────────────────────────────────────── */}
            <AuthField label="Email address" error={errors.email}>
              <Form.Item name="email" noStyle>
                <StyledTextInput
                  type="email"
                  icon={<MailOutlined />}
                  isFocused={emailFocus}
                  onFocusChange={setEmailFocus}
                />
              </Form.Item>
            </AuthField>

            {/* ── Password ─────────────────────────────────────────────── */}
            <AuthField label="Password" error={errors.password}>
              <Form.Item name="password" noStyle>
                <StyledPasswordInput isFocused={passFocus} onFocusChange={setPassFocus} />
              </Form.Item>
            </AuthField>

            {/* ── Confirm Password ─────────────────────────────────────── */}
            <AuthField label="Confirm password" error={errors.confirmPassword}>
              <Form.Item name="confirmPassword" noStyle>
                <StyledPasswordInput
                  isFocused={confirmPassFocus}
                  onFocusChange={setConfirmPassFocus}
                />
              </Form.Item>
            </AuthField>

            {/* ── Submit ───────────────────────────────────────────────── */}
            <Button
              variant="accent"
              loading={loading}
              type="submit"
              className="w-full h-12 mt-2 rounded-xl text-base font-bold bg-[#1A1A1A] text-white hover:bg-[#333333] transition-all"
            >
              Create account
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
