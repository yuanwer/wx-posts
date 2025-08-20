import React from 'react';
import { type ThemeComponentProps } from './types';
import { markdownRenderer } from '../../../utils/markdown';
import '../../../styles/markdown.css';

/**
 * 科技主题组件（支持 Markdown）
 * 未来感设计，深色背景，适合科技类内容
 */
const TechTheme: React.FC<ThemeComponentProps> = ({ article, formatDate }) => {
  const htmlContent = markdownRenderer.render(article.content);
  return (
    <article
      className="article-theme-tech"
      style={{
        background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
        padding: '32px',
        fontFamily: '"SF Mono", "Monaco", "Cascadia Code", "Roboto Mono", monospace',
        lineHeight: 1.7,
        color: '#e0e6ed',
        position: 'relative',
        border: '1px solid #0d7377',
        borderRadius: '0',
        boxShadow: '0 0 30px rgba(13, 115, 119, 0.3), inset 0 0 100px rgba(13, 115, 119, 0.1)'
      }}
    >
      {/* 科技装饰边框 */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #0d7377, #14a085, #0d7377, transparent)'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #0d7377, #14a085, #0d7377, transparent)'
      }}></div>

      <header
        style={{
          marginBottom: '40px',
          textAlign: 'left',
          position: 'relative',
          paddingBottom: '24px',
          borderBottom: '1px solid rgba(13, 115, 119, 0.5)'
        }}
      >
        <h1
          style={{
            margin: '0 0 20px 0',
            fontSize: '28px',
            fontWeight: 300,
            color: '#14a085',
            lineHeight: 1.2,
            wordBreak: 'break-word',
            letterSpacing: '2px',
            textAlign: 'left',
            textTransform: 'uppercase',
            fontFamily: '"SF Mono", "Monaco", monospace',
            textShadow: '0 0 10px rgba(20, 160, 133, 0.5)'
          }}
        >
          <span style={{
            color: '#0d7377',
            fontSize: '24px',
            marginRight: '8px'
          }}>[</span>
          {article.title}
          <span style={{
            color: '#0d7377',
            fontSize: '24px',
            marginLeft: '8px'
          }}>]</span>
        </h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '16px',
            fontSize: '12px',
            color: '#14a085',
            fontFamily: '"SF Mono", monospace',
            letterSpacing: '1px'
          }}
        >
          <span style={{ color: '#0d7377' }}>{'>'}</span>
          <time>TIMESTAMP: {formatDate(article.createdAt)}</time>
          <span style={{ color: '#0d7377' }}>{'<'}</span>
        </div>
      </header>

      <div 
        className="markdown-content"
        style={{ marginBottom: '40px', color: '#e0e6ed' }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
};

export default TechTheme;