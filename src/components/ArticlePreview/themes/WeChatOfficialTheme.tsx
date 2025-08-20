import React from 'react';
import { type ThemeComponentProps } from './types';
import { markdownRenderer } from '../../../utils/markdown';
import '../../../styles/markdown.css';

/**
 * 微信官方主题组件（支持 Markdown）
 * 简洁清爽，绿色强调，符合微信公众号阅读习惯
 */
const WeChatOfficialTheme: React.FC<ThemeComponentProps> = ({ article, formatDate }) => {
  const htmlContent = markdownRenderer.render(article.content);

  return (
    <article
      className="article-theme-wechat-official"
      style={{
        background: '#ffffff',
        padding: '16px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',
        lineHeight: 1.8,
        color: '#2c3e50',
        position: 'relative'
      }}
    >
      <header
        style={{
          marginBottom: '24px',
          textAlign: 'center',
          position: 'relative',
          paddingBottom: '16px',
          borderBottom: '1px solid #e7e7e7'
        }}
      >
        <h1
          style={{
            margin: '0 0 16px 0',
            fontSize: '24px',
            fontWeight: 700,
            color: '#333333',
            lineHeight: 1.3,
            wordBreak: 'break-word',
            letterSpacing: '-0.02em',
            textAlign: 'center'
          }}
        >
          {article.title}
        </h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            fontSize: '13px',
            color: '#999999'
          }}
        >
          <time>{formatDate(article.createdAt)}</time>
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

export default WeChatOfficialTheme;