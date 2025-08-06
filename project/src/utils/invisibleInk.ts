/**
 * Invisible Ink Utility Functions
 * Uses zero-width characters to hide text
 */

// Zero-width characters for encoding
const ZERO_WIDTH_CHARS = {
  '0': '\u200B', // Zero Width Space
  '1': '\u200C', // Zero Width Non-Joiner
  '2': '\u200D', // Zero Width Joiner
  '3': '\u2060', // Word Joiner
};

// Reverse mapping
const CHAR_TO_BINARY: Record<string, string> = {
  '\u200B': '0',
  '\u200C': '1', 
  '\u200D': '2',
  '\u2060': '3'
};

/**
 * Encode text as invisible ink using zero-width characters
 * @param text - The text to hide
 * @param coverText - The visible cover text (optional)
 * @returns The text with hidden message
 */
export function encodeInvisibleInk(text: string, coverText: string = 'This text contains a hidden message'): string {
  if (!text) return coverText;
  
  // Convert text to binary, then to base-4, then to zero-width chars
  const binaryText = text
    .split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join('');
  
  // Convert binary to base-4 (using 00=0, 01=1, 10=2, 11=3)
  let base4 = '';
  for (let i = 0; i < binaryText.length; i += 2) {
    const pair = binaryText.substr(i, 2).padEnd(2, '0');
    const value = parseInt(pair, 2);
    base4 += value.toString();
  }
  
  // Convert to zero-width characters
  const invisibleText = base4
    .split('')
    .map(digit => ZERO_WIDTH_CHARS[digit as keyof typeof ZERO_WIDTH_CHARS] || '')
    .join('');
  
  // Insert invisible text into cover text
  const midPoint = Math.floor(coverText.length / 2);
  return coverText.slice(0, midPoint) + invisibleText + coverText.slice(midPoint);
}

/**
 * Decode invisible ink to reveal hidden text
 * @param textWithHidden - The text containing hidden message
 * @returns The decoded hidden message
 */
export function decodeInvisibleInk(textWithHidden: string): string {
  if (!textWithHidden) return '';
  
  try {
    // Extract zero-width characters
    const invisibleChars = textWithHidden
      .split('')
      .filter(char => Object.keys(CHAR_TO_BINARY).includes(char))
      .join('');
    
    if (!invisibleChars) return 'No hidden message found';
    
    // Convert zero-width chars back to base-4
    const base4 = invisibleChars
      .split('')
      .map(char => CHAR_TO_BINARY[char] || '')
      .join('');
    
    // Convert base-4 back to binary
    let binary = '';
    for (const digit of base4) {
      const value = parseInt(digit);
      binary += value.toString(2).padStart(2, '0');
    }
    
    // Convert binary back to text
    let result = '';
    for (let i = 0; i < binary.length; i += 8) {
      const byte = binary.substr(i, 8);
      if (byte.length === 8) {
        const charCode = parseInt(byte, 2);
        if (charCode > 0 && charCode < 127) { // Valid ASCII range
          result += String.fromCharCode(charCode);
        }
      }
    }
    
    return result || 'Could not decode hidden message';
  } catch (error) {
    return 'Error decoding hidden message';
  }
}

/**
 * Check if text contains invisible characters
 * @param text - The text to check
 * @returns True if invisible characters are found
 */
export function hasInvisibleInk(text: string): boolean {
  return text.split('').some(char => Object.keys(CHAR_TO_BINARY).includes(char));
}

/**
 * Validate invisible ink input
 * @param input - The input string to validate
 * @returns Validation result
 */
export function validateInvisibleInkInput(input: string): { isValid: boolean; suggestion?: string } {
  // Invisible ink accepts any text
  return { isValid: true };
}