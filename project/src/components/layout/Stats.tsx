import { motion } from 'framer-motion';
import { Hash, Smile, Copy, Zap } from 'lucide-react';
import { useColorTheme } from '../../hooks/useColorTheme';

const stats = [
  {
    icon: Hash,
    value: "15",
    label: "Cipher Methods",
    gradient: "from-blue-400 to-cyan-600",
    delay: 0.1
  },
  {
    icon: Zap,
    value: "Real-time",
    label: "Conversion",
    gradient: "from-yellow-400 to-orange-600",
    delay: 0.2
  },
  {
    icon: Copy,
    value: "1-Click",
    label: "Copy to Clipboard",
    gradient: "from-green-400 to-emerald-600",
    delay: 0.3
  },
  {
    icon: Smile,
    value: "AI",
    label: "Assistant",
    gradient: "from-purple-400 to-pink-600",
    delay: 0.4
  }
];

export function Stats() {
  const { colors } = useColorTheme();

  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-6xl font-bold bg-gradient-to-r ${colors.text} bg-clip-text text-transparent mb-6`}>
            Simple & Powerful
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Built for ease of use with all the features you need for text conversion.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: stat.delay }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group text-center"
            >
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-white/30 transition-all duration-500">
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
                
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.gradient} mb-4 shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: stat.delay + 0.2, type: "spring" }}
                  className="text-3xl md:text-4xl font-black text-white mb-2"
                >
                  {stat.value}
                </motion.div>
                
                <p className="text-gray-300 font-medium">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}