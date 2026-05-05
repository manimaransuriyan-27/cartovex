import { type RegisterFormData } from '@/shared/validators';
import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

interface RegisterPageProps {
  onRegister?: (values: RegisterFormData) => Promise<void>;
}

const defaultOnRegister = async (val: RegisterFormData) => {
  console.log('Req Register ', val);
};

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister }) => (
  <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 sm:px-12 bg-white dark:bg-[#0f0f0f] transition-colors duration-500">
    <div className="w-full max-w-[420px]">
      <div className="mb-10 text-left">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
          Create an account
        </h1>
        <p className="text-base text-slate-500 dark:text-zinc-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-slate-600 dark:text-zinc-300 hover:!text-slate-600 dark:hover:!text-white transition-colors duration-200"
          >
            Sign in
          </Link>
        </p>
      </div>
      <RegisterForm onSubmit={onRegister} />
    </div>
  </div>
);

export default RegisterPage;
