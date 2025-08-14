import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import './Select.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  /** 选项列表 */
  options: SelectOption[];
  /** 当前选中值 */
  value: string;
  /** 值变化回调 */
  onChange: (value: string) => void;
  /** 标签文本 */
  label?: string;
  /** 占位符 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否必填 */
  required?: boolean;
  /** 错误信息 */
  error?: string;
  /** 自定义类名 */
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = '请选择',
  disabled = false,
  required = false,
  error,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (optionValue: string) => {
    const option = options.find(opt => opt.value === optionValue);
    if (option && !option.disabled) {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectClass = [
    'select',
    isOpen && 'select--open',
    disabled && 'select--disabled',
    error && 'select--error',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="select-wrapper">
      {label && (
        <label className="select__label">
          {label}
          {required && <span className="select__required">*</span>}
        </label>
      )}
      
      <div ref={selectRef} className={selectClass}>
        <div className="select__trigger" onClick={handleToggle}>
          <span className={selectedOption ? 'select__value' : 'select__placeholder'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown 
            className="select__icon" 
            size={16}
          />
        </div>
        
        {isOpen && (
          <div className="select__dropdown">
            <div className="select__options">
              {options.map((option) => (
                <div
                  key={option.value}
                  className={[
                    'select__option',
                    option.value === value && 'select__option--selected',
                    option.disabled && 'select__option--disabled'
                  ].filter(Boolean).join(' ')}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <div className="select__error">{error}</div>
      )}
    </div>
  );
};

export default Select;
