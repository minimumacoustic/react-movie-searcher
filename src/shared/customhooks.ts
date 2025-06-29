import { useRef, useCallback, useEffect } from "react";

export function useThrottle(cb: () => void, delay: number) {
  const lastExecuted = useRef(0);
  const timeoutId = useRef<ReturnType<Window['setTimeout']> | null>(null);

  const throttledFn = useCallback(
    (...args: []) => {
      const now = Date.now();
      const timeSinceLastExec = now - lastExecuted.current;

      // If enough time has passed, execute immediately
      if (timeSinceLastExec >= delay) {
        lastExecuted.current = now;
        cb(...args);
      }
      // Otherwise, schedule execution after remaining delay
      else {
        if (timeoutId.current !== null) clearTimeout(timeoutId.current);
        timeoutId.current = window.setTimeout(() => {
          lastExecuted.current = Date.now();
          cb(...args);
        }, delay - timeSinceLastExec);
      }
    },
    [cb, delay],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutId.current !== null) clearTimeout(timeoutId.current);
    };
  }, []);

  return throttledFn;
}
