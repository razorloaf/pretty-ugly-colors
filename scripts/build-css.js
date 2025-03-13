const fs = require("fs");
const path = require("path");
const { colors } = require("../dist/js/index.js");
const { tokens } = require("../dist/js/tokens.js");

// Create directories
const dirs = ["dist/css", "dist/js"];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Generate CSS with only hex values
function generateCoreCSS() {
  let cssContent = "/* Pretty Ugly Colors - Core Colors */\n\n";
  cssContent += ":root {\n";
  
  for (const [colorName, color] of Object.entries(colors)) {
    const shades = Object.keys(color).filter(
      (key) => !["a", "oklch", "p3a"].includes(key)
    );
    
    cssContent += `\n  /* ${colorName} */\n`;
    
    // Hex only
    for (const shade of shades) {
      cssContent += `  --${colorName}-${shade}: ${color[shade]};\n`;
    }
  }
  
  cssContent += "}\n";
  return cssContent;
}

// Generate CSS with modern color formats
function generateModernCSS() {
  let cssContent = "/* Pretty Ugly Colors - Modern Color Formats */\n\n";
  cssContent += ":root {\n";
  
  for (const [colorName, color] of Object.entries(colors)) {
    const shades = Object.keys(color).filter(
      (key) => !["a", "oklch", "p3a"].includes(key)
    );
    
    cssContent += `\n  /* ${colorName} - Advanced Formats */\n`;
    
    // Group by format type - Alpha
    if (color.a) {
      for (const shade of shades) {
        if (color.a[shade]) {
          cssContent += `  --${colorName}-${shade}-alpha: ${color.a[shade]};\n`;
        }
      }
      cssContent += "\n";
    }
    
    // Group by format type - OKLCH
    if (color.oklch) {
      for (const shade of shades) {
        if (color.oklch[shade]) {
          cssContent += `  --${colorName}-${shade}-oklch: ${color.oklch[shade]};\n`;
        }
      }
      cssContent += "\n";
    }
    
    // Group by format type - P3
    if (color.p3a) {
      for (const shade of shades) {
        if (color.p3a[shade]) {
          cssContent += `  --${colorName}-${shade}-p3: ${color.p3a[shade]};\n`;
        }
      }
      cssContent += "\n";
    }
  }
  
  cssContent += "}\n";
  return cssContent;
}

// Generate tokens CSS
function generateTokensCSS() {
  let cssContent = "/* Pretty Ugly Colors - Semantic Tokens */\n\n";
  cssContent += ":root {\n";
  
  for (const [category, categoryTokens] of Object.entries(tokens)) {
    cssContent += `\n  /* ${category} tokens */\n`;
    
    for (const [tokenName, colorRef] of Object.entries(categoryTokens)) {
      cssContent += `  --${category}-${tokenName}: var(--${colorRef});\n`;
    }
  }
  
  cssContent += "}\n";
  return cssContent;
}

// Obfuscate the DPS runtime
function obfuscateDPSRuntime() {
  // Read the compiled DPS runtime
  const runtimePath = path.join(__dirname, "..", "dist/js", "dps-runtime.js");
  let runtimeContent = fs.readFileSync(runtimePath, "utf8");
  
  // Create runtime data
  const runtimeColors = {};
  const tokenMap = {};
  
  for (const [colorName, color] of Object.entries(colors)) {
    runtimeColors[colorName] = {};
    
    // Add shades
    const shades = Object.keys(color).filter(
      (key) => !["a", "oklch", "p3a"].includes(key)
    );
    
    for (const shade of shades) {
      runtimeColors[colorName][shade] = color[shade];
    }
    
    // Add variants
    runtimeColors[colorName].a = color.a;
    runtimeColors[colorName].oklch = color.oklch;
    runtimeColors[colorName].p3a = color.p3a;
  }
  
  // Flatten tokens
  for (const [category, categoryTokens] of Object.entries(tokens)) {
    for (const [tokenName, colorRef] of Object.entries(categoryTokens)) {
      tokenMap[`${category}-${tokenName}`] = colorRef;
    }
  }
  
  const colorsJson = JSON.stringify(runtimeColors);
  const tokensJson = JSON.stringify(tokenMap);
  
  // Basic obfuscation
  runtimeContent = runtimeContent
    .replace(/\s+/g, ' ')
    .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
    .replace(/applyModifierRuntime/g, '_aM')
    .replace(/processDPSValue/g, '_pV')
    .replace(/processStylesheet/g, '_pS')
    .replace(/initDPS/g, '_iD');
  
  runtimeContent = runtimeContent.replace(
    "window.__PRETTY_UGLY_COLORS__ = window.__PRETTY_UGLY_COLORS__ || {}",
    `window.__PRETTY_UGLY_COLORS__ = window.__PRETTY_UGLY_COLORS__ || ${colorsJson}`
  );
  
  runtimeContent = runtimeContent.replace(
    "window.__PRETTY_UGLY_TOKENS__ = window.__PRETTY_UGLY_TOKENS__ || {}",
    `window.__PRETTY_UGLY_TOKENS__ = window.__PRETTY_UGLY_TOKENS__ || ${tokensJson}`
  );
  
  return runtimeContent;
}

// Write files
function writeFile(relativePath, content) {
  const filePath = path.join(__dirname, "..", relativePath);
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Generated ${relativePath}`);
}

// Generate files
const coreCSS = generateCoreCSS();
writeFile("dist/css/colors.css", coreCSS);

const modernCSS = generateModernCSS();
writeFile("dist/css/colors-modern.css", modernCSS);

const tokensCSS = generateTokensCSS();
writeFile("dist/css/tokens.css", tokensCSS);

const obfuscatedRuntime = obfuscateDPSRuntime();
writeFile("dist/js/runtime.js", obfuscatedRuntime);

console.log("All files generated successfully!");