/**
 * Leet Speak (1337) Encoding/Decoding Utility Functions
 */

// Leet speak mapping
const LEET_MAP: Record<string, string> = {
  'A': '4', 'B': '8', 'C': '(', 'D': 'D', 'E': '3', 'F': 'F', 'G': '6',
  'H': '#', 'I': '1', 'J': 'J', 'K': 'K', 'L': '1', 'M': 'M', 'N': 'N',
  'O': '0', 'P': 'P', 'Q': 'Q', 'R': 'R', 'S': '5', 'T': '7', 'U': 'U',
  'V': 'V', 'W': 'W', 'X': 'X', 'Y': 'Y', 'Z': '2'
};

// Reverse mapping for decoding
const REVERSE_LEET_MAP: Record<string, string> = {
  '4': 'A', '8': 'B', '(': 'C', '3': 'E', '6': 'G', '#': 'H',
  '1': 'I', '0': 'O', '5': 'S', '7': 'T', '2': 'Z'
};

/**
 * Encode text to leet speak
 * @param text - The text to encode
 * @returns The leet speak encoded text
 */
export function encodeLeet(text: string): string {
  if (!text) return '';
  
  return text
    .toUpperCase()
    .split('')
    .map(char => LEET_MAP[char] || char)
    .join('');
}

/**
 * Decode leet speak to text
 * @param leet - The leet speak to decode
 * @returns The decoded text
 */
export function decodeLeet(leet: string): string {
  if (!leet) return '';
  
  return leet
    .split('')
    .map(char => REVERSE_LEET_MAP[char] || char)
    .join('');
}

/**
 * Validate leet speak input
 * @param input - The input string to validate
 * @returns Validation result
 */
export function validateLeetInput(input: string): { isValid: boolean; suggestion?: string } {
  // Leet speak accepts any text
  return { isValid: true };
}

/**
 * Get the leet speak mapping for display
 * @returns The leet speak mapping object
 */
export function getLeetMapping(): Record<string, string> {
  return LEET_MAP;
}