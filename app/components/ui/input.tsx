'use client';
import { ReactNode, useState } from 'react';
import clsx from 'clsx';
import '../../styles/components/input.scss'

type InputProps = {
  inputType?: 'input' | 'password' | 'textarea';
  icon?: ReactNode;
  variant?: 'outline' | 'ghost';
  fieldHeight?: 'xs' | 'sm' | 'md';
  invalid?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({
  inputType = 'input',
  icon,
  variant = 'outline',
  fieldHeight = 'md',
  invalid,
  className,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={clsx(
        'input',
        `input--${variant}`,
        `input--${fieldHeight}`,
        className
      )}
      data-invalid={invalid}
    >
      {icon && <span className="input__icon">{icon}</span>}

      <input
        {...props}
        type={
          inputType === 'password'
            ? showPassword
              ? 'text'
              : 'password'
            : props.type
        }
        className="input__control"
      />

      {inputType === 'password' && (
        <button
          type="button"
          className="input__toggle"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? 'hide' : 'show' }
        </button>
      )}
    </div>
  );
};

export default Input;