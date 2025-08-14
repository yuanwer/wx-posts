import { useRef, useState, useImperativeHandle, forwardRef, useMemo } from 'react';
import { type ArticleGenerateResponse } from '../../api/articleApi';
import { copyElementWithStyles } from '../../utils/clipboard';
import { useTheme } from '../../hooks/useTheme';
import { convertThemeToInlineStyles } from '../../themes/utils';
import type { ArticleTheme } from '../../themes/types';
import './ArticlePreview.css';

interface ArticlePreviewProps {
  /** 文章数据 */
  article: ArticleGenerateResponse;
  /** 指定主题（可选） */
  theme?: ArticleTheme;
}

export interface ArticlePreviewRef {
  handleCopy: () => Promise<void>;
  handleDownload: () => void;
  copyStatus: 'idle' | 'copying' | 'success' | 'error';
}

const ArticlePreview = forwardRef<ArticlePreviewRef, ArticlePreviewProps>(({ article, theme }, ref) => {
  const articleRef = useRef<HTMLDivElement>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copying' | 'success' | 'error'>('idle');
  const { currentTheme } = useTheme();
  
  // 使用传入的主题或当前主题
  const activeTheme = theme || currentTheme;
  
  // 将主题配置转换为内联样式
  const styles = useMemo(() =>
    convertThemeToInlineStyles(activeTheme),
    [activeTheme]
  );

  const handleCopy = async () => {
    if (!articleRef.current) return;

    setCopyStatus('copying');
    
    try {
      const success = await copyElementWithStyles(articleRef.current);
      if (success) {
        setCopyStatus('success');
        setTimeout(() => setCopyStatus('idle'), 2000);
      } else {
        setCopyStatus('error');
        setTimeout(() => setCopyStatus('idle'), 2000);
      }
    } catch (error) {
      console.error('复制失败:', error);
      setCopyStatus('error');
      setTimeout(() => setCopyStatus('idle'), 2000);
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
          <article style={styles.container}>
            <header style={styles.header}>
              <h1 style={styles.title}>{article.title}</h1>
              <div style={styles.meta}>
                <time>
                  {formatDate(article.createdAt)}
                </time>
              </div>
            </header>

            <div style={styles.content}>
              {/* 引言 */}
              <div style={styles.introductionWrapper}>
                {article.introduction.split('\n\n').map((paragraph, index) => (
                  <p key={`intro-${index}`} style={styles.paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* 小节列表 */}
              {article.sections.map((section, sectionIndex) => (
                <div key={`section-${sectionIndex}`} style={styles.section}>
                  <h2 style={styles.sectionTitle}>
                    {styles.sectionMarker && (
                      <span style={styles.sectionMarker}></span>
                    )}
                    {sectionIndex + 1}. {section.title}
                  </h2>
                  <div style={styles.sectionContent}>
                    {section.content.split('\n\n').map((paragraph, paragraphIndex) => (
                      <p key={`section-${sectionIndex}-para-${paragraphIndex}`} style={styles.paragraph}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

            </div>
          </article>
        </div>
      </div>
    </div>
  );
});

ArticlePreview.displayName = 'ArticlePreview';

export default ArticlePreview;
