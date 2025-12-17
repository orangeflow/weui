# Red Packet Components

紅包組件庫 - 用於實現 Figma 設計的 React 組件結構

## 組件結構

```
components/RedPacket/
├── RedPacketCard.tsx      # 主要紅包卡片組件
├── RedPacketIcon.tsx      # 紅包圖標組件
├── RedPacketButton.tsx    # 紅包按鈕組件
├── RedPacketList.tsx      # 紅包列表組件
├── index.ts               # 導出文件
└── README.md              # 文檔
```

## 組件說明

### RedPacketCard
主要的紅包卡片組件，支持三種狀態：
- `unopened`: 未開啟狀態
- `opened`: 已開啟狀態
- `expired`: 已過期狀態

**Props:**
- `title`: 標題（默認: "恭喜發財"）
- `subtitle`: 副標題（默認: "大吉大利"）
- `amount`: 金額
- `sender`: 發送者名稱
- `message`: 祝福訊息
- `status`: 狀態
- `onOpen`: 開啟回調函數

### RedPacketIcon
紅包圖標 SVG 組件

**Props:**
- `size`: 圖標大小（默認: 48）
- `className`: 自定義樣式類

### RedPacketButton
紅包按鈕組件，支持主要和次要樣式

**Props:**
- `children`: 按鈕內容
- `onClick`: 點擊事件
- `disabled`: 是否禁用
- `variant`: 樣式變體（'primary' | 'secondary'）

### RedPacketList
紅包列表組件，用於展示多個紅包

**Props:**
- `packets`: 紅包數據數組
- `onPacketOpen`: 開啟紅包回調

## 使用示例

```tsx
import { RedPacketCard } from '@/components/RedPacket'

<RedPacketCard
  title="恭喜發財"
  subtitle="大吉大利"
  amount={88.88}
  sender="張三"
  message="祝您新年快樂！"
  status="unopened"
  onOpen={() => console.log('Opened!')}
/>
```

## 樣式

組件使用 Tailwind CSS 進行樣式設計，支持：
- 漸變背景
- 動畫效果
- 響應式設計
- 自定義主題顏色

## 待完善

根據 Figma 設計稿（node-id: 7-486）進行以下調整：
1. 精確的顏色值
2. 字體大小和間距
3. 具體的布局結構
4. 動畫效果細節
5. 交互邏輯

