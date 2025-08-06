/**
 * Atbash Cipher Encoding/Decoding Utility Functions
 * Atbash is a substitution cipher where A=Z, B=Y, C=X, etc.
 */

/**
 * Encode/Decode text using Atbash cipher (it's symmetric)
 * @param text - The text to encode/decode
 * @returns The Atbash cipher result
 */
export function atbashCipher(text: string): string {
  if (!text) return '';
  
  return text
    .split('')
    .map(char => {
      if (/[A-Z]/.test(char)) {
        // For uppercase: A(65) becomes Z(90), B(66) becomes Y(89), etc.
        return String.fromCharCode(90 - (char.charCodeAt(0) - 65));
      } else if (/[a-z]/.test(char)) {
        // For lowercase: a(97) becomes z(122), b(98) becomes y(121), etc.
        return String.fromCharCode(122 - (char.charCodeAt(0) - 97));
      }
      // Keep non-alphabetic characters as is
      return char;
    })
    .join('');
}

/**
 * Validate Atbash input (accepts any text)
 * @param input - The input string to validate
 * @returns Validation result
 */
export function validateAtbashInput(input: string): { isValid: boolean; suggestion?: string } {
  // Atbash accepts any text
  return { isValid: true };
}