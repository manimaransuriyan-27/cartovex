import { MailOutlined } from '@ant-design/icons';
import { Form, message } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthField from '../../components/auth/AuthField';
import Button from '../../components/ui/Button';
import { StyledPasswordInput, StyledTextInput } from '../../components/ui/Input';
import { loginSchema, type LoginFormData } from '../../validators';

interface LoginPageProps {
  onLogin?: (values: LoginFormData) => Promise<void>;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm<LoginFormData>();
  const [loading, setLoading] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});

  const setFieldError = (field: keyof LoginFormData, message: string) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
    form.setFields([{ name: field, errors: [message] }]);
  };

  const clearFieldError = (field: keyof LoginFormData) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    form.setFields([{ name: field, errors: [] }]);
  };

  const onFinish = async (values: LoginFormData) => {
    // 1. Run Zod validation
    const result = loginSchema.safeParse(values);

    if (!result.success) {
      // 2. Map Zod field errors into local state so the UI re-renders
      const fieldErrors = result.error.flatten().fieldErrors;
      const next: Partial<Record<keyof LoginFormData, string>> = {};

      Object.entries(fieldErrors).forEach(([name, errs]) => {
        const key = name as keyof LoginFormData;
        const message = errs?.[0] ?? '';
        next[key] = message;
        form.setFields([{ name: key, errors: [message] }]);
      });

      setErrors(next);
      return;
    }

    // 3. All valid — call the handler
    try {
      setLoading(true);
      await onLogin?.(result.data);
      message.success('Welcome back!');
      console.log('Res ', result, ': ', values);
      // navigate('/dashboard');
    } catch {
      // Surface API-level credential errors back to the password field
      //   setFieldError('password', 'Invalid email or password');
      message.error('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 sm:px-12">
      <div className="w-full max-w-105">
        <div className="mb-10 text-left">
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2 tracking-tight">
            Welcome back
          </h1>
          <p className="text-base text-[#71717A]">
            Don't have an account?{' '}
            <Link
              to="/auth/register"
              className="font-semibold hover:!text-[#1A1A1A] !text-[#71717A] transition-colors duration-200"
            >
              Sign up free
            </Link>
          </p>
        </div>

        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
          validateTrigger="onSubmit"
          noValidate
          initialValues={{ email: '', password: '' }}
          onValuesChange={(changedValues) => {
            const field = Object.keys(changedValues)[0] as
              | keyof LoginFormData
              | undefined;
            if (field) clearFieldError(field);
          }}
        >
          <div className="flex flex-col gap-5">
            {/* ── Email ───────────────────────────────────────────────── */}
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

            {/* ── Submit ───────────────────────────────────────────────── */}
            <Button
              variant="accent"
              loading={loading}
              type="submit"
              className="w-full h-12 mt-2 rounded-xl text-base font-bold bg-[#1A1A1A] text-white hover:bg-[#333333] transition-all"
            >
              Sign in
            </Button>

            {/* ── Forgot password — centered below the button, muted tone ── */}
            <p className="text-center text-sm text-[#A1A1AA]">
              <Link
                to="/auth/forgot-password"
                className="text-xs text-[#71717A] hover:text-[#1A1A1A] transition-colors duration-200"
              >
                Forgot Password?
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
