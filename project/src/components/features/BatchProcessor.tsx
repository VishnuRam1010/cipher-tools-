import { useState } from 'react';
import { ArrowDownUp, Clipboard, FileText, Download, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { decodeA1Z26, encodeA1Z26 } from '../../utils/cipher';
import { decodeEmoji, encodeEmoji } from '../../utils/emojiCipher';

interface BatchProcessorProps {
  mode: 'encode' | 'decode';
  cipher: 'a1z26' | 'emoji';
  onClose: () => void;
}

export function BatchProcessor({ mode, cipher, onClose }: BatchProcessorProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = () => {
    if (!input.trim()) return;
    
    setIsProcessing(true);
    
    // Short delay to show processing animation
    setTimeout(() => {
      const lines = input.split('\n');
      let processed: string[];
      
      if (cipher === 'a1z26') {
        if (mode === 'decode') {
          processed = lines.map(line => decodeA1Z26(line.trim()));
        } else {
          processed = lines.map(line => encodeA1Z26(line.trim()));
        }
      } else {
        if (mode === 'decode') {
          processed = lines.map(line => decodeEmoji(line.trim()));
        } else {
          processed = lines.map(line => encodeEmoji(line.trim()));
        }
      }
      
      setOutput(processed.join('\n'));
      setIsProcessing(false);
    }, 500);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleCopy = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch (error) {
      console.error('Failed to paste text:', error);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setInput(text);
      };
      reader.readAsText(file);
    }
  };

  const handleDownload = () => {
    if (!output) return;
    
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cipher}-${mode}-output.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              Batch {mode === 'decode' ? 'Decoder' : 'Encoder'} - {cipher.toUpperCase()}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-hidden flex flex-col">
          <div className="grid gap-4 md:grid-cols-2 flex-1 overflow-hidden">
            {/* Input */}
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Input {mode === 'decode' ? (cipher === 'a1z26' ? 'Numbers' : 'Emojis') : 'Text'}
                </label>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={handlePaste} icon={<Clipboard className="w-4 h-4" />}>
                    Paste
                  </Button>
                  <label className="cursor-pointer">
                    <Button variant="ghost" size="sm" icon={<Upload className="w-4 h-4" />}>
                      Upload
                    </Button>
                    <input
                      type="file"
                      accept=".txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 min-h-[200px] p-3 bg-gray-50 dark:bg-gray-800 rounded-md text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/40 resize-none"
                placeholder={mode === 'decode' 
                  ? `Enter ${cipher === 'a1z26' ? 'numbers' : 'emojis'} to decode (one set per line)` 
                  : 'Enter text to encode (one entry per line)'
                }
              />
            </div>
            
            {/* Output */}
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Output {mode === 'decode' ? 'Text' : (cipher === 'a1z26' ? 'Numbers' : 'Emojis')}
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    disabled={!output}
                    icon={<FileText className="w-4 h-4" />}
                  >
                    Copy All
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDownload}
                    disabled={!output}
                    icon={<Download className="w-4 h-4" />}
                  >
                    Download
                  </Button>
                </div>
              </div>
              <div className="flex-1 min-h-[200px] p-3 bg-gray-50 dark:bg-gray-800 rounded-md overflow-auto break-words">
                {output ? (
                  <pre className="font-mono text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                    {output}
                  </pre>
                ) : (
                  <p className="text-gray-400 dark:text-gray-500">
                    Processed output will appear here
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 mt-4 justify-center">
            <Button
              onClick={handleProcess}
              disabled={!input.trim() || isProcessing}
              icon={isProcessing ? (
                <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
              ) : (
                <ArrowDownUp className="w-4 h-4" />
              )}
            >
              {isProcessing ? 'Processing...' : 'Process All'}
            </Button>
            <Button variant="outline" onClick={handleClear} disabled={!input && !output}>
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}