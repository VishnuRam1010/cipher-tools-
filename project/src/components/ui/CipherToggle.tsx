import { Code, Hash, Smile } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface CipherToggleProps {
  cipher: 'a1z26' | 'emoji';
  mode: 'encode' | 'decode';
  onCipherChange: (cipher: 'a1z26' | 'emoji') => void;
  onModeChange: (mode: 'encode' | 'decode') => void;
  className?: string;
}

export function CipherToggle({ cipher, mode, onCipherChange, onModeChange, className }: CipherToggleProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {/* Cipher Type Toggle */}
      <div className="inline-flex rounded-2xl border border-white/20 p-1 bg-white/10 backdrop-blur-xl shadow-xl">
        <button
          type="button"
          onClick={() => onCipherChange('a1z26')}
          className={cn(
            'relative flex items-center px-4 py-2 text-sm font-semibold rounded-xl',
            'transition-all duration-300',
            cipher === 'a1z26'
              ? 'text-white shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          )}
        >
          {cipher === 'a1z26' && (
            <motion.div
              layoutId="cipherBackground"
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg"
              initial={false}
              transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
            />
          )}
          <div className="relative z-10 flex items-center gap-2">
            <Hash className="w-4 h-4" />
            <span>A1Z26</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onCipherChange('emoji')}
          className={cn(
            'relative flex items-center px-4 py-2 text-sm font-semibold rounded-xl',
            'transition-all duration-300',
            cipher === 'emoji'
              ? 'text-white shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          )}
        >
          {cipher === 'emoji' && (
            <motion.div
              layoutId="cipherBackground"
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg"
              initial={false}
              transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
            />
          )}
          <div className="relative z-10 flex items-center gap-2">
            <Smile className="w-4 h-4" />
            <span>Emoji</span>
          </div>
        </button>
      </div>

      {/* Mode Toggle */}
      <div className="inline-flex rounded-2xl border border-white/20 p-1 bg-white/10 backdrop-blur-xl shadow-xl">
        <button
          type="button"
          onClick={() => onModeChange('decode')}
          className={cn(
            'relative flex items-center px-4 py-2 text-sm font-semibold rounded-xl',
            'transition-all duration-300',
            mode === 'decode'
              ? 'text-white shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          )}
        >
          {mode === 'decode' && (
            <motion.div
              layoutId="modeBackground"
              className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-lg"
              initial={false}
              transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
            />
          )}
          <div className="relative z-10 flex items-center gap-2">
            {cipher === 'a1z26' ? (
              <Hash className="w-4 h-4" />
            ) : (
              <Smile className="w-4 h-4" />
            )}
            <span>Decode</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onModeChange('encode')}
          className={cn(
            'relative flex items-center px-4 py-2 text-sm font-semibold rounded-xl',
            'transition-all duration-300',
            mode === 'encode'
              ? 'text-white shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          )}
        >
          {mode === 'encode' && (
            <motion.div
              layoutId="modeBackground"
              className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-lg"
              initial={false}
              transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
            />
          )}
          <div className="relative z-10 flex items-center gap-2">
            <Code className="w-4 h-4" />
            <span>Encode</span>
          </div>
        </button>
      </div>
    </div>
  );
}