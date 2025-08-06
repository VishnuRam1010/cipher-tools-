import { motion } from 'framer-motion';
import { Shield, Heart, Github, Twitter, Linkedin } from 'lucide-react';
import { useColorTheme } from '../../hooks/useColorTheme';

export function Footer() {
  const { colors } = useColorTheme();
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="relative py-16 px-4 border-t border-white/10 bg-black/20 backdrop-blur-xl"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${colors.primary} rounded-xl blur-lg opacity-50`} />
                <div className={`relative bg-gradient-to-r ${colors.primary} p-3 rounded-xl shadow-2xl`}>
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h3 className={`text-2xl font-black bg-gradient-to-r ${colors.text} bg-clip-text text-transparent`}>
                  CIPHER TOOLS
                </h3>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-md">
              Simple and powerful text conversion tools for encoding and decoding messages.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Tools</h4>
            <ul className="space-y-2">
              {['A1Z26 Cipher', 'Emoji Cipher', 'Text Encoder', 'Text Decoder'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-bold mb-4">About</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Created for educational purposes, puzzles, and fun text transformations. 
              All conversions happen in your browser for privacy.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <span>© {currentYear} Cipher Tools.</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>for text enthusiasts</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>Open source and privacy-focused</span>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}