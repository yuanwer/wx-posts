import type { ArticleTheme } from '../types';

/**
 * 微信官方风格主题
 * 简洁清爽，绿色强调，符合微信公众号阅读习惯
 */
export const wechatOfficialTheme: ArticleTheme = {
  id: 'wechat-official',
  name: '微信官方',
  description: '简洁清爽，符合微信公众号阅读习惯',
  category: 'official',
  
  styles: {
    container: {
      background: '#ffffff',
      padding: '16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',
      lineHeight: 1.8,
      color: '#2c3e50',
      position: 'relative'
    },
    
    header: {
      marginBottom: '24px',
      textAlign: 'center',
      position: 'relative',
      paddingBottom: '16px',
      borderBottom: '1px solid #e7e7e7'
    },
    
    title: {
      fontSize: '24px',
      fontWeight: 700,
      color: '#333333',
      lineHeight: 1.3,
      textAlign: 'center',
      marginBottom: '16px',
      letterSpacing: '-0.02em'
    },
    
    meta: {
      fontSize: '13px',
      color: '#999999',
      textAlign: 'center',
      gap: '12px'
    },
    
    content: {
      marginBottom: '32px'
    },
    
    section: {
      marginBottom: '36px',
      padding: '24px 0',
      position: 'relative',
      title: {
        fontSize: '18px',
        fontWeight: 600,
        color: '#333333',
        lineHeight: 1.4,
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center'
      },
      content: {
        marginLeft: '16px',
        position: 'relative'
      },
      marker: {
        display: 'inline-block',
        width: '4px',
        height: '16px',
        backgroundColor: '#1aad19',
        borderRadius: '2px',
        marginRight: '12px',
        verticalAlign: 'middle',
        flexShrink: 0
      }
    },
    
    paragraph: {
      fontSize: '16px',
      fontWeight: 400,
      color: '#333333',
      lineHeight: 1.8,
      textAlign: 'left',
      wordBreak: 'break-word',
      letterSpacing: '0.5px',
      marginBottom: '18px'
    },
    
    dividers: {
      introduction: {
        marginBottom: '32px',
        paddingBottom: '24px',
        borderBottom: '1px solid #f5f5f5'
      }
    }
  },
  
  responsive: {
    mobile: {
      title: {
        fontSize: '22px'
      },
      paragraph: {
        fontSize: '16px',
        lineHeight: 1.7
      }
    }
  }
};