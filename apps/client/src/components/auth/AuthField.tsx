interface AuthFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

const AuthField: React.FC<AuthFieldProps> = ({ label, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-[#828282]">{label}</label>
    {children}
    {error && <p className="text-xs text-[#ff7b6d] mt-0.5">{error}</p>}
  </div>
);

export default AuthField;
