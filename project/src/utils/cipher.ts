/**
 * A1Z26 Cipher Utility Functions
 * This module provides functions for encoding and decoding text using the A1Z26 cipher.
 */

/**
 * Encode text to A1Z26 cipher (letters to numbers)
 * @param text - The text to encode (letters A-Z)
 * @returns The encoded string of numbers separated by dots
 */
export function encodeA1Z26(text: string): string {
  if (!text) return '';
  
  return text
    .toUpperCase()
    .split('')
    .map(char => {
      // Check if the character is a letter
      if (/[A-Z]/.test(char)) {
        // Convert A-Z to 1-26
        return (char.charCodeAt(0) - 64).toString();
      }
      // For spaces, use a special marker
      if (char === ' ') {
        return '0';
      }
      // Keep other characters as is
      return char;
    })
    .join('.');
}

/**
 * Decode A1Z26 cipher (numbers to letters)
 * @param code - The encoded string of numbers separated by dots
 * @returns The decoded text
 */
export function decodeA1Z26(code: string): string {
  if (!code) return '';
  
  // Split by dot, space, comma, or semicolon
  return code
    .split(/[.\s,;]+/)
    .map(num => {
      const parsedNum = parseInt(num.trim(), 10);
      
      // Check if the parsed number is valid
      if (isNaN(parsedNum)) {
        return '';
      }
      
      // 0 represents space
      if (parsedNum === 0) {
        return ' ';
      }
      
      // Check if the number is within the A-Z range (1-26)
      if (parsedNum >= 1 && parsedNum <= 26) {
        // Convert 1-26 to A-Z
        return String.fromCharCode(parsedNum + 64);
      }
      
      // For numbers outside the range, return the number itself
      return num;
    })
    .join('');
}

/**
 * Validate input for the A1Z26 decoder
 * @param input - The input string to validate
 * @returns An object containing validation result and suggestion
 */
export function validateDecoderInput(input: string): { isValid: boolean; suggestion?: string } {
  if (!input) return { isValid: true };
  
  // Check if input only contains numbers, dots, spaces, commas, and semicolons
  const isValid = /^[0-9.\s,;]+$/.test(input);
  
  if (!isValid) {
    // Create a suggestion by removing invalid characters
    const suggestion = input.replace(/[^0-9.\s,;]/g, '');
    return { isValid, suggestion };
  }
  
  return { isValid: true };
}

/**
 * Validate input for the A1Z26 encoder
 * @param input - The input string to validate
 * @returns An object containing validation result and suggestion
 */
export function validateEncoderInput(input: string): { isValid: boolean; suggestion?: string } {
  if (!input) return { isValid: true };
  
  // Check if input contains only letters and spaces
  const isValid = /^[A-Za-z\s]+$/.test(input);
  
  if (!isValid) {
    // Create a suggestion by removing invalid characters
    const suggestion = input.replace(/[^A-Za-z\s]/g, '');
    return { isValid, suggestion };
  }
  
  return { isValid: true };
}