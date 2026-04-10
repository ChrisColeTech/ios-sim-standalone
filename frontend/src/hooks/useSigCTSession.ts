import { useState, useEffect, useRef } from 'react';
import type { SigCTSessionState } from '../types/custom-apps/sigct-banner';
import { SIGCT_SESSION_TIMEOUT_MINUTES } from '../constants/custom-apps/sigct-banner';

export function useSigCTSession(loginDate: number | null, onExpired: () => void) {
  const [state, setState] = useState<SigCTSessionState>({
    minutesRemaining: SIGCT_SESSION_TIMEOUT_MINUTES,
    secondsRemaining: SIGCT_SESSION_TIMEOUT_MINUTES * 60,
    isExpired: false,
    formattedTime: `${SIGCT_SESSION_TIMEOUT_MINUTES}:00`
  });
  const onExpiredRef = useRef(onExpired);
  onExpiredRef.current = onExpired;

  useEffect(() => {
    if (!loginDate) return;
    const tick = () => {
      const remaining = Math.max(0, loginDate + SIGCT_SESSION_TIMEOUT_MINUTES * 60000 - Date.now());
      const totalSec = Math.floor(remaining / 1000);
      const mins = Math.floor(totalSec / 60);
      const secs = totalSec % 60;
      const next: SigCTSessionState = {
        minutesRemaining: mins, secondsRemaining: totalSec,
        isExpired: totalSec <= 0,
        formattedTime: `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
      };
      setState(next);
      if (next.isExpired) onExpiredRef.current();
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [loginDate]);

  return state;
}
