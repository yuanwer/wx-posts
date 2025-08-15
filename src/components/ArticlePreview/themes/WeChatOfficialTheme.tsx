import React from 'react';
import { type ThemeComponentProps } from './types';

/**
 * 微信官方主题组件
 * 简洁清爽，绿色强调，符合微信公众号阅读习惯
 */
const WeChatOfficialTheme: React.FC<ThemeComponentProps> = ({ article, formatDate }) => {
  return (
    <article
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

      <div style={{ marginBottom: '32px' }}>
        {/* 引言 */}
        <div
          style={{
            marginBottom: '32px',
            paddingBottom: '24px',
            borderBottom: '1px solid #f5f5f5'
          }}
        >
          {article.introduction.split('\n\n').map((paragraph, index) => (
            <p
              key={`intro-${index}`}
              style={{
                margin: '0 0 18px 0',
                fontSize: '16px',
                fontWeight: 400,
                color: '#333333',
                lineHeight: 1.8,
                textAlign: 'left',
                wordBreak: 'break-word',
                letterSpacing: '0.5px'
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
                marginBottom: sectionIndex === article.sections.length - 1 ? '36px' : '18px',
                padding: '24px 0 0 0',
                position: 'relative'
              }}
            >
              <h2
                style={{
                  margin: '0 0 16px 0',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#333333',
                  lineHeight: 1.4,
                  display: 'flex',
                  alignItems: 'flex-start'
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '4px',
                    height: '16px',
                    backgroundColor: '#1aad19',
                    borderRadius: '2px',
                    marginRight: '12px',
                    verticalAlign: 'middle',
                    flexShrink: 0
                  }}
                ></span>
                {sectionIndex + 1}. {section.title}
              </h2>
              <div
                style={{
                  marginLeft: '16px',
                  position: 'relative'
                }}
              >
                {section.content.split('\n\n').map((paragraph, paragraphIndex) => (
                  <p
                    key={`section-${sectionIndex}-para-${paragraphIndex}`}
                    style={{
                      margin: '0 0 18px 0',
                      fontSize: '16px',
                      fontWeight: 400,
                      color: '#333333',
                      lineHeight: 1.8,
                      textAlign: 'left',
                      wordBreak: 'break-word',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            {sectionIndex < article.sections.length - 1 && (
              <div className="section-divider" />
            )}
          </React.Fragment>
        ))}
      </div>
    </article>
  );
};

export default WeChatOfficialTheme;