import type { ArticleTheme } from '../types';

/**
 * 淡粉色少女风主题
 * 简洁而不简单的少女风格，柔美清新，适合生活类文章
 */
export const warmTheme: ArticleTheme = {
  id: 'warm',
  name: '淡粉少女',
  description: '简洁而不简单的少女风格，柔美清新，适合生活类文章',
  category: 'warm',
  
  styles: {
    container: {
      background: '#ffeef8',
      padding: '20px',
      fontFamily: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", -apple-system, sans-serif',
      lineHeight: 1.8,
      color: '#5d4e75',
      position: 'relative'
    },
    
    header: {
      marginBottom: '26px',
      textAlign: 'center',
      position: 'relative',
      paddingBottom: '18px',
      borderBottom: '1px solid #f8a5c2'
    },
    
    title: {
      fontSize: '26px',
      fontWeight: 600,
      color: '#8b5a8c',
      lineHeight: 1.3,
      textAlign: 'center',
      marginBottom: '18px',
      letterSpacing: '-0.01em'
    },
    
    meta: {
      fontSize: '13px',
      color: '#a08ca8',
      textAlign: 'center',
      gap: '12px'
    },
    
    content: {
      marginBottom: '34px'
    },
    
    section: {
      marginBottom: '38px',
      padding: '22px 0',
      position: 'relative',
      title: {
        fontSize: '18px',
        fontWeight: 500,
        color: '#8b5a8c',
        lineHeight: 1.4,
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'flex-start'
      },
      content: {
        marginLeft: '34px',
        position: 'relative'
      },
      marker: {
        display: 'inline-block',
        width: '24px',
        height: '24px',
        backgroundColor: '#f8a5c2',
        borderRadius: '6px',
        marginRight: '10px',
        verticalAlign: 'middle',
        flexShrink: 0
      }
    },
    
    paragraph: {
      fontSize: '15px',
      fontWeight: 400,
      color: '#5d4e75',
      lineHeight: 1.7,
      textAlign: 'left',
      wordBreak: 'break-word',
      letterSpacing: '0.02em',
      marginBottom: '18px',
      textIndent: '2em'
    },
    
    dividers: {
      introduction: {
        marginBottom: '34px',
        paddingBottom: '26px',
        borderBottom: '1px solid #f8a5c2'
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
        lineHeight: 1.7,
        textIndent: '0'
      }
    }
  }
};