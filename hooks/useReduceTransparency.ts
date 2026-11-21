/**
 * Tracks the OS "Reduce Transparency" accessibility setting so glass surfaces
 * can fall back to a solid fill when the user has requested it.
 */
import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

export function useReduceTransparency(): boolean {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    let mounted = true;

    AccessibilityInfo.isReduceTransparencyEnabled()
      .then((enabled) => {
        if (mounted) setReduce(enabled);
      })
      .catch(() => {
        /* Unsupported platform — keep the default (false). */
      });

    const sub = AccessibilityInfo.addEventListener(
      'reduceTransparencyChanged',
      setReduce,
    );

    return () => {
      mounted = false;
      sub.remove();
    };
  }, []);

  return reduce;
}
