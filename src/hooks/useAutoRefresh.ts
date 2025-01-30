import { useEffect } from 'react';
import { eventEmitter } from '@/lib/events';

export function useAutoRefresh(event: string, callback: () => void) {
  useEffect(() => {
    const unsubscribe = eventEmitter.subscribe(event, callback);
    return () => unsubscribe();
  }, [event, callback]);
} 