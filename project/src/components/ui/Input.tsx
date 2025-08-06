import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';
import { useColorTheme } from '../../hooks/useColorTheme';
import { useTouch } from '../../hooks/useTouch';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
  onSwipe?: (direction: 'left' | 'right' | 'up' | 'down') => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, icon, onSwipe, ...props }, ref) => {
    const { colors } = useColorTheme();
    const { touchHandlers } = useTouch({
      onSwipe,
    });

    return (
      <div className="space-y-3">
        {label && (
          <motion.label
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`block text-lg font-semibold bg-gradient-to-r ${colors.text} bg-clip-text text-transparent`}
          >
            {label}
          </motion.label>
        )}
        
        <div className="relative group">
          {icon && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-${colors.primary.split('-')[1]}-400 transition-colors duration-200`}
            >
              {icon}
            </motion.div>
          )}
          
          <motion.input
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={cn(
              'block w-full px-4 py-4 bg-white/10 backdrop-blur-xl',
              `border border-white/20 group-hover:border-white/30 focus:border-${colors.primary.split('-')[1]}-400/50`,
              'rounded-2xl shadow-xl placeholder-gray-400',
              `focus:outline-none focus:ring-2 focus:ring-${colors.primary.split('-')[1]}-500/20`,
              'transition-all duration-300 text-white text-lg',
              'hover:bg-white/15 focus:bg-white/15',
              icon && 'pl-12',
              error && 'border-red-400/50 focus:border-red-400/50 focus:ring-red-500/20',
              className
            )}
            {...props}
            {...touchHandlers}
          />

          {/* Animated border glow */}
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${colors.primary.replace('-600', '-500/20')} opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-xl -z-10`} />
        </div>
        
        {hint && !error && (
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-sm text-gray-400"
          >
            {hint}
          </motion.p>
        )}
        
        {error && (
          <motion.p
            initial={{ opacity: 0, x: -10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-sm text-red-400 font-medium"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';