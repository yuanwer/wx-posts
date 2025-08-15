import { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { type ArticleGenerateResponse } from '../../api/articleApi';
import { copyElementWithStyles } from '../../utils/clipboard';
import { useTheme } from '../../hooks/useTheme';
import { getThemeComponent } from './themes';
import './ArticlePreview.css';

interface ArticlePreviewProps {
  /** 文章数据 */
  article: ArticleGenerateResponse;
  /** 指定主题ID（可选） */
  themeId?: string;
  /** 复制状态变化回调 */
  onCopyStatusChange?: (status: 'idle' | 'copying' | 'success' | 'error') => void;
}

export interface ArticlePreviewRef {
  handleCopy: () => Promise<void>;
  handleDownload: () => void;
  copyStatus: 'idle' | 'copying' | 'success' | 'error';
}

const ArticlePreview = forwardRef<ArticlePreviewRef, ArticlePreviewProps>(({ article, themeId, onCopyStatusChange }, ref) => {
  const articleRef = useRef<HTMLDivElement>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copying' | 'success' | 'error'>('idle');
  const { currentTheme } = useTheme();
  
  // 使用传入的主题ID或当前主题ID
  const activeThemeId = themeId || currentTheme.id;
  
  // 获取对应的主题组件
  const ThemeComponent = getThemeComponent(activeThemeId);

  // 当复制状态改变时通知父组件
  const updateCopyStatus = (status: 'idle' | 'copying' | 'success' | 'error') => {
    setCopyStatus(status);
    onCopyStatusChange?.(status);
  };

  const handleCopy = async () => {
    if (!articleRef.current) return;

    updateCopyStatus('copying');
    
    try {
      const success = await copyElementWithStyles(articleRef.current);
      if (success) {
        updateCopyStatus('success');
        setTimeout(() => updateCopyStatus('idle'), 2000);
      } else {
        updateCopyStatus('error');
        setTimeout(() => updateCopyStatus('idle'), 2000);
      }
    } catch (error) {
      console.error('复制失败:', error);
      updateCopyStatus('error');
      setTimeout(() => updateCopyStatus('idle'), 2000);
    }
  };

  const handleDownload = () => {
    if (!articleRef.current) return;

    // 构建完整的文章内容
    let content = `${article.title}\n\n`;
    content += `${article.introduction}\n\n`;
    
    article.sections.forEach((section, index) => {
      content += `${index + 1}. ${section.title}\n\n${section.content}\n\n`;
    });
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${article.title}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useImperativeHandle(ref, () => ({
    handleCopy,
    handleDownload,
    copyStatus
  }));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="article-preview">
      <div className="article-preview__container">
        <div ref={articleRef} className="article-preview__content">
          <ThemeComponent 
            article={article} 
            formatDate={formatDate}
          />
        </div>
      </div>
    </div>
  );
});

ArticlePreview.displayName = 'ArticlePreview';

export default ArticlePreview;
