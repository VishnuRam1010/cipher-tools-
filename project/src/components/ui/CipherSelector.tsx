import { Hash, Smile, Code, Radio, Binary, Hexagon, RotateCcw, Link } from 'lucide-react';
import { RefreshCw, Key, Shuffle, ArrowLeftRight, Gamepad2, Zap, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useColorTheme } from '../../hooks/useColorTheme';

export type CipherType = 'a1z26' | 'emoji' | 'base64' | 'morse' | 'binary' | 'hex' | 'caesar' | 'url' | 'atbash' | 'vigenere' | 'railfence' | 'reverse' | 'leet' | 'zalgo' | 'invisible';

interface CipherSelectorProps {
  cipher: CipherType;
  mode: 'encode' | 'decode';
  onCipherChange: (cipher: CipherType) => void;
  onModeChange: (mode: 'encode' | 'decode') => void;
  className?: string;
}

const ciphers = [
  { id: 'a1z26' as const, name: 'A1Z26', icon: Hash, description: 'Letters to numbers' },
  { id: 'emoji' as const, name: 'Emoji', icon: Smile, description: 'Letters to emojis' },
  { id: 'base64' as const, name: 'Base64', icon: Code, description: 'Base64 encoding' },
  { id: 'morse' as const, name: 'Morse', icon: Radio, description: 'Morse code' },
  { id: 'binary' as const, name: 'Binary', icon: Binary, description: 'Binary code' },
  { id: 'hex' as const, name: 'Hex', icon: Hexagon, description: 'Hexadecimal' },
  { id: 'caesar' as const, name: 'Caesar', icon: RotateCcw, description: 'Caesar cipher' },
  { id: 'url' as const, name: 'URL', icon: Link, description: 'URL encoding' },
  { id: 'atbash' as const, name: 'Atbash', icon: RefreshCw, description: 'A=Z, B=Y cipher' },
  { id: 'vigenere' as const, name: 'Vigenère', icon: Key, description: 'Polyalphabetic cipher' },
  { id: 'railfence' as const, name: 'Rail Fence', icon: Shuffle, description: 'Zigzag pattern' },
  { id: 'reverse' as const, name: 'Reverse', icon: ArrowLeftRight, description: 'Reverse text' },
  { id: 'leet' as const, name: 'Leet', icon: Gamepad2, description: '1337 speak' },
  { id: 'zalgo' as const, name: 'Zalgo', icon: Zap, description: 'Corrupted text' },
  { id: 'invisible' as const, name: 'Invisible', icon: Eye, description: 'Hidden text' },
];

export function CipherSelector({ cipher, mode, onCipherChange, onModeChange, className }: CipherSelectorProps) {
  const { colors } = useColorTheme();

  return (
    <div className={cn('space-y-6', className)}>
      {/* Cipher Type Grid */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Choose Cipher Method</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {ciphers.map((cipherOption) => (
            <button
              key={cipherOption.id}
              onClick={() => onCipherChange(cipherOption.id)}
              className={cn(
                'relative p-4 rounded-xl border transition-all duration-300 text-left',
                'hover:scale-105 hover:shadow-lg',
                cipher === cipherOption.id
                  ? `bg-gradient-to-r ${colors.primary} ${colors.border} text-white shadow-lg`
                  : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/15 hover:border-white/30'
              )}
            >
              {cipher === cipherOption.id && (
                <motion.div
                  layoutId="selectedCipher"
                  className={`absolute inset-0 bg-gradient-to-r ${colors.primary} rounded-xl`}
                  initial={false}
                  transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
                />
              )}
              <div className="relative z-10">
                <cipherOption.icon className="w-6 h-6 mb-2" />
                <div className="font-semibold text-sm">{cipherOption.name}</div>
                <div className="text-xs opacity-75">{cipherOption.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Mode Toggle */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Choose Mode</h3>
        <div className="inline-flex rounded-2xl border border-white/20 p-1 bg-white/10 backdrop-blur-xl shadow-xl">
          <button
            type="button"
            onClick={() => onModeChange('decode')}
            className={cn(
              'relative flex items-center px-6 py-3 text-sm font-semibold rounded-xl',
              'transition-all duration-300',
              mode === 'decode'
                ? 'text-white shadow-lg'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            )}
          >
            {mode === 'decode' && (
              <motion.div
                layoutId="modeBackground"
                className={`absolute inset-0 bg-gradient-to-r ${colors.accent} rounded-xl shadow-lg`}
                initial={false}
                transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
              />
            )}
            <div className="relative z-10 flex items-center gap-2">
              <Hash className="w-4 h-4" />
              <span>Decode</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onModeChange('encode')}
            className={cn(
              'relative flex items-center px-6 py-3 text-sm font-semibold rounded-xl',
              'transition-all duration-300',
              mode === 'encode'
                ? 'text-white shadow-lg'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            )}
          >
            {mode === 'encode' && (
              <motion.div
                layoutId="modeBackground"
                className={`absolute inset-0 bg-gradient-to-r ${colors.accent} rounded-xl shadow-lg`}
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
    </div>
  );
}