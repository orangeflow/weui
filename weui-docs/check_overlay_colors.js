// 检查颜色值是否可能是通过叠加半透明层产生的

// 颜色叠加计算公式：
// result = baseColor * (1 - overlayAlpha) + overlayColor * overlayAlpha
// 对于黑色遮罩：result = baseColor * (1 - alpha)
// 对于白色遮罩：result = baseColor * (1 - alpha) + 255 * alpha

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("").toUpperCase();
}

// 计算叠加后的颜色
function calculateOverlay(baseColor, overlayColor, alpha) {
  const base = hexToRgb(baseColor);
  const overlay = hexToRgb(overlayColor);
  
  if (!base || !overlay) return null;
  
  const r = base.r * (1 - alpha) + overlay.r * alpha;
  const g = base.g * (1 - alpha) + overlay.g * alpha;
  const b = base.b * (1 - alpha) + overlay.b * alpha;
  
  return rgbToHex(r, g, b);
}

// 检查目标颜色是否可能是通过叠加产生的
function checkIfOverlayColor(baseColor, targetColor, overlayColor, tolerance = 2) {
  for (let alpha = 0.01; alpha <= 1; alpha += 0.01) {
    const calculated = calculateOverlay(baseColor, overlayColor, alpha);
    if (!calculated) continue;
    
    const calculatedRgb = hexToRgb(calculated);
    const targetRgb = hexToRgb(targetColor);
    
    if (!calculatedRgb || !targetRgb) continue;
    
    const diff = Math.abs(calculatedRgb.r - targetRgb.r) +
                 Math.abs(calculatedRgb.g - targetRgb.g) +
                 Math.abs(calculatedRgb.b - targetRgb.b);
    
    if (diff <= tolerance) {
      return {
        match: true,
        alpha: Math.round(alpha * 100) / 100,
        calculated: calculated
      };
    }
  }
  return { match: false };
}

// 所有需要检查的颜色
const colorsToCheck = [
  // 品牌色及其变体
  { name: "微信绿悬浮 (Light)", color: "#06AD56", base: "#07C160", overlay: "#000000" },
  { name: "微信绿按下 (Light)", color: "#059648", base: "#07C160", overlay: "#000000" },
  { name: "微信绿悬浮 (Dark)", color: "#179B16", base: "#1AAD19", overlay: "#000000" },
  { name: "微信绿按下 (Dark)", color: "#158A14", base: "#1AAD19", overlay: "#000000" },
  
  // 背景色变体
  { name: "次要背景 (Light)", color: "#F7F7F7", base: "#FFFFFF", overlay: "#000000" },
  { name: "三级背景 (Light)", color: "#EDEDED", base: "#FFFFFF", overlay: "#000000" },
  { name: "次要背景 (Dark)", color: "#1C1C1E", base: "#000000", overlay: "#FFFFFF" },
  { name: "三级背景 (Dark)", color: "#2C2C2E", base: "#000000", overlay: "#FFFFFF" },
  
  // 边框色
  { name: "标准边框 (Light)", color: "#E5E5E5", base: "#FFFFFF", overlay: "#000000" },
  { name: "浅色边框 (Light)", color: "#F0F0F0", base: "#FFFFFF", overlay: "#000000" },
  { name: "标准边框 (Dark)", color: "#38383A", base: "#000000", overlay: "#FFFFFF" },
  { name: "浅色边框 (Dark)", color: "#48484A", base: "#000000", overlay: "#FFFFFF" },
];

console.log("=".repeat(80));
console.log("颜色叠加检查报告");
console.log("=".repeat(80));
console.log();

let overlayCount = 0;
let pureColorCount = 0;

colorsToCheck.forEach(item => {
  const result = checkIfOverlayColor(item.base, item.color, item.overlay);
  
  if (result.match) {
    overlayCount++;
    console.log(`✅ ${item.name}`);
    console.log(`   颜色值: ${item.color}`);
    console.log(`   基础色: ${item.base}`);
    console.log(`   遮罩色: ${item.overlay}`);
    console.log(`   遮罩透明度: ${(result.alpha * 100).toFixed(0)}%`);
    console.log(`   计算结果: ${result.calculated}`);
    console.log();
  } else {
    pureColorCount++;
    console.log(`❌ ${item.name}`);
    console.log(`   颜色值: ${item.color}`);
    console.log(`   状态: 独立定义的纯色（不是通过叠加产生的）`);
    console.log();
  }
});

console.log("=".repeat(80));
console.log(`总结: ${overlayCount} 个颜色可能是叠加产生的, ${pureColorCount} 个是独立纯色`);
console.log("=".repeat(80));

