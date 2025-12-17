# 紅包 HTML 網頁

根據 Figma 設計稿生成的 HTML 網頁實現。

## 文件說明

- `index.html` - 完整的 HTML 網頁，包含所有樣式和交互功能

## 功能特性

### 1. 紅包卡片組件
- **未開啟狀態**: 顯示標題、副標題、發送者信息，帶有「開紅包」按鈕
- **已開啟狀態**: 顯示金額、發送者信息和祝福語
- **已過期狀態**: 顯示過期提示

### 2. 視覺效果
- 漸變紅色背景（符合紅包主題）
- 裝飾性圓形圖案
- 平滑的動畫過渡效果
- 響應式設計（支持移動端和桌面端）

### 3. 交互功能
- 點擊「開紅包」按鈕觸發動畫
- 開啟動畫：脈衝效果 + 搖動效果
- 狀態切換：從未開啟到已開啟的平滑過渡

### 4. 動畫效果
- `fadeIn`: 淡入動畫
- `pulse-glow`: 脈衝發光效果
- `shake`: 搖動效果

## 使用方法

### 直接在瀏覽器打開
```bash
# 雙擊 index.html 文件，或在瀏覽器中打開
open index.html
```

### 使用本地服務器（推薦）
```bash
# 使用 Python
python3 -m http.server 8000

# 使用 Node.js (需要安裝 http-server)
npx http-server -p 8000

# 然後在瀏覽器訪問
# http://localhost:8000
```

## 根據 Figma 設計稿調整

當 Figma 連接成功後，可以根據設計稿的實際信息調整以下內容：

### 1. 顏色值
在 `<style>` 標籤中調整：
- 背景漸變色：`background: linear-gradient(...)`
- 文字顏色：`color: ...`
- 按鈕顏色：`.packet-button` 的 `background`

### 2. 字體和大小
- 標題字體大小：`.packet-title` 的 `font-size`
- 金額字體大小：`.packet-amount` 的 `font-size`
- 字體家族：`body` 的 `font-family`

### 3. 間距和布局
- 內邊距：`.packet-content` 的 `padding`
- 圓角：`.red-packet-card` 的 `border-radius`
- 卡片尺寸：`.red-packet-card` 的 `max-width`

### 4. 裝飾元素
- 圓形圖案位置和大小：`.pattern-circle` 的定位
- 圖標樣式：`.packet-icon` 的 SVG

## 設計稿信息

- **Figma 文件**: 紅包-2025-H2
- **節點 ID**: 7-486
- **URL**: https://www.figma.com/design/GON0tB0rZt0YbhdnvmwMnp/%E7%BA%A2%E5%8C%85-2025-H2?node-id=7-486

## 下一步

1. 在 Figma 中打開設計稿
2. 確保 Figma MCP 插件已連接
3. 運行以下命令獲取設計細節：
   ```javascript
   // 使用 MCP 工具讀取節點信息
   get_node_info({ nodeId: '7-486' })
   ```
4. 根據獲取的設計信息調整 HTML 中的樣式值

## 瀏覽器兼容性

- Chrome/Edge (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- 移動端瀏覽器

## 注意事項

- 所有樣式都內聯在 HTML 文件中，便於單文件部署
- 使用現代 CSS 特性（CSS Grid, Flexbox, 漸變等）
- JavaScript 使用原生 ES6+ 語法，無需額外依賴

