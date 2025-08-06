import { motion } from 'framer-motion';
import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { ColorThemeSelector } from '../ui/ColorThemeSelector';
import { useColorTheme } from '../../hooks/useColorTheme';
import { CipherSelector, CipherType } from '../ui/CipherSelector';

interface HeaderProps {
  cipher: CipherType;
  mode: 'encode' | 'decode';
  onCipherChange: (cipher: CipherType) => void;
  onModeChange: (mode: 'encode' | 'decode') => void;
}

export function Header({ cipher, mode, onCipherChange, onModeChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { colors } = useColorTheme();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${colors.primary} rounded-xl blur-lg opacity-50`} />
              <div className={`relative bg-gradient-to-r ${colors.primary} p-3 rounded-xl shadow-2xl`}>
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                CIPHER TOOLS
              </h1>
              <p className="text-xs text-gray-400 font-medium">PREMIUM EDITION</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <ColorThemeSelector />
            <div className="text-sm text-gray-300">
              15 Cipher Methods Available
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
        >
          <div className="pt-6 pb-4 space-y-6">
            <div className="text-center text-gray-300">
              Choose your cipher method below
            </div>
            <div className="flex justify-center">
              <ColorThemeSelector />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}