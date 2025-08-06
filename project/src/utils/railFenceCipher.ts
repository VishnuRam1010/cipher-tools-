/**
 * Rail Fence Cipher Encoding/Decoding Utility Functions
 */

/**
 * Encode text using Rail Fence cipher
 * @param text - The text to encode
 * @param rails - Number of rails (default: 3)
 * @returns The encoded text
 */
export function encodeRailFence(text: string, rails: number = 3): string {
  if (!text || rails < 2) return text;
  
  // Remove spaces for cleaner encoding
  const cleanText = text.replace(/\s/g, '');
  
  // Create rails
  const fence: string[][] = Array(rails).fill(null).map(() => []);
  
  let rail = 0;
  let direction = 1;
  
  // Place characters on rails
  for (let i = 0; i < cleanText.length; i++) {
    fence[rail].push(cleanText[i]);
    
    rail += direction;
    
    // Change direction at top and bottom rails
    if (rail === rails - 1 || rail === 0) {
      direction = -direction;
    }
  }
  
  // Read off the rails
  return fence.map(rail => rail.join('')).join('');
}

/**
 * Decode text using Rail Fence cipher
 * @param text - The text to decode
 * @param rails - Number of rails (default: 3)
 * @returns The decoded text
 */
export function decodeRailFence(text: string, rails: number = 3): string {
  if (!text || rails < 2) return text;
  
  const cleanText = text.replace(/\s/g, '');
  const length = cleanText.length;
  
  // Create fence pattern to determine positions
  const fence: (string | null)[][] = Array(rails).fill(null).map(() => Array(length).fill(null));
  
  let rail = 0;
  let direction = 1;
  
  // Mark positions in the fence
  for (let i = 0; i < length; i++) {
    fence[rail][i] = '*';
    
    rail += direction;
    
    if (rail === rails - 1 || rail === 0) {
      direction = -direction;
    }
  }
  
  // Fill the fence with characters
  let index = 0;
  for (let r = 0; r < rails; r++) {
    for (let c = 0; c < length; c++) {
      if (fence[r][c] === '*' && index < cleanText.length) {
        fence[r][c] = cleanText[index++];
      }
    }
  }
  
  // Read the message
  let result = '';
  rail = 0;
  direction = 1;
  
  for (let i = 0; i < length; i++) {
    result += fence[rail][i];
    
    rail += direction;
    
    if (rail === rails - 1 || rail === 0) {
      direction = -direction;
    }
  }
  
  return result;
}

/**
 * Validate Rail Fence input
 * @param input - The input string to validate
 * @returns Validation result
 */
export function validateRailFenceInput(input: string): { isValid: boolean; suggestion?: string } {
  // Rail Fence accepts any text
  return { isValid: true };
}