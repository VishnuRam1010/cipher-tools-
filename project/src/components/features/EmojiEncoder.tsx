import { useEffect, useState } from 'react';
import { Smile } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { CopyButton } from '../ui/CopyButton';
import { encodeEmoji, validateEmojiEncoderInput } from '../../utils/emojiCipher';

interface EmojiEncoderProps {
  batchMode?: boolean;
  onClear?: () => void;
}

export function EmojiEncoder({ batchMode = false, onClear }: EmojiEncoderProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [suggestion, setSuggestion] = useState('');

  // Encode the input whenever it changes
  useEffect(() => {
    if (!input) {
      setOutput('');
      setError('');
      setSuggestion('');
      return;
    }

    // Validate the input
    const { isValid, suggestion } = validateEmojiEncoderInput(input);
    
    if (!isValid) {
      setError('Please enter letters only (A-Z)');
      setSuggestion(suggestion || '');
      return;
    }

    setError('');
    setSuggestion('');
    
    // Encode the input
    const encoded = encodeEmoji(input);
    setOutput(encoded);
  }, [input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
    setSuggestion('');
    if (onClear) onClear();
  };

  const handleApplySuggestion = () => {
    if (suggestion) {
      setInput(suggestion);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Text to Emoji Encoder</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            label="Enter text to encode (e.g., HELLO)"
            placeholder="Type here..."
            value={input}
            onChange={handleInputChange}
            error={error}
            icon={<Smile className="w-4 h-4" />}
            onSwipe={direction => {
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
                className="text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded-md"
              >
                Did you mean:{' '}
                <button
                  className="underline focus:outline-none"
                  onClick={handleApplySuggestion}
                >
                  {suggestion}
                </button>
                ?
              </motion.div>
            )}
          </AnimatePresence>

          {/* Output */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Encoded Emojis
              </label>
              {output && <CopyButton text={output} />}
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md min-h-[50px] break-words">
              {output ? (
                <motion.p
                  key={output}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-2xl font-medium text-gray-800 dark:text-gray-200"
                >
                  {output}
                </motion.p>
              ) : (
                <p className="text-gray-400 dark:text-gray-500">
                  Encoded emojis will appear here
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}