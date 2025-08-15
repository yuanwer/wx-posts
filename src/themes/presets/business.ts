import type { ArticleTheme } from '../types';

/**
 * 商务专业风格主题
 * 白色底色，深蓝色调，专业严谨，适合企业和商务内容
 */
export const businessTheme: ArticleTheme = {
  id: 'business',
  name: '商务专业',
  description: '高端大气，专业严谨，适合企业和商务内容',
  category: 'business',
  
  styles: {
    container: {
      background: '#ffffff',
      padding: '40px 32px',
      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, "PingFang SC", sans-serif',
      lineHeight: 1.65,
      color: '#2c3e50',
      position: 'relative'
    },
    
    header: {
      marginBottom: '48px',
      textAlign: 'left',
      position: 'relative',
      paddingBottom: '24px',
      borderBottom: '1px solid #e5e5e5'
    },
    
    title: {
      fontSize: '28px',
      fontWeight: 700,
      color: '#1a365d',
      lineHeight: 1.3,
      textAlign: 'left',
      marginBottom: '24px',
      letterSpacing: '-0.02em'
    },
    
    meta: {
      fontSize: '14px',
      color: '#718096',
      textAlign: 'left',
      gap: '16px',
      fontWeight: 400
    },
    
    content: {
      marginBottom: '48px'
    },
    
    section: {
      marginBottom: '32px',
      padding: '0',
      position: 'relative',
      title: {
        fontSize: '20px',
        fontWeight: 600,
        color: '#2d3748',
        lineHeight: 1.4,
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'flex-start'
      },
      content: {
        marginLeft: '20px',
        position: 'relative'
      },
      marker: {
        display: 'inline-block',
        width: '4px',
        height: '20px',
        backgroundColor: '#1a365d',
        borderRadius: '2px',
        marginRight: '16px',
        verticalAlign: 'middle',
        flexShrink: 0
      }
    },
    
    paragraph: {
      fontSize: '16px',
      fontWeight: 400,
      color: '#4a5568',
      lineHeight: 1.7,
      textAlign: 'left',
      wordBreak: 'break-word',
      letterSpacing: '0.01em',
      marginBottom: '20px',
      textIndent: '0'
    },
    
    dividers: {
      introduction: {
        marginBottom: '48px',
        paddingBottom: '32px',
        borderBottom: '1px solid #f0f0f0',
        position: 'relative',
        background: '#f8fafc',
        padding: '32px',
        borderRadius: '8px',
        borderLeft: '4px solid #1a365d'
      }
    }
  },
  
  responsive: {
    mobile: {
      title: {
        fontSize: '24px'
      },
      paragraph: {
        fontSize: '15px',
        lineHeight: 1.6,
        textIndent: '0'
      }
    }
  }
};