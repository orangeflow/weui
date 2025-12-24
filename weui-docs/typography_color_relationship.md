# 字体样式与文字颜色对应关系分析

## 当前 Token 定义

### 字体样式 Token
- **FONT-SIZE-01** (超大标题): 32px, 700, 1.2 - 页面主标题、重要提示标题
- **FONT-SIZE-02** (大标题): 24px, 600, 1.3 - 章节标题、对话框标题
- **FONT-SIZE-03** (标题): 20px, 600, 1.4 - 列表项标题、卡片标题
- **FONT-SIZE-04** (正文): 16px, 400, 1.5 - 正文内容、描述文字
- **FONT-SIZE-05** (小正文): 14px, 400, 1.5 - 辅助说明、次要内容
- **FONT-SIZE-06** (辅助文字): 12px, 400, 1.4 - 提示文字、标签、时间

### 文字颜色 Token
- **TXT-01** (主要文本): rgba(0,0,0,0.9) / rgba(255,255,255,0.9) - 页面标题、重要内容、导航栏标题
- **TXT-02** (次要文本): rgba(0,0,0,0.6) / rgba(255,255,255,0.6) - 描述文字、列表项副标题、标签页未选中
- **TXT-03** (辅助文本): rgba(0,0,0,0.4) / rgba(255,255,255,0.4) - 提示文字、占位符、辅助说明
- **TXT-04** (禁用文本): rgba(0,0,0,0.2) / rgba(255,255,255,0.2) - 禁用按钮文字、不可用状态文字

## 从 usage 字段分析对应关系

### 可能的固定对应关系

1. **标题类** → **TXT-01** (主要文本)
   - FONT-SIZE-01 (超大标题) - usage: "页面主标题" → TXT-01 usage: "页面标题"
   - FONT-SIZE-02 (大标题) - usage: "章节标题、对话框标题" → TXT-01 usage: "导航栏标题"
   - FONT-SIZE-03 (标题) - usage: "列表项标题、卡片标题" → TXT-01 usage: "重要内容"

2. **正文类** → **TXT-01** (主要文本)
   - FONT-SIZE-04 (正文) - usage: "正文内容、描述文字" → TXT-01 usage: "重要内容"

3. **辅助类** → **TXT-02** 或 **TXT-03** (次要/辅助文本)
   - FONT-SIZE-05 (小正文) - usage: "辅助说明、次要内容" → TXT-02 usage: "描述文字"
   - FONT-SIZE-06 (辅助文字) - usage: "提示文字、标签、时间" → TXT-03 usage: "提示文字、占位符"

## 从 MimicUI 文档分析（WEUI_APPLY_GUIDE.md）

根据 MimicUI 文档中的示例：

```css
.mimicui-text-title {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--mimicui-text-color-primary);  /* TXT-01 */
}

.mimicui-text-body {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: var(--mimicui-text-color-primary);  /* TXT-01 */
}

.mimicui-text-caption {
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
  color: var(--mimicui-text-color-secondary);  /* TXT-02 */
}

.mimicui-text-helper {
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;
  color: var(--mimicui-text-color-tertiary);  /* TXT-03 */
}
```

## 结论

### ✅ 有部分固定对应关系（常见组合）

1. **标题类** (FONT-SIZE-01/02/03) + **TXT-01** (主要文本)
   - 这是最常见的组合
   - 用于页面标题、重要内容

2. **正文类** (FONT-SIZE-04) + **TXT-01** (主要文本)
   - 正文内容通常使用主要文本色

3. **辅助类** (FONT-SIZE-05/06) + **TXT-02/TXT-03** (次要/辅助文本)
   - 辅助说明使用次要文本色
   - 提示文字使用辅助文本色

### ⚠️ 但也有灵活组合（根据场景变化）

1. **同一字体样式可以搭配不同颜色**
   - 例如：FONT-SIZE-04 (正文) 可以搭配：
     - TXT-01 (主要文本) - 正常正文
     - TXT-02 (次要文本) - 次要描述
     - TXT-03 (辅助文本) - 占位符
     - 功能色（链接、成功、警告、错误）

2. **同一颜色可以搭配不同字体样式**
   - 例如：TXT-01 (主要文本) 可以搭配：
     - FONT-SIZE-01 (超大标题)
     - FONT-SIZE-02 (大标题)
     - FONT-SIZE-03 (标题)
     - FONT-SIZE-04 (正文)

3. **特殊场景需要特殊组合**
   - 禁用状态：任何字体样式 + TXT-04 (禁用文本)
   - 链接：任何字体样式 + 链接色 (GREEN-01)
   - 错误提示：任何字体样式 + 错误色 (RED-01)

## 建议

### 推荐做法

1. **建立常见组合的 Token**
   - 可以创建组合 Token，如 `TEXT-STYLE-TITLE` = FONT-SIZE-02 + TXT-01
   - 但保持基础 Token 的独立性，允许灵活组合

2. **文档化常见组合**
   - 在文档中列出推荐的组合方式
   - 但明确说明可以根据场景灵活调整

3. **保持 Token 系统的灵活性**
   - 字体样式和颜色分开定义是正确的
   - 允许开发者根据实际需求自由组合

## 总结

**字体样式和文字颜色没有严格的固定对应关系**，但有**常见的推荐组合**：

- **标题** → 通常用 **TXT-01** (主要文本)
- **正文** → 通常用 **TXT-01** (主要文本)
- **辅助文字** → 通常用 **TXT-02** 或 **TXT-03** (次要/辅助文本)

但在实际使用中，应该根据**具体场景和设计需求**灵活组合，而不是强制绑定。

