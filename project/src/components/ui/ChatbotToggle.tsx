import { motion } from 'framer-motion';
import { MessageCircle, Bot } from 'lucide-react';
import { useColorTheme } from '../../hooks/useColorTheme';
import { cn } from '../../utils/cn';

interface ChatbotToggleProps {
  onClick: () => void;
  hasNewMessage?: boolean;
}

export function ChatbotToggle({ onClick, hasNewMessage = false }: ChatbotToggleProps) {
  const { colors } = useColorTheme();

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'fixed bottom-6 right-6 z-40 p-4 rounded-full',
        `bg-gradient-to-r ${colors.primary} hover:${colors.secondary}`,
        'text-white shadow-2xl hover:shadow-3xl',
        'transition-all duration-300 group',
        colors.glow
      )}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      {/* Pulse animation for new messages */}
      {hasNewMessage && (
        <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
      )}
      
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${colors.primary} opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-xl`} />
      
      <div className="relative z-10 flex items-center gap-2">
        <Bot className="w-6 h-6" />
        <span className="hidden sm:block font-semibold">Ask Eren</span>
      </div>

      {/* Floating tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        Chat with Eren about ciphers!
      </div>
    </motion.button>
  );
}