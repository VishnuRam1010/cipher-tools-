/**
 * Morse Code Encoding/Decoding Utility Functions
 */

// Morse code mapping
const MORSE_MAP: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', ' ': '/'
};

// Reverse mapping for decoding
const REVERSE_MORSE_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE_MAP).map(([letter, morse]) => [morse, letter])
);

/**
 * Encode text to Morse code
 * @param text - The text to encode
 * @returns The Morse code string
 */
export function encodeMorse(text: string): string {
  if (!text) return '';
  
  return text
    .toUpperCase()
    .split('')
    .map(char => MORSE_MAP[char] || char)
    .join(' ');
}

/**
 * Decode Morse code to text
 * @param morse - The Morse code string
 * @returns The decoded text
 */
export function decodeMorse(morse: string): string {
  if (!morse) return '';
  
  return morse
    .split(' ')
    .map(code => REVERSE_MORSE_MAP[code] || code)
    .join('');
}

/**
 * Validate Morse code input
 * @param input - The input string to validate
 * @returns Validation result
 */
export function validateMorseInput(input: string): { isValid: boolean; suggestion?: string } {
  if (!input) return { isValid: true };
  
  // Morse code should only contain dots, dashes, spaces, and forward slashes
  const morseRegex = /^[.\-\s/]+$/;
  const isValid = morseRegex.test(input);
  
  if (!isValid) {
    const suggestion = input.replace(/[^.\-\s/]/g, '');
    return { isValid: false, suggestion };
  }
  
  return { isValid: true };
}

/**
 * Get the Morse code mapping for display
 * @returns The Morse code mapping object
 */
export function getMorseMapping(): Record<string, string> {
  return MORSE_MAP;
}