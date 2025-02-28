const fs = require("fs");
const path = require("path");
const { colors } = require("../dist/index.js");

const outputDir = path.resolve(__dirname, "..");

function generateCSS(colorName, color) {
  // Get the available shades from the color object, excluding 'a', 'p3', 'p3a'
  const shades = Object.keys(color).filter(
    (key) => !["a", "p3", "p3a"].includes(key)
  );

  let cssContent = ":root {\n";

  // Hex
  cssContent += "  // hex\n";
  for (const shade of shades) {
    cssContent += `  --${colorName}-${shade}: ${color[shade]};\n`;
  }

  // Alpha
  cssContent += "  // alpha\n";
  for (const shade of shades) {
    if (color.a && color.a[shade]) {
      cssContent += `  --${colorName}A-${shade}: ${color.a[shade]};\n`;
    }
  }

  // P3
  cssContent += "  // p3\n";
  for (const shade of shades) {
    if (color.p3 && color.p3[shade]) {
      cssContent += `  --${colorName}P3-${shade}: ${color.p3[shade]};\n`;
    }
  }

  // P3
  cssContent += "  // p3 alpha\n";
  for (const shade of shades) {
    if (color.p3a && color.p3a[shade]) {
      cssContent += `  --${colorName}P3A-${shade}: ${color.p3a[shade]};\n`;
    }
  }

  cssContent += "}";

  return cssContent;
}

function writeCSSFile(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
}

Object.entries(colors).forEach(([colorName, color]) => {
  const cssContent = generateCSS(colorName, color);
  const filePath = path.join(outputDir, `${colorName}.css`);
  writeCSSFile(filePath, cssContent);
});

console.log("CSS files generated at root level.");