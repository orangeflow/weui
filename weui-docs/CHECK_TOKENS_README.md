# 颜色 Token 检查脚本使用说明

## 概述

`check_missing_tokens.js` 是一个自动检查脚本，用于确保 `colorToken.html` 中使用的所有颜色值都有对应的 Token 定义。

## 功能

1. **自动提取颜色值**
   - 从 `colorToken.html` 中提取所有实际使用的颜色值
   - 支持多种颜色值格式（hex、rgba）
   - 从多个位置提取（`.color-value`, `.comparison-value`, `.color-mapping-value`）

2. **提取 Token 定义**
   - 从 `designTokenTable.html` 中提取所有 Token 定义
   - 提取 `baseColorTokens` 映射表中的颜色值

3. **对比分析**
   - 对比实际使用的颜色和已定义的 Token
   - 识别缺失 Token 的颜色
   - 识别样式效果颜色（不需要 Token 的颜色，如动画过渡色）

4. **生成详细报告**
   - 显示已找到 Token 的颜色数量
   - 显示样式效果颜色（无需 Token）
   - 显示缺失 Token 的颜色列表
   - 提供建议的 Token 名称
   - 列出所有 Token 定义及其使用情况

## 使用方法

### 基本使用

```bash
cd dayAndNight
node check_missing_tokens.js
```

### 输出说明

脚本会生成以下信息：

- ✅ **已找到 Token 的颜色**：在 `colorToken.html` 中使用且已有对应 Token 的颜色
- 🎨 **样式效果颜色（无需 Token）**：用于 CSS 动画/效果的颜色，不需要 Token
- ❌ **缺失 Token 的颜色**：在 `colorToken.html` 中使用但没有对应 Token 的颜色
- 📝 **Token 定义详情**：所有 Token 的定义及其在 `colorToken.html` 中的使用情况

### 状态标识

- ✅ 表示该 Token 的颜色值在 `colorToken.html` 中被使用
- ⚠️ 表示该 Token 的颜色值在 `colorToken.html` 中未被使用（可能是旧版本或备用颜色）

## 示例输出

```
🔍 开始检查颜色 Token...

📄 从 colorToken.html 提取颜色值...
   找到 37 个颜色值

📋 从 designTokenTable.html 提取 Token 定义...
   找到 101 个 Token 定义
   找到 37 个基础 Token 映射

============================================================
📊 检查报告
============================================================

✅ 已找到 Token 的颜色: 34 个
🎨 样式效果颜色（无需 Token）: 3 个
❌ 缺失 Token 的颜色: 0 个

🎉 所有颜色都有对应的 Token！
```

## 注意事项

1. **样式效果颜色**：脚本会自动识别用于 CSS 动画/效果的颜色（如高亮动画过渡色），这些颜色不需要 Token。

2. **颜色值标准化**：脚本会自动标准化颜色值（去除空格，统一大小写）进行对比。

3. **建议的 Token 名称**：对于缺失的颜色，脚本会根据颜色值自动建议 Token 名称，但需要人工确认。

## 维护建议

1. **定期运行**：在更新 `colorToken.html` 或 `designTokenTable.html` 后运行此脚本，确保所有颜色都有对应的 Token。

2. **修复缺失**：如果发现缺失 Token 的颜色，应该：
   - 在 `designTokenTable.html` 中添加对应的 Token 定义
   - 在 `baseColorTokens` 映射表中添加颜色到 Token 的映射
   - 更新 `colorToken.html` 和 `designTokenTable.html` 中的映射表

3. **保持一致性**：确保 `colorToken.html` 和 `designTokenTable.html` 中的颜色值保持一致。

## 技术细节

- **语言**：Node.js (JavaScript)
- **依赖**：仅使用 Node.js 内置模块（fs, path）
- **兼容性**：Node.js 12+

## 故障排除

如果脚本无法运行：

1. 确保已安装 Node.js（版本 12 或更高）
2. 确保 `colorToken.html` 和 `designTokenTable.html` 文件存在于 `dayAndNight` 目录中
3. 检查文件路径是否正确

