# Next.js React 应用

基于 Next.js 和 React 的现代 Web 应用。

## 项目结构

```
nextjs-app/
├── app/                  # Next.js App Router 目录
│   ├── layout.tsx        # 根布局
│   ├── page.tsx          # 首页
│   └── globals.css       # 全局样式
├── components/            # React 组件
│   ├── PaymentButton.tsx
│   ├── PaymentCard.tsx
│   ├── PaymentInterface.tsx
│   ├── NFCIcon.tsx
│   └── RedPacket/         # 红包相关组件
│       ├── RedPacketButton.tsx
│       ├── RedPacketCard.tsx
│       ├── RedPacketIcon.tsx
│       ├── RedPacketList.tsx
│       └── index.ts
├── next.config.js         # Next.js 配置文件
├── package.json           # 项目依赖配置
├── tsconfig.json          # TypeScript 配置
├── tailwind.config.js     # Tailwind CSS 配置
└── postcss.config.js      # PostCSS 配置
```

## 安装和运行

```bash
cd nextjs-app
npm install
npm run dev
```

应用将在 http://localhost:3000 启动。

## 组件说明

### 支付相关
- `PaymentButton` - 支付按钮组件
- `PaymentCard` - 支付卡片组件
- `PaymentInterface` - 支付界面组件
- `NFCIcon` - NFC 图标组件

### 红包相关
- `RedPacketButton` - 红包按钮
- `RedPacketCard` - 红包卡片
- `RedPacketIcon` - 红包图标
- `RedPacketList` - 红包列表
