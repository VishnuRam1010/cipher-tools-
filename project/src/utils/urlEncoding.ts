/**
 * URL Encoding/Decoding Utility Functions
 */

/**
 * Encode text for URL
 * @param text - The text to encode
 * @returns The URL encoded string
 */
export function encodeURL(text: string): string {
  if (!text) return '';
  
  try {
    return encodeURIComponent(text);
  } catch (error) {
    console.error('URL encoding error:', error);
    return '';
  }
}

/**
 * Decode URL encoded text
 * @param encoded - The URL encoded string
 * @returns The decoded text
 */
export function decodeURL(encoded: string): string {
  if (!encoded) return '';
  
  try {
    return decodeURIComponent(encoded);
  } catch (error) {
    console.error('URL decoding error:', error);
    return 'Invalid URL encoded string';
  }
}

/**
 * Validate URL encoded input
 * @param input - The input string to validate
 * @returns Validation result
 */
export function validateURLInput(input: string): { isValid: boolean; suggestion?: string } {
  // URL encoding accepts most characters
  return { isValid: true };
}