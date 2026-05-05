import React, { memo } from 'react';

interface AuthFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  htmlFor?: string;
}

/**
 * AuthField — label + input slot + inline error message.
 *
 * Separating this from the form keeps error rendering DRY
 * and lets the input component stay unaware of validation UI.
 */
const AuthField: React.FC<AuthFieldProps> = ({ label, error, children, htmlFor }) => (
  <div className="flex flex-col gap-1.5">
    <label
      htmlFor={htmlFor}
      className="text-sm font-normal text-slate-400 dark:text-zinc-500"
    >
      {label}
    </label>

    {children}

    {/* Animate error in — height transition keeps layout stable */}
    <div
      className={`overflow-hidden transition-all duration-200 ${
        error ? 'max-h-8 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <p className="text-xs text-red-400 mt-0.5">{error}</p>
    </div>
  </div>
);

export default memo(AuthField);
