import { useEffect, useRef, useState } from 'react';

interface TouchOptions {
  onSwipe?: (direction: 'left' | 'right' | 'up' | 'down') => void;
  onTap?: () => void;
  onLongPress?: () => void;
  longPressDelay?: number;
  swipeThreshold?: number;
}

/**
 * Custom hook for handling touch gestures
 */
export function useTouch({
  onSwipe,
  onTap,
  onLongPress,
  longPressDelay = 500,
  swipeThreshold = 50,
}: TouchOptions = {}) {
  const [isTouching, setIsTouching] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });
  const longPressTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (longPressTimer.current) {
        window.clearTimeout(longPressTimer.current);
      }
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouching(true);
    startPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };

    if (onLongPress) {
      longPressTimer.current = window.setTimeout(() => {
        onLongPress();
        longPressTimer.current = null;
      }, longPressDelay);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouching) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - startPos.current.x;
    const diffY = currentY - startPos.current.y;

    // If we've moved enough to consider it a swipe, cancel the long press
    if (Math.abs(diffX) > 10 || Math.abs(diffY) > 10) {
      if (longPressTimer.current) {
        window.clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isTouching) return;
    setIsTouching(false);

    if (longPressTimer.current) {
      window.clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const diffX = endX - startPos.current.x;
    const diffY = endY - startPos.current.y;

    // Detect swipe
    if (onSwipe && (Math.abs(diffX) > swipeThreshold || Math.abs(diffY) > swipeThreshold)) {
      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal swipe
        onSwipe(diffX > 0 ? 'right' : 'left');
      } else {
        // Vertical swipe
        onSwipe(diffY > 0 ? 'down' : 'up');
      }
    } else if (onTap && Math.abs(diffX) < 10 && Math.abs(diffY) < 10) {
      // Tap - only if there was minimal movement
      onTap();
    }
  };

  return {
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
    isTouching,
  };
}