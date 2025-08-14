import React from 'react';
import './Input.css';

export interface InputProps {
  /** 输入框类型 */
  type?: 'text' | 'textarea' | 'number' | 'email' | 'password';
  /** 标签文本 */
  label?: string;
  /** 占位符 */
  placeholder?: string;
  /** 输入值 */
  value: string;
  /** 值变化回调 */
  onChange: (value: string) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否必填 */
  required?: boolean;
  /** 错误信息 */
  error?: string;
  /** 帮助文本 */
  help?: string;
  /** 最大长度 */
  maxLength?: number;
  /** 最小值（数字输入） */
  min?: number;
  /** 最大值（数字输入） */
  max?: number;
  /** 行数（文本域） */
  rows?: number;
  /** 自定义类名 */
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  error,
  help,
  maxLength,
  min,
  max,
  rows = 4,
  className = ''
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const inputClass = [
    'input__field',
    error && 'input__field--error',
    disabled && 'input__field--disabled',
    className
  ].filter(Boolean).join(' ');

  const renderInput = () => {
    const commonProps = {
      className: inputClass,
      placeholder,
      value,
      onChange: handleChange,
      disabled,
      required,
      maxLength
    };

    if (type === 'textarea') {
      return (
        <textarea
          {...commonProps}
          rows={rows}
        />
      );
    }

    return (
      <input
        {...commonProps}
        type={type}
        min={min}
        max={max}
      />
    );
  };

  return (
    <div className="input">
      {label && (
        <label className="input__label">
          {label}
          {required && <span className="input__required">*</span>}
        </label>
      )}
      
      <div className="input__wrapper">
        {renderInput()}
        {maxLength && (
          <div className="input__counter">
            {value.length}/{maxLength}
          </div>
        )}
      </div>
      
      {error && (
        <div className="input__error">{error}</div>
      )}
      
      {help && !error && (
        <div className="input__help">{help}</div>
      )}
    </div>
  );
};

export default Input;
