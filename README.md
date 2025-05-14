# 工作流编辑器

一个基于Next.js的可视化工作流编辑器，支持自定义节点和流程设计。

## 技术栈

- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn/ui组件库
- React Flow

## 安装运行

1. 安装依赖：
```bash
pnpm install
```

2. 启动开发服务器：
```bash
pnpm dev
```

3. 访问 http://localhost:3000

## 功能特性

- 可视化工作流设计
- 支持多种节点类型（开始/结束/任务/条件）
- 节点属性编辑
- 工作流导入导出
- 响应式设计，支持移动端

## 项目结构

```
├── app/            # Next.js页面路由
├── components/      # React组件
│   ├── nodes/       # 各种节点组件
│   ├── ui/          # UI组件库
│   └── ...          # 其他编辑器组件
├── lib/             # 工具函数
├── public/          # 静态资源
└── styles/          # 全局样式
```

## 贡献指南

欢迎提交Pull Request，请确保：
1. 代码符合项目风格
2. 通过ESLint检查
3. 添加必要的测试
