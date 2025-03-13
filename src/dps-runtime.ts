/**
 * DPS Runtime
 * Scans stylesheets for DPS syntax and applies transformations
 */

// Extend the Window interface to include our custom properties
declare global {
    interface Window {
      __PRETTY_UGLY_COLORS__?: any;
      __PRETTY_UGLY_TOKENS__?: any;
    }
  }
  
  /**
   * Apply a modifier to a color
   * This is a simplified version of the applyModifier function from dps.ts
   * that works in a pure JS context without TypeScript imports
   */
  function applyModifierRuntime(colorRef: string, modifier: string | null, params?: number): string | null {
    // First, resolve semantic tokens if needed
    const tokenMap = window.__PRETTY_UGLY_TOKENS__ || {};
    if (tokenMap[colorRef]) {
      colorRef = tokenMap[colorRef];
    }
    
    // Parse the color reference
    if (!colorRef.includes('-')) return null;
    
    const [family, shade] = colorRef.split('-');
    const colorMap = window.__PRETTY_UGLY_COLORS__ || {};
    if (!colorMap[family] || !colorMap[family][shade]) {
      return null;
    }
    
    const colorFamily = colorMap[family];
    
    // Return base color if no modifier
    if (!modifier) {
      return colorFamily[shade];
    }
    
    // Handle different modifiers
    switch (modifier) {
      case 'up': {
        const shadeNum = parseInt(shade, 10);
        const nextShade = Math.min(1000, shadeNum + 100).toString();
        return colorFamily[nextShade];
      }
      
      case 'down': {
        const shadeNum = parseInt(shade, 10);
        const prevShade = Math.max(100, shadeNum - 100).toString();
        return colorFamily[prevShade];
      }
      
      case 'alpha': {
        if (colorFamily.a && colorFamily.a[shade]) {
          return colorFamily.a[shade];
        }
        return null;
      }
      
      case 'oklch': {
        if (colorFamily.oklch && colorFamily.oklch[shade]) {
          return colorFamily.oklch[shade];
        }
        return null;
      }
      
      case 'p3': {
        if (colorFamily.p3a && colorFamily.p3a[shade]) {
          return colorFamily.p3a[shade];
        }
        return null;
      }
    }
    
    // Handle parameterized modifiers
    if (modifier.startsWith('up(')) {
      const match = modifier.match(/up\((\d+)\)/);
      if (match) {
        const steps = parseInt(match[1], 10);
        const shadeNum = parseInt(shade, 10);
        const targetShade = Math.min(1000, shadeNum + (steps * 100)).toString();
        return colorFamily[targetShade];
      }
    }
    
    if (modifier.startsWith('down(')) {
      const match = modifier.match(/down\((\d+)\)/);
      if (match) {
        const steps = parseInt(match[1], 10);
        const shadeNum = parseInt(shade, 10);
        const targetShade = Math.max(100, shadeNum - (steps * 100)).toString();
        return colorFamily[targetShade];
      }
    }
    
    // Unknown modifier
    return null;
  }
  
  /**
   * Parse a DPS expression in a var() function
   * @param cssValue CSS value that may contain DPS syntax
   * @returns Processed CSS value with transformations applied
   */
  function processDPSValue(cssValue: string): string {
    if (!cssValue || !cssValue.includes('var(--') || !cssValue.includes(':')) {
      return cssValue;
    }
    
    // Regex to find DPS syntax: var(--token:modifier)
    return cssValue.replace(/var\(--([^:)]+):([^)]+)\)/g, (match: string, token: string, modifier: string) => {
      const transformedValue = applyModifierRuntime(token, modifier);
      if (transformedValue) {
        return transformedValue;
      }
      // Return the original if transformation failed
      return match;
    });
  }
  
  /**
   * Process an entire stylesheet to apply DPS transformations
   */
  function processStylesheet(sheet: CSSStyleSheet): void {
    try {
      Array.from(sheet.cssRules).forEach((rule: CSSRule) => {
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
    window.__PRETTY_UGLY_COLORS__ = window.__PRETTY_UGLY_COLORS__ || {
      /* Color data will be injected here during build */
    };
    
    window.__PRETTY_UGLY_TOKENS__ = window.__PRETTY_UGLY_TOKENS__ || {
      /* Token data will be injected here during build */
    };
    
    // Process existing stylesheets
    Array.from(document.styleSheets).forEach((sheet) => {
      try {
        processStylesheet(sheet);
      } catch (e) {
        console.warn('Could not process stylesheet', e);
      }
    });
    
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
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDPS);
  } else {
    initDPS();
  }
  
  export {};  // Add empty export to ensure this is treated as a module