import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { useColorTheme } from '../../hooks/useColorTheme';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className, onClick }: CardProps) {
  const { colors } = useColorTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={cn(
        'group relative rounded-3xl overflow-hidden p-8',
        'backdrop-blur-2xl bg-gradient-to-br from-white/15 to-white/5',
        `border border-white/20 hover:border-white/30`,
        `shadow-2xl shadow-black/20 hover:${colors.glow.split(' ')[1]}`,
        'transition-all duration-500',
        className
      )}
      onClick={onClick}
    >
      {/* Animated gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.primary.replace('from-', 'from-').replace('to-', 'to-').replace('-600', '-500/10')} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Glass shine effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated border glow */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${colors.primary.replace('-600', '-500/20')} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10`} />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('mb-6', className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  const { colors } = useColorTheme();
  
  return (
    <motion.h3 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={cn(
        `text-2xl md:text-3xl font-bold bg-gradient-to-r ${colors.text} bg-clip-text text-transparent`,
        className
      )}
    >
      {children}
    </motion.h3>
  );
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={cn('space-y-6', className)}
    >
      {children}
    </motion.div>
  );
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('mt-6 pt-6 border-t border-white/10', className)}>
      {children}
    </div>
  );
}