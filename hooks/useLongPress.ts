import { useCallback, useRef, MouseEvent, TouchEvent } from 'react';

const useLongPress = (
  onLongPress: (event: MouseEvent | TouchEvent) => void,
  onClick: () => void,
  { shouldPreventDefault = true, delay = 300 } = {}
) => {
  // FIX: Replaced NodeJS.Timeout with ReturnType<typeof setTimeout> for browser compatibility and initialized with null. This resolves type errors.
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  // FIX: Initialized target ref with null for type safety and consistency.
  const target = useRef<EventTarget | null>(null);

  const preventDefault = useCallback((event: Event) => {
    // FIX: Used a safer type assertion `as unknown as TouchEvent` to satisfy stricter TypeScript rules for type conversion.
    if (!('touches' in event) || ((event as unknown as TouchEvent).touches.length < 2 && event.cancelable)) {
        event.preventDefault();
    }
  }, []);

  const start = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener('touchend', preventDefault, { passive: false });
        target.current = event.target;
      }
      timeout.current = setTimeout(() => {
        onLongPress(event);
      }, delay);
    },
    [onLongPress, delay, shouldPreventDefault, preventDefault]
  );

  const clear = useCallback(
    (event: MouseEvent | TouchEvent, shouldTriggerClick = true) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      shouldTriggerClick && onClick();
      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener('touchend', preventDefault);
      }
    },
    [shouldPreventDefault, onClick, preventDefault]
  );

  const handlers = {
    onMouseDown: (e: MouseEvent) => start(e),
    onTouchStart: (e: TouchEvent) => start(e),
    onMouseUp: (e: MouseEvent) => clear(e),
    onMouseLeave: (e: MouseEvent) => clear(e, false),
    onTouchEnd: (e: TouchEvent) => clear(e),
  };

  return handlers;
};

export default useLongPress;
