import { motion } from 'framer-motion';
import { Hash, Smile, Copy, Zap, BookOpen, Smartphone } from 'lucide-react';
import { useColorTheme } from '../../hooks/useColorTheme';

const features = [
  {
    icon: Zap,
    title: "15 Cipher Methods",
    description: "A1Z26, Emoji, Base64, Morse, Binary, Hex, Caesar, URL, Atbash, Vigenère, Rail Fence, Reverse, Leet, Zalgo, and Invisible Ink.",
    gradient: "from-blue-400 to-cyan-600",
    delay: 0.1
  },
  {
    icon: Hash,
    title: "Caesar Cipher with Brute Force",
    description: "Classic Caesar cipher with automatic brute force attack showing all possible shifts.",
    gradient: "from-yellow-400 to-orange-600",
    delay: 0.2
  },
  {
    icon: Smile,
    title: "Morse Code Reference",
    description: "Built-in Morse code reference chart with dots and dashes for all letters and numbers.",
    gradient: "from-green-400 to-emerald-600",
    delay: 0.3
  },
  {
    icon: Copy,
    title: "One-Click Copy",
    description: "Instantly copy your encoded or decoded text to clipboard with a single click.",
    gradient: "from-purple-400 to-pink-600",
    delay: 0.4
  },
  {
    icon: BookOpen,
    title: "Real-Time Conversion",
    description: "See your text transform instantly as you type. No need to click convert buttons.",
    gradient: "from-red-400 to-rose-600",
    delay: 0.5
  },
  {
    icon: BookOpen,
    title: "AI Cipher Assistant",
    description: "Meet Eren, your personal cipher expert! Get instant help with any of the 15 encoding methods.",
    gradient: "from-indigo-400 to-purple-600",
    delay: 0.6
  },
  {
    icon: Smartphone,
    title: "Batch Processing",
    description: "Process multiple lines at once, upload files, and download results for bulk operations.",
    gradient: "from-teal-400 to-cyan-600",
    delay: 0.7
  }
];

export function Features() {
  const { colors } = useColorTheme();

  return (
    <section className="py-32 px-4 relative">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className={`text-5xl md:text-7xl font-bold bg-gradient-to-r ${colors.text} bg-clip-text text-transparent mb-6`}>
            Features
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Everything you need for text encoding and decoding in one simple, powerful tool.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: feature.delay }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-white/30 transition-all duration-500 h-full">
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`} />
                
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-purple-200 transition-all duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-20 animate-pulse`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}