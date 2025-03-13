/**
 * Shared utilities for both DPS and DPS Runtime
 * This reduces code duplication between dps.ts and dps-runtime.ts
 */

import { Color } from './colors';

/**
 * Known modifiers that can be applied to colors
 */
export type DPSModifier = 
  | 'up'       // Increase intensity
  | 'down'     // Decrease intensity
  | 'alpha'    // Use alpha variant
  | 'oklch'    // Use OKLCH color space
  | 'p3a'      // Use Display-P3 color space with alpha
  | 'mono'     // Convert to grayscale (using neutral palette)
  | string;    // For parameterized modifiers: up(2), down(3), etc.

/**
 * Parse a DPS expression into its components
 * @param dpsExpression A DPS expression like "purple-500:up" or "purple-500:alpha"
 * @returns An object with the parsed components
 */
export function parseDPSExpression(dpsExpression: string): {
  baseToken: string;
  modifier: DPSModifier | null;
  params?: number;
} {
  if (!dpsExpression.includes(':')) {
    return { baseToken: dpsExpression, modifier: null };
  }

  // Handle multiple modifiers (e.g., "purple-500:down(2):mono")
  const parts = dpsExpression.split(':');
  const baseToken = parts[0];
  const modifierPart = parts[1]; // We'll focus on the first modifier initially
  
  // Check for parameterized modifiers like up(2), down(3)
  if (modifierPart.includes('(') && modifierPart.includes(')')) {
    const match = modifierPart.match(/([a-z]+)\((\d+)\)/);
    if (match) {
      const [, modifier, paramStr] = match;
      return {
        baseToken,
        modifier: modifier as DPSModifier,
        params: parseInt(paramStr, 10)
      };
    }
  }
  
  return {
    baseToken,
    modifier: modifierPart as DPSModifier
  };
}

/**
 * Parse a full DPS expression with multiple modifiers
 * @param dpsExpression DPS expression like "purple-500:down(2):mono"
 * @returns Array of modifiers with their parameters
 */
export function parseModifiers(dpsExpression: string): {
  baseToken: string;
  modifiers: {modifier: DPSModifier, params?: number}[];
} {
  const parts = dpsExpression.split(':');
  const baseToken = parts[0];
  const modifiers: {modifier: DPSModifier, params?: number}[] = [];
  
  // Process each modifier
  for (let i = 1; i < parts.length; i++) {
    const modifierPart = parts[i];
    
    // Check for parameterized modifiers
    if (modifierPart.includes('(') && modifierPart.includes(')')) {
      const match = modifierPart.match(/([a-z]+)\((\d+)\)/);
      if (match) {
        const [, modifier, paramStr] = match;
        modifiers.push({
          modifier: modifier as DPSModifier, 
          params: parseInt(paramStr, 10)
        });
        continue;
      }
    }
    
    // Simple modifier
    modifiers.push({modifier: modifierPart as DPSModifier});
  }
  
  return {baseToken, modifiers};
}

/**
 * Applies standard modifiers to a color value
 * @param colorFamily The color family object
 * @param family The name of the color family
 * @param shade The shade value
 * @param modifier The modifier to apply
 * @param params Optional parameters
 * @returns The transformed color value or null
 */
export function applyStandardModifier(
  colorFamily: any,
  family: string,
  shade: string,
  modifier: DPSModifier | null,
  params?: number,
  neutralFamily?: any
): string | null {
  if (!modifier) {
    // Return the base color if no modifier
    return colorFamily[shade];
  }
  
  // Handle different modifiers
  switch (modifier) {
    case 'up': {
      // Special handling for neutral family with 0, 1 values
      if (family === 'neutral') {
        if (shade === '0') return colorFamily['100'];
        if (shade === '100') return colorFamily['200'];
        if (shade === '1000') return colorFamily['1'];
      }
      
      const shadeNum = parseInt(shade, 10);
      const nextShade = Math.min(1000, shadeNum + 100).toString();
      return colorFamily[nextShade];
    }
    
    case 'down': {
      // Special handling for neutral family with 0, 1 values
      if (family === 'neutral') {
        if (shade === '100') return colorFamily['0'];
        if (shade === '200') return colorFamily['100'];
        if (shade === '1') return colorFamily['1000'];
      }
      
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
    
    case 'p3a': {
      if (colorFamily.p3a && colorFamily.p3a[shade]) {
        return colorFamily.p3a[shade];
      }
      return null;
    }
    
    case 'mono': {
      // Convert to grayscale by using the neutral color with the same shade
      if (neutralFamily && neutralFamily[shade]) {
        return neutralFamily[shade];
      }
      return null;
    }
  }
  
  // Handle parameterized modifiers
  if (modifier.startsWith('up') && params !== undefined) {
    const shadeNum = parseInt(shade, 10);
    const targetShade = Math.min(1000, shadeNum + (params * 100)).toString();
    return colorFamily[targetShade];
  }
  
  if (modifier.startsWith('down') && params !== undefined) {
    const shadeNum = parseInt(shade, 10);
    const targetShade = Math.max(100, shadeNum - (params * 100)).toString();
    return colorFamily[targetShade];
  }
  
  // Unknown modifier
  return null;
}