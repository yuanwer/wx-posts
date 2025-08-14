import type { ArticleTheme } from '../types';

/**
 * 温馨暖色风格主题
 * 橙色系，圆润温和，适合生活类、情感类文章
 */
export const warmTheme: ArticleTheme = {
  id: 'warm-cozy',
  name: '温馨暖色',
  description: '橙色系，圆润温和，适合生活类、情感类文章',
  category: 'warm',
  
  styles: {
    container: {
      background: '#fefcf8',
      padding: '20px',
      fontFamily: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", -apple-system, sans-serif',
      lineHeight: 1.8,
      color: '#8b4513',
      position: 'relative'
    },
    
    header: {
      marginBottom: '26px',
      textAlign: 'center',
      position: 'relative',
      paddingBottom: '18px',
      borderBottom: '2px solid #ffd89b'
    },
    
    title: {
      fontSize: '25px',
      fontWeight: 700,
      color: '#d2691e',
      lineHeight: 1.3,
      textAlign: 'center',
      marginBottom: '18px',
      letterSpacing: '0.5px'
    },
    
    meta: {
      fontSize: '13px',
      color: '#cd853f',
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
        fontSize: '19px',
        fontWeight: 600,
        color: '#d2691e',
        lineHeight: 1.4,
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center'
      },
      content: {
        marginLeft: '18px',
        position: 'relative'
      },
      marker: {
        display: 'inline-block',
        width: '5px',
        height: '18px',
        backgroundColor: '#ff8c42',
        borderRadius: '8px',
        marginRight: '13px',
        verticalAlign: 'middle',
        flexShrink: 0
      }
    },
    
    paragraph: {
      fontSize: '16px',
      fontWeight: 400,
      color: '#8b4513',
      lineHeight: 1.8,
      textAlign: 'left',
      wordBreak: 'break-word',
      letterSpacing: '0.8px',
      marginBottom: '18px',
      textIndent: '2em'
    },
    
    dividers: {
      introduction: {
        marginBottom: '34px',
        paddingBottom: '26px',
        borderBottom: '1px solid #ffeaa7'
      }
    }
  },
  
  responsive: {
    mobile: {
      title: {
        fontSize: '23px'
      },
      paragraph: {
        fontSize: '16px',
        lineHeight: 1.7,
        textIndent: '0'
      }
    }
  }
};