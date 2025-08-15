import { type ArticleGenerateResponse } from '../../../api/articleApi';

/**
 * 主题组件通用接口
 */
export interface ThemeComponentProps {
  /** 文章数据 */
  article: ArticleGenerateResponse;
  /** 日期格式化函数 */
  formatDate: (dateString: string) => string;
}

/**
 * 主题组件类型
 */
export type ThemeComponent = React.FC<ThemeComponentProps>;