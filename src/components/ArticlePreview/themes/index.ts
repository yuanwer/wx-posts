import WeChatOfficialTheme from './WeChatOfficialTheme';
import BusinessTheme from './BusinessTheme';
import WarmTheme from './WarmTheme';
import TechTheme from './TechTheme';
import { type ThemeComponent } from './types';

/**
 * 主题组件注册表
 * 根据主题 ID 映射到对应的组件
 */
export const themeComponents: Record<string, ThemeComponent> = {
  'wechat-official': WeChatOfficialTheme,
  'business': BusinessTheme,
  'warm': WarmTheme,
  'tech': TechTheme
};

/**
 * 获取主题组件
 * @param themeId 主题 ID
 * @returns 主题组件，如果不存在则返回默认主题
 */
export const getThemeComponent = (themeId: string): ThemeComponent => {
  return themeComponents[themeId] || WeChatOfficialTheme;
};

/**
 * 获取所有可用的主题 ID
 */
export const getAvailableThemeIds = (): string[] => {
  return Object.keys(themeComponents);
};

// 导出所有主题组件
export {
  WeChatOfficialTheme,
  BusinessTheme,
  WarmTheme,
  TechTheme
};

// 导出类型
export type { ThemeComponent, ThemeComponentProps } from './types';