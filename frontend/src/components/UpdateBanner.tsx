import { useEffect, useState } from 'react';
import { CheckForUpdate } from '../services/electron';

interface UpdateInfo {
  available: boolean;
  currentVersion: string;
  latestVersion: string;
  releaseUrl: string;
  releaseNotes: string;
}

export function UpdateBanner() {
  const [update, setUpdate] = useState<UpdateInfo | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkUpdate = async () => {
      try {
        const info = await CheckForUpdate() as UpdateInfo;
        if (info.available) {
          setUpdate(info);
        }
      } catch (err) {
        console.warn('[UpdateBanner] Failed to check for update:', err);
      }
    };

    // Delay the check slightly so it doesn't block initial render
    const timer = setTimeout(checkUpdate, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!update || dismissed) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 12,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 16px',
        borderRadius: 12,
        background: 'rgba(30, 30, 40, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        color: 'white',
        fontSize: 13,
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        animation: 'slideDown 0.3s ease-out',
        maxWidth: 420,
      }}
    >
      {/* Pulse dot */}
      <div style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: '#34C759',
        boxShadow: '0 0 8px rgba(52, 199, 89, 0.6)',
        flexShrink: 0,
      }} />

      <div style={{ flex: 1 }}>
        <span style={{ opacity: 0.6 }}>v{update.latestVersion} available</span>
      </div>

      <a
        href={update.releaseUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          padding: '4px 12px',
          borderRadius: 6,
          background: '#0A84FF',
          color: 'white',
          fontSize: 12,
          fontWeight: 600,
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        Update
      </a>

      <button
        onClick={() => setDismissed(true)}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.3)',
          fontSize: 16,
          cursor: 'pointer',
          padding: '0 2px',
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        ×
      </button>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}
