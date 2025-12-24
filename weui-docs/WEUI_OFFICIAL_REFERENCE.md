# WeUI 官方文档参考

## 重要说明

**本项目中的所有颜色值、Token 命名、组件定义等都应严格遵循 WeUI 官方文档规范。**

## 官方文档链接

### 主要文档
1. **WeUI Multi-Platform Guide**（推荐）
   - URL: https://weui-multi-platform.pages.woa.com/guide/
   - 这是 WeUI 多平台设计指南，包含完整的设计规范和组件说明

2. **WeUI 官方文档**
   - URL: https://weui.io/
   - WeUI 基础组件库文档

3. **WeUI GitHub**
   - URL: https://github.com/Tencent/weui
   - 源代码和最新更新

## 需要验证的内容

### 1. 颜色值
- [ ] 所有颜色值是否与 WeUI 官方文档一致
- [ ] 白天模式和暗黑模式的颜色映射是否正确
- [ ] 功能色（成功、警告、错误、信息）的颜色值是否正确

### 2. Token 命名
- [ ] Token 命名规范是否符合 WeUI 官方标准
- [ ] 是否有 WeUI 官方推荐的 Token 命名方式

### 3. 组件颜色
- [ ] 各组件使用的颜色是否符合 WeUI 官方规范
- [ ] 按钮、输入框、列表等组件的颜色定义是否正确

### 4. 遮罩和覆盖层
- [ ] 遮罩颜色的透明度值是否符合 WeUI 官方规范
- [ ] 遮罩的使用场景是否正确

## 当前实现状态

### 已参考的文档
- `WEUI_LEARNING.md` - WeUI 设计原则学习
- `WEUI_APPLY_GUIDE.md` - WeUI 应用指南
- `DARK_MODE_COLOR_MAPPING.md` - 暗黑模式颜色映射

### 需要验证的文件
- `colorToken.html` - 颜色 Token 展示
- `designTokenTable.html` - Token 表格
- `check_missing_tokens.js` - Token 检查脚本

## 验证步骤

1. **访问 WeUI 官方文档**
   - 打开 https://weui-multi-platform.pages.woa.com/guide/
   - 查看颜色系统章节
   - 查看组件颜色规范

2. **对比颜色值**
   - 使用 `check_missing_tokens.js` 检查缺失的 Token
   - 对比官方文档中的颜色值
   - 更新不一致的颜色值

3. **验证 Token 命名**
   - 检查 Token 命名是否符合官方规范
   - 如有官方命名规范，应遵循官方规范

4. **更新文档**
   - 如有发现不一致，应及时更新相关文件
   - 在文档中标注颜色值的来源（官方文档链接）

## 注意事项

1. **优先使用官方文档**
   - 所有颜色值和规范应以 WeUI 官方文档为准
   - 如有疑问，优先参考官方文档

2. **保持更新**
   - WeUI 官方文档可能会更新
   - 应定期检查并更新项目中的颜色值和规范

3. **标注来源**
   - 在代码和文档中标注颜色值的来源
   - 引用官方文档链接

## 相关文件

- `WEUI_LEARNING.md` - WeUI 学习指南
- `WEUI_APPLY_GUIDE.md` - WeUI 应用指南
- `DARK_MODE_COLOR_MAPPING.md` - 暗黑模式颜色映射
- `colorToken.html` - 颜色 Token 展示页面
- `designTokenTable.html` - Token 表格页面
- `check_missing_tokens.js` - Token 检查脚本

