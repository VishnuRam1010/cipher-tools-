import { Code, Hash } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ModeToggleProps {
  mode: 'encode' | 'decode';
  onChange: (mode: 'encode' | 'decode') => void;
  className?: string;
}

export function ModeToggle({ mode, onChange, className }: ModeToggleProps) {
  return (
    <div
      className={cn(
        'inline-flex rounded-lg border border-gray-300 dark:border-gray-700 p-1',
        'bg-gray-100 dark:bg-gray-800',
        className
      )}
    >
      <button
        type="button"
        onClick={() => onChange('decode')}
        className={cn(
          'relative flex items-center px-3 py-1.5 text-sm font-medium rounded-md',
          'transition-colors duration-200',
          mode === 'decode'
            ? 'text-white'
            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
        )}
      >
        {mode === 'decode' && (
          <motion.div
            layoutId="modeBackground"
            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-md -z-10"
            initial={false}
            transition={{ type: 'spring', duration: 0.3 }}
          />
        )}
        <Hash className="w-4 h-4 mr-2" />
        <span>Decode</span>
      </button>

      <button
        type="button"
        onClick={() => onChange('encode')}
        className={cn(
          'relative flex items-center px-3 py-1.5 text-sm font-medium rounded-md',
          'transition-colors duration-200',
          mode === 'encode'
            ? 'text-white'
            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
        )}
      >
        {mode === 'encode' && (
          <motion.div
            layoutId="modeBackground"
            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-md -z-10"
            initial={false}
            transition={{ type: 'spring', duration: 0.3 }}
          />
        )}
        <Code className="w-4 h-4 mr-2" />
        <span>Encode</span>
      </button>
    </div>
  );
}