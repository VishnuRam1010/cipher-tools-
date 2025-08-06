import React, { useState } from 'react';
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion';
import { useColorTheme } from './hooks/useColorTheme';
import { UniversalCipher } from './components/features/UniversalCipher';
import { BatchProcessor } from './components/features/BatchProcessor';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/layout/Hero';
import { Features } from './components/layout/Features';
import { Stats } from './components/layout/Stats';
import { Button } from './components/ui/Button';
import { ErenChatbot } from './components/features/ErenChatbot';
import { ChatbotToggle } from './components/ui/ChatbotToggle';
import { Layers } from 'lucide-react';
import { CipherType } from './components/ui/CipherSelector';

function App() {
  const [cipher, setCipher] = useState<CipherType>('a1z26');
  const [mode, setMode] = useState<'encode' | 'decode'>('decode');
  const [showBatchProcessor, setShowBatchProcessor] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const { colors } = useColorTheme();

  return (
    <LayoutGroup>
    <div className={`min-h-screen bg-gradient-to-br ${colors.gradient} relative overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-50">
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r ${colors.primary} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob`}></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className={`absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r ${colors.accent} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000`}></div>
        </div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      <Header cipher={cipher} mode={mode} onCipherChange={setCipher} onModeChange={setMode} />
      
      <main className="relative z-10">
        <Hero />
        
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-6xl font-bold bg-gradient-to-r ${colors.text} bg-clip-text text-transparent mb-6`}>
              Universal Cipher Tools
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Encode and decode text using multiple cipher methods. From classic Caesar ciphers to modern Base64 encoding.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-8"
          >
            <Button
              onClick={() => setShowBatchProcessor(true)}
              icon={<Layers className="w-4 h-4" />}
            >
              Batch Process Multiple Lines
            </Button>
          </motion.div>

          <motion.div
            layout
            className="max-w-4xl mx-auto w-full mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <UniversalCipher initialCipher={cipher} initialMode={mode} />
          </motion.div>
        </div>

        <Stats />
        <Features />
      </main>
      
      <Footer />

      {/* Batch Processor Modal */}
      <AnimatePresence>
        {showBatchProcessor && (
          <BatchProcessor
            mode={mode}
            cipher={cipher}
            onClose={() => setShowBatchProcessor(false)}
          />
        )}
      </AnimatePresence>

      {/* Eren Chatbot */}
      <AnimatePresence>
        {showChatbot && (
          <ErenChatbot
            isOpen={showChatbot}
            onClose={() => setShowChatbot(false)}
          />
        )}
      </AnimatePresence>

      {/* Chatbot Toggle Button */}
      {!showChatbot && (
        <ChatbotToggle onClick={() => setShowChatbot(true)} />
      )}
    </div>
    </LayoutGroup>
  );
}

export default App;