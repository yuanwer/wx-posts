/**
 * 文章生成API接口
 */

import { safeJsonParse } from '../utils/jsonUtils';

// AI 服务配置
const AI_CONFIG = {
  apiKey: 'sk-DtE9W6csHnCjiwLodIz44CbtPX4Iw0TFBpB8Mok5Bbw8TJwn',
  baseURL: 'https://geekai.co/api/v1',
  model: 'glm-4-flash'
};

/**
 * 文章生成请求参数
 */
export type ArticleGenerateRequest = {
  /** 文章主题 */
  topic: string;
  /** 文章风格 */
  style: 'professional' | 'casual' | 'humorous' | 'inspirational';
  /** 目标字数 */
  wordCount: number;
  /** 目标受众 */
  audience: string;
}

/**
 * 文章小节
 */
export type ArticleSection = {
  /** 小节标题 */
  title: string;
  /** 小节内容 */
  content: string;
}

/**
 * 文章生成响应数据
 */
export type ArticleGenerateResponse = {
  /** 文章标题 */
  title: string;
  /** 引言 */
  introduction: string;
  /** 小节列表（包含总结小节） */
  sections: ArticleSection[];
  /** 标签 */
  tags: string[];
  /** 生成时间 */
  createdAt: string;
}

/**
 * 构建写作风格的提示词
 */
const getStylePrompt = (style: ArticleGenerateRequest['style']) => {
  const styleMap = {
    professional: '专业严谨，语言客观准确，逻辑清晰，适合商务和职场场景',
    casual: '轻松随意，语言亲切自然，贴近生活，适合日常分享',
    humorous: '幽默风趣，语言生动活泼，适当运用调侃和段子，但保持得体',
    inspirational: '励志激励，语言积极正能量，能够激发读者思考和行动'
  };
  return styleMap[style];
};

/**
 * 调用AI生成文章内容
 * @param params - 文章生成参数
 * @returns Promise<ArticleGenerateResponse> 生成的文章数据
 */
export async function generateArticle(params: ArticleGenerateRequest): Promise<ArticleGenerateResponse> {
  const stylePrompt = getStylePrompt(params.style);
  
  const systemPrompt = `你是一个专业的微信公众号文章写手，擅长创作高质量的原创文章。

写作要求：
1. 文章风格：${stylePrompt}
2. 目标字数：${params.wordCount}字左右
3. 目标受众：${params.audience}
4. 文章结构要完整，包含引言、4-6个小节（最后一个小节必须是总结性质的）
5. 语言要生动有趣，适合微信公众号阅读
6. 内容要有价值，能够给读者带来启发或实用信息
7. 每个小节内容要充实，避免空洞的表述
8. 使用具体的例子和数据来支撑观点
9. 最后一个小节应该是总结，标题可以是"总结"、"结语"、"写在最后"等

请严格按照以下JSON格式返回结果：
{
  "title": "文章标题",
  "introduction": "引言内容（200字左右）",
  "sections": [
    {
      "title": "小节1标题",
      "content": "小节1内容"
    },
    {
      "title": "小节2标题",
      "content": "小节2内容"
    },
    {
      "title": "小节3标题",
      "content": "小节3内容"
    },
    {
      "title": "总结",
      "content": "总结性内容（150字左右）"
    }
  ],
  "tags": ["标签1", "标签2", "标签3", "标签4"]
}`;

  const userPrompt = `请以"${params.topic}"为主题，为${params.audience}写一篇${params.wordCount}字左右的微信公众号文章。`;

  try {
    const response = await fetch(`${AI_CONFIG.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_CONFIG.apiKey}`
      },
      body: JSON.stringify({
        model: AI_CONFIG.model,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        temperature: 0.8,
        max_tokens: 3000
      })
    });

    if (!response.ok) {
      throw new Error(`AI API 请求失败: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('AI API 响应格式错误');
    }

    const aiResponse = data.choices[0].message.content;
    
    // 使用 jsonrepair 安全解析 AI 返回的 JSON
    const parseResult = safeJsonParse<Omit<ArticleGenerateResponse, 'createdAt'>>(aiResponse);
    
    let parsedResult: Omit<ArticleGenerateResponse, 'createdAt'>;
    if (parseResult.success && parseResult.data) {
      parsedResult = parseResult.data;
      if (parseResult.repaired) {
        console.warn('AI 返回的 JSON 格式有问题，已使用 jsonrepair 自动修复');
      }
    } else {
      // 如果解析失败，使用备用方案
      console.warn('AI 返回内容无法解析为 JSON，使用备用处理方案:', parseResult.error);
      const fallbackContent = generateFallbackContent(params);
      parsedResult = {
        title: `${params.topic}：${params.audience}的深度思考`,
        introduction: fallbackContent.introduction,
        sections: fallbackContent.sections,
        tags: [params.topic, params.audience, `${params.style}风格`]
      };
    }

    return {
      title: parsedResult.title || `${params.topic}：${params.audience}的深度思考`,
      introduction: parsedResult.introduction || `在当今时代，${params.topic}已成为${params.audience}关注的重要话题。`,
      sections: parsedResult.sections || [],
      tags: parsedResult.tags || [params.topic, params.audience, `${params.style}风格`],
      createdAt: new Date().toISOString()
    };

  } catch (error) {
    console.error('AI 文章生成失败:', error);
    
    // 发生错误时返回模拟数据，确保用户体验
    const fallbackContent = generateFallbackContent(params);
    return {
      title: `${params.topic}：${params.audience}必须知道的那些事`,
      introduction: fallbackContent.introduction,
      sections: fallbackContent.sections,
      tags: [params.topic, params.audience, `${params.style}风格`],
      createdAt: new Date().toISOString()
    };
  }
}

/**
 * 生成备用内容（当AI调用失败时使用）
 */
function generateFallbackContent(params: ArticleGenerateRequest): Omit<ArticleGenerateResponse, 'title' | 'tags' | 'createdAt'> {
  const styleTemplates = {
    professional: {
      prefix: '在当今快速发展的时代，',
      tone: '专业、客观',
      sections: [
        '核心概念解析',
        '实践应用指南',
        '发展趋势分析'
      ]
    },
    casual: {
      prefix: '说到',
      tone: '轻松、亲切',
      sections: [
        '生活中的小发现',
        '实用技巧分享',
        '个人感悟总结'
      ]
    },
    humorous: {
      prefix: '有没有发现，',
      tone: '幽默、风趣',
      sections: [
        '搞笑的现象观察',
        '有趣的对比分析',
        '轻松的解决方案'
      ]
    },
    inspirational: {
      prefix: '每个人都有一个梦想，',
      tone: '激励、正能量',
      sections: [
        '成功案例分析',
        '行动计划制定',
        '未来愿景展望'
      ]
    }
  };

  const template = styleTemplates[params.style];
  
  // 生成引言
  const introduction = `${template.prefix}${params.topic}已经成为了我们生活中不可忽视的重要话题。对于${params.audience}来说，深入理解这个主题的意义尤为重大。通过本文，我们将从多个角度来探讨这个话题，为大家提供有价值的见解和实用的建议。`;
  
  // 生成小节
  const sections: ArticleSection[] = template.sections.map((sectionTitle) => {
    let content = '';
    switch (params.style) {
      case 'professional':
        content = `从${sectionTitle.toLowerCase()}的角度来分析${params.topic}，我们可以看到其对${params.audience}的深远影响。通过数据分析和实践验证，这种影响体现在多个层面，需要我们采取相应的策略来应对。\n\n具体来说，${params.topic}在${params.audience}的工作和生活中起到了关键作用。我们应该从专业的角度来理解和运用相关知识，以提高效率和质量。`;
        break;
      case 'casual':
        content = `聊到${sectionTitle.toLowerCase()}这个话题，我想起了前几天的一个小故事。作为${params.audience}，我们总是在生活中遇到各种有趣的情况，这让我对${params.topic}这个问题有了新的思考。\n\n其实，${params.topic}就在我们身边，只要我们用心观察和体验，就能发现很多有趣的细节。这些细节往往能给我们带来意想不到的启发。`;
        break;
      case 'humorous':
        content = `说真的，${sectionTitle.toLowerCase()}这事儿啊，就像是${params.audience}的日常修炼一样。有时候你以为自己很懂${params.topic}，结果发现还是太年轻了，这不禁让人会心一笑。\n\n不过话说回来，正是这些"翻车"的经历，让我们对${params.topic}有了更深刻的理解。毕竟，生活就是一场大型翻车现场，我们都是其中的演员。`;
        break;
      case 'inspirational':
        content = `当我们谈论${sectionTitle.toLowerCase()}时，实际上是在谈论如何成为更好的自己。每一个${params.audience}都有无限的潜能，关键在于如何激发和释放这种潜能。${params.topic}为我们提供了这样的机会。\n\n记住，成功不是一蹴而就的，而是需要我们在${params.topic}的道路上不断努力和坚持。每一个小小的进步都值得我们为自己骄傲。`;
        break;
    }
    
    return {
      title: sectionTitle,
      content
    };
  });
  
  // 添加总结小节
  let conclusionContent = '';
  switch (params.style) {
    case 'professional':
      conclusionContent = `综上所述，${params.topic}对${params.audience}具有重要的指导意义。我们应当以专业的态度对待这个问题，在实践中不断完善和优化我们的方法论。通过系统性的学习和应用，相信每个人都能在这个领域取得进步。`;
      break;
    case 'casual':
      conclusionContent = `总的来说，${params.topic}这个话题还是挺有意思的。作为${params.audience}，我们可以在日常生活中多留意这些细节，说不定会有意想不到的收获呢。记住，生活本身就是最好的老师。`;
      break;
    case 'humorous':
      conclusionContent = `最后想说的是，${params.topic}这事儿嘛，${params.audience}们大可不必太过紧张。毕竟生活本来就充满了惊喜和意外，保持一颗平常心最重要。笑着面对，一切都会变得简单起来。`;
      break;
    case 'inspirational':
      conclusionContent = `愿每一个${params.audience}都能在${params.topic}的道路上找到属于自己的那片天空。记住，最美的风景永远在前方，最好的自己永远在路上。相信自己，你一定可以做到！`;
      break;
  }
  
  sections.push({
    title: '总结',
    content: conclusionContent
  });
  
  return {
    introduction,
    sections
  };
}
