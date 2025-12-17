# HTML 版本說明

## 文件說明

`index.html` - 完整的單文件 HTML 版本，包含所有 CSS 和 JavaScript，可以直接在瀏覽器中打開使用。

## 功能特性

### 1. 紅包卡片組件
- **未開啟狀態**：顯示標題、副標題、發送者信息，帶有「開紅包」按鈕
- **已開啟狀態**：顯示金額、發送者信息和祝福訊息
- **已過期狀態**：顯示過期提示

### 2. 視覺效果
- 漸變背景（紅色主題）
- 裝飾性圓圈圖案
- 紅包圖標 SVG
- 平滑的過渡動畫
- 懸停效果

### 3. 交互功能
- 點擊「開紅包」按鈕開啟紅包
- 開啟動畫效果（脈衝動畫）
- 狀態切換動畫
- 響應式設計（支持移動端）

### 4. 紅包列表
- 網格布局展示多個紅包
- 每個紅包獨立狀態管理
- 自動適配不同屏幕尺寸

## 使用方法

### 方法一：直接打開
1. 雙擊 `index.html` 文件
2. 在瀏覽器中查看效果

### 方法二：本地服務器
```bash
# 使用 Python
python3 -m http.server 8000

# 使用 Node.js (需要安裝 http-server)
npx http-server -p 8000

# 然後訪問 http://localhost:8000
```

## 自定義配置

### 修改紅包數據
在 `index.html` 的 JavaScript 部分找到 `redPackets` 數組，可以修改：
- `title`: 標題
- `subtitle`: 副標題
- `amount`: 金額
- `sender`: 發送者
- `message`: 祝福訊息
- `status`: 狀態（'unopened', 'opened', 'expired'）

### 修改顏色主題
在 `<style>` 標籤中修改 CSS 變量：
- 背景漸變：`.red-packet-card.unopened` 中的 `background`
- 按鈕顏色：`.red-packet-button` 中的 `background` 和 `color`
- 金額顏色：`.amount-value` 中的 `color`

### 修改動畫效果
在 CSS 的 `@keyframes` 部分可以調整：
- `pulse-glow`: 脈衝發光效果
- `fadeIn`: 淡入動畫
- `shake`: 搖動動畫

## 響應式設計

- **桌面端**：網格布局，多列顯示
- **平板端**：自動調整列數
- **移動端**：單列顯示，優化觸摸體驗

## 瀏覽器兼容性

- Chrome/Edge (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- 移動端瀏覽器

## 下一步優化

當 Figma 連接可用時，可以：
1. 讀取精確的設計尺寸和間距
2. 獲取準確的顏色值
3. 提取字體信息
4. 實現更精確的布局

## 技術特點

- **純 HTML/CSS/JavaScript**：無需構建工具
- **單文件結構**：易於部署和分享
- **現代 CSS**：使用 Flexbox 和 Grid
- **原生 JavaScript**：無外部依賴
- **語義化 HTML**：良好的可訪問性

