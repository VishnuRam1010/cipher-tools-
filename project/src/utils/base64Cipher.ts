/**
 * Base64 Encoding/Decoding Utility Functions
 */

/**
 * Encode text to Base64
 * @param text - The text to encode
 * @returns The Base64 encoded string
 */
export function encodeBase64(text: string): string {
  if (!text) return '';
  
  try {
    return btoa(unescape(encodeURIComponent(text)));
  } catch (error) {
    console.error('Base64 encoding error:', error);
    return '';
  }
}

/**
 * Decode Base64 to text
 * @param encoded - The Base64 encoded string
 * @returns The decoded text
 */
export function decodeBase64(encoded: string): string {
  if (!encoded) return '';
  
  try {
    return decodeURIComponent(escape(atob(encoded)));
  } catch (error) {
    console.error('Base64 decoding error:', error);
    return 'Invalid Base64 string';
  }
}

/**
 * Validate Base64 input
 * @param input - The input string to validate
 * @returns Validation result
 */
export function validateBase64Input(input: string): { isValid: boolean; suggestion?: string } {
  if (!input) return { isValid: true };
  
  // Base64 should only contain A-Z, a-z, 0-9, +, /, and = for padding
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
  const isValid = base64Regex.test(input);
  
  if (!isValid) {
    const suggestion = input.replace(/[^A-Za-z0-9+/=]/g, '');
    return { isValid: false, suggestion };
  }
  
  return { isValid: true };
}