import { useState, useEffect, useCallback, useRef } from 'react';
import type { SConnectSessionState } from '../types/custom-apps/sconnect-home';
import { SCONNECT_SESSION_TIMEOUT_MINUTES, SCONNECT_SESSION_WARNING_MINUTES } from '../constants/custom-apps/sconnect-home';

export function useSConnectSession(
  loginDate: number | null,
  onExpired: () => void
) {
  const [state, setState] = useState<SConnectSessionState>({
    minutesRemaining: SCONNECT_SESSION_TIMEOUT_MINUTES,
    secondsRemaining: SCONNECT_SESSION_TIMEOUT_MINUTES * 60,
    isExpiringSoon: false,
    isExpired: false,
    formattedTime: `${SCONNECT_SESSION_TIMEOUT_MINUTES}:00`
  });
  const onExpiredRef = useRef(onExpired);
  onExpiredRef.current = onExpired;

  const computeState = useCallback((login: number): SConnectSessionState => {
    const expiresAt = login + SCONNECT_SESSION_TIMEOUT_MINUTES * 60 * 1000;
    const remaining = Math.max(0, expiresAt - Date.now());
    const totalSeconds = Math.floor(remaining / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const mm = String(minutes).padStart(2, '0');
    const ss = String(seconds).padStart(2, '0');

    return {
      minutesRemaining: minutes,
      secondsRemaining: totalSeconds,
      isExpiringSoon: minutes <= SCONNECT_SESSION_WARNING_MINUTES && minutes >= 1,
      isExpired: totalSeconds <= 0,
      formattedTime: `${mm}:${ss}`
    };
  }, []);

  useEffect(() => {
    if (!loginDate) return;

    const tick = () => {
      const next = computeState(loginDate);
      setState(next);
      if (next.isExpired) {
        onExpiredRef.current();
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [loginDate, computeState]);

  return state;
}
