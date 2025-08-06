import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { CopyButton } from '../ui/CopyButton';
import { CipherSelector, CipherType } from '../ui/CipherSelector';

// Import all cipher utilities
import { encodeA1Z26, decodeA1Z26, validateEncoderInput as validateA1Z26Encoder, validateDecoderInput as validateA1Z26Decoder } from '../../utils/cipher';
import { encodeEmoji, decodeEmoji, validateEmojiEncoderInput, validateEmojiDecoderInput } from '../../utils/emojiCipher';
import { encodeBase64, decodeBase64, validateBase64Input } from '../../utils/base64Cipher';
import { encodeMorse, decodeMorse, validateMorseInput, getMorseMapping } from '../../utils/morseCode';
import { encodeBinary, decodeBinary, validateBinaryInput } from '../../utils/binaryCode';
import { encodeHex, decodeHex, validateHexInput } from '../../utils/hexCode';
import { encodeCaesar, decodeCaesar, caesarBruteForce, validateCaesarInput } from '../../utils/caesarCipher';
import { encodeURL, decodeURL, validateURLInput } from '../../utils/urlEncoding';
import { atbashCipher, validateAtbashInput } from '../../utils/atbashCipher';
import { encodeVigenere, decodeVigenere, validateVigenereInput } from '../../utils/vigenereCipher';
import { encodeRailFence, decodeRailFence, validateRailFenceInput } from '../../utils/railFenceCipher';
import { reverseText, reverseWords, reverseWordOrder, validateReverseInput } from '../../utils/reverseText';
import { encodeLeet, decodeLeet, validateLeetInput, getLeetMapping } from '../../utils/leetSpeak';
import { generateZalgo, cleanZalgo, validateZalgoInput } from '../../utils/zalgoText';
import { encodeInvisibleInk, decodeInvisibleInk, validateInvisibleInkInput, hasInvisibleInk } from '../../utils/invisibleInk';

interface UniversalCipherProps {
  initialCipher?: CipherType;
  initialMode?: 'encode' | 'decode';
}

export function UniversalCipher({ initialCipher = 'a1z26', initialMode = 'decode' }: UniversalCipherProps) {
  const [cipher, setCipher] = useState<CipherType>(initialCipher);
  const [mode, setMode] = useState<'encode' | 'decode'>(initialMode);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [caesarShift, setCaesarShift] = useState(3);
  const [showBruteForce, setShowBruteForce] = useState(false);
  const [bruteForceResults, setBruteForceResults] = useState<Array<{ shift: number; result: string }>>([]);
  const [vigenereKey, setVigenereKey] = useState('KEY');
  const [railFenceRails, setRailFenceRails] = useState(3);
  const [reverseMode, setReverseMode] = useState<'full' | 'words' | 'order'>('full');
  const [zalgoIntensity, setZalgoIntensity] = useState(5);
  const [invisibleCoverText, setInvisibleCoverText] = useState('This text contains a hidden message');

  // Process the input whenever it changes
  useEffect(() => {
    if (!input) {
      setOutput('');
      setError('');
      setSuggestion('');
      setBruteForceResults([]);
      return;
    }

    let result = '';
    let validationResult = { isValid: true, suggestion: '' };

    try {
      switch (cipher) {
        case 'a1z26':
          if (mode === 'encode') {
            validationResult = validateA1Z26Encoder(input);
            if (validationResult.isValid) {
              result = encodeA1Z26(input);
            }
          } else {
            validationResult = validateA1Z26Decoder(input);
            if (validationResult.isValid) {
              result = decodeA1Z26(input);
            }
          }
          break;

        case 'emoji':
          if (mode === 'encode') {
            validationResult = validateEmojiEncoderInput(input);
            if (validationResult.isValid) {
              result = encodeEmoji(input);
            }
          } else {
            validationResult = validateEmojiDecoderInput(input);
            if (validationResult.isValid) {
              result = decodeEmoji(input);
            }
          }
          break;

        case 'base64':
          if (mode === 'encode') {
            result = encodeBase64(input);
          } else {
            validationResult = validateBase64Input(input);
            if (validationResult.isValid) {
              result = decodeBase64(input);
            }
          }
          break;

        case 'morse':
          if (mode === 'encode') {
            result = encodeMorse(input);
          } else {
            validationResult = validateMorseInput(input);
            if (validationResult.isValid) {
              result = decodeMorse(input);
            }
          }
          break;

        case 'binary':
          if (mode === 'encode') {
            result = encodeBinary(input);
          } else {
            validationResult = validateBinaryInput(input);
            if (validationResult.isValid) {
              result = decodeBinary(input);
            }
          }
          break;

        case 'hex':
          if (mode === 'encode') {
            result = encodeHex(input);
          } else {
            validationResult = validateHexInput(input);
            if (validationResult.isValid) {
              result = decodeHex(input);
            }
          }
          break;

        case 'caesar':
          if (mode === 'encode') {
            result = encodeCaesar(input, caesarShift);
          } else {
            result = decodeCaesar(input, caesarShift);
            // Generate brute force results for Caesar cipher
            if (input.length > 0) {
              setBruteForceResults(caesarBruteForce(input));
            }
          }
          break;

        case 'url':
          if (mode === 'encode') {
            result = encodeURL(input);
          } else {
            result = decodeURL(input);
          }
          break;

        case 'atbash':
          // Atbash is symmetric (encode = decode)
          result = atbashCipher(input);
          break;

        case 'vigenere':
          if (mode === 'encode') {
            result = encodeVigenere(input, vigenereKey);
          } else {
            result = decodeVigenere(input, vigenereKey);
          }
          break;

        case 'railfence':
          if (mode === 'encode') {
            result = encodeRailFence(input, railFenceRails);
          } else {
            result = decodeRailFence(input, railFenceRails);
          }
          break;

        case 'reverse':
          if (mode === 'encode') {
            switch (reverseMode) {
              case 'full':
                result = reverseText(input);
                break;
              case 'words':
                result = reverseWords(input);
                break;
              case 'order':
                result = reverseWordOrder(input);
                break;
            }
          } else {
            // Reverse is symmetric for most modes
            switch (reverseMode) {
              case 'full':
                result = reverseText(input);
                break;
              case 'words':
                result = reverseWords(input);
                break;
              case 'order':
                result = reverseWordOrder(input);
                break;
            }
          }
          break;

        case 'leet':
          if (mode === 'encode') {
            result = encodeLeet(input);
          } else {
            result = decodeLeet(input);
          }
          break;

        case 'zalgo':
          if (mode === 'encode') {
            result = generateZalgo(input, zalgoIntensity);
          } else {
            result = cleanZalgo(input);
          }
          break;

        case 'invisible':
          if (mode === 'encode') {
            result = encodeInvisibleInk(input, invisibleCoverText);
          } else {
            result = decodeInvisibleInk(input);
          }
          break;
      }

      if (!validationResult.isValid) {
        setError(getErrorMessage(cipher, mode));
        setSuggestion(validationResult.suggestion || '');
        setOutput('');
      } else {
        setError('');
        setSuggestion('');
        setOutput(result);
      }
    } catch (error) {
      setError('An error occurred during processing');
      setOutput('');
    }
  }, [input, cipher, mode, caesarShift, vigenereKey, railFenceRails, reverseMode, zalgoIntensity, invisibleCoverText]);

  const getErrorMessage = (cipher: CipherType, mode: 'encode' | 'decode'): string => {
    const messages = {
      a1z26: mode === 'encode' ? 'Please enter letters only (A-Z)' : 'Please enter numbers separated by dots',
      emoji: mode === 'encode' ? 'Please enter letters only (A-Z)' : 'Please enter valid emojis',
      base64: 'Please enter valid Base64 characters',
      morse: 'Please enter valid Morse code (dots, dashes, spaces)',
      binary: 'Please enter valid binary (0s and 1s)',
      hex: 'Please enter valid hexadecimal characters',
      caesar: 'Invalid input for Caesar cipher',
      url: 'Invalid URL encoded string',
      atbash: 'Invalid input for Atbash cipher',
      vigenere: 'Invalid input for Vigenère cipher',
      railfence: 'Invalid input for Rail Fence cipher',
      reverse: 'Invalid input for Reverse cipher',
      leet: 'Invalid input for Leet Speak',
      zalgo: 'Invalid input for Zalgo text',
      invisible: 'Invalid input for Invisible Ink'
    };
    return messages[cipher] || 'Invalid input';
  };

  const getPlaceholder = (cipher: CipherType, mode: 'encode' | 'decode'): string => {
    if (mode === 'encode') {
      return cipher === 'morse' ? 'HELLO WORLD' : 'Type your text here...';
    }
    
    const placeholders = {
      a1z26: '8.5.12.12.15',
      emoji: '🏠🥚🦁🦁🐙',
      base64: 'SGVsbG8gV29ybGQ=',
      morse: '.... . .-.. .-.. --- / .-- --- .-. .-.. -..',
      binary: '01001000 01100101 01101100 01101100 01101111',
      hex: '48 65 6c 6c 6f',
      caesar: 'KHOOR ZRUOG',
      url: 'Hello%20World',
      atbash: 'SVOOL DLIOW',
      vigenere: 'RIJVS UYVJN',
      railfence: 'HOREL LOWLD',
      reverse: 'DLROW OLLEH',
      leet: '#3110 W0R1D',
      zalgo: 'Ḧ̴̰ë̴́l̴̈l̴̈ö̴́ ̴̈Ẅ̴ö̴́r̴̈l̴̈d̴̈',
      invisible: 'This text contains a hidden message'
    };
    return placeholders[cipher] || 'Enter encoded text...';
  };

  const handleApplySuggestion = () => {
    if (suggestion) {
      setInput(suggestion);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
    setSuggestion('');
    setBruteForceResults([]);
  };

  return (
    <div className="space-y-8">
      <CipherSelector
        cipher={cipher}
        mode={mode}
        onCipherChange={setCipher}
        onModeChange={setMode}
      />

      <Card>
        <CardHeader>
          <CardTitle>
            {cipher.toUpperCase()} {mode === 'encode' ? 'Encoder' : 'Decoder'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Caesar Cipher Shift Control */}
            {cipher === 'caesar' && (
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-white">Shift Amount:</label>
                <input
                  type="number"
                  min="1"
                  max="25"
                  value={caesarShift}
                  onChange={(e) => setCaesarShift(parseInt(e.target.value) || 3)}
                  className="w-20 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                />
                {mode === 'decode' && (
                  <button
                    onClick={() => setShowBruteForce(!showBruteForce)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    {showBruteForce ? 'Hide' : 'Show'} All Shifts
                  </button>
                )}
              </div>
            )}

            {/* Vigenère Cipher Key Control */}
            {cipher === 'vigenere' && (
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-white">Key:</label>
                <input
                  type="text"
                  value={vigenereKey}
                  onChange={(e) => setVigenereKey(e.target.value.toUpperCase())}
                  placeholder="KEY"
                  className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
                />
              </div>
            )}

            {/* Rail Fence Rails Control */}
            {cipher === 'railfence' && (
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-white">Rails:</label>
                <input
                  type="number"
                  min="2"
                  max="10"
                  value={railFenceRails}
                  onChange={(e) => setRailFenceRails(parseInt(e.target.value) || 3)}
                  className="w-20 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                />
              </div>
            )}

            {/* Reverse Mode Control */}
            {cipher === 'reverse' && (
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-white">Mode:</label>
                <select
                  value={reverseMode}
                  onChange={(e) => setReverseMode(e.target.value as 'full' | 'words' | 'order')}
                  className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                >
                  <option value="full">Reverse All</option>
                  <option value="words">Reverse Words</option>
                  <option value="order">Reverse Word Order</option>
                </select>
              </div>
            )}

            {/* Zalgo Intensity Control */}
            {cipher === 'zalgo' && mode === 'encode' && (
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-white">Intensity:</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={zalgoIntensity}
                  onChange={(e) => setZalgoIntensity(parseInt(e.target.value))}
                  className="flex-1 max-w-32"
                />
                <span className="text-white text-sm">{zalgoIntensity}</span>
              </div>
            )}

            {/* Invisible Ink Cover Text Control */}
            {cipher === 'invisible' && mode === 'encode' && (
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-white">Cover Text:</label>
                <input
                  type="text"
                  value={invisibleCoverText}
                  onChange={(e) => setInvisibleCoverText(e.target.value)}
                  placeholder="Cover text"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
                />
              </div>
            )}

            <Input
              label={`Enter ${mode === 'encode' ? 'text to encode' : 'encoded text to decode'}`}
              placeholder={getPlaceholder(cipher, mode)}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              error={error}
              onSwipe={(direction) => {
                if (direction === 'left') {
                  handleClear();
                }
              }}
            />

            {/* Suggestion */}
            <AnimatePresence>
              {suggestion && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-sm text-blue-400 bg-blue-900/20 p-3 rounded-lg border border-blue-500/20"
                >
                  Did you mean:{' '}
                  <button
                    className="underline hover:text-blue-300 transition-colors"
                    onClick={handleApplySuggestion}
                  >
                    {suggestion}
                  </button>
                  ?
                </motion.div>
              )}
            </AnimatePresence>

            {/* Invisible Ink Detection */}
            {cipher === 'invisible' && mode === 'decode' && input && (
              <div className="text-sm text-blue-400 bg-blue-900/20 p-3 rounded-lg border border-blue-500/20">
                {hasInvisibleInk(input) ? '✅ Hidden text detected!' : '❌ No hidden text found'}
              </div>
            )}

            {/* Output */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-lg font-semibold text-white">
                  {mode === 'encode' ? 'Encoded Result' : 'Decoded Result'}
                </label>
                {output && <CopyButton text={output} />}
              </div>
              <div className="p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl min-h-[80px] break-words">
                {output ? (
                  <motion.p
                    key={output}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-lg font-medium text-white leading-relaxed"
                  >
                    {output}
                  </motion.p>
                ) : (
                  <p className="text-gray-400">
                    {mode === 'encode' ? 'Encoded text' : 'Decoded text'} will appear here
                  </p>
                )}
              </div>
            </div>

            {/* Caesar Brute Force Results */}
            {cipher === 'caesar' && mode === 'decode' && showBruteForce && bruteForceResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                <h4 className="text-lg font-semibold text-white">All Possible Shifts:</h4>
                <div className="grid gap-2 max-h-60 overflow-y-auto">
                  {bruteForceResults.map(({ shift, result }) => (
                    <div
                      key={shift}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                    >
                      <span className="text-sm text-gray-400">Shift {shift}:</span>
                      <span className="text-white font-medium flex-1 ml-4">{result}</span>
                      <CopyButton text={result} />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Leet Speak Reference */}
            {cipher === 'leet' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6"
              >
                <h4 className="text-lg font-semibold text-white mb-3">Leet Speak Reference:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 text-sm">
                  {Object.entries(getLeetMapping()).map(([letter, leet]) => (
                    <div
                      key={letter}
                      className="flex items-center justify-between p-2 bg-white/5 rounded-md"
                    >
                      <span className="font-mono font-medium text-white">{letter}</span>
                      <span className="text-gray-300 font-mono">{leet}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            {/* Morse Code Reference */}
            {cipher === 'morse' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6"
              >
                <h4 className="text-lg font-semibold text-white mb-3">Morse Code Reference:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 text-sm">
                  {Object.entries(getMorseMapping()).map(([letter, morse]) => (
                    <div
                      key={letter}
                      className="flex items-center justify-between p-2 bg-white/5 rounded-md"
                    >
                      <span className="font-mono font-medium text-white">{letter}</span>
                      <span className="text-gray-300 font-mono">{morse}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}