import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export function Toggle({
  checked,
  onChange,
  className,
  size = 'md',
  showIcon = true,
}: ToggleProps) {
  const sizes = {
    sm: {
      container: 'w-10 h-6',
      circle: 'w-4 h-4',
      translateX: 16,
    },
    md: {
      container: 'w-14 h-8',
      circle: 'w-6 h-6',
      translateX: 24,
    },
    lg: {
      container: 'w-16 h-9',
      circle: 'w-7 h-7',
      translateX: 28,
    },
  };

  const currentSize = sizes[size];

  return (
    <motion.button
      type="button"
      className={cn(
        'relative inline-flex flex-shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
        checked
          ? 'bg-gradient-to-r from-purple-600 to-blue-600'
          : 'bg-gray-300 dark:bg-gray-700',
        currentSize.container,
        className
      )}
      onClick={onChange}
      whileTap={{ scale: 0.95 }}
    >
      <span className="sr-only">Toggle theme</span>
      <motion.span
        className={cn(
          'flex items-center justify-center rounded-full bg-white shadow-md',
          'transform duration-200',
          currentSize.circle
        )}
        animate={{
          x: checked ? currentSize.translateX : 0,
          backgroundColor: checked ? '#ffffff' : '#ffffff',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {showIcon && (
          <motion.span
            initial={false}
            animate={{ 
              opacity: 1,
              rotateZ: checked ? 180 : 0 
            }}
            transition={{ duration: 0.2 }}
          >
            {checked ? (
              <Moon className="h-3 w-3 text-purple-700" />
            ) : (
              <Sun className="h-3 w-3 text-amber-500" />
            )}
          </motion.span>
        )}
      </motion.span>
    </motion.button>
  );
}