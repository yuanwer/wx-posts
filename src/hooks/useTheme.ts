import { useTheme } from '../contexts/ThemeContext';

/**
 * 使用主题的便捷Hook
 * 导出useTheme以便在组件中方便地使用
 */
export { useTheme };

/**
 * 主题选择器Hook
 * 提供主题选择的便捷方法
 */
export const useThemeSelector = () => {
  const { availableThemes, currentTheme, switchTheme } = useTheme();
  
  /**
   * 获取主题选项（用于Select组件）
   */
  const getThemeOptions = () => {
    return availableThemes.map(theme => ({
      value: theme.id,
      label: theme.name,
      description: theme.description,
      category: theme.category
    }));
  };
  
  /**
   * 根据分类获取主题
   */
  const getThemesByCategory = (category: string) => {
    return availableThemes.filter(theme => theme.category === category);
  };
  
  /**
   * 检查是否为当前主题
   */
  const isCurrentTheme = (themeId: string) => {
    return currentTheme.id === themeId;
  };
  
  /**
   * 切换到下一个主题
   */
  const switchToNextTheme = () => {
    const currentIndex = availableThemes.findIndex(t => t.id === currentTheme.id);
    const nextIndex = (currentIndex + 1) % availableThemes.length;
    switchTheme(availableThemes[nextIndex].id);
  };
  
  /**
   * 切换到上一个主题
   */
  const switchToPreviousTheme = () => {
    const currentIndex = availableThemes.findIndex(t => t.id === currentTheme.id);
    const previousIndex = currentIndex === 0 ? availableThemes.length - 1 : currentIndex - 1;
    switchTheme(availableThemes[previousIndex].id);
  };
  
  return {
    currentTheme,
    availableThemes,
    switchTheme,
    switchToNextTheme,
    switchToPreviousTheme,
    getThemeOptions,
    getThemesByCategory,
    isCurrentTheme
  };
};

/**
 * 主题样式Hook
 * 提供主题样式的便捷访问
 */
export const useThemeStyles = () => {
  const { currentTheme } = useTheme();
  
  /**
   * 获取容器样式
   */
  const getContainerStyles = () => {
    return currentTheme.styles.container;
  };
  
  /**
   * 获取标题样式
   */
  const getTitleStyles = () => {
    return currentTheme.styles.title;
  };
  
  /**
   * 获取段落样式
   */
  const getParagraphStyles = () => {
    return currentTheme.styles.paragraph;
  };
  
  /**
   * 获取小节样式
   */
  const getSectionStyles = () => {
    return currentTheme.styles.section;
  };
  
  /**
   * 获取元信息样式
   */
  const getMetaStyles = () => {
    return currentTheme.styles.meta;
  };
  
  /**
   * 获取分割线样式
   */
  const getDividerStyles = () => {
    return currentTheme.styles.dividers;
  };
  
  return {
    getContainerStyles,
    getTitleStyles,
    getParagraphStyles,
    getSectionStyles,
    getMetaStyles,
    getDividerStyles,
    theme: currentTheme
  };
};

/**
 * 主题分类Hook
 * 提供主题分类的便捷访问
 */
export const useThemeCategories = () => {
  const { availableThemes } = useTheme();
  
  /**
   * 获取所有分类
   */
  const getCategories = () => {
    const categories = [...new Set(availableThemes.map(theme => theme.category))];
    return categories;
  };
  
  /**
   * 获取分类名称
   */
  const getCategoryName = (category: string) => {
    const categoryNames: Record<string, string> = {
      official: '官方风格',
      business: '商务专业',
      warm: '温馨暖色',
      tech: '科技未来',
      literary: '文艺清新',
      youth: '活力青春'
    };
    
    return categoryNames[category] || category;
  };
  
  /**
   * 按分类分组主题
   */
  const getThemesGroupedByCategory = () => {
    const grouped: Record<string, typeof availableThemes> = {};
    
    availableThemes.forEach(theme => {
      if (!grouped[theme.category]) {
        grouped[theme.category] = [];
      }
      grouped[theme.category].push(theme);
    });
    
    return grouped;
  };
  
  return {
    getCategories,
    getCategoryName,
    getThemesGroupedByCategory
  };
};