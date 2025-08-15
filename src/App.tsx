import { useState, useRef, useEffect } from 'react';
import { Copy, Download, CheckCircle, AlertCircle } from 'lucide-react';
import ArticleForm from './components/ArticleForm/ArticleForm';
import ArticlePreview, { type ArticlePreviewRef } from './components/ArticlePreview/ArticlePreview';
import Button from './components/Button/Button';
import { generateArticle, type ArticleGenerateRequest, type ArticleGenerateResponse } from './api/articleApi';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [article, setArticle] = useState<ArticleGenerateResponse | null>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copying' | 'success' | 'error'>('idle');
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloading' | 'success' | 'error'>('idle');
  const [generateError, setGenerateError] = useState<string | null>(null);
  const articlePreviewRef = useRef<ArticlePreviewRef>(null);

  useEffect(() => {
    // 当文章改变时重置状态
    if (article) {
      setCopyStatus('idle');
      setDownloadStatus('idle');
      setGenerateError(null);
    }
  }, [article]);

  const handleGenerateArticle = async (formData: ArticleGenerateRequest) => {
    try {
      setIsGenerating(true);
      setGenerateError(null);
      
      const generatedArticle = await generateArticle(formData);
      setArticle(generatedArticle);
    } catch (error) {
      console.error('生成文章失败:', error);
      setGenerateError(error instanceof Error ? error.message : '生成文章时发生未知错误');
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
      setDownloadStatus('downloading');
      try {
        articlePreviewRef.current.handleDownload();
        setDownloadStatus('success');
        setTimeout(() => setDownloadStatus('idle'), 2000);
      } catch (error) {
        console.error('下载失败:', error);
        setDownloadStatus('error');
        setTimeout(() => setDownloadStatus('idle'), 2000);
      }
    }
  };

  const getCopyButtonText = () => {
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
    switch (copyStatus) {
      case 'success':
        return <CheckCircle size={16} />;
      case 'error':
        return <AlertCircle size={16} />;
      default:
        return <Copy size={16} />;
    }
  };

  const getDownloadButtonText = () => {
    switch (downloadStatus) {
      case 'downloading':
        return '下载中...';
      case 'success':
        return '下载成功';
      case 'error':
        return '下载失败';
      default:
        return '下载文章';
    }
  };

  const getDownloadButtonIcon = () => {
    switch (downloadStatus) {
      case 'success':
        return <CheckCircle size={16} />;
      case 'error':
        return <AlertCircle size={16} />;
      default:
        return <Download size={16} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="app">
        <div className="app__sidebar">
          <ArticleForm
            onSubmit={handleGenerateArticle}
            loading={isGenerating}
          />
          
          {/* 生成错误提示 */}
          {generateError && (
            <div className="app__error">
              <div className="app__error-content">
                <AlertCircle size={16} />
                <span>{generateError}</span>
              </div>
            </div>
          )}
          
          {article && (
            <div className="app__actions">
              <Button
                variant={downloadStatus === 'success' ? 'secondary' : 'outline'}
                size="medium"
                loading={downloadStatus === 'downloading'}
                onClick={handleDownload}
                disabled={downloadStatus === 'downloading'}
                className="app__action-button"
              >
                {getDownloadButtonIcon()}
                {getDownloadButtonText()}
              </Button>
              
              <Button
                variant={copyStatus === 'success' ? 'secondary' : 'primary'}
                size="medium"
                loading={copyStatus === 'copying'}
                onClick={handleCopy}
                disabled={copyStatus === 'copying'}
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
                onCopyStatusChange={setCopyStatus}
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