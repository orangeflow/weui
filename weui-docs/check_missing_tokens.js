#!/usr/bin/env node

/**
 * 颜色 Token 检查脚本
 * 
 * 功能：
 * 1. 从 colorToken.html 中提取所有实际使用的颜色值
 * 2. 从 designTokenTable.html 中提取所有 token 定义的颜色值
 * 3. 对比两者，找出缺失的颜色
 * 4. 生成详细的检查报告
 */

const fs = require('fs');
const path = require('path');

// 颜色值文件路径
const COLOR_TOKEN_HTML = path.join(__dirname, 'colorToken.html');
const DESIGN_TOKEN_HTML = path.join(__dirname, 'designTokenTable.html');

/**
 * 从 HTML 文件中提取颜色值
 */
function extractColorsFromHTML(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const colors = new Set();
  
  // 匹配 .color-value 元素中的颜色值
  const colorValueRegex = /<div[^>]*class="[^"]*color-value[^"]*"[^>]*>([^<]+)<\/div>/gi;
  let match;
  while ((match = colorValueRegex.exec(content)) !== null) {
    const colorValue = match[1].trim();
    if (colorValue && (colorValue.startsWith('#') || colorValue.startsWith('rgba'))) {
      colors.add(colorValue);
    }
  }
  
  // 匹配 comparison-value 中的颜色值
  const comparisonValueRegex = /<div[^>]*class="[^"]*comparison-value[^"]*"[^>]*>([^<]+)<\/div>/gi;
  while ((match = comparisonValueRegex.exec(content)) !== null) {
    const colorValue = match[1].trim();
    if (colorValue && (colorValue.startsWith('#') || colorValue.startsWith('rgba'))) {
      colors.add(colorValue);
    }
  }
  
  // 匹配 color-mapping-value 中的颜色值
  const mappingValueRegex = /<span[^>]*class="[^"]*color-mapping-value[^"]*"[^>]*>([^<]+)<\/span>/gi;
  while ((match = mappingValueRegex.exec(content)) !== null) {
    const colorValue = match[1].trim();
    if (colorValue && (colorValue.startsWith('#') || colorValue.startsWith('rgba'))) {
      colors.add(colorValue);
    }
  }
  
  // 匹配内联样式中的颜色值（作为补充）
  const inlineStyleRegex = /background-color:\s*([#\w(),.\s]+);/gi;
  while ((match = inlineStyleRegex.exec(content)) !== null) {
    const colorValue = match[1].trim();
    if (colorValue && (colorValue.startsWith('#') || colorValue.startsWith('rgba'))) {
      colors.add(colorValue);
    }
  }
  
  return Array.from(colors).sort();
}

/**
 * 从 designTokenTable.html 中提取 token 定义
 */
function extractTokensFromHTML(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const tokens = [];
  
  // 匹配 designTokens 数组中的 token 定义
  const tokenRegex = /{\s*tokenName:\s*['"]([^'"]+)['"],\s*category:\s*['"]([^'"]+)['"],[^}]*value:\s*['"]([^'"]+)['"],\s*valueDark:\s*['"]([^'"]*)['"]/gi;
  let match;
  while ((match = tokenRegex.exec(content)) !== null) {
    const tokenName = match[1];
    const category = match[2];
    const value = match[3];
    const valueDark = match[4];
    
    tokens.push({
      tokenName,
      category,
      value,
      valueDark: valueDark || null
    });
  }
  
  // 也提取 baseColorTokens 映射表中的颜色
  const baseTokenRegex = /['"]([#\w(),.\s]+)['"]:\s*['"]([^'"]+)['"]/g;
  const baseTokens = {};
  const baseTokenSection = content.match(/const baseColorTokens = \{[\s\S]*?\};/);
  if (baseTokenSection) {
    let baseMatch;
    while ((baseMatch = baseTokenRegex.exec(baseTokenSection[0])) !== null) {
      const colorValue = baseMatch[1].trim();
      const tokenName = baseMatch[2].trim();
      baseTokens[colorValue] = tokenName;
    }
  }
  
  return { tokens, baseTokens };
}

/**
 * 标准化颜色值（去除空格，统一大小写）
 */
function normalizeColor(color) {
  if (!color) return '';
  return color.trim().toUpperCase().replace(/\s+/g, '');
}

/**
 * 主检查函数
 */
function checkMissingTokens() {
  console.log('🔍 开始检查颜色 Token...\n');
  
  // 提取颜色值
  console.log('📄 从 colorToken.html 提取颜色值...');
  const colorsInHTML = extractColorsFromHTML(COLOR_TOKEN_HTML);
  console.log(`   找到 ${colorsInHTML.length} 个颜色值\n`);
  
  // 提取 token 定义
  console.log('📋 从 designTokenTable.html 提取 Token 定义...');
  const { tokens, baseTokens } = extractTokensFromHTML(DESIGN_TOKEN_HTML);
  console.log(`   找到 ${tokens.length} 个 Token 定义`);
  console.log(`   找到 ${Object.keys(baseTokens).length} 个基础 Token 映射\n`);
  
  // 收集所有已定义的颜色值
  const definedColors = new Set();
  tokens.forEach(token => {
    if (token.value) definedColors.add(normalizeColor(token.value));
    if (token.valueDark) definedColors.add(normalizeColor(token.valueDark));
  });
  Object.keys(baseTokens).forEach(color => {
    definedColors.add(normalizeColor(color));
  });
  
  // 样式效果颜色（不需要 token 的颜色，如动画过渡色）
  const styleEffectColors = new Set([
    '#c8e6c9', '#d4edda', '#e8f5e9', // 高亮动画过渡色
    '#C8E6C9', '#D4EDDA', '#E8F5E9'  // 大写版本
  ]);
  
  // 找出缺失的颜色
  const missingColors = [];
  const styleEffectOnly = [];
  const foundColors = [];
  
  colorsInHTML.forEach(color => {
    const normalized = normalizeColor(color);
    const isStyleEffect = styleEffectColors.has(normalized) || 
                          styleEffectColors.has(color);
    const found = definedColors.has(normalized) || 
                  Object.keys(baseTokens).some(k => normalizeColor(k) === normalized);
    
    if (found) {
      foundColors.push(color);
    } else if (isStyleEffect) {
      styleEffectOnly.push(color);
    } else {
      missingColors.push(color);
    }
  });
  
  // 生成报告
  console.log('='.repeat(60));
  console.log('📊 检查报告');
  console.log('='.repeat(60));
  console.log(`\n✅ 已找到 Token 的颜色: ${foundColors.length} 个`);
  console.log(`🎨 样式效果颜色（无需 Token）: ${styleEffectOnly.length} 个`);
  console.log(`❌ 缺失 Token 的颜色: ${missingColors.length} 个\n`);
  
  if (styleEffectOnly.length > 0) {
    console.log('💡 样式效果颜色（这些是 CSS 动画/效果颜色，不需要 Token）:');
    console.log('-'.repeat(60));
    styleEffectOnly.forEach((color, index) => {
      console.log(`${index + 1}. ${color} (用于高亮动画效果)`);
    });
    console.log('-'.repeat(60));
    console.log('');
  }
  
  if (missingColors.length > 0) {
    console.log('⚠️  缺失 Token 的颜色列表:');
    console.log('-'.repeat(60));
    missingColors.forEach((color, index) => {
      console.log(`${index + 1}. ${color}`);
    });
    console.log('-'.repeat(60));
    
    // 生成建议的 token 映射
    console.log('\n💡 建议添加到 baseColorTokens 映射表:');
    console.log('-'.repeat(60));
    missingColors.forEach(color => {
      // 根据颜色值生成建议的 token 名称
      let suggestedToken = '';
      if (color.startsWith('#')) {
        if (color.match(/^#00/i)) {
          suggestedToken = 'GREEN-XX'; // 绿色系
        } else if (color.match(/^#FF/i)) {
          suggestedToken = 'ORANGE-XX'; // 橙色/黄色系
        } else if (color.match(/^#F[0-9A-F]/i)) {
          suggestedToken = 'RED-XX'; // 红色系
        } else if (color.match(/^#1[0-9A-F]/i)) {
          suggestedToken = 'BLUE-XX'; // 蓝色系
        } else {
          suggestedToken = 'COLOR-XX';
        }
      } else if (color.startsWith('rgba')) {
        if (color.includes('0, 0, 0')) {
          suggestedToken = 'MASK-BLACK-XX';
        } else if (color.includes('255, 255, 255')) {
          suggestedToken = 'MASK-WHITE-XX';
        } else {
          suggestedToken = 'MASK-XX';
        }
      }
      
      console.log(`      '${color}': '${suggestedToken}', // 需要确认 Token 名称`);
    });
    console.log('-'.repeat(60));
  } else {
    console.log('🎉 所有颜色都有对应的 Token！');
  }
  
  // 检查 designTokenTable.html 中定义但未使用的颜色
  console.log('\n📝 Token 定义详情:');
  console.log('-'.repeat(60));
  const categories = {};
  tokens.forEach(token => {
    if (!categories[token.category]) {
      categories[token.category] = [];
    }
    categories[token.category].push(token);
  });
  
  Object.keys(categories).sort().forEach(category => {
    console.log(`\n${category} (${categories[category].length} 个):`);
    categories[category].forEach(token => {
      const lightMatch = colorsInHTML.some(c => normalizeColor(c) === normalizeColor(token.value));
      const darkMatch = token.valueDark && colorsInHTML.some(c => normalizeColor(c) === normalizeColor(token.valueDark));
      const status = (lightMatch || darkMatch) ? '✅' : '⚠️';
      console.log(`  ${status} ${token.tokenName}: ${token.value}${token.valueDark ? ` / ${token.valueDark}` : ''}`);
    });
  });
  
  console.log('\n' + '='.repeat(60));
  console.log('检查完成！');
  console.log('='.repeat(60));
  
  return {
    totalColors: colorsInHTML.length,
    foundColors: foundColors.length,
    missingColors: missingColors.length,
    missingColorList: missingColors
  };
}

// 运行检查
if (require.main === module) {
  try {
    checkMissingTokens();
  } catch (error) {
    console.error('❌ 检查过程中出现错误:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

module.exports = { checkMissingTokens, extractColorsFromHTML, extractTokensFromHTML };

