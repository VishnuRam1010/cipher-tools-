/**
 * Emoji Cipher Utility Functions
 * This module provides functions for encoding and decoding text using emoji substitution.
 */

// Emoji mapping for A-Z
const EMOJI_MAP: Record<string, string> = {
  A: '🍎', B: '🐝', C: '🥥', D: '🐬', E: '🥚', F: '🐸', G: '🍇',
  H: '🏠', I: '🍦', J: '🃏', K: '🔑', L: '🦁', M: '🌝', N: '🐢',
  O: '🐙', P: '🦚', Q: '👑', R: '🤖', S: '🐍', T: '🌴', U: '☂',
  V: '🎻', W: '🌊', X: '❌', Y: '🛳', Z: '🦓'
};

// Reverse mapping for decoding
const REVERSE_EMOJI_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(EMOJI_MAP).map(([letter, emoji]) => [emoji, letter])
);

/**
 * Encode text to emoji cipher (letters to emojis)
 * @param text - The text to encode (letters A-Z)
 * @returns The encoded string of emojis
 */
export function encodeEmoji(text: string): string {
  if (!text) return '';
  
  return text
    .toUpperCase()
    .split('')
    .map(char => {
      // Check if the character is a letter
      if (/[A-Z]/.test(char)) {
        return EMOJI_MAP[char] || char;
      }
      // Keep spaces and other characters as is
      return char;
    })
    .join('');
}

/**
 * Decode emoji cipher (emojis to letters)
 * @param code - The encoded string of emojis
 * @returns The decoded text
 */
export function decodeEmoji(code: string): string {
  if (!code) return '';
  
  // Split into individual characters (including emojis)
  const chars = Array.from(code);
  
  return chars
    .map(char => {
      // Check if the character is one of our emojis
      if (REVERSE_EMOJI_MAP[char]) {
        return REVERSE_EMOJI_MAP[char];
      }
      // Keep other characters as is
      return char;
    })
    .join('');
}

/**
 * Validate input for the emoji decoder
 * @param input - The input string to validate
 * @returns An object containing validation result and suggestion
 */
export function validateEmojiDecoderInput(input: string): { isValid: boolean; suggestion?: string } {
  if (!input) return { isValid: true };
  
  const chars = Array.from(input);
  const validEmojis = Object.keys(REVERSE_EMOJI_MAP);
  
  // Check if input contains valid emojis or spaces
  const hasInvalidChars = chars.some(char => 
    char !== ' ' && !validEmojis.includes(char)
  );
  
  if (hasInvalidChars) {
    // Create a suggestion by keeping only valid emojis and spaces
    const suggestion = chars
      .filter(char => char === ' ' || validEmojis.includes(char))
      .join('');
    return { isValid: false, suggestion };
  }
  
  return { isValid: true };
}

/**
 * Validate input for the emoji encoder
 * @param input - The input string to validate
 * @returns An object containing validation result and suggestion
 */
export function validateEmojiEncoderInput(input: string): { isValid: boolean; suggestion?: string } {
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

/**
 * Get the emoji mapping for display purposes
 * @returns The emoji mapping object
 */
export function getEmojiMapping(): Record<string, string> {
  return EMOJI_MAP;
}