import { wechatOfficialTheme } from './wechat';
import { businessTheme } from './business';
import { warmTheme } from './warm';
import { techTheme } from './tech';
import type { ArticleTheme } from '../types';

/**
 * 所有预设主题
 */
export const presetThemes: ArticleTheme[] = [
  wechatOfficialTheme,
  businessTheme,
  warmTheme,
  techTheme
];

/**
 * 默认主题（微信官方）
 */
export const defaultTheme = wechatOfficialTheme;

/**
 * 根据 ID 获取主题
 */
export const getThemeById = (id: string): ArticleTheme | undefined => {
  return presetThemes.find(theme => theme.id === id);
};

/**
 * 根据分类获取主题
 */
export const getThemesByCategory = (category: string) => {
  return presetThemes.filter(theme => theme.category === category);
};

/**
 * 获取主题选项（用于 Select 组件）
 */
export const getThemeOptions = () => {
  return presetThemes.map(theme => ({
    value: theme.id,
    label: theme.name,
    description: theme.description,
    category: theme.category
  }));
};

// 导出所有主题
export {
  wechatOfficialTheme,
  businessTheme,
  warmTheme,
  techTheme
};

// 导出类型
export type { ArticleTheme } from '../types';