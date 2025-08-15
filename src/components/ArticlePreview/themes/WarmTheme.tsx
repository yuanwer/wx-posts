import React from 'react';
import { type ThemeComponentProps } from './types';

/**
 * 淡粉色少女风主题组件
 * 简洁而不简单的少女风格，柔美清新，适合生活分享类内容
 */
const WarmTheme: React.FC<ThemeComponentProps> = ({ article, formatDate }) => {
  return (
    <article
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

      <div style={{ marginBottom: '32px' }}>
        {/* 引言 */}
        <div
          style={{
            marginBottom: '32px',
            paddingBottom: '24px',
            position: 'relative'
          }}
        >
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '40%',
            height: '1px',
            background: 'linear-gradient(to right, transparent, #f8a5c2, transparent)'
          }}></div>
          {article.introduction.split('\n\n').map((paragraph, index) => (
            <p
              key={`intro-${index}`}
              style={{
                margin: '0 0 18px 0',
                fontSize: '16px',
                fontWeight: 400,
                color: '#5d4e75',
                lineHeight: 1.7,
                textAlign: 'left',
                wordBreak: 'break-word',
                letterSpacing: '0.02em',
                background: 'rgba(255,255,255,0.5)',
                padding: '16px 20px',
                borderRadius: '12px',
                border: '1px solid rgba(248, 165, 194, 0.3)'
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* 小节列表 */}
        {article.sections.map((section, sectionIndex) => (
          <React.Fragment key={`section-${sectionIndex}`}>
            <div
              style={{
                marginBottom: sectionIndex === article.sections.length - 1 ? '32px' : '16px',
                padding: '20px',
                position: 'relative',
                background: 'rgba(255,255,255,0.7)',
                borderRadius: '12px',
                border: '1px solid rgba(248, 165, 194, 0.25)',
                boxShadow: '0 2px 8px rgba(248, 165, 194, 0.1)'
              }}
            >
              <h2
                style={{
                  margin: '0 0 16px 0',
                  fontSize: '18px',
                  fontWeight: 500,
                  color: '#8b5a8c',
                  lineHeight: 1.4,
                  display: 'flex',
                  alignItems: 'flex-start'
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    width: '24px',
                    height: '24px',
                    backgroundColor: '#f8a5c2',
                    borderRadius: '6px',
                    marginRight: '10px',
                    marginTop: '2px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#fff',
                    boxShadow: '0 1px 3px rgba(248, 165, 194, 0.3)'
                  }}
                >
                  {sectionIndex + 1}
                </span>
                {section.title}
              </h2>
              <div
                style={{
                  marginLeft: '34px',
                  position: 'relative'
                }}
              >
                {section.content.split('\n\n').map((paragraph, paragraphIndex) => (
                  <p
                    key={`section-${sectionIndex}-para-${paragraphIndex}`}
                    style={{
                      margin: '0 0 16px 0',
                      fontSize: '15px',
                      fontWeight: 400,
                      color: '#5d4e75',
                      lineHeight: 1.7,
                      textAlign: 'left',
                      wordBreak: 'break-word',
                      letterSpacing: '0.02em',
                      textIndent: '2em'
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            {sectionIndex < article.sections.length - 1 && (
              <div className="section-divider" style={{ background: 'linear-gradient(to right, transparent 0%, rgba(248, 165, 194, 0.4) 50%, transparent 100%)' }} />
            )}
          </React.Fragment>
        ))}
      </div>
    </article>
  );
};

export default WarmTheme;