import { useState, useRef } from 'react';
import { Copy, Download, CheckCircle } from 'lucide-react';
import ArticleForm from './components/ArticleForm/ArticleForm';
import ArticlePreview, { type ArticlePreviewRef } from './components/ArticlePreview/ArticlePreview';
import Button from './components/Button/Button';
import { generateArticle, type ArticleGenerateRequest, type ArticleGenerateResponse } from './api/articleApi';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [article, setArticle] = useState<ArticleGenerateResponse | null>(null);
  const articlePreviewRef = useRef<ArticlePreviewRef>(null);

  const handleGenerateArticle = async (formData: ArticleGenerateRequest) => {
    try {
      setIsGenerating(true);
      
      const generatedArticle = await generateArticle(formData);
      setArticle(generatedArticle);
    } catch (error) {
      console.error('生成文章失败:', error);
      // 这里可以添加错误提示
    } finally {
      setIsGenerating(false);
    }
  };


  const handleCopy = async () => {
    if (articlePreviewRef.current) {
      await articlePreviewRef.current.handleCopy();
    }
  };

  const handleDownload = () => {
    if (articlePreviewRef.current) {
      articlePreviewRef.current.handleDownload();
    }
  };

  const getCopyButtonText = () => {
    const copyStatus = articlePreviewRef.current?.copyStatus || 'idle';
    switch (copyStatus) {
      case 'copying':
        return '复制中...';
      case 'success':
        return '复制成功';
      case 'error':
        return '复制失败';
      default:
        return '复制内容';
    }
  };

  const getCopyButtonIcon = () => {
    const copyStatus = articlePreviewRef.current?.copyStatus || 'idle';
    if (copyStatus === 'success') {
      return <CheckCircle size={16} />;
    }
    return <Copy size={16} />;
  };

  return (
    <ThemeProvider>
      <div className="app">
        <div className="app__sidebar">
          <ArticleForm
            onSubmit={handleGenerateArticle}
            loading={isGenerating}
          />
          
          {article && (
            <div className="app__actions">
              <Button
                variant="outline"
                size="medium"
                onClick={handleDownload}
                className="app__action-button"
              >
                <Download size={16} />
                下载文章
              </Button>
              
              <Button
                variant={articlePreviewRef.current?.copyStatus === 'success' ? 'secondary' : 'primary'}
                size="medium"
                loading={articlePreviewRef.current?.copyStatus === 'copying'}
                onClick={handleCopy}
                disabled={articlePreviewRef.current?.copyStatus === 'copying'}
                className="app__action-button"
              >
                {getCopyButtonIcon()}
                {getCopyButtonText()}
              </Button>

            </div>
          )}
        </div>
        
        <div className="app__main">
          <div className="app__preview">
            {article ? (
              <ArticlePreview
                article={article}
                ref={articlePreviewRef}
              />
            ) : (
              <div className="app__placeholder">
                <div className="app__placeholder-content">
                  <h3>文章预览</h3>
                  <p>填写左侧表单，生成文章后将在此处显示预览</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;