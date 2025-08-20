import { marked } from 'marked';
import DOMPurify from 'dompurify';

/**
 * Markdown 解析工具
 */
export class MarkdownRenderer {
  constructor() {
    // 配置 marked
    marked.setOptions({
      breaks: true, // 支持换行
      gfm: true,    // 启用 GitHub Flavored Markdown
    });
  }

  /**
   * 将 Markdown 转换为 HTML
   * @param markdown Markdown 字符串
   * @returns 安全的 HTML 字符串
   */
  public render(markdown: string): string {
    try {
      // 先用 marked 解析 markdown
      let rawHtml = marked.parse(markdown) as string;
      
      // 添加 CSS 类到生成的 HTML 元素
      rawHtml = this.addCssClasses(rawHtml);
      
      // 使用 DOMPurify 清理 HTML，防止 XSS 攻击
      const cleanHtml = DOMPurify.sanitize(rawHtml, {
        ALLOWED_TAGS: [
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'p', 'br', 'strong', 'em', 'u', 's',
          'ul', 'ol', 'li',
          'blockquote',
          'code', 'pre'
        ],
        ALLOWED_ATTR: ['class'],
        KEEP_CONTENT: true,
        RETURN_DOM_FRAGMENT: false,
        RETURN_DOM: false
      });

      return cleanHtml;
    } catch (error) {
      console.error('Markdown 解析失败:', error);
      // 如果解析失败，返回原始文本（转义后）
      return DOMPurify.sanitize(markdown.replace(/\n/g, '<br>'));
    }
  }

  /**
   * 为生成的 HTML 添加 CSS 类
   */
  private addCssClasses(html: string): string {
    return html
      .replace(/<h1>/g, '<h1 class="markdown-h1">')
      .replace(/<h2>/g, '<h2 class="markdown-h2">')
      .replace(/<h3>/g, '<h3 class="markdown-h3">')
      .replace(/<h4>/g, '<h4 class="markdown-h4">')
      .replace(/<h5>/g, '<h5 class="markdown-h5">')
      .replace(/<h6>/g, '<h6 class="markdown-h6">')
      .replace(/<p>/g, '<p class="markdown-paragraph">')
      .replace(/<ul>/g, '<ul class="markdown-ul">')
      .replace(/<ol>/g, '<ol class="markdown-ol">')
      .replace(/<li>/g, '<li class="markdown-li">')
      .replace(/<strong>/g, '<strong class="markdown-strong">')
      .replace(/<em>/g, '<em class="markdown-em">');
  }

  /**
   * 提取 Markdown 中的标题
   * @param markdown Markdown 字符串
   * @returns 标题数组
   */
  public extractHeadings(markdown: string): Array<{level: number, text: string}> {
    const headings: Array<{level: number, text: string}> = [];
    const lines = markdown.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('#')) {
        const level = trimmed.match(/^#+/)?.[0].length || 0;
        const text = trimmed.replace(/^#+\s*/, '').trim();
        if (level > 0 && level <= 6 && text) {
          headings.push({ level, text });
        }
      }
    }

    return headings;
  }

  /**
   * 估算 Markdown 内容的阅读时间
   * @param markdown Markdown 字符串
   * @param wordsPerMinute 每分钟阅读字数，默认 200
   * @returns 预估阅读时间（分钟）
   */
  public estimateReadingTime(markdown: string, wordsPerMinute: number = 200): number {
    // 移除 Markdown 语法，只保留文本内容
    const plainText = markdown
      .replace(/#+\s/g, '') // 移除标题标记
      .replace(/\*{1,2}([^*]+)\*{1,2}/g, '$1') // 移除加粗和斜体
      .replace(/`([^`]+)`/g, '$1') // 移除行内代码
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 移除链接，保留文本
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1') // 移除图片，保留 alt 文本
      .trim();

    // 计算字数（中文按字符计算，英文按单词计算）
    const chineseChars = (plainText.match(/[\u4e00-\u9fff]/g) || []).length;
    const englishWords = plainText.replace(/[\u4e00-\u9fff]/g, '').trim().split(/\s+/).filter(word => word.length > 0).length;
    
    const totalWords = chineseChars + englishWords;
    const readingTime = Math.ceil(totalWords / wordsPerMinute);
    
    return Math.max(1, readingTime); // 至少 1 分钟
  }
}

// 导出默认实例
export const markdownRenderer = new MarkdownRenderer();