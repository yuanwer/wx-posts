import type { ArticleTheme } from './types';

/**
 * 主题工具函数
 */

// 将主题配置转换为内联样式对象
export const convertThemeToInlineStyles = (theme: ArticleTheme) => {
  return {
    container: {
      padding: theme.styles.container.padding,
      fontFamily: theme.styles.container.fontFamily,
      lineHeight: theme.styles.container.lineHeight,
      color: theme.styles.container.color,
      background: theme.styles.container.background,
      position: theme.styles.container.position
    },
    
    header: {
      marginBottom: theme.styles.header.marginBottom,
      textAlign: theme.styles.header.textAlign,
      position: theme.styles.header.position,
      paddingBottom: theme.styles.header.paddingBottom,
      borderBottom: theme.styles.header.borderBottom
    },
    
    title: {
      margin: `0 0 ${theme.styles.title.marginBottom} 0`,
      fontSize: theme.styles.title.fontSize,
      fontWeight: theme.styles.title.fontWeight,
      color: theme.styles.title.color,
      lineHeight: theme.styles.title.lineHeight,
      wordBreak: 'break-word' as const,
      letterSpacing: theme.styles.title.letterSpacing || '-0.02em',
      textAlign: theme.styles.title.textAlign,
      borderBottom: theme.styles.title.borderBottom,
      paddingBottom: theme.styles.title.paddingBottom
    },
    
    meta: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: theme.styles.meta.textAlign === 'center' ? 'center' : 
                      theme.styles.meta.textAlign === 'right' ? 'flex-end' : 'flex-start',
      gap: theme.styles.meta.gap || '12px',
      fontSize: theme.styles.meta.fontSize,
      color: theme.styles.meta.color
    },
    
    content: {
      marginBottom: theme.styles.content.marginBottom
    },
    
    introductionWrapper: {
      marginBottom: theme.styles.dividers.introduction.marginBottom,
      paddingBottom: theme.styles.dividers.introduction.paddingBottom,
      borderBottom: theme.styles.dividers.introduction.borderBottom
    },
    
    section: {
      marginBottom: theme.styles.section.marginBottom,
      padding: theme.styles.section.padding,
      position: theme.styles.section.position
    },
    
    sectionTitle: {
      margin: `0 0 ${theme.styles.section.title.marginBottom} 0`,
      fontSize: theme.styles.section.title.fontSize,
      fontWeight: theme.styles.section.title.fontWeight,
      color: theme.styles.section.title.color,
      lineHeight: theme.styles.section.title.lineHeight,
      display: theme.styles.section.title.display,
      alignItems: theme.styles.section.title.alignItems
    },
    
    sectionMarker: theme.styles.section.marker ? {
      display: theme.styles.section.marker.display,
      width: theme.styles.section.marker.width,
      height: theme.styles.section.marker.height,
      backgroundColor: theme.styles.section.marker.backgroundColor,
      borderRadius: theme.styles.section.marker.borderRadius,
      marginRight: theme.styles.section.marker.marginRight,
      verticalAlign: theme.styles.section.marker.verticalAlign,
      flexShrink: theme.styles.section.marker.flexShrink
    } : undefined,
    
    sectionContent: {
      marginLeft: theme.styles.section.content.marginLeft,
      position: theme.styles.section.content.position
    },
    
    paragraph: {
      margin: `0 0 ${theme.styles.paragraph.marginBottom} 0`,
      fontSize: theme.styles.paragraph.fontSize,
      lineHeight: theme.styles.paragraph.lineHeight,
      color: theme.styles.paragraph.color,
      textAlign: theme.styles.paragraph.textAlign,
      wordBreak: theme.styles.paragraph.wordBreak,
      letterSpacing: theme.styles.paragraph.letterSpacing || '0.5px',
      textIndent: theme.styles.paragraph.textIndent
    }
  };
};

// 获取响应式样式
export const getResponsiveStyles = (theme: ArticleTheme, screenSize: 'mobile' | 'tablet' | 'desktop') => {
  if (screenSize === 'mobile' && theme.responsive?.mobile) {
    const mobileOverrides = theme.responsive.mobile;
    const baseStyles = convertThemeToInlineStyles(theme);
    
    return {
      ...baseStyles,
      title: {
        ...baseStyles.title,
        ...mobileOverrides.title
      },
      sectionTitle: {
        ...baseStyles.sectionTitle,
        fontSize: mobileOverrides.section?.title?.fontSize || baseStyles.sectionTitle.fontSize
      },
      paragraph: {
        ...baseStyles.paragraph,
        ...mobileOverrides.paragraph
      }
    };
  }
  
  return convertThemeToInlineStyles(theme);
};

// 检测屏幕尺寸
export const detectScreenSize = (): 'mobile' | 'tablet' | 'desktop' => {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  if (width <= 768) return 'mobile';
  if (width <= 1024) return 'tablet';
  return 'desktop';
};

// 主题验证函数
export const validateTheme = (theme: ArticleTheme): boolean => {
  try {
    // 检查必需的属性
    const requiredFields = ['id', 'name', 'description', 'category', 'styles'];
    const missingFields = requiredFields.filter(field => !(field in theme));
    
    if (missingFields.length > 0) {
      console.warn('主题缺少必需字段:', missingFields);
      return false;
    }
    
    // 检查样式对象
    const requiredStyleFields = ['container', 'header', 'title', 'meta', 'content', 'section', 'paragraph', 'dividers'];
    const missingStyleFields = requiredStyleFields.filter(field => !(field in theme.styles));
    
    if (missingStyleFields.length > 0) {
      console.warn('主题样式缺少必需字段:', missingStyleFields);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('主题验证失败:', error);
    return false;
  }
};

// 主题深拷贝
export const cloneTheme = (theme: ArticleTheme): ArticleTheme => {
  return JSON.parse(JSON.stringify(theme));
};

// 合并主题样式
export const mergeThemeStyles = (baseTheme: ArticleTheme, overrides: Partial<ArticleTheme['styles']>): ArticleTheme => {
  const clonedTheme = cloneTheme(baseTheme);
  
  Object.keys(overrides).forEach(key => {
    const styleKey = key as keyof ArticleTheme['styles'];
    if (overrides[styleKey]) {
      (clonedTheme.styles as any)[styleKey] = {
        ...clonedTheme.styles[styleKey],
        ...overrides[styleKey]
      };
    }
  });
  
  return clonedTheme;
};