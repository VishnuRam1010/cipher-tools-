/**
 * Reverse Text Utility Functions
 */

/**
 * Reverse the entire text
 * @param text - The text to reverse
 * @returns The reversed text
 */
export function reverseText(text: string): string {
  if (!text) return '';
  return text.split('').reverse().join('');
}

/**
 * Reverse words but keep word order
 * @param text - The text to reverse
 * @returns Text with reversed words
 */
export function reverseWords(text: string): string {
  if (!text) return '';
  return text.split(' ').map(word => word.split('').reverse().join('')).join(' ');
}

/**
 * Reverse word order but keep words intact
 * @param text - The text to reverse
 * @returns Text with reversed word order
 */
export function reverseWordOrder(text: string): string {
  if (!text) return '';
  return text.split(' ').reverse().join(' ');
}

/**
 * Validate reverse text input
 * @param input - The input string to validate
 * @returns Validation result
 */
export function validateReverseInput(input: string): { isValid: boolean; suggestion?: string } {
  // Reverse accepts any text
  return { isValid: true };
}