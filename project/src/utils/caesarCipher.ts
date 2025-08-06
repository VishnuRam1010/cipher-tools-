/**
 * Caesar Cipher Encoding/Decoding Utility Functions
 */

/**
 * Encode text using Caesar cipher
 * @param text - The text to encode
 * @param shift - The shift amount (default: 3)
 * @returns The encoded text
 */
export function encodeCaesar(text: string, shift: number = 3): string {
  if (!text) return '';
  
  return text
    .split('')
    .map(char => {
      if (/[A-Z]/.test(char)) {
        return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
      } else if (/[a-z]/.test(char)) {
        return String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97);
      }
      return char;
    })
    .join('');
}

/**
 * Decode text using Caesar cipher
 * @param text - The text to decode
 * @param shift - The shift amount (default: 3)
 * @returns The decoded text
 */
export function decodeCaesar(text: string, shift: number = 3): string {
  if (!text) return '';
  
  return encodeCaesar(text, -shift);
}

/**
 * Try all possible Caesar cipher shifts
 * @param text - The text to decode
 * @returns Array of all possible decodings
 */
export function caesarBruteForce(text: string): Array<{ shift: number; result: string }> {
  const results = [];
  for (let shift = 1; shift < 26; shift++) {
    results.push({
      shift,
      result: decodeCaesar(text, shift)
    });
  }
  return results;
}

/**
 * Validate Caesar cipher input
 * @param input - The input string to validate
 * @returns Validation result
 */
export function validateCaesarInput(input: string): { isValid: boolean; suggestion?: string } {
  // Caesar cipher accepts any text
  return { isValid: true };
}