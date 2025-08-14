import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Select from '../Select/Select';
import ThemeSelector from '../ThemeSelector/ThemeSelector';
import { type ArticleGenerateRequest } from '../../api/articleApi';
import './ArticleForm.css';

interface ArticleFormProps {
  /** 表单提交回调 */
  onSubmit: (data: ArticleGenerateRequest) => void;
  /** 是否正在生成 */
  loading?: boolean;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState<ArticleGenerateRequest>({
    topic: '',
    style: 'professional',
    wordCount: 800,
    audience: ''
  });
  

  const [errors, setErrors] = useState<Record<string, string>>({});

  const styleOptions = [
    { value: 'professional', label: '专业严谨' },
    { value: 'casual', label: '轻松随意' },
    { value: 'humorous', label: '幽默风趣' },
    { value: 'inspirational', label: '励志激励' }
  ];

  const wordCountOptions = [
    { value: '500', label: '500字左右' },
    { value: '800', label: '800字左右' },
    { value: '1200', label: '1200字左右' },
    { value: '1500', label: '1500字左右' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.topic.trim()) {
      newErrors.topic = '请输入文章主题';
    } else if (formData.topic.length < 2) {
      newErrors.topic = '主题至少需要2个字符';
    } else if (formData.topic.length > 50) {
      newErrors.topic = '主题不能超过50个字符';
    }

    if (!formData.audience.trim()) {
      newErrors.audience = '请输入目标受众';
    } else if (formData.audience.length < 2) {
      newErrors.audience = '目标受众至少需要2个字符';
    } else if (formData.audience.length > 30) {
      newErrors.audience = '目标受众不能超过30个字符';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  const handleThemeChange = (themeId: string) => {
    // 主题改变时的回调处理
    console.log('主题已切换至:', themeId);
  };

  const updateFormData = (field: keyof ArticleGenerateRequest, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // 清除对应字段的错误信息
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <div className="article-form">
      <div className="article-form__header">
        <div className="article-form__icon">
          <Wand2 size={24} />
        </div>
        <h2 className="article-form__title">AI 文章生成器</h2>
        <p className="article-form__subtitle">
          输入您的需求，AI 将为您生成优质的微信公众号文章
        </p>
      </div>

      <div className="article-form__content">
        <Input
          label="文章主题"
          placeholder="例如：如何提高工作效率"
          value={formData.topic}
          onChange={(value) => updateFormData('topic', value)}
          error={errors.topic}
          maxLength={50}
          required
        />

        <Input
          label="目标受众"
          placeholder="例如：职场新人、创业者、学生"
          value={formData.audience}
          onChange={(value) => updateFormData('audience', value)}
          error={errors.audience}
          maxLength={30}
          required
        />

        <Select
          label="写作风格"
          options={styleOptions}
          value={formData.style}
          onChange={(value) => updateFormData('style', value as ArticleGenerateRequest['style'])}
          required
        />

        <Select
          label="文章长度"
          options={wordCountOptions}
          value={formData.wordCount.toString()}
          onChange={(value) => updateFormData('wordCount', parseInt(value))}
          required
        />

        <ThemeSelector
          label="文章主题"
          placeholder="请选择文章主题"
          onThemeChange={handleThemeChange}
          className="article-form__theme-selector"
        />
        
        <Button
          variant="primary"
          size="large"
          loading={loading}
          onClick={handleSubmit}
          className="article-form__submit"
        >
          {loading ? '正在生成文章...' : '生成文章'}
        </Button>
      </div>
    </div>
  );
};

export default ArticleForm;
