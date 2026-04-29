import { MailOutlined } from '@ant-design/icons';
import { Form, message } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthField from '../../components/auth/AuthField';
import Button from '../../components/ui/Button';
import { StyledTextInput } from '../../components/ui/Input';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '../../validators';

// ─────────────────────────────────────────────────────────────────────────────
// FORGOT PASSWORD PAGE
// ─────────────────────────────────────────────────────────────────────────────
interface ForgotPasswordPageProps {
  onVerify?: (email: string) => Promise<void>;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onVerify }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm<ForgotPasswordFormData>();
  const [loading, setLoading] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ForgotPasswordFormData, string>>
  >({});

  const clearFieldError = (field: keyof ForgotPasswordFormData) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    form.setFields([{ name: field, errors: [] }]);
  };

  const setFieldError = (field: keyof ForgotPasswordFormData, msg: string) => {
    setErrors((prev) => ({ ...prev, [field]: msg }));
    form.setFields([{ name: field, errors: [msg] }]);
  };

  const onFinish = async (values: ForgotPasswordFormData) => {
    // 1. Run Zod validation
    const result = forgotPasswordSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const next: Partial<Record<keyof ForgotPasswordFormData, string>> = {};

      Object.entries(fieldErrors).forEach(([name, errs]) => {
        const key = name as keyof ForgotPasswordFormData;
        const msg = errs?.[0] ?? '';
        next[key] = msg;
        form.setFields([{ name: key, errors: [msg] }]);
      });

      setErrors(next);
      return;
    }

    // 2. Call the handler
    try {
      setLoading(true);
      await onVerify?.(result.data.email);
      message.success('Reset link sent! Check your inbox.');
      navigate('/login');
    } catch (err: any) {
      if (err?.response?.status === 404) {
        setFieldError('email', 'No account found with this email.');
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
            Forgot password?
          </h1>
          <p className="text-base text-[#71717A]">
            Enter your email and we'll send you a reset link.
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
          initialValues={{ email: '' }}
          onValuesChange={(changedValues) => {
            const field = Object.keys(changedValues)[0] as
              | keyof ForgotPasswordFormData
              | undefined;
            if (field) clearFieldError(field);
          }}
        >
          <div className="flex flex-col gap-5">
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

            {/* ── Verify / Send reset link ─────────────────────────────── */}
            <Button
              variant="accent"
              loading={loading}
              type="submit"
              className="w-full h-12 mt-2 rounded-xl text-base font-bold bg-[#1A1A1A] text-white hover:bg-[#333333] transition-all"
            >
              Verify email
            </Button>

            {/* ── Back to login ─────────────────────────────────────────── */}
            <p className="text-center text-sm text-[#A1A1AA]">
              <Link
                to="/auth/login"
                className="text-xs text-[#71717A] hover:text-[#1A1A1A] transition-colors duration-200"
              >
                Back to Sign in
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
