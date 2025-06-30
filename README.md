# Vue3 H5 Demo

基于 Vue 3 + Vite 的移动端 H5 项目模板，集成了常用的移动端开发工具和最佳实践。

## 技术栈

- 🚀 [Vue 3](https://vuejs.org/) - 渐进式 JavaScript 框架
- ⚡️ [Vite](https://vitejs.dev/) - 下一代前端构建工具
- 📦 [Pinia](https://pinia.vuejs.org/) - Vue 的状态管理库
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- 📱 [Vant](https://vant-ui.github.io/vant/#/zh-CN) - 轻量、可靠的移动端 Vue 组件库
- 🔍 [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集
- 🛠 [ESLint](https://eslint.org/) - 代码检查工具

## 特性

- 🎯 基于 Vue 3 + TypeScript + Vite 构建
- 📱 移动端适配方案（postcss-mobile-forever）
- 🎨 Tailwind CSS 工具类优先
- 📦 组件自动导入
- 🔄 状态管理（Pinia）
- 🛣 路由管理（Vue Router）
- 📦 持久化存储
- 📝 代码规范（ESLint + Prettier）
- 🔍 TypeScript 支持

## 开发环境要求

- Node.js >= 16.0.0
- pnpm >= 8.0.0

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发环境运行

```bash
pnpm dev
```

### 生产环境构建

```bash
pnpm build
```

### 代码检查

```bash
pnpm lint
```

## 项目结构

```
├── src/
│   ├── assets/        # 静态资源
│   ├── components/    # 公共组件
│   ├── composables/   # 组合式函数
│   ├── layouts/       # 布局组件
│   ├── pages/         # 页面组件
│   ├── stores/        # 状态管理
│   ├── styles/        # 全局样式
│   ├── types/         # 类型定义
│   ├── utils/         # 工具函数
│   ├── App.vue        # 根组件
│   └── main.ts        # 入口文件
├── .cursor/           # 项目规范文档
├── public/            # 公共资源
└── vite.config.ts     # Vite 配置
```

## 开发规范

### 样式规范

- 设计稿基准宽度：375px
- 使用 postcss-mobile-forever 自动将 px 转换为 rem
- 转换比例：1rem = 100px
- 优先使用 Tailwind CSS 类名
- 复杂样式使用 SCSS

### 组件规范

- 使用 `<script setup>` 语法
- 组件名使用 PascalCase 命名
- Props 必须指定类型
- 使用 TypeScript 类型注解

### 状态管理

- 使用 Pinia 进行状态管理
- 状态仓库按功能模块划分
- 使用 `storeToRefs` 保持响应性

## 推荐 IDE 设置

- [VSCode](https://code.visualstudio.com/)
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (禁用 Vetur)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## 相关文档

- [Vue 3 文档](https://vuejs.org/)
- [Vite 文档](https://vitejs.dev/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Vant 文档](https://vant-ui.github.io/vant/#/zh-CN)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Vitest 文档](https://vitest.dev/)

## 许可证

[MIT](LICENSE)
