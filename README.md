# NFC 支付界面 - Figma 设计实现

这是一个基于 Next.js 和 TypeScript 的 NFC 支付界面实现项目。

## 功能特性

- 🎨 现代化的 UI 设计
- 📱 响应式布局
- ⚡ 流畅的动画效果
- 🎯 TypeScript 类型安全
- 🎨 Tailwind CSS 样式系统

## 技术栈

- **Next.js 14** - React 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 实用优先的 CSS 框架
- **React Hooks** - 状态管理

## 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 运行开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 3. 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
figma-playground/
├── app/
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 主页
│   └── globals.css         # 全局样式
├── components/
│   ├── PaymentInterface.tsx  # 主支付界面组件
│   ├── PaymentCard.tsx       # 支付卡片组件
│   ├── PaymentButton.tsx     # 支付按钮组件
│   └── NFCIcon.tsx           # NFC 图标组件
├── package.json
└── tsconfig.json
```

## 组件说明

### PaymentInterface
主支付界面组件，包含完整的支付流程 UI。

### PaymentCard
显示支付信息的卡片组件，包括商户信息、金额、状态等。

### PaymentButton
支付按钮组件，支持不同状态（待支付、处理中、成功、失败）。

### NFCIcon
NFC 图标组件，带有动画效果。

## 连接 Figma 获取设计详情

本项目支持通过 TalkToFigma MCP 服务器连接 Figma 获取设计详情。

### 使用步骤：

1. 确保 Figma 桌面应用已打开
2. 在 Figma 中选择要实现的设计节点
3. 确保 TalkToFigma 插件已连接
4. 设计详情将自动同步

## 自定义设计

当前实现为通用 NFC 支付界面。要匹配 Figma 设计：

1. 在 Figma 中打开设计文件
2. 选择节点 ID: `779-2751`
3. 获取设计规格（颜色、字体、间距等）
4. 更新 `tailwind.config.js` 中的主题配置
5. 调整组件样式以匹配设计

## 开发

### 代码检查

```bash
npm run lint
```

## 许可证

MIT
