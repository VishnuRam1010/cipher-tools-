import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import { useState } from 'react';
import { ColorTheme, useColorTheme } from '../../hooks/useColorTheme';
import { cn } from '../../utils/cn';

const themeOptions: Array<{
  id: ColorTheme;
  name: string;
  description: string;
  colors: string[];
}> = [
  {
    id: 'purple',
    name: 'Purple Fusion',
    description: 'Classic purple to pink gradient',
    colors: ['bg-purple-600', 'bg-pink-600']
  },
  {
    id: 'blue',
    name: 'Ocean Blue',
    description: 'Deep blue to cyan waves',
    colors: ['bg-blue-600', 'bg-cyan-600']
  },
  {
    id: 'emerald',
    name: 'Emerald Forest',
    description: 'Fresh emerald to teal',
    colors: ['bg-emerald-600', 'bg-teal-600']
  },
  {
    id: 'rose',
    name: 'Rose Garden',
    description: 'Elegant rose to pink',
    colors: ['bg-rose-600', 'bg-pink-600']
  },
  {
    id: 'amber',
    name: 'Golden Sunset',
    description: 'Warm amber to orange',
    colors: ['bg-amber-600', 'bg-orange-600']
  },
  {
    id: 'cyan',
    name: 'Arctic Cyan',
    description: 'Cool cyan to blue',
    colors: ['bg-cyan-600', 'bg-blue-600']
  },
  {
    id: 'indigo',
    name: 'Midnight Indigo',
    description: 'Deep indigo to purple',
    colors: ['bg-indigo-600', 'bg-purple-600']
  },
  {
    id: 'teal',
    name: 'Tropical Teal',
    description: 'Vibrant teal to emerald',
    colors: ['bg-teal-600', 'bg-emerald-600']
  }
];

export function ColorThemeSelector() {
  const { colorTheme, changeColorTheme } = useColorTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-xl',
          'bg-white/10 backdrop-blur-xl border border-white/20',
          'hover:bg-white/15 hover:border-white/30',
          'transition-all duration-300 text-white'
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Palette className="w-4 h-4" />
        <span className="text-sm font-medium">Themes</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Theme Selector Panel */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50',
                'w-80 p-4 rounded-2xl',
                'bg-black/90 backdrop-blur-2xl border border-white/20',
                'shadow-2xl shadow-black/50'
              )}
            >
              <div className="mb-4">
                <h3 className="text-lg font-bold text-white mb-1">Choose Your Theme</h3>
                <p className="text-sm text-gray-400">Select a color scheme that matches your style</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {themeOptions.map((theme) => (
                  <motion.button
                    key={theme.id}
                    onClick={() => {
                      changeColorTheme(theme.id);
                      setIsOpen(false);
                    }}
                    className={cn(
                      'relative p-3 rounded-xl border transition-all duration-300',
                      'hover:scale-105 text-left',
                      colorTheme === theme.id
                        ? 'border-white/40 bg-white/10'
                        : 'border-white/20 bg-white/5 hover:bg-white/10'
                    )}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Color Preview */}
                    <div className="flex gap-1 mb-2">
                      {theme.colors.map((color, index) => (
                        <div
                          key={index}
                          className={cn('w-4 h-4 rounded-full', color)}
                        />
                      ))}
                    </div>

                    {/* Theme Info */}
                    <div className="mb-2">
                      <div className="text-sm font-semibold text-white mb-1">
                        {theme.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {theme.description}
                      </div>
                    </div>

                    {/* Selected Indicator */}
                    {colorTheme === theme.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-black" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-white/10">
                <p className="text-xs text-gray-500 text-center">
                  Theme preference is saved automatically
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}