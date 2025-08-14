/**
 * 主题系统类型定义
 */

// 基础样式类型
export interface BaseStyles {
  fontSize: string;
  fontWeight: string | number;
  color: string;
  lineHeight: string | number;
  marginBottom?: string;
  letterSpacing?: string;
}

// 容器样式
export interface ContainerStyles {
  background: string;
  padding: string;
  fontFamily: string;
  lineHeight: string | number;
  color: string;
  position: 'relative' | 'static' | 'absolute' | 'fixed';
}

// 标题样式
export interface TitleStyles extends BaseStyles {
  textAlign: 'left' | 'center' | 'right';
  borderBottom?: string;
  paddingBottom?: string;
}

// 元信息样式（时间等）
export interface MetaStyles {
  fontSize: string;
  color: string;
  textAlign: 'left' | 'center' | 'right';
  gap?: string;
}

// 标题头部样式
export interface HeaderStyles {
  marginBottom: string;
  textAlign: 'left' | 'center' | 'right';
  position: 'relative' | 'static';
  paddingBottom: string;
  borderBottom: string;
}

// 内容区域样式
export interface ContentStyles {
  marginBottom: string;
}

// 小节样式
export interface SectionStyles {
  marginBottom: string;
  padding: string;
  position: 'relative' | 'static';
  title: {
    fontSize: string;
    fontWeight: string | number;
    color: string;
    lineHeight: string | number;
    marginBottom: string;
    display: string;
    alignItems: string;
  };
  content: {
    marginLeft: string;
    position: 'relative' | 'static';
  };
  marker?: {
    display: string;
    width: string;
    height: string;
    backgroundColor: string;
    borderRadius: string;
    marginRight: string;
    verticalAlign: string;
    flexShrink: number;
  };
}

// 段落样式
export interface ParagraphStyles extends BaseStyles {
  textAlign: 'left' | 'center' | 'right';
  wordBreak: 'normal' | 'break-all' | 'break-word';
  textIndent?: string;
}

// 分割线样式
export interface DividerStyles {
  introduction: {
    marginBottom: string;
    paddingBottom: string;
    borderBottom: string;
  };
}

// 主题分类
export type ThemeCategory = 'official' | 'business' | 'warm' | 'tech' | 'literary' | 'youth';

// 文章主题接口
export interface ArticleTheme {
  id: string;
  name: string;
  description: string;
  category: ThemeCategory;
  
  styles: {
    container: ContainerStyles;
    header: HeaderStyles;
    title: TitleStyles;
    meta: MetaStyles;
    content: ContentStyles;
    section: SectionStyles;
    paragraph: ParagraphStyles;
    dividers: DividerStyles;
  };
  
  // 响应式配置
  responsive?: {
    mobile: {
      title?: Partial<TitleStyles>;
      section?: Partial<SectionStyles>;
      paragraph?: Partial<ParagraphStyles>;
    };
  };
}

// 主题上下文类型
export interface ThemeContextType {
  currentTheme: ArticleTheme;
  availableThemes: ArticleTheme[];
  switchTheme: (themeId: string) => void;
}

// 主题选择器选项类型
export interface ThemeOption {
  value: string;
  label: string;
  description: string;
  category: ThemeCategory;
}