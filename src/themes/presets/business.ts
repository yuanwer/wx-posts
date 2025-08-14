import type { ArticleTheme } from '../types';

/**
 * 商务专业风格主题
 * 蓝色系，专业严谨，适合企业和商务内容
 */
export const businessTheme: ArticleTheme = {
  id: 'business-professional',
  name: '商务专业',
  description: '专业严谨，适合企业和商务内容',
  category: 'business',
  
  styles: {
    container: {
      background: '#ffffff',
      padding: '20px',
      fontFamily: '"Microsoft YaHei", "PingFang SC", -apple-system, BlinkMacSystemFont, sans-serif',
      lineHeight: 1.6,
      color: '#2c3e50',
      position: 'relative'
    },
    
    header: {
      marginBottom: '28px',
      textAlign: 'left',
      position: 'relative',
      paddingBottom: '16px',
      borderBottom: '2px solid #3182ce'
    },
    
    title: {
      fontSize: '26px',
      fontWeight: 600,
      color: '#1a365d',
      lineHeight: 1.2,
      textAlign: 'left',
      marginBottom: '20px',
      letterSpacing: '-0.01em'
    },
    
    meta: {
      fontSize: '14px',
      color: '#718096',
      textAlign: 'left',
      gap: '16px'
    },
    
    content: {
      marginBottom: '36px'
    },
    
    section: {
      marginBottom: '40px',
      padding: '20px 0',
      position: 'relative',
      title: {
        fontSize: '20px',
        fontWeight: 600,
        color: '#2d3748',
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
        width: '6px',
        height: '20px',
        backgroundColor: '#3182ce',
        borderRadius: '0',
        marginRight: '14px',
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
      letterSpacing: '0.3px',
      marginBottom: '20px',
      textIndent: '2em'
    },
    
    dividers: {
      introduction: {
        marginBottom: '36px',
        paddingBottom: '28px',
        borderBottom: '1px solid #e2e8f0'
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