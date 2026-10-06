import { useEffect, useRef } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export function useKonamiCode(onSuccess) {
  const indexRef = useRef(0);

  useEffect(() => {
    function handleKeyDown(e) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI_CODE[indexRef.current]) {
        indexRef.current++;
        if (indexRef.current === KONAMI_CODE.length) {
          indexRef.current = 0;
          if (onSuccess) onSuccess();
        }
      } else {
        indexRef.current = (key === KONAMI_CODE[0]) ? 1 : 0;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSuccess]);
}
