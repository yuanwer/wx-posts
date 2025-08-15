import React from 'react';
import { type ThemeComponentProps } from './types';

/**
 * 科技主题组件
 * 未来感设计，深色背景，适合科技类内容
 */
const TechTheme: React.FC<ThemeComponentProps> = ({ article, formatDate }) => {
  return (
    <article
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

      <div style={{ marginBottom: '40px' }}>
        {/* 引言 */}
        <div
          style={{
            marginBottom: '40px',
            paddingBottom: '32px',
            position: 'relative'
          }}
        >
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(13, 115, 119, 0.8), transparent)'
          }}></div>
          {article.introduction.split('\n\n').map((paragraph, index) => (
            <p
              key={`intro-${index}`}
              style={{
                margin: '0 0 20px 0',
                fontSize: '16px',
                fontWeight: 300,
                color: '#e0e6ed',
                lineHeight: 1.7,
                textAlign: 'left',
                wordBreak: 'break-word',
                letterSpacing: '0.5px',
                padding: '16px 20px',
                border: '1px solid rgba(13, 115, 119, 0.3)',
                borderLeft: '4px solid #14a085',
                background: 'rgba(13, 115, 119, 0.1)',
                fontFamily: '"Helvetica Neue", Arial, sans-serif'
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
                marginBottom: sectionIndex === article.sections.length - 1 ? '40px' : '20px',
                padding: '24px',
                position: 'relative',
                border: '1px solid rgba(13, 115, 119, 0.4)',
                background: 'linear-gradient(145deg, rgba(13, 115, 119, 0.1), rgba(20, 160, 133, 0.05))',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              <h2
                style={{
                margin: '0 0 20px 0',
                fontSize: '18px',
                fontWeight: 400,
                color: '#14a085',
                lineHeight: 1.3,
                display: 'flex',
                alignItems: 'flex-start',
                letterSpacing: '1px',
                textTransform: 'uppercase'
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    minWidth: '40px',
                    height: '20px',
                    backgroundColor: 'transparent',
                    border: '1px solid #14a085',
                    marginRight: '16px',
                    flexShrink: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#14a085',
                    fontFamily: '"SF Mono", monospace',
                    letterSpacing: '0'
                  }}
                >
                  {String(sectionIndex + 1).padStart(2, '0')}
                </span>
                {section.title}
              </h2>
              <div
                style={{
                  marginLeft: '56px',
                  position: 'relative'
                }}
              >
                {section.content.split('\n\n').map((paragraph, paragraphIndex) => (
                  <p
                    key={`section-${sectionIndex}-para-${paragraphIndex}`}
                    style={{
                    margin: '0 0 18px 0',
                    fontSize: '15px',
                    fontWeight: 300,
                    color: '#e0e6ed',
                    lineHeight: 1.7,
                    textAlign: 'left',
                    wordBreak: 'break-word',
                    letterSpacing: '0.3px',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              {sectionIndex < article.sections.length - 1 && (
                <div className="section-divider" style={{ background: 'linear-gradient(to right, transparent 0%, rgba(13, 115, 119, 0.8) 50%, transparent 100%)' }} />
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </article>
  );
};

export default TechTheme;