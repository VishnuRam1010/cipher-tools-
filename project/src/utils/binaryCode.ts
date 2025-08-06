/**
 * Binary Encoding/Decoding Utility Functions
 */

/**
 * Encode text to binary
 * @param text - The text to encode
 * @returns The binary string
 */
export function encodeBinary(text: string): string {
  if (!text) return '';
  
  return text
    .split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
}

/**
 * Decode binary to text
 * @param binary - The binary string
 * @returns The decoded text
 */
export function decodeBinary(binary: string): string {
  if (!binary) return '';
  
  try {
    return binary
      .split(/\s+/)
      .map(bin => {
        const decimal = parseInt(bin, 2);
        return isNaN(decimal) ? '' : String.fromCharCode(decimal);
      })
      .join('');
  } catch (error) {
    return 'Invalid binary string';
  }
}

/**
 * Validate binary input
 * @param input - The input string to validate
 * @returns Validation result
 */
export function validateBinaryInput(input: string): { isValid: boolean; suggestion?: string } {
  if (!input) return { isValid: true };
  
  // Binary should only contain 0, 1, and spaces
  const binaryRegex = /^[01\s]+$/;
  const isValid = binaryRegex.test(input);
  
  if (!isValid) {
    const suggestion = input.replace(/[^01\s]/g, '');
    return { isValid: false, suggestion };
  }
  
  return { isValid: true };
}