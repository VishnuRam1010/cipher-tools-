import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { getTextToEmojiMapping } from '../../utils/textToEmoji';

export function TextToEmojiReference() {
  const textToEmojiMapping = getTextToEmojiMapping();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="max-w-lg mx-auto w-full"
    >
      <Card>
        <CardHeader>
          <CardTitle>Text to Emoji Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(textToEmojiMapping).map(([letter, emoji]) => (
              <div
                key={letter}
                className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md"
              >
                <span className="font-mono font-medium text-gray-700 dark:text-gray-300">
                  {letter}
                </span>
                <span className="text-lg">{emoji}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}