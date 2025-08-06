/**
 * Text to Emoji Utility Functions
 * This module provides functions for converting text letters to emojis and back.
 */

// Text to emoji mapping (same as emoji cipher but for any text)
const TEXT_TO_EMOJI_MAP: Record<string, string> = {
  'A': '🍎', 'B': '🐝', 'C': '🥥', 'D': '🐬', 'E': '🥚', 'F': '🐸', 'G': '🍇',
  'H': '🏠', 'I': '🍦', 'J': '🃏', 'K': '🔑', 'L': '🦁', 'M': '🌝', 'N': '🐢',
  'O': '🐙', 'P': '🦚', 'Q': '👑', 'R': '🤖', 'S': '🐍', 'T': '🌴', 'U': '☂',
  'V': '🎻', 'W': '🌊', 'X': '❌', 'Y': '🛳', 'Z': '🦓'
};

// Reverse mapping for decoding
const EMOJI_TO_TEXT_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(TEXT_TO_EMOJI_MAP).map(([text, emoji]) => [emoji, text])
);

/**
 * Convert text to emojis (letters only)
 * @param text - The text to convert
 * @returns The text converted to emojis
 */
export function textToEmoji(text: string): string {
  if (!text) return '';
  
  return text
    .toUpperCase()
    .split('')
    .map(char => {
      // Convert letters to emojis
      if (/[A-Z]/.test(char)) {
        return TEXT_TO_EMOJI_MAP[char] || char;
      }
      // Keep spaces and other characters as is
      return char;
    })
    .join('');
}

/**
 * Convert emojis back to text
 * @param emojis - The emoji string to convert back
 * @returns The converted text
 */
export function emojiToText(emojis: string): string {
  if (!emojis) return '';
  
  // Split into individual characters (including emojis)
  const chars = Array.from(emojis);
  
  return chars
    .map(char => EMOJI_TO_TEXT_MAP[char] || char)
    .join('');
}

/**
 * Validate input for text to emoji conversion
 * @param input - The input string to validate
 * @returns An object containing validation result
 */
export function validateTextToEmojiInput(input: string): { isValid: boolean; suggestion?: string } {
  // Accept any text input
  return { isValid: true };
}

/**
 * Validate input for emoji to text conversion
 * @param input - The input string to validate
 * @returns An object containing validation result and suggestion
 */
export function validateEmojiToTextInput(input: string): { isValid: boolean; suggestion?: string } {
  if (!input) return { isValid: true };
  
  const chars = Array.from(input);
  const validEmojis = Object.keys(EMOJI_TO_TEXT_MAP);
  
  // Check if input contains valid emojis or spaces/other characters
  const hasInvalidEmojis = chars.some(char => 
    validEmojis.includes(char) === false && TEXT_TO_EMOJI_MAP[char.toUpperCase()] === undefined && char !== ' '
  );
  
  if (hasInvalidEmojis) {
    // Create a suggestion by keeping only valid emojis and spaces
    const suggestion = chars
      .filter(char => validEmojis.includes(char) || char === ' ')
      .join('');
    return { isValid: false, suggestion };
  }
  
  return { isValid: true };
}

/**
 * Get the text to emoji mapping for display purposes
 * @returns The text to emoji mapping object
 */
export function getTextToEmojiMapping(): Record<string, string> {
  return TEXT_TO_EMOJI_MAP;
}