import type { ArticleTheme } from '../types';

/**
 * 科技未来风格主题
 * 深色背景，蓝紫科技感，适合科技创新类主题
 */
export const techTheme: ArticleTheme = {
  id: 'tech-future',
  name: '科技未来',
  description: '深色背景，蓝紫科技感，适合科技创新类主题',
  category: 'tech',
  
  styles: {
    container: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '24px',
      fontFamily: '"SF Pro Display", "PingFang SC", -apple-system, BlinkMacSystemFont, sans-serif',
      lineHeight: 1.7,
      color: '#e2e8f0',
      position: 'relative'
    },
    
    header: {
      marginBottom: '30px',
      textAlign: 'center',
      position: 'relative',
      paddingBottom: '20px',
      borderBottom: '2px solid rgba(124, 58, 237, 0.5)'
    },
    
    title: {
      fontSize: '28px',
      fontWeight: 700,
      color: '#ffffff',
      lineHeight: 1.2,
      textAlign: 'center',
      marginBottom: '20px',
      letterSpacing: '0.5px'
    },
    
    meta: {
      fontSize: '14px',
      color: '#cbd5e0',
      textAlign: 'center',
      gap: '16px'
    },
    
    content: {
      marginBottom: '36px'
    },
    
    section: {
      marginBottom: '42px',
      padding: '24px 0',
      position: 'relative',
      title: {
        fontSize: '21px',
        fontWeight: 600,
        color: '#a78bfa',
        lineHeight: 1.3,
        marginBottom: '18px',
        display: 'flex',
        alignItems: 'center'
      },
      content: {
        marginLeft: '20px',
        position: 'relative'
      },
      marker: {
        display: 'inline-block',
        width: '4px',
        height: '22px',
        backgroundColor: '#8b5cf6',
        borderRadius: '2px',
        marginRight: '16px',
        verticalAlign: 'middle',
        flexShrink: 0
      }
    },
    
    paragraph: {
      fontSize: '16px',
      fontWeight: 400,
      color: '#f1f5f9',
      lineHeight: 1.8,
      textAlign: 'left',
      wordBreak: 'break-word',
      letterSpacing: '0.4px',
      marginBottom: '20px'
    },
    
    dividers: {
      introduction: {
        marginBottom: '36px',
        paddingBottom: '28px',
        borderBottom: '1px solid rgba(139, 92, 246, 0.3)'
      }
    }
  },
  
  responsive: {
    mobile: {
      title: {
        fontSize: '25px'
      },
      paragraph: {
        fontSize: '15px',
        lineHeight: 1.7
      }
    }
  }
};