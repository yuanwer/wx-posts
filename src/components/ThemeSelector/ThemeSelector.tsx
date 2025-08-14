import React from 'react';
import { useThemeSelector } from '../../hooks/useTheme';
import Select from '../Select/Select';
import type { ThemeOption } from '../../themes/types';

/**
 * 主题选择器组件属性
 */
interface ThemeSelectorProps {
  /** 选择器标签 */
  label?: string;
  /** 占位符文本 */
  placeholder?: string;
  /** 是否必填 */
  required?: boolean;
  /** 额外的CSS类名 */
  className?: string;
  /** 主题改变时的回调 */
  onThemeChange?: (themeId: string) => void;
}

/**
 * 主题选择器组件
 */
const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  label = '文章主题',
  placeholder = '请选择文章主题',
  required = false,
  className = '',
  onThemeChange
}) => {
  const { currentTheme, getThemeOptions, switchTheme } = useThemeSelector();

  const themeOptions: ThemeOption[] = getThemeOptions();

  const handleThemeChange = (themeId: string) => {
    switchTheme(themeId);
    onThemeChange?.(themeId);
  };

  return (
    <Select
      label={label}
      options={themeOptions}
      value={currentTheme.id}
      onChange={handleThemeChange}
      placeholder={placeholder}
      required={required}
      className={`theme-selector ${className}`.trim()}
    />
  );
};

export default ThemeSelector;