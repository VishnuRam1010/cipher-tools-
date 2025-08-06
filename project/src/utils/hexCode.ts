/**
 * Hexadecimal Encoding/Decoding Utility Functions
 */

/**
 * Encode text to hexadecimal
 * @param text - The text to encode
 * @returns The hexadecimal string
 */
export function encodeHex(text: string): string {
  if (!text) return '';
  
  return text
    .split('')
    .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
    .join(' ');
}

/**
 * Decode hexadecimal to text
 * @param hex - The hexadecimal string
 * @returns The decoded text
 */
export function decodeHex(hex: string): string {
  if (!hex) return '';
  
  try {
    return hex
      .split(/\s+/)
      .map(hexChar => {
        const decimal = parseInt(hexChar, 16);
        return isNaN(decimal) ? '' : String.fromCharCode(decimal);
      })
      .join('');
  } catch (error) {
    return 'Invalid hexadecimal string';
  }
}

/**
 * Validate hexadecimal input
 * @param input - The input string to validate
 * @returns Validation result
 */
export function validateHexInput(input: string): { isValid: boolean; suggestion?: string } {
  if (!input) return { isValid: true };
  
  // Hex should only contain 0-9, A-F, a-f, and spaces
  const hexRegex = /^[0-9A-Fa-f\s]+$/;
  const isValid = hexRegex.test(input);
  
  if (!isValid) {
    const suggestion = input.replace(/[^0-9A-Fa-f\s]/g, '');
    return { isValid: false, suggestion };
  }
  
  return { isValid: true };
}