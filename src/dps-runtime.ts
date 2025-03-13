/**
 * DPS Runtime
 * Scans stylesheets for DPS syntax and applies transformations
 * Uses shared utilities to avoid code duplication with the core DPS module
 */

import { DPSModifier, applyStandardModifier } from './shared-utilities';

// Extend the Window interface to include our custom properties
declare global {
  interface Window {
    __PRETTY_UGLY_COLORS__: any;
  }
}

/**
 * Apply a modifier to a color at runtime
 */
function applyModifierRuntime(colorRef: string, modifier: string | null, params?: number): string | null {
  // Parse the color reference
  if (!colorRef.includes('-')) return null;
  
  const [family, shade] = colorRef.split('-');
  const colorMap = window.__PRETTY_UGLY_COLORS__ || {};
  if (!colorMap[family] || !colorMap[family][shade]) {
    return null;
  }
  
  const colorFamily = colorMap[family];
  const neutralFamily = colorMap.neutral;
  
  return applyStandardModifier(
    colorFamily,
    family,
    shade,
    modifier as DPSModifier,
    params,
    neutralFamily
  );
}

/**
 * Apply multiple modifiers in sequence at runtime
 */
function applyModifiersRuntime(colorRef: string, modifiers: string[]): string | null {
  let currentRef = colorRef;
  let currentValue = null;
  
  for (let i = 0; i < modifiers.length; i++) {
    const modifier = modifiers[i];
    
    // Check for parameterized modifiers
    let currentModifier = modifier;
    let params: number | undefined;
    
    const paramMatch = modifier.match(/([a-z]+)\((\d+)\)/);
    if (paramMatch) {
      currentModifier = paramMatch[1];
      params = parseInt(paramMatch[2], 10);
    }
    
    // Apply the current modifier
    const result = applyModifierRuntime(currentRef, currentModifier, params);
    if (!result) return null;
    
    currentValue = result;
    
    // Update the reference for the next modifier if needed
    if (modifier === 'mono') {
      // Extract the shade from the current reference
      const refParts = currentRef.split('-');
      const shade = refParts[refParts.length - 1];
      currentRef = `neutral-${shade}`;
    } else if (modifier === 'up' || modifier.startsWith('up(')) {
      // For 'up', we need to increment the shade in the reference
      const refParts = currentRef.split('-');
      const shade = refParts[refParts.length - 1];
      const family = refParts.slice(0, -1).join('-');
      
      // Special handling for neutral
      if (family === 'neutral') {
        if (shade === '0') {
          currentRef = `${family}-100`;
          continue;
        }
        if (shade === '1000') {
          currentRef = `${family}-1`;
          continue;
        }
      }
      
      const steps = params || 1;
      const shadeNum = parseInt(shade, 10);
      const newShade = Math.min(1000, shadeNum + (steps * 100)).toString();
      currentRef = `${family}-${newShade}`;
    } else if (modifier === 'down' || modifier.startsWith('down(')) {
      // For 'down', we need to decrement the shade in the reference
      const refParts = currentRef.split('-');
      const shade = refParts[refParts.length - 1];
      const family = refParts.slice(0, -1).join('-');
      
      // Special handling for neutral
      if (family === 'neutral') {
        if (shade === '100') {
          currentRef = `${family}-0`;
          continue;
        }
        if (shade === '1') {
          currentRef = `${family}-1000`;
          continue;
        }
      }
      
      const steps = params || 1;
      const shadeNum = parseInt(shade, 10);
      const newShade = Math.max(100, shadeNum - (steps * 100)).toString();
      currentRef = `${family}-${newShade}`;
    }
    
    // If this is the last modifier, return the transformed value
    if (i === modifiers.length - 1) {
      return currentValue;
    }
  }
  
  return currentValue;
}

/**
 * Parse a DPS expression in a var() function
 */
function processDPSValue(cssValue: string): string {
  if (!cssValue || !cssValue.includes('var(--') || !cssValue.includes(':')) {
    return cssValue;
  }
  
  return cssValue.replace(/var\(--([^)]+)\)/g, (match: string, expression: string) => {
    // Check if this is a DPS expression with modifiers
    if (!expression.includes(':')) {
      return match; // Regular CSS variable without modifiers
    }
    
    const parts = expression.split(':');
    const token = parts[0];
    const modifiers = parts.slice(1);
    
    // If there's only one modifier, handle it directly
    if (modifiers.length === 1) {
      const transformedValue = applyModifierRuntime(token, modifiers[0]);
      if (transformedValue) {
        return transformedValue;
      }
      return match; // Return original if transformation failed
    }
    
    // For multiple modifiers, apply them in sequence
    const transformedValue = applyModifiersRuntime(token, modifiers);
    if (transformedValue) {
      return transformedValue;
    }
    
    return match; // Return original if transformation failed
  });
}

/**
 * Process an entire stylesheet to apply DPS transformations
 */
function processStylesheet(sheet: CSSStyleSheet): void {
  try {
    const rules = Array.from(sheet.cssRules);
    rules.forEach((rule) => {
      // Only process style rules
      if (rule instanceof CSSStyleRule) {
        const style = rule.style;
        for (let i = 0; i < style.length; i++) {
          const property = style[i];
          const value = style.getPropertyValue(property);
          
          // Apply DPS transformations
          const processedValue = processDPSValue(value);
          if (processedValue !== value) {
            style.setProperty(property, processedValue);
          }
        }
      }
    });
  } catch (e) {
    console.warn('Could not process stylesheet', e);
  }
}

/**
 * Initialize DPS by creating data maps and processing stylesheets
 */
function initDPS(): void {
  // Create global access to color data
  window.__PRETTY_UGLY_COLORS__ = window.__PRETTY_UGLY_COLORS__ || {};
  
  // Process existing stylesheets
  try {
    const sheets = Array.from(document.styleSheets);
    sheets.forEach((sheet) => {
      try {
        processStylesheet(sheet);
      } catch (e) {
        console.warn('Could not process stylesheet', e);
      }
    });
  } catch (e) {
    console.warn('Error processing stylesheets:', e);
  }
  
  // Set up an observer to process new stylesheets
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLLinkElement && node.rel === 'stylesheet') {
          // Wait for stylesheet to load
          node.addEventListener('load', () => {
            try {
              if (node.sheet) {
                processStylesheet(node.sheet);
              }
            } catch (e) {
              console.warn('Could not process new stylesheet', e);
            }
          });
        }
        
        if (node instanceof HTMLStyleElement && node.sheet) {
          processStylesheet(node.sheet);
        }
      });
    });
  });
  
  observer.observe(document.head, { childList: true, subtree: true });
  
  console.log('Pretty Ugly Colors: DPS Runtime initialized');
}

// Initialize when the DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDPS);
  } else {
    initDPS();
  }
}

// Export a dummy object to satisfy TypeScript module requirements
export {};