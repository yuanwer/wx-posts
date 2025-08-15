import React from 'react';
import { type ThemeComponentProps } from './types';

/**
 * 商务主题组件
 * 专业严谨，深蓝配色，适合商务场景
 */
const BusinessTheme: React.FC<ThemeComponentProps> = ({ article, formatDate }) => {
  return (
    <article
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

      <div style={{ marginBottom: '48px' }}>
        {/* 引言 */}
        <div
          style={{
            marginBottom: '48px',
            paddingBottom: '32px',
            borderBottom: '1px solid #f0f0f0',
            position: 'relative',
            background: '#f8fafc',
            padding: '32px',
            borderRadius: '8px',
            borderLeft: '4px solid #1a365d'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '24px',
              left: '24px',
              fontSize: '48px',
              color: '#e2e8f0',
              fontFamily: 'Georgia, serif',
              lineHeight: 1,
              userSelect: 'none',
              pointerEvents: 'none'
            }}
          >
            "
          </div>
          {article.introduction.split('\n\n').map((paragraph, index) => (
            <p
              key={`intro-${index}`}
              style={{
                margin: '0 0 20px 0',
                fontSize: '18px',
                fontWeight: 400,
                color: '#2d3748',
                lineHeight: 1.7,
                textAlign: 'left',
                wordBreak: 'break-word',
                letterSpacing: '0.01em',
                paddingLeft: '24px',
                fontStyle: 'italic',
                position: 'relative'
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
                marginBottom: sectionIndex === article.sections.length - 1 ? '48px' : '32px',
                padding: '0',
                position: 'relative',
                background: 'transparent'
              }}
            >
              <h2
                style={{
                  margin: '0 0 24px 0',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#2d3748',
                  lineHeight: 1.4,
                  display: 'flex',
                  alignItems: 'flex-start',
                  position: 'relative'
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '4px',
                    height: '20px',
                    backgroundColor: '#1a365d',
                    marginRight: '16px',
                    flexShrink: 0,
                    borderRadius: '2px'
                  }}
                />
                {section.title}
              </h2>
              <div
                style={{
                  marginLeft: '20px',
                  position: 'relative'
                }}
              >
                {section.content.split('\n\n').map((paragraph, paragraphIndex) => (
                  <p
                    key={`section-${sectionIndex}-para-${paragraphIndex}`}
                    style={{
                      margin: '0 0 20px 0',
                      fontSize: '16px',
                      fontWeight: 400,
                      color: '#4a5568',
                      lineHeight: 1.7,
                      textAlign: 'left',
                      wordBreak: 'break-word',
                      letterSpacing: '0.01em'
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            {sectionIndex < article.sections.length - 1 && (
              <div 
                style={{ 
                  height: '1px',
                  background: '#e5e5e5',
                  margin: '32px 0',
                  width: '60%'
                }} 
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </article>
  );
};

export default BusinessTheme;