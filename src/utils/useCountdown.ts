import { useCallback, useState } from "react";

export const useCountdown = () => {
  const [countdown, setCountdown] = useState<number | undefined>(undefined);

  const startCountdown = useCallback((seconds: number) => {
    setCountdown(seconds);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === undefined) return undefined;
        if (prev === 0) {
          clearInterval(interval);
          return undefined;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return { countdown, startCountdown };
};

const interval = setInterval(() => {
  clearInterval(interval);
}, 1000);
