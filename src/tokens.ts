/**
 * Semantic tokens for the Pretty Ugly Colors system
 * These tokens provide meaningful names for colors based on their usage
 */

// Token categories with proper index signature
export interface SemanticTokens {
    // Use index signature to tell TypeScript that string keys are valid
    [category: string]: { [token: string]: string };
    
    // Specific categories for type safety and autocomplete
    color: { [key: string]: string };
    bgColor: { [key: string]: string };
    fgColor: { [key: string]: string };
    borderColor: { [key: string]: string };
    dataColor: { [key: string]: string };
  }
  
  /**
   * Semantic tokens that map to specific colors and shades
   * Format: [token-name]: [color-name]-[shade]
   */
  export const tokens: SemanticTokens = {
    // Base color tokens
    color: {
      "primary": "neutral-900",
      "secondary": "blue-600",
      "success": "green-600",
      "warning": "yellow-600",
      "danger": "red-600",
      "info": "blue-600",
      "neutral": "neutral-500",
    },
  
    // Background tokens
    bgColor: {
      "surface": "neutral-0",
      "surface-emphasis": "neutral-100",
      
      "primary": "neutral-900",
      "secondary": "neutral-0",
      "danger": "red-600",
      "success": "green-600",
      "warning": "yellow-600",
      "info": "blue-600",
      "neutral": "neutral-600",
      
      "alert-success": "green-100",
      "alert-warning": "yellow-100",
      "alert-danger": "red-100",
      "alert-info": "blue-100",

    // Components
      "header": "neutral-900",
      "sidebar": "neutral-100",
      "card": "neutral-0",
      "tooltip": "neutral-900",
      "toast": "neutral-900",
    },
  
    // Foreground/text tokens
    fgColor: {
      "default": "neutral-700",
      
      "primary-button": "neutral-100",
      "secondary-button": "neutral-800",
      "link": "blue-600",
      "link-visited": "purple-600",
      
      "success": "green-600",
      "warning": "yellow-700",
      "danger": "red-600",
      "info": "blue-600",
    },
  
    // Border tokens
    borderColor: {
      "default": "crane-300",
      
      "primary-button": "neutral-900",
      "secondary-button": "neutral-900",
      
      "success": "green-500",
      "warning": "yellow-500",
      "danger": "red-500",
      "info": "blue-500",
    },

    // Data visualization
    dataColor: {
      "chart-1": "blue-500",
      "chart-2": "green-500",
      "chart-3": "purple-500",
      "chart-4": "orange-500",
      "chart-5": "red-500",
      "chart-6": "yellow-500",
    },
  };
  
  /**
   * Get the actual color value for a semantic token
   * @param tokenName The semantic token
   * @returns The corresponding color-shade combination
   */
  export function getColorForToken(tokenName: string): string | null {
    if (!tokenName.includes('-')) return null;
    
    const [category, name] = tokenName.split('-');
    
    if (!tokens[category] || !tokens[category][name]) {
      return null;
    }
    
    return tokens[category][name];
  }