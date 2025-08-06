@@ .. @@
 import { BatchProcessor } from './components/features/BatchProcessor';
 import { Header } from './components/layout/Header';
 import { Footer } from './components/layout/Footer';
 import { Hero } from './components/layout/Hero';
 import { Features } from './components/layout/Features';
 import { Stats } from './components/layout/Stats';
 import { Button } from './components/ui/Button';
-import { ErenChatbot } from './components/features/ErenChatbot';
-import { ChatbotToggle } from './components/ui/ChatbotToggle';
 import { Layers } from 'lucide-react';
 import { CipherType } from './components/ui/CipherSelector';

@@ .. @@
   const [cipher, setCipher] = useState<CipherType>('a1z26');
   const [mode, setMode] = useState<'encode' | 'decode'>('decode');
   const [showBatchProcessor, setShowBatchProcessor] = useState(false);
-  const [showChatbot, setShowChatbot] = useState(false);
   const { colors } = useColorTheme();

@@ .. @@
           />
         )}
       </AnimatePresence>

-      {/* Eren Chatbot */}
-      <AnimatePresence>
-        {showChatbot && (
-          <ErenChatbot
-            isOpen={showChatbot}
-            onClose={() => setShowChatbot(false)}
-          />
-        )}
-      </AnimatePresence>
-
-      {/* Chatbot Toggle Button */}
-      {!showChatbot && (
-        <ChatbotToggle onClick={() => setShowChatbot(true)} />
-      )}
     </div>
     </LayoutGroup>
   );
 }