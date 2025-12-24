# 将 MimicUI 设计原则应用到当前项目

## 当前项目分析

基于 MimicUI 的设计原则，以下是针对当前 Web3 Wallet 项目的优化建议：

## 1. 颜色系统优化

### 当前问题
- 颜色定义可能不够统一
- 缺少语义化的颜色命名

### MimicUI 建议
```css
/* 建议的颜色变量系统 */
:root {
  /* 主色调 - 微信绿 */
  --mimicui-color-primary: #07C160;
  --mimicui-color-primary-hover: #06AD56;
  --mimicui-color-primary-active: #059648;
  
  /* 文本颜色 */
  --mimicui-text-color-primary: #000000;
  --mimicui-text-color-secondary: #888888;
  --mimicui-text-color-tertiary: #BBBBBB;
  
  /* 背景颜色 */
  --mimicui-bg-color-primary: #FFFFFF;
  --mimicui-bg-color-secondary: #F7F7F7;
  --mimicui-bg-color-tertiary: #EDEDED;
  
  /* 边框颜色 */
  --mimicui-border-color-base: #E5E5E5;
  --mimicui-border-color-light: #F0F0F0;
  
  /* 状态颜色 */
  --mimicui-color-success: #07C160;
  --mimicui-color-warning: #FA9D3B;
  --mimicui-color-danger: #FA5151;
  --mimicui-color-info: #10AEFF;
}
```

## 2. 按钮设计规范

### MimicUI 按钮规范
- **主要按钮**：背景色为主色调，文字为白色
- **次要按钮**：边框为主色调，背景为白色
- **文字按钮**：仅文字，无背景和边框
- **最小点击区域**：44px × 44px（移动端）

### 应用到当前项目
```css
/* 主要按钮 */
.mimicui-btn_primary {
  background-color: var(--mimicui-color-primary);
  color: #FFFFFF;
  border: none;
  border-radius: 4px;
  min-height: 44px;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.mimicui-btn_primary:active {
  background-color: var(--mimicui-color-primary-active);
}

/* 次要按钮 */
.mimicui-btn_default {
  background-color: #FFFFFF;
  color: var(--mimicui-color-primary);
  border: 1px solid var(--mimicui-color-primary);
  border-radius: 4px;
  min-height: 44px;
}

/* 文字按钮 */
.mimicui-btn_plain {
  background-color: transparent;
  color: var(--mimicui-color-primary);
  border: none;
  min-height: 44px;
}
```

## 3. 表单输入规范

### MimicUI 输入框规范
- **标签**：清晰的标签文字，14px，次要文本色
- **输入框**：边框 1px，圆角 4px，内边距 12-16px
- **占位符**：使用次要文本色
- **错误状态**：红色边框和错误提示

### 应用到当前项目
```css
/* 输入框容器 */
.mimicui-input-wrapper {
  margin-bottom: 16px;
}

.mimicui-input-label {
  display: block;
  font-size: 14px;
  color: var(--mimicui-text-color-secondary);
  margin-bottom: 8px;
}

/* 输入框 */
.mimicui-input {
  width: 100%;
  height: 44px;
  padding: 12px 16px;
  border: 1px solid var(--mimicui-border-color-base);
  border-radius: 4px;
  font-size: 16px;
  background-color: var(--mimicui-bg-color-primary);
  transition: border-color 0.2s;
}

.mimicui-input:focus {
  border-color: var(--mimicui-color-primary);
  outline: none;
}

.mimicui-input::placeholder {
  color: var(--mimicui-text-color-tertiary);
}

/* 错误状态 */
.mimicui-input-error {
  border-color: var(--mimicui-color-danger);
}

.mimicui-input-error-msg {
  font-size: 12px;
  color: var(--mimicui-color-danger);
  margin-top: 4px;
}
```

## 4. 间距系统

### MimicUI 间距规范
使用 4px 的倍数作为基础间距单位：
- 4px：最小间距
- 8px：小间距
- 12px：中小间距
- 16px：中间距
- 24px：大间距
- 32px：超大间距

### 应用到当前项目
```css
/* 间距工具类 */
.mimicui-mt-xs { margin-top: 4px; }
.mimicui-mt-sm { margin-top: 8px; }
.mimicui-mt-md { margin-top: 16px; }
.mimicui-mt-lg { margin-top: 24px; }
.mimicui-mt-xl { margin-top: 32px; }

.mimicui-mb-xs { margin-bottom: 4px; }
.mimicui-mb-sm { margin-bottom: 8px; }
.mimicui-mb-md { margin-bottom: 16px; }
.mimicui-mb-lg { margin-bottom: 24px; }
.mimicui-mb-xl { margin-bottom: 32px; }

.mimicui-p-xs { padding: 4px; }
.mimicui-p-sm { padding: 8px; }
.mimicui-p-md { padding: 16px; }
.mimicui-p-lg { padding: 24px; }
.mimicui-p-xl { padding: 32px; }
```

## 5. 列表设计规范

### MimicUI 列表规范
- **列表项高度**：至少 44px
- **分隔线**：1px，浅灰色
- **图标尺寸**：24px × 24px
- **文字对齐**：垂直居中

### 应用到当前项目
```css
.mimicui-list {
  background-color: var(--mimicui-bg-color-primary);
}

.mimicui-list-item {
  display: flex;
  align-items: center;
  min-height: 44px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--mimicui-border-color-light);
}

.mimicui-list-item:last-child {
  border-bottom: none;
}

.mimicui-list-item-icon {
  width: 24px;
  height: 24px;
  margin-right: 12px;
}

.mimicui-list-item-content {
  flex: 1;
  font-size: 16px;
  color: var(--mimicui-text-color-primary);
}
```

## 6. 对话框/模态框规范

### MimicUI 对话框规范
- **圆角**：8px
- **最大宽度**：移动端 90%，桌面端 400px
- **标题**：18px，加粗
- **内容**：14px，次要文本色
- **按钮**：底部对齐，高度 44px

### 应用到当前项目
```css
.mimicui-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 400px;
  background-color: var(--mimicui-bg-color-primary);
  border-radius: 8px;
  z-index: 200;
}

.mimicui-dialog-header {
  padding: 24px 24px 16px;
  text-align: center;
}

.mimicui-dialog-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--mimicui-text-color-primary);
}

.mimicui-dialog-content {
  padding: 0 24px 24px;
  font-size: 14px;
  color: var(--mimicui-text-color-secondary);
  line-height: 1.5;
}

.mimicui-dialog-footer {
  display: flex;
  border-top: 1px solid var(--mimicui-border-color-light);
}

.mimicui-dialog-btn {
  flex: 1;
  height: 44px;
  border: none;
  background: transparent;
  font-size: 16px;
  color: var(--mimicui-color-primary);
}
```

## 7. 交互反馈规范

### MimicUI 交互反馈
- **点击反馈**：使用 `:active` 伪类，透明度 0.7 或背景色变化
- **加载状态**：显示加载动画
- **禁用状态**：透明度 0.5，禁用指针事件

### 应用到当前项目
```css
/* 点击反馈 */
.mimicui-btn:active {
  opacity: 0.7;
  transform: scale(0.98);
}

/* 加载状态 */
.mimicui-loading {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid var(--mimicui-border-color-base);
  border-top-color: var(--mimicui-color-primary);
  border-radius: 50%;
  animation: mimicui-loading 1s linear infinite;
}

@keyframes mimicui-loading {
  to { transform: rotate(360deg); }
}

/* 禁用状态 */
.mimicui-btn_disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}
```

## 8. 字体规范

### MimicUI 字体规范
- **标题**：18-20px，字重 600-700
- **正文**：14-16px，字重 400-500
- **辅助文字**：12-14px，字重 400
- **行高**：通常是字体大小的 1.4-1.6 倍

### 应用到当前项目
```css
.mimicui-text-title {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--mimicui-text-color-primary);
}

.mimicui-text-body {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--mimicui-text-color-primary);
}

.mimicui-text-caption {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
  color: var(--mimicui-text-color-secondary);
}

.mimicui-text-helper {
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;
  color: var(--mimicui-text-color-tertiary);
}
```

## 9. 实践建议

### 步骤 1：建立设计系统
1. 定义颜色变量
2. 建立间距系统
3. 统一字体规范
4. 创建组件库

### 步骤 2：重构现有组件
1. 按钮组件：统一按钮样式
2. 输入框组件：优化输入体验
3. 列表组件：统一列表样式
4. 对话框组件：优化模态框

### 步骤 3：测试和优化
1. 在不同设备上测试
2. 检查可访问性
3. 优化交互反馈
4. 确保一致性

## 10. 参考资源

- **MimicUI 官方文档**：https://mimicui.io/
- **MimicUI GitHub**：https://github.com/Tencent/mimicui
- **MimicUI Multi-Platform Guide**：https://mimicui-multi-platform.pages.woa.com/guide/
- **MimicUI 源码学习**：查看 MimicUI 的 CSS 和组件实现

## 总结

将 MimicUI 的设计原则应用到当前项目，主要关注：
1. **统一性**：建立统一的设计系统
2. **可用性**：确保所有元素都易于操作
3. **一致性**：在整个应用中保持一致的视觉和交互
4. **反馈性**：提供清晰的操作反馈
5. **简洁性**：去除不必要的装饰，专注于内容

