import React from 'react';
import { type ThemeComponentProps } from './types';
import { markdownRenderer } from '../../../utils/markdown';
import '../../../styles/markdown.css';

/**
 * 商务主题组件（支持 Markdown）
 * 专业严谨，深蓝配色，适合商务场景
 */
const BusinessTheme: React.FC<ThemeComponentProps> = ({ article, formatDate }) => {
  const htmlContent = markdownRenderer.render(article.content);
  return (
    <article
      className="article-theme-business"
      style={{
        background: '#ffffff',
        padding: '40px 32px',
        fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, "PingFang SC", sans-serif',
        lineHeight: 1.65,
        color: '#2c3e50',
        position: 'relative',
        borderLeft: '4px solid #1a365d',
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.05)'
      }}
    >
      <header
        style={{
          marginBottom: '48px',
          textAlign: 'left',
          position: 'relative',
          paddingBottom: '24px',
          borderBottom: '1px solid #e5e5e5'
        }}
      >
        <h1
          style={{
            margin: '0 0 24px 0',
            fontSize: '28px',
            fontWeight: 700,
            color: '#1a365d',
            lineHeight: 1.3,
            wordBreak: 'break-word',
            letterSpacing: '-0.02em',
            textAlign: 'left'
          }}
        >
          {article.title}
        </h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '16px',
            fontSize: '14px',
            color: '#718096',
            fontWeight: 400
          }}
        >
          <time>{formatDate(article.createdAt)}</time>
        </div>
      </header>

      <div 
        className="markdown-content"
        style={{ marginBottom: '48px' }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
};

export default BusinessTheme;