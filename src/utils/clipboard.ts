/**
 * 剪贴板工具函数
 */

/**
 * 复制HTML内容到剪贴板，保持样式，针对微信编辑器优化
 * @param element - 要复制的DOM元素
 * @returns Promise<boolean> 复制是否成功
 */
export async function copyElementWithStyles(element: HTMLElement): Promise<boolean> {
  try {
    // 直接克隆元素，因为所有样式已经是内联的
    const clonedElement = element.cloneNode(true) as HTMLElement;
    
    // 创建包含完整样式的HTML
    const htmlContent = createCompleteStyledHTML(clonedElement);
    const textContent = element.innerText || element.textContent || '';
    
    // 优先使用现代Clipboard API
    if (canUseClipboardAPI()) {
      try {
        const clipboardItem = new ClipboardItem({
          'text/html': new Blob([htmlContent], { type: 'text/html' }),
          'text/plain': new Blob([textContent], { type: 'text/plain' })
        });
        
        await navigator.clipboard.write([clipboardItem]);
        return true;
      } catch (clipboardError) {
        console.warn('ClipboardAPI失败，尝试降级方案:', clipboardError);
        return copyElementFallback(element, htmlContent);
      }
    } else {
      // 降级到execCommand
      return copyElementFallback(element, htmlContent);
    }
  } catch (error) {
    console.error('复制失败:', error);
    return copyElementFallback(element);
  }
}

/**
 * 检查是否可以使用ClipboardAPI
 * @returns boolean 是否支持
 */
function canUseClipboardAPI(): boolean {
  return !!(
    navigator.clipboard &&
    typeof navigator.clipboard.write === 'function' &&
    window.ClipboardItem &&
    window.isSecureContext  // HTTPS环境检查
  );
}

/**
 * 创建包含完整样式的HTML文档
 * @param element - 克隆的元素
 * @returns string 完整的HTML字符串
 */
function createCompleteStyledHTML(element: HTMLElement): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* 基础重置样式 */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      margin: 0;
      padding: 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
      line-height: 1.6;
      color: #333;
      background: #fff;
    }
  </style>
</head>
<body>
  ${element.outerHTML}
</body>
</html>
  `.trim();
}

/**
 * 降级复制方案
 * @param element - 要复制的DOM元素
 * @param htmlContent - 可选的HTML内容
 * @returns boolean 复制是否成功
 */
function copyElementFallback(element: HTMLElement, htmlContent?: string): boolean {
  try {
    if (htmlContent && isHTMLContentSupported()) {
      // 尝试使用富文本复制
      return copyHTMLContent(htmlContent);
    } else {
      // 降级到纯文本复制
      return copyPlainTextContent(element);
    }
  } catch (error) {
    console.error('所有复制方案都失败:', error);
    // 最后尝试简单的文本复制
    return copyTextAsLastResort(element);
  }
}

/**
 * 检查是否支持HTML内容复制
 * @returns boolean 是否支持
 */
function isHTMLContentSupported(): boolean {
  return 'execCommand' in document && document.queryCommandSupported('copy');
}

/**
 * 复制HTML内容（降级方案）
 * @param htmlContent - HTML内容
 * @returns boolean 复制是否成功
 */
function copyHTMLContent(htmlContent: string): boolean {
  const tempContainer = document.createElement('div');
  tempContainer.innerHTML = htmlContent;
  tempContainer.style.position = 'fixed';
  tempContainer.style.left = '-9999px';
  tempContainer.style.top = '0';
  tempContainer.style.width = '1px';
  tempContainer.style.height = '1px';
  tempContainer.style.opacity = '0';
  tempContainer.style.overflow = 'hidden';
  
  document.body.appendChild(tempContainer);
  
  try {
    const selection = window.getSelection();
    if (!selection) {
      return false;
    }
    
    const range = document.createRange();
    range.selectNodeContents(tempContainer);
    selection.removeAllRanges();
    selection.addRange(range);
    
    const success = document.execCommand('copy');
    selection.removeAllRanges();
    
    return success;
  } finally {
    document.body.removeChild(tempContainer);
  }
}

/**
 * 复制纯文本内容
 * @param element - DOM元素
 * @returns boolean 复制是否成功
 */
function copyPlainTextContent(element: HTMLElement): boolean {
  const selection = window.getSelection();
  if (!selection) return false;
  
  const range = document.createRange();
  range.selectNodeContents(element);
  selection.removeAllRanges();
  selection.addRange(range);
  
  const success = document.execCommand('copy');
  selection.removeAllRanges();
  
  return success;
}

/**
 * 最后的文本复制尝试
 * @param element - DOM元素
 * @returns boolean 复制是否成功
 */
function copyTextAsLastResort(element: HTMLElement): boolean {
  try {
    const text = element.innerText || element.textContent || '';
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    return success;
  } catch (e) {
    console.error('最终文本复制失败:', e);
    return false;
  }
}

/**
 * 复制纯文本到剪贴板
 * @param text - 要复制的文本
 * @returns Promise<boolean> 复制是否成功
 */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // 降级方案
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      return success;
    }
  } catch (error) {
    console.error('复制文本失败:', error);
    return false;
  }
}
