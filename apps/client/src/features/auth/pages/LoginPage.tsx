import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { LoginFormData } from '@/shared/validators';

interface LoginPageProps {
  onLogin?: (values: LoginFormData) => Promise<void>;
}

const defaultOnLogin = async (val: LoginFormData) => {
  console.log('Req login ', val);
};

const LoginPage: React.FC<LoginPageProps> = ({ onLogin = defaultOnLogin }) => (
  <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 sm:px-12 bg-white dark:bg-[#0f0f0f] transition-colors duration-500">
    <div className="w-full max-w-[420px]">
      <div className="mb-10 text-left">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
          Welcome back
        </h1>
        <p className="text-base text-slate-500 dark:text-zinc-400">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-slate-600 dark:text-zinc-300 hover:!text-slate-600 dark:hover:!text-white transition-colors duration-200"
          >
            Sign up free
          </Link>
        </p>
      </div>
      {/* <LoginForm onSubmit={onLogin} /> */}
      <LoginForm onSubmit={onLogin} />
    </div>
  </div>
);

export default LoginPage;
