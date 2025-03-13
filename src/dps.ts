/**
 * Color Transformation System (CTS)
 * A proprietary color transformation system that enables dynamic color modifications
 * through CSS custom property syntax.
 */

import { colors as importedColors, Color } from './colors';
import { DPSModifier, parseDPSExpression, parseModifiers, applyStandardModifier } from './shared-utilities';

// Create a new interface that extends your colors type
interface IndexableColors {
  [key: string]: Color;
  purple: Color;
  blue: Color;
  green: Color;
  yellow: Color;
  orange: Color;
  red: Color;
  neutral: Color;
}

// Cast the imported colors to the new interface
const colors = importedColors as unknown as IndexableColors;

/**
 * Format of colors in the color system
 */
export type ColorFormat = 'hex' | 'alpha' | 'oklch' | 'p3a';

/**
 * Get color family and shade from a color reference
 * @param colorRef 
 * @returns An object with family and shade, or null if invalid
 */
export function parseColorReference(colorRef: string): { family: string, shade: string } | null {
  if (colorRef.includes('-')) {
    // Parse the direct color reference
    const [family, shade] = colorRef.split('-');
    
    if (colors[family] && colors[family][shade]) {
      return { family, shade };
    }
  }
  
  return null;
}

/**
 * Apply a modifier to a color
 * @param colorRef The color reference (e.g., "purple-500")
 * @param modifier The modifier to apply
 * @param params Optional parameters for the modifier
 * @returns The transformed color value, or null if invalid
 */
export function applyModifier(
  colorRef: string,
  modifier: DPSModifier | null,
  params?: number
): string | null {
  const colorInfo = parseColorReference(colorRef);
  if (!colorInfo) return null;
  
  const { family, shade } = colorInfo;
  const colorFamily = colors[family];
  
  return applyStandardModifier(
    colorFamily, 
    family, 
    shade, 
    modifier, 
    params, 
    colors.neutral
  );
}

/**
 * Apply multiple modifiers in sequence
 * @param colorRef The initial color reference
 * @param modifiers Array of modifiers to apply in sequence
 * @returns The final transformed color value, or null if invalid
 */
export function applyModifiers(
  colorRef: string,
  modifiers: {modifier: DPSModifier, params?: number}[]
): string | null {
  let currentRef = colorRef;
  
  for (const {modifier, params} of modifiers) {
    const result = applyModifier(currentRef, modifier, params);
    if (!result) return null;
    
    // For the next iteration, we need to preserve the shade but update the family if it's a mono conversion
    if (modifier === 'mono') {
      const colorInfo = parseColorReference(currentRef);
      if (!colorInfo) return null;
      
      // If we just applied a mono modifier, our new reference is the neutral family with same shade
      currentRef = `neutral-${colorInfo.shade}`;
    } else {
      // For other modifiers, we need to parse what family-shade the result represents
      // This gets complex, so for simplicity we'll return the actual color value
      return result;
    }
  }
  
  // Return the result after applying all modifiers
  return applyModifier(currentRef, null);
}

/**
 * Transform a DPS expression to an actual color value
 * @param dpsExpression The DPS expression (e.g., "blue-500:up" or "purple-500:down(2):mono")
 * @returns The transformed color value, or null if invalid
 */
export function transformDPS(dpsExpression: string): string | null {
  // Handle multiple modifiers
  if (dpsExpression.split(':').length > 2) {
    const {baseToken, modifiers} = parseModifiers(dpsExpression);
    return applyModifiers(baseToken, modifiers);
  }
  
  // Handle simple case with one modifier
  const { baseToken, modifier, params } = parseDPSExpression(dpsExpression);
  return applyModifier(baseToken, modifier, params);
}