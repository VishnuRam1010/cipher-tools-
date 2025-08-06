/**
 * Vigenère Cipher Encoding/Decoding Utility Functions
 */

/**
 * Encode text using Vigenère cipher
 * @param text - The text to encode
 * @param key - The key for encoding
 * @returns The encoded text
 */
export function encodeVigenere(text: string, key: string): string {
  if (!text || !key) return '';
  
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (!cleanKey) return text;
  
  let result = '';
  let keyIndex = 0;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    if (/[A-Z]/.test(char)) {
      const shift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
      const encoded = String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
      result += encoded;
      keyIndex++;
    } else if (/[a-z]/.test(char)) {
      const shift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
      const encoded = String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97);
      result += encoded;
      keyIndex++;
    } else {
      result += char;
    }
  }
  
  return result;
}

/**
 * Decode text using Vigenère cipher
 * @param text - The text to decode
 * @param key - The key for decoding
 * @returns The decoded text
 */
export function decodeVigenere(text: string, key: string): string {
  if (!text || !key) return '';
  
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (!cleanKey) return text;
  
  let result = '';
  let keyIndex = 0;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    if (/[A-Z]/.test(char)) {
      const shift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
      const decoded = String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
      result += decoded;
      keyIndex++;
    } else if (/[a-z]/.test(char)) {
      const shift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
      const decoded = String.fromCharCode(((char.charCodeAt(0) - 97 - shift + 26) % 26) + 97);
      result += decoded;
      keyIndex++;
    } else {
      result += char;
    }
  }
  
  return result;
}

/**
 * Validate Vigenère input
 * @param input - The input string to validate
 * @returns Validation result
 */
export function validateVigenereInput(input: string): { isValid: boolean; suggestion?: string } {
  // Vigenère accepts any text
  return { isValid: true };
}