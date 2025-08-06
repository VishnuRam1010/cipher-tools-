import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { useColorTheme } from '../../hooks/useColorTheme';
import { useTouch } from '../../hooks/useTouch';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
  onLongPress?: () => void;
}

export function Button({
  children,
  onClick,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  icon,
  onLongPress,
}: ButtonProps) {
  const { colors } = useColorTheme();
  const { touchHandlers } = useTouch({
    onTap: onClick,
    onLongPress: onLongPress,
  });

  const variantClasses = {
    primary:
      `bg-gradient-to-r ${colors.primary} hover:${colors.secondary} text-white shadow-2xl ${colors.glow} ${colors.border}`,
    secondary:
      'bg-white/10 hover:bg-white/20 text-white backdrop-blur-xl border border-white/20 hover:border-white/30 shadow-xl',
    outline:
      'bg-transparent border-2 border-white/30 hover:border-white/50 hover:bg-white/10 text-white backdrop-blur-xl shadow-lg',
    ghost:
      'bg-transparent hover:bg-white/10 text-gray-300 hover:text-white backdrop-blur-xl',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-6 py-3 text-base rounded-2xl',
    lg: 'px-8 py-4 text-lg rounded-2xl',
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={cn(
        'relative font-semibold transition-all duration-300 ease-out',
        'flex items-center justify-center gap-2',
        'focus:outline-none focus:ring-2 focus:ring-purple-500/40',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'group overflow-hidden',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      onClick={disabled ? undefined : onClick}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02, y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      {...touchHandlers}
    >
      {/* Animated background gradient */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      
      <div className="relative z-10 flex items-center gap-2">
        {icon && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {icon}
          </motion.span>
        )}
        {children}
      </div>
    </motion.button>
  );
}