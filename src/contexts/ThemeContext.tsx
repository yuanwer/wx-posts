import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { ArticleTheme, ThemeContextType } from '../themes/types';
import { presetThemes, defaultTheme } from '../themes/presets';

/**
 * 主题上下文
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * 主题提供者组件属性
 */
interface ThemeProviderProps {
  children: ReactNode;
  initialThemeId?: string;
}

/**
 * 主题提供者组件
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  initialThemeId 
}) => {
  // 从localStorage获取保存的主题，或使用默认主题
  const getSavedTheme = (): ArticleTheme => {
    if (initialThemeId) {
      const theme = presetThemes.find(t => t.id === initialThemeId);
      if (theme) return theme;
    }
    
    try {
      const savedThemeId = localStorage.getItem('wx-posts-theme');
      if (savedThemeId) {
        const theme = presetThemes.find(t => t.id === savedThemeId);
        if (theme) return theme;
      }
    } catch (error) {
      console.warn('无法从localStorage读取主题设置:', error);
    }
    
    return defaultTheme;
  };

  const [currentTheme, setCurrentTheme] = useState<ArticleTheme>(getSavedTheme);

  /**
   * 切换主题
   */
  const switchTheme = (themeId: string) => {
    const theme = presetThemes.find(t => t.id === themeId);
    if (!theme) {
      console.warn(`主题 ${themeId} 不存在`);
      return;
    }

    setCurrentTheme(theme);
    
    // 保存到localStorage
    try {
      localStorage.setItem('wx-posts-theme', themeId);
    } catch (error) {
      console.warn('无法保存主题设置到localStorage:', error);
    }
  };

  // 监听主题变化，添加调试信息
  useEffect(() => {
    console.log('当前主题已切换至:', currentTheme.name);
  }, [currentTheme]);

  const contextValue: ThemeContextType = {
    currentTheme,
    availableThemes: presetThemes,
    switchTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * 使用主题的Hook
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme 必须在 ThemeProvider 内部使用');
  }
  
  return context;
};

/**
 * 高阶组件：为组件注入主题
 */
export function withTheme<P extends object>(
  Component: React.ComponentType<P & { theme: ArticleTheme }>
) {
  const WithThemeComponent = (props: P) => {
    const { currentTheme } = useTheme();
    return <Component {...props} theme={currentTheme} />;
  };
  
  WithThemeComponent.displayName = `withTheme(${Component.displayName || Component.name})`;
  
  return WithThemeComponent;
}

/**
 * 主题选择器Hook
 * 提供主题选择的便捷方法
 */
export const useThemeSelector = () => {
  const { availableThemes, currentTheme, switchTheme } = useTheme();
  
  const getThemeOptions = () => {
    return availableThemes.map(theme => ({
      value: theme.id,
      label: theme.name,
      description: theme.description,
      category: theme.category
    }));
  };
  
  const getThemesByCategory = (category: string) => {
    return availableThemes.filter(theme => theme.category === category);
  };
  
  const isCurrentTheme = (themeId: string) => {
    return currentTheme.id === themeId;
  };
  
  return {
    currentTheme,
    availableThemes,
    switchTheme,
    getThemeOptions,
    getThemesByCategory,
    isCurrentTheme
  };
};

export default ThemeContext;