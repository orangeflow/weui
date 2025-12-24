#!/usr/bin/env node

/**
 * WeUI 官方规范验证脚本
 * 
 * 功能：
 * 1. 检查当前实现是否符合 WeUI 官方文档规范
 * 2. 对比颜色值是否与官方文档一致
 * 3. 生成验证报告
 * 
 * 注意：此脚本需要手动访问 WeUI 官方文档进行对比验证
 * 官方文档：https://weui-multi-platform.pages.woa.com/guide/
 */

const fs = require('fs');
const path = require('path');

const COLOR_TOKEN_HTML = path.join(__dirname, 'colorToken.html');
const DESIGN_TOKEN_HTML = path.join(__dirname, 'designTokenTable.html');
const WEUI_OFFICIAL_REFERENCE = path.join(__dirname, 'WEUI_OFFICIAL_REFERENCE.md');

console.log('📋 WeUI 官方规范验证检查清单\n');
console.log('='.repeat(60));
console.log('⚠️  重要提示：');
console.log('='.repeat(60));
console.log('此脚本提供检查清单，但实际验证需要：');
console.log('1. 访问 WeUI 官方文档：https://weui-multi-platform.pages.woa.com/guide/');
console.log('2. 手动对比颜色值和规范');
console.log('3. 确保所有实现符合官方标准\n');

// 提取所有颜色值
function extractAllColors() {
  const colors = new Set();
  
  // 从 colorToken.html 提取
  if (fs.existsSync(COLOR_TOKEN_HTML)) {
    const content = fs.readFileSync(COLOR_TOKEN_HTML, 'utf-8');
    const regex = /(#[0-9A-Fa-f]{6}|rgba\([^)]+\))/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      colors.add(match[1]);
    }
  }
  
  // 从 designTokenTable.html 提取
  if (fs.existsSync(DESIGN_TOKEN_HTML)) {
    const content = fs.readFileSync(DESIGN_TOKEN_HTML, 'utf-8');
    const regex = /(#[0-9A-Fa-f]{6}|rgba\([^)]+\))/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      colors.add(match[1]);
    }
  }
  
  return Array.from(colors).sort();
}

// 生成验证报告
function generateVerificationReport() {
  console.log('='.repeat(60));
  console.log('📊 当前实现统计');
  console.log('='.repeat(60));
  
  const allColors = extractAllColors();
  console.log(`\n找到 ${allColors.length} 个颜色值\n`);
  
  // 按类型分类
  const hexColors = allColors.filter(c => c.startsWith('#'));
  const rgbaColors = allColors.filter(c => c.startsWith('rgba'));
  
  console.log(`- Hex 颜色: ${hexColors.length} 个`);
  console.log(`- RGBA 颜色: ${rgbaColors.length} 个\n`);
  
  // 功能色检查
  console.log('='.repeat(60));
  console.log('🎨 功能色检查（需要与官方文档对比）');
  console.log('='.repeat(60));
  
  const functionalColors = {
    '成功色 (Light)': '#00B42A',
    '成功色 (Dark)': '#30D158',
    '警告色 (Light)': '#FF7D00',
    '警告色 (Dark)': '#FF9F0A',
    '错误色 (Light)': '#F53F3F',
    '错误色 (Dark)': '#FF453A',
    '信息色 (Light)': '#10AEFF',
    '信息色 (Dark)': '#0A84FF',
    '微信绿 (Light)': '#07C160',
    '微信绿 (Dark)': '#1AAD19'
  };
  
  console.log('\n当前使用的功能色：');
  Object.entries(functionalColors).forEach(([name, value]) => {
    const exists = allColors.some(c => c.toUpperCase() === value.toUpperCase());
    const status = exists ? '✅' : '❌';
    console.log(`  ${status} ${name}: ${value}`);
  });
  
  console.log('\n⚠️  请访问官方文档验证这些颜色值是否正确：');
  console.log('   https://weui-multi-platform.pages.woa.com/guide/componentsAll/button\n');
  
  // 检查清单
  console.log('='.repeat(60));
  console.log('✅ 验证检查清单');
  console.log('='.repeat(60));
  console.log('\n请在 WeUI 官方文档中验证以下内容：\n');
  
  console.log('1. 颜色值验证');
  console.log('   □ 所有颜色值是否与官方文档一致');
  console.log('   □ 白天模式和暗黑模式的颜色映射是否正确');
  console.log('   □ 功能色（成功、警告、错误、信息）是否正确\n');
  
  console.log('2. Token 命名验证');
  console.log('   □ Token 命名是否符合官方规范');
  console.log('   □ 是否有官方推荐的 Token 命名方式\n');
  
  console.log('3. 组件颜色验证');
  console.log('   □ 按钮组件颜色是否符合官方规范');
  console.log('   □ 输入框组件颜色是否符合官方规范');
  console.log('   □ 列表组件颜色是否符合官方规范');
  console.log('   □ 对话框组件颜色是否符合官方规范\n');
  
  console.log('4. 遮罩和覆盖层验证');
  console.log('   □ 遮罩颜色的透明度值是否正确');
  console.log('   □ 遮罩的使用场景是否符合官方规范\n');
  
  // 生成对比表格
  console.log('='.repeat(60));
  console.log('📝 颜色值对比表（请与官方文档对比）');
  console.log('='.repeat(60));
  console.log('\n| 颜色类型 | 白天模式 | 暗黑模式 | 状态 |');
  console.log('|---------|---------|---------|------|');
  console.log('| 成功色 | #00B42A | #30D158 | ⚠️ 待验证 |');
  console.log('| 警告色 | #FF7D00 | #FF9F0A | ⚠️ 待验证 |');
  console.log('| 错误色 | #F53F3F | #FF453A | ⚠️ 待验证 |');
  console.log('| 信息色 | #10AEFF | #0A84FF | ⚠️ 待验证 |');
  console.log('| 微信绿 | #07C160 | #1AAD19 | ⚠️ 待验证 |');
  console.log('| 主背景 | #FFFFFF | #000000 | ⚠️ 待验证 |');
  console.log('| 次要背景 | #F7F7F7 | #1C1C1E | ⚠️ 待验证 |');
  console.log('| 主要文本 | rgba(0,0,0,0.9) | rgba(255,255,255,0.9) | ⚠️ 待验证 |');
  console.log('| 次要文本 | rgba(0,0,0,0.6) | rgba(255,255,255,0.6) | ⚠️ 待验证 |');
  console.log('| 辅助文本 | rgba(0,0,0,0.4) | rgba(255,255,255,0.4) | ⚠️ 待验证 |');
  console.log('| 禁用文本 | rgba(0,0,0,0.2) | rgba(255,255,255,0.2) | ⚠️ 待验证 |\n');
  
  console.log('='.repeat(60));
  console.log('🔗 相关链接');
  console.log('='.repeat(60));
  console.log('\n- WeUI Multi-Platform Guide:');
  console.log('  https://weui-multi-platform.pages.woa.com/guide/');
  console.log('\n- WeUI 官方文档:');
  console.log('  https://weui.io/');
  console.log('\n- WeUI GitHub:');
  console.log('  https://github.com/Tencent/weui');
  console.log('\n- 按钮组件文档:');
  console.log('  https://weui-multi-platform.pages.woa.com/guide/componentsAll/button\n');
  
  console.log('='.repeat(60));
  console.log('📄 参考文档');
  console.log('='.repeat(60));
  console.log('\n项目中的参考文档：');
  console.log('- WEUI_OFFICIAL_REFERENCE.md - WeUI 官方文档参考');
  console.log('- WEUI_LEARNING.md - WeUI 学习指南');
  console.log('- WEUI_APPLY_GUIDE.md - WeUI 应用指南');
  console.log('- DARK_MODE_COLOR_MAPPING.md - 暗黑模式颜色映射\n');
  
  console.log('='.repeat(60));
  console.log('✅ 验证完成');
  console.log('='.repeat(60));
  console.log('\n请根据 WeUI 官方文档验证上述内容，确保所有实现符合官方规范。\n');
}

// 运行验证
if (require.main === module) {
  try {
    generateVerificationReport();
  } catch (error) {
    console.error('❌ 验证过程中出现错误:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

module.exports = { generateVerificationReport, extractAllColors };

