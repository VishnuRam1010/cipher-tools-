import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot, User, Lightbulb, Shield } from 'lucide-react';
import { useColorTheme } from '../../hooks/useColorTheme';
import { cn } from '../../utils/cn';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ErenChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ErenChatbot({ isOpen, onClose }: ErenChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm Eren, your cipher assistant! 🔐 I can help you with all 15 encoding methods available on this platform. Ask me about A1Z26, Morse code, Caesar cipher, or any other cipher method!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { colors } = useColorTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateErenResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Cipher-specific responses
    if (message.includes('a1z26') || message.includes('number')) {
      return "A1Z26 cipher converts letters to numbers! A=1, B=2, C=3... Z=26. It's perfect for beginners. Try encoding 'HELLO' - it becomes '8.5.12.12.15'! 🔢";
    }
    
    if (message.includes('morse') || message.includes('dot') || message.includes('dash')) {
      return "Morse code uses dots and dashes! Each letter has a unique pattern. For example: A = '.-', B = '-...', SOS = '... --- ...'. Great for emergency communication! 📡";
    }
    
    if (message.includes('caesar') || message.includes('shift')) {
      return "Caesar cipher shifts letters by a fixed amount! With shift 3: A→D, B→E, C→F. Julius Caesar used this! Try our brute force feature to crack any Caesar cipher automatically! ⚔️";
    }
    
    if (message.includes('emoji')) {
      return "Emoji cipher is fun! Each letter becomes an emoji: A=🍎, B=🐝, C=🥥. It's colorful and engaging for learning. Perfect for making secret messages look innocent! 😊";
    }
    
    if (message.includes('base64')) {
      return "Base64 encoding converts text to safe characters for data transmission. It uses A-Z, a-z, 0-9, +, /. 'Hello' becomes 'SGVsbG8='. Widely used in web development! 💻";
    }
    
    if (message.includes('binary')) {
      return "Binary uses only 0s and 1s! Each character becomes 8 bits. 'A' = '01000001'. It's how computers actually store text. Great for understanding digital systems! 🤖";
    }
    
    if (message.includes('hex') || message.includes('hexadecimal')) {
      return "Hexadecimal uses 0-9 and A-F. Each character becomes 2 hex digits. 'A' = '41'. Programmers love it for debugging and memory addresses! 🔧";
    }
    
    if (message.includes('atbash')) {
      return "Atbash is ancient! It reverses the alphabet: A=Z, B=Y, C=X. Used in Hebrew texts. It's symmetric - encoding and decoding are the same operation! 📜";
    }
    
    if (message.includes('vigenere') || message.includes('vigenère')) {
      return "Vigenère cipher uses a keyword! Each letter shifts by the corresponding key letter. Much stronger than Caesar. With key 'KEY': H+K=R, E+E=I, etc. Unbreakable for centuries! 🗝️";
    }
    
    if (message.includes('rail fence') || message.includes('railfence')) {
      return "Rail Fence writes text in a zigzag pattern! With 3 rails, 'HELLO' becomes 'H.L.O' on rails 1&3, 'E.L' on rail 2, reading as 'HLOEL'. Visual and fun! 🚂";
    }
    
    if (message.includes('reverse')) {
      return "Reverse text has 3 modes: Full reverse ('HELLO'→'OLLEH'), reverse words ('HELLO WORLD'→'OLLEH DLROW'), or reverse word order ('HELLO WORLD'→'WORLD HELLO'). Simple but effective! ↩️";
    }
    
    if (message.includes('leet') || message.includes('1337')) {
      return "Leet speak replaces letters with numbers/symbols! A=4, E=3, L=1, O=0, S=5, T=7. 'HELLO' becomes 'H3110'. Popular in gaming culture! 🎮";
    }
    
    if (message.includes('zalgo')) {
      return "Zalgo text adds combining characters to create 'corrupted' text! Ḧ̴̰ë̴́l̴̈l̴̈ö̴́ ̴̈Ẅ̴ö̴́r̴̈l̴̈d̴̈! Adjust intensity for more chaos. Popular in internet memes! 👹";
    }
    
    if (message.includes('invisible') || message.includes('steganography')) {
      return "Invisible ink hides text using zero-width characters! The message is there but invisible. Perfect for steganography - hiding secrets in plain sight! 👁️";
    }
    
    if (message.includes('url') || message.includes('percent')) {
      return "URL encoding makes text web-safe! Spaces become '%20', special characters get encoded. Essential for web development and data transmission! 🌐";
    }
    
    // General cipher questions
    if (message.includes('best cipher') || message.includes('strongest')) {
      return "For learning: A1Z26 and Caesar are great! For security: Vigenère with long keys. For fun: Emoji and Zalgo. For steganography: Invisible ink. Each has its purpose! 🏆";
    }
    
    if (message.includes('beginner') || message.includes('start')) {
      return "Start with A1Z26 - it's simple and visual! Then try Caesar cipher with different shifts. Morse code is classic and useful. Emoji cipher makes it fun! 🌟";
    }
    
    if (message.includes('history') || message.includes('ancient')) {
      return "Ciphers are ancient! Caesar cipher (50 BC), Atbash (Hebrew Bible), Morse code (1830s). Modern ones: Base64 (1980s), URL encoding (1990s). Cryptography evolved with technology! 📚";
    }
    
    if (message.includes('crack') || message.includes('break') || message.includes('decode')) {
      return "To crack ciphers: Try frequency analysis, look for patterns, use brute force (like our Caesar tool), or analyze the context. Some ciphers are unbreakable without the key! 🔍";
    }
    
    if (message.includes('help') || message.includes('how')) {
      return "I can help with all 15 cipher methods! Ask about specific ciphers, their history, how they work, or which one to use. I'm here to make cryptography fun and easy! 💡";
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
      return "You're welcome! I love helping with ciphers! Feel free to ask about any of the 15 methods or try encoding your name in different ciphers! 😊";
    }
    
    // Default responses for non-cipher questions
    const defaultResponses = [
      "I'm specialized in cipher and encoding methods! Ask me about any of the 15 cipher methods available here: A1Z26, Emoji, Base64, Morse, Binary, Hex, Caesar, URL, Atbash, Vigenère, Rail Fence, Reverse, Leet, Zalgo, or Invisible Ink! 🔐",
      "I focus on cryptography and encoding! Which cipher method interests you? I can explain how any of our 15 methods work! 🔍",
      "Let's talk ciphers! I can help you understand any encoding method on this platform. What would you like to learn about? 📚",
      "I'm your cipher expert! Ask me about encryption, decryption, or any of the 15 amazing methods we have here! 🛡️"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateErenResponse(inputValue),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-4 right-4 z-50 w-96 h-[600px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]"
    >
      <div className={cn(
        'h-full rounded-2xl overflow-hidden',
        'bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-2xl',
        'border border-white/20 shadow-2xl'
      )}>
        {/* Header */}
        <div className={cn(
          'flex items-center justify-between p-4',
          `bg-gradient-to-r ${colors.primary} border-b border-white/10`
        )}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${colors.accent} rounded-full blur-md opacity-50`} />
              <div className="relative bg-white/20 p-2 rounded-full">
                <Bot className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white">Eren</h3>
              <p className="text-xs text-white/80">Cipher Assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100%-140px)]">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                'flex gap-3',
                message.type === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.type === 'bot' && (
                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r ${colors.primary} flex items-center justify-center`}>
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className={cn(
                'max-w-[80%] p-3 rounded-2xl',
                message.type === 'user'
                  ? `bg-gradient-to-r ${colors.primary} text-white ml-auto`
                  : 'bg-white/10 text-white border border-white/20'
              )}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className="text-xs opacity-60 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {message.type === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r ${colors.primary} flex items-center justify-center`}>
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white/10 border border-white/20 p-3 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about any cipher method..."
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className={cn(
                'p-2 rounded-xl transition-all duration-200',
                `bg-gradient-to-r ${colors.primary} hover:${colors.secondary}`,
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'text-white shadow-lg'
              )}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}