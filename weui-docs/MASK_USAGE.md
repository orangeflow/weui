# 遮罩和覆盖层使用场景说明

## 概述

遮罩和覆盖层（Mask & Overlay）是 MimicUI 设计中用于创建视觉层次和交互反馈的重要元素。它们通过半透明的颜色层来实现不同的视觉效果。

## 主要使用场景

### 1. 模态框（Dialog/Modal）背景遮罩

**用途**：当对话框或模态框弹出时，在背景添加半透明遮罩，突出对话框内容并阻止用户与背景交互。

**颜色值**：
- 白天模式：`rgba(0, 0, 0, 0.4)` - 40% 黑色遮罩
- 暗黑模式：`rgba(0, 0, 0, 0.6)` - 60% 黑色遮罩（需要更深的遮罩以保持对比度）

**实现示例**：
```html
<!-- 遮罩层 -->
<div class="mask-overlay" id="maskOverlay"></div>

<!-- 模态框 -->
<div class="modal-container">
  <div class="modal-content">
    <!-- 对话框内容 -->
  </div>
</div>
```

```css
.mask-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
}

[data-theme="dark"] .mask-overlay {
  background-color: rgba(0, 0, 0, 0.6);
}

.modal-container {
  position: fixed;
  z-index: 200;
  /* 模态框内容 */
}
```

**使用场景**：
- 确认对话框
- 输入对话框
- 提示对话框
- 账户已存在提示（如项目中的 `accountExistsModal`）

### 2. 操作表（ActionSheet）背景遮罩

**用途**：操作表从底部弹出时，背景遮罩用于：
- 突出操作表内容
- 阻止用户点击背景关闭操作表
- 提供视觉层次感

**颜色值**：与模态框相同
- 白天模式：`rgba(0, 0, 0, 0.4)`
- 暗黑模式：`rgba(0, 0, 0, 0.6)`

**实现示例**：
```html
<div class="action-sheet-mask"></div>
<div class="action-sheet">
  <div class="action-sheet-item">选项 1</div>
  <div class="action-sheet-item">选项 2</div>
  <div class="action-sheet-cancel">取消</div>
</div>
```

### 3. 加载（Loading）遮罩

**用途**：全屏加载时，使用更深的遮罩来：
- 完全遮挡背景内容
- 突出加载指示器
- 防止用户在加载过程中进行操作

**颜色值**：
- 白天模式：`rgba(0, 0, 0, 0.8)` - 80% 黑色遮罩
- 暗黑模式：`rgba(0, 0, 0, 0.8)` - 两种模式使用相同值

**实现示例**：
```html
<div class="loading-mask">
  <div class="loading-spinner"></div>
  <p>加载中...</p>
</div>
```

```css
.loading-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
```

### 4. 按钮激活状态遮罩

**用途**：按钮按下时，使用浅色遮罩提供视觉反馈。

**颜色值**：
- 白天模式：`rgba(0, 0, 0, 0.1)` - 10% 黑色遮罩
- 暗黑模式：`rgba(255, 255, 255, 0.05)` - 5% 白色遮罩

**实现示例**：
```css
.mimicui-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 0.2s;
}

.mimicui-btn:active::before {
  opacity: 1;
}

[data-theme="dark"] .mimicui-btn::before {
  background-color: rgba(255, 255, 255, 0.05);
}
```

**使用场景**：
- 主要按钮按下效果
- 次要按钮按下效果
- 文字按钮按下效果

### 5. 列表项/单元格激活状态遮罩

**用途**：列表项或单元格点击时，使用浅色遮罩提供触摸反馈。

**颜色值**：
- 白天模式：`rgba(0, 0, 0, 0.05)` - 5% 黑色遮罩
- 暗黑模式：`rgba(255, 255, 255, 0.05)` - 5% 白色遮罩

**实现示例**：
```css
.mimicui-cell::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.05);
  opacity: 0;
  transition: opacity 0.2s;
}

.mimicui-cell:active::before {
  opacity: 1;
}

[data-theme="dark"] .mimicui-cell::before {
  background-color: rgba(255, 255, 255, 0.05);
}
```

**使用场景**：
- 可点击的列表项
- 单元格点击反馈
- 导航项点击反馈

### 6. 按钮禁用状态遮罩

**用途**：按钮禁用时，使用极浅的遮罩表示不可用状态。

**颜色值**：
- 白天模式：`rgba(0, 0, 0, 0.05)` - 5% 黑色遮罩
- 暗黑模式：`rgba(255, 255, 255, 0.02)` - 2% 白色遮罩

**实现示例**：
```css
.mimicui-btn_disabled {
  opacity: 0.5;
}

.mimicui-btn_disabled::before {
  background-color: rgba(0, 0, 0, 0.05);
  opacity: 1;
}
```

## 遮罩层透明度选择原则

### 1. 模态框/操作表遮罩
- **白天模式**：40% (`rgba(0, 0, 0, 0.4)`)
- **暗黑模式**：60% (`rgba(0, 0, 0, 0.6)`)
- **原因**：暗黑模式下需要更深的遮罩来保持足够的对比度

### 2. 加载遮罩
- **两种模式**：80% (`rgba(0, 0, 0, 0.8)`)
- **原因**：需要完全遮挡背景，突出加载状态

### 3. 按钮/列表项激活遮罩
- **白天模式**：5-10% (`rgba(0, 0, 0, 0.05-0.1)`)
- **暗黑模式**：5% (`rgba(255, 255, 255, 0.05)`)
- **原因**：提供轻微的视觉反馈，不影响主要内容

## 实现技巧

### 1. 使用伪元素
```css
.button::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 0.2s;
}

.button:active::before {
  opacity: 1;
}
```

### 2. 使用独立遮罩层
```html
<div class="mask-overlay"></div>
<div class="modal">内容</div>
```

### 3. 点击遮罩关闭
```javascript
maskOverlay.addEventListener('click', () => {
  closeModal();
});
```

## 在项目中的实际应用

### 示例 1：账户已存在模态框
```javascript
// app.js
function showAccountExistsModal() {
  maskOverlay.style.display = 'block';
  accountExistsModal.style.display = 'block';
}

function closeModal() {
  maskOverlay.style.display = 'none';
  accountExistsModal.style.display = 'none';
}

// 点击遮罩关闭
maskOverlay.addEventListener('click', closeModal);
```

### 示例 2：CSS 实现
```css
/* styles.css */
.mask-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 375px;
  height: 812px;
  background-color: var(--bl-mask-color-dark); /* rgba(0, 0, 0, 0.4) */
  z-index: 100;
}
```

## 总结

遮罩和覆盖层在 MimicUI 设计体系中的主要作用：

1. **视觉层次**：通过遮罩突出重要内容（模态框、操作表）
2. **交互反馈**：提供按钮、列表项的点击反馈
3. **状态指示**：表示加载、禁用等状态
4. **用户体验**：阻止用户在不合适的时机进行操作

选择合适的透明度值对于保持良好的用户体验和视觉一致性至关重要。

