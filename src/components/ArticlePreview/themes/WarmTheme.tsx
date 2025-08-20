import React from 'react';
import { type ThemeComponentProps } from './types';
import { markdownRenderer } from '../../../utils/markdown';
import '../../../styles/markdown.css';

/**
 * 温暖主题组件（支持 Markdown）
 * 简洁而不简单的少女风格，柔美清新，适合生活分享类内容
 */
const WarmTheme: React.FC<ThemeComponentProps> = ({ article, formatDate }) => {
  const htmlContent = markdownRenderer.render(article.content);
  return (
    <article
      className="article-theme-warm"
      style={{
        background: 'linear-gradient(135deg, #ffeef8 0%, #ffe0f0 50%, #ffd4e8 100%)',
        padding: '24px',
        fontFamily: '"Inter", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
        lineHeight: 1.7,
        color: '#5d4e75',
        position: 'relative',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(255, 182, 193, 0.15)'
      }}
    >
      <header
        style={{
          marginBottom: '32px',
          textAlign: 'center',
          position: 'relative',
          paddingBottom: '20px'
        }}
      >
        <h1
          style={{
            margin: '0 0 16px 0',
            fontSize: '26px',
            fontWeight: 600,
            color: '#8b5a8c',
            lineHeight: 1.3,
            wordBreak: 'break-word',
            letterSpacing: '-0.01em',
            textAlign: 'center',
            position: 'relative'
          }}
        >
          {article.title}
        </h1>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            fontSize: '13px',
            color: '#a08ca8',
            background: 'rgba(255,255,255,0.6)',
            padding: '6px 12px',
            borderRadius: '12px'
          }}
        >
          <span style={{ fontSize: '16px' }}>✧</span>
          <time>{formatDate(article.createdAt)}</time>
          <span style={{ fontSize: '16px' }}>✧</span>
        </div>
      </header>

      <div 
        className="markdown-content"
        style={{ marginBottom: '32px' }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
};

export default WarmTheme;