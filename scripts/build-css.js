const fs = require("fs");
const path = require("path");
const { colors } = require("../dist/js/index.js");

// Create directories
const dirs = ["dist/css", "dist/js"];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

function generateCoreCSS() {
  let cssContent = "/* Tayer Colors - All Colors */\n\n";
  cssContent += ":root {\n";
  
  for (const [colorName, color] of Object.entries(colors)) {
    // Format the display name (remove "Dark" suffix for display purposes)
    const displayName = colorName.endsWith('Dark') 
      ? colorName.replace('Dark', '') + " (Dark)" 
      : colorName;
    
    // Get the CSS variable prefix (for dark themes, use the base name)
    const cssPrefix = colorName.endsWith('Dark')
      ? colorName.replace('Dark', '')
      : colorName;
    
    const shades = Object.keys(color).filter(
      (key) => !["a", "oklch", "p3a"].includes(key)
    );
    
    cssContent += `\n  /* ${displayName} */\n`;
    
    // For dark themes, use a different CSS custom property format
    const darkSuffix = colorName.endsWith('Dark') ? '-dark' : '';
    
    // Hex values
    for (const shade of shades) {
      cssContent += `  --${cssPrefix}${darkSuffix}-${shade}: ${color[shade]};\n`;
    }
    
    // Alpha variants
    if (color.a) {
      for (const shade of shades) {
        if (color.a[shade]) {
          cssContent += `  --${cssPrefix}${darkSuffix}-${shade}-alpha: ${color.a[shade]};\n`;
        }
      }
    }
    
    // OKLCH variants
    if (color.oklch) {
      for (const shade of shades) {
        if (color.oklch[shade]) {
          cssContent += `  --${cssPrefix}${darkSuffix}-${shade}-oklch: ${color.oklch[shade]};\n`;
        }
      }
    }
    
    // P3 variants
    if (color.p3a) {
      for (const shade of shades) {
        if (color.p3a[shade]) {
          cssContent += `  --${cssPrefix}${darkSuffix}-${shade}-p3a: ${color.p3a[shade]};\n`;
        }
      }
    }
  }
  
  cssContent += "}\n";
  return cssContent;
}

// Individual files for easy, singular imports
function generateIndividualColorCSS() {
  // Create directory if it doesn't exist
  const colorDir = "dist/css";
  if (!fs.existsSync(colorDir)) {
    fs.mkdirSync(colorDir, { recursive: true });
  }

  // Create a map to collect colors and their dark variants
  const colorMap = {};
  
  // Group colors with their dark variants
  for (const [colorName, color] of Object.entries(colors)) {
    if (colorName.endsWith('Dark')) {
      const baseName = colorName.replace('Dark', '');
      if (!colorMap[baseName]) colorMap[baseName] = {};
      colorMap[baseName].dark = color;
    } else {
      if (!colorMap[colorName]) colorMap[colorName] = {};
      colorMap[colorName].light = color;
    }
  }

  // Generate individual color files with both light and dark variants
  for (const [colorName, variants] of Object.entries(colorMap)) {
    let cssContent = `/* Tayer Colors - ${colorName} */\n\n`;
    cssContent += ":root {\n";
    
    // Process light variant if available
    if (variants.light) {
      const color = variants.light;
      const shades = Object.keys(color).filter(
        (key) => !["a", "oklch", "p3a"].includes(key)
      );
      
      // Standard hex variables
      cssContent += `  /* ${colorName} - Hex */\n`;
      for (const shade of shades) {
        cssContent += `  --${colorName}-${shade}: ${color[shade]};\n`;
      }
      cssContent += "\n";
      
      // Process variants (alpha, oklch, p3a)
      if (color.a) {
        cssContent += `  /* ${colorName} - Alpha */\n`;
        for (const shade of shades) {
          if (color.a[shade]) {
            cssContent += `  --${colorName}-${shade}-alpha: ${color.a[shade]};\n`;
          }
        }
        cssContent += "\n";
      }
      
      if (color.oklch) {
        cssContent += `  /* ${colorName} - OKLCH */\n`;
        for (const shade of shades) {
          if (color.oklch[shade]) {
            cssContent += `  --${colorName}-${shade}-oklch: ${color.oklch[shade]};\n`;
          }
        }
        cssContent += "\n";
      }
      
      if (color.p3a) {
        cssContent += `  /* ${colorName} - Display-P3 */\n`;
        for (const shade of shades) {
          if (color.p3a[shade]) {
            cssContent += `  --${colorName}-${shade}-p3a: ${color.p3a[shade]};\n`;
          }
        }
        cssContent += "\n";
      }
    }
    
    // Process dark variant if available
    if (variants.dark) {
      const color = variants.dark;
      const shades = Object.keys(color).filter(
        (key) => !["a", "oklch", "p3a"].includes(key)
      );
      
      // Standard hex variables for dark theme
      cssContent += `  /* ${colorName} - Hex (Dark) */\n`;
      for (const shade of shades) {
        cssContent += `  --${colorName}-dark-${shade}: ${color[shade]};\n`;
      }
      cssContent += "\n";
      
      // Process variants for dark theme
      if (color.a) {
        cssContent += `  /* ${colorName} - Alpha (Dark) */\n`;
        for (const shade of shades) {
          if (color.a[shade]) {
            cssContent += `  --${colorName}-dark-${shade}-alpha: ${color.a[shade]};\n`;
          }
        }
        cssContent += "\n";
      }
      
      if (color.oklch) {
        cssContent += `  /* ${colorName} - OKLCH (Dark) */\n`;
        for (const shade of shades) {
          if (color.oklch[shade]) {
            cssContent += `  --${colorName}-dark-${shade}-oklch: ${color.oklch[shade]};\n`;
          }
        }
        cssContent += "\n";
      }
      
      if (color.p3a) {
        cssContent += `  /* ${colorName} - Display-P3 (Dark) */\n`;
        for (const shade of shades) {
          if (color.p3a[shade]) {
            cssContent += `  --${colorName}-dark-${shade}-p3a: ${color.p3a[shade]};\n`;
          }
        }
      }
    }
    
    cssContent += "}\n";
    writeFile(`dist/css/${colorName}.css`, cssContent);
  }
  
  console.log("Generated individual color CSS files");
}

// Process the DPS runtime - Safer approach without aggressive obfuscation
function processDPSRuntime() {
  try {
    // Read the compiled DPS runtime
    const runtimePath = path.join(__dirname, "..", "dist/js", "dps-runtime.js");
    let runtimeContent = fs.readFileSync(runtimePath, "utf8");
    
    // Create runtime data
    const runtimeColors = createRuntimeColors();
    
    const colorsJson = JSON.stringify(runtimeColors);
    
    // Safer function name replacements - preserve structure
    runtimeContent = runtimeContent
      .replace(/applyModifierRuntime/g, '_aM')
      .replace(/processDPSValue/g, '_pV')
      .replace(/processStylesheet/g, '_pS')
      .replace(/initDPS/g, '_iD');
    
    // Safer replacement of window objects
    runtimeContent = runtimeContent.replace(
      /window\.__PRETTY_UGLY_COLORS__\s*=\s*window\.__PRETTY_UGLY_COLORS__\s*\|\|\s*{};/,
      `window.__PRETTY_UGLY_COLORS__ = window.__PRETTY_UGLY_COLORS__ || ${colorsJson};`
    );
    
    // Remove token-related code
    runtimeContent = runtimeContent.replace(
      /window\.__PRETTY_UGLY_TOKENS__\s*=\s*window\.__PRETTY_UGLY_TOKENS__\s*\|\|\s*{};/,
      ''
    );
    
    // Validate that the output is valid JavaScript
    try {
      // Simple syntax validation by trying to parse it
      Function(runtimeContent);
      console.log("Runtime processed successfully and validated.");
    } catch (syntaxError) {
      console.error("Syntax error in processed runtime:", syntaxError);
      // Fall back to the original file
      runtimeContent = fs.readFileSync(runtimePath, "utf8");
      console.log("Using original runtime file instead.");
    }
    
    return runtimeContent;
  } catch (error) {
    console.error("Error processing runtime:", error);
    return "// Error processing runtime file";
  }
}

// Helper to create runtime colors data
function createRuntimeColors() {
  const runtimeColors = {};
  
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
    if (color.a) runtimeColors[colorName].a = color.a;
    if (color.oklch) runtimeColors[colorName].oklch = color.oklch;
    if (color.p3a) runtimeColors[colorName].p3a = color.p3a;
  }
  
  return runtimeColors;
}

const JavaScriptObfuscator = require('javascript-obfuscator');

function obfuscateDPSCode(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.7,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    identifierNamesGenerator: 'hexadecimal',
    renameGlobals: true,
    selfDefending: true,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayThreshold: 0.8,
    transformObjectKeys: true,
    unicodeEscapeSequence: true
  }).getObfuscatedCode();
  
  return obfuscatedCode;
}

// Write files
function writeFile(relativePath, content) {
  try {
    const filePath = path.join(__dirname, "..", relativePath);
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Generated ${relativePath}`);
  } catch (error) {
    console.error(`Failed to write ${relativePath}:`, error);
  }
}

// Generate files
try {
  const coreCSS = generateCoreCSS();
  writeFile("dist/css/colors.css", coreCSS);

  generateIndividualColorCSS();

  const processedRuntime = processDPSRuntime();
  writeFile("dist/js/runtime.js", processedRuntime);

  const dpsCode = obfuscateDPSCode(path.join(__dirname, '..', 'dist/js/dps.js'));
  writeFile('dist/js/dps.min.js', dpsCode);

  const runtimeCode = obfuscateDPSCode(path.join(__dirname, '..', 'dist/js/runtime.js'));
  writeFile('dist/js/runtime.min.js', runtimeCode);

  console.log("All files generated successfully!");
} catch (error) {
  console.error("Build failed:", error);
  process.exit(1);
}