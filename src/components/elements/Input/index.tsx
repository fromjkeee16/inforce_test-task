import React from 'react';
import type { UseFormRegister, RegisterOptions } from 'react-hook-form';
import styles from './index.module.scss';

interface TextInputProps {
  name: string;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  validation?: RegisterOptions;
  placeholder?: string;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  register,
  validation,
  placeholder,
  error,
}) => {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={name}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        {...register(name, validation)}
        placeholder={placeholder}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default TextInput;
