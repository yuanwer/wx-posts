# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

这是一个微信公众号文章生成器的 MVP 版本，使用 React + TypeScript + Vite 构建。主要功能包括：

- 支持用户指定主题、字数、文章类型等参数生成文章
- 集成 AI API 生成文章内容（GLM-4-Flash 模型）
- 提供多种文章主题样式（官方风格、商务风格、温暖风格、科技风格等）
- 移动端文章预览（375px宽，667px高）
- 一键复制带完整格式的内容到剪贴板
- 下载文章为图片功能

## 开发命令

```bash
# 开发服务器
npm run dev

# 构建生产版本
npm run build

# 代码检查
npm run lint

# 预览构建结果
npm run preview
```

## 架构设计

### 核心架构
- **主题系统**: 通过 `ThemeContext` 管理文章样式主题，支持动态切换
- **文章生成**: `articleApi.ts` 封装 AI API 调用，包含错误处理和备用内容生成
- **组件化设计**: 按功能拆分组件，每个组件有独立的 CSS 文件
- **类型安全**: 完整的 TypeScript 类型定义，特别是主题系统的复杂类型结构

### 目录结构
```
src/
├── api/                    # API 调用层
├── components/             # 组件库
│   ├── ArticleForm/        # 文章生成表单
│   ├── ArticlePreview/     # 文章预览组件
│   │   └── themes/         # 文章主题组件
│   └── [其他基础组件]/
├── contexts/               # React Context
├── themes/                 # 主题配置和预设
├── utils/                  # 工具函数
└── hooks/                  # 自定义 Hook
```

### 主题系统
主题系统是核心特性，包含：
- `ArticleTheme` 接口定义完整的样式结构（容器、标题、段落、分割线等）
- 预设主题：官方、商务、温暖、科技风格
- 通过 `ThemeContext` 提供全局主题状态管理
- 支持响应式配置和动态主题切换

### API 集成
- 使用 GLM-4-Flash 模型生成文章内容
- 包含完整的错误处理和备用内容生成机制
- 使用 `jsonrepair` 库处理 AI 返回的不规范 JSON

## 开发注意事项

- **样式约束**: 禁止使用 Tailwind CSS，必须使用传统 CSS 文件
- **UI 风格**: 遵循 shadcn/ui 设计风格但不安装组件库
- **移动端适配**: 预览区域固定为手机屏幕尺寸（375px × 667px）
- **类型安全**: 所有 API 接口和组件都有完整的 TypeScript 类型定义

## AI API 配置

当前使用 GLM-4-Flash 模型，API 配置在 `src/api/articleApi.ts` 中。如需修改 AI 服务，更新 `AI_CONFIG` 常量即可。

## 主要依赖

- React 19 + TypeScript
- html2canvas (截图下载功能)
- jsonrepair (JSON 修复)
- lucide-react (图标库)