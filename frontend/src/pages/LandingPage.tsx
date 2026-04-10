import { useState } from 'react';
import { DEVICES } from '../constants/devices';
import type { DeviceId } from '../constants/devices';

const TITLEBAR_HEIGHT = 38;

const ELECTRON_REPO = 'ChrisColeTech/ios-simulator-v2';
const DOWNLOAD_BASE = `https://github.com/${ELECTRON_REPO}/releases/latest/download`;

type Platform = 'windows' | 'mac' | 'linux';

function detectPlatform(): Platform {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('win')) return 'windows';
  if (ua.includes('mac')) return 'mac';
  return 'linux';
}

const PLATFORM_INFO: Record<Platform, { label: string; file: string; icon: string }> = {
  windows: { label: 'Windows', file: 'iOS-Simulator-Setup.exe', icon: '⊞' },
  mac:     { label: 'macOS',   file: 'iOS-Simulator.dmg',       icon: '' },
  linux:   { label: 'Linux',   file: 'iOS-Simulator.AppImage',  icon: '🐧' },
};

const ALL_PLATFORMS: Platform[] = ['windows', 'mac', 'linux'];

function openSimulatorPopup(device?: DeviceId) {
  const pickerW = 400;
  const pickerH = 600 + TITLEBAR_HEIGHT;

  let width = pickerW;
  let height = pickerH;

  if (device) {
    const info = DEVICES.find((d) => d.id === device);
    if (info) {
      width = info.width;
      height = info.height + TITLEBAR_HEIGHT;
    }
  }

  const left = Math.round((screen.width - width) / 2);
  const top = Math.round((screen.height - height) / 2);

  const features = [
    `width=${width}`,
    `height=${height}`,
    `left=${left}`,
    `top=${top}`,
    'menubar=no',
    'toolbar=no',
    'location=no',
    'status=no',
    'resizable=yes',
    'scrollbars=no',
  ].join(',');

  const url = device ? `./index.html?device=${device}` : './index.html';
  const popup = window.open(url, 'ios-simulator', features);

  if (!popup || popup.closed) {
    return null;
  }

  return popup;
}

export function LandingPage() {
  const [popupBlocked, setPopupBlocked] = useState(false);
  const [showDownloads, setShowDownloads] = useState(false);
  const detectedPlatform = detectPlatform();

  const handleLaunch = (device?: DeviceId) => {
    const popup = openSimulatorPopup(device);
    if (!popup) {
      setPopupBlocked(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-12 p-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tight">iOS Simulator</h1>
        <p className="text-lg text-white/60 max-w-md">
          A browser-based iOS simulator. Launch it right here, or download the
          desktop app for the full experience.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => handleLaunch()}
          className="px-8 py-4 bg-[var(--accent)] text-[#0d1324] font-semibold rounded-xl text-lg hover:brightness-110 transition-all"
        >
          Launch in Browser
        </button>

        <div className="relative">
          <button
            onClick={() => setShowDownloads(!showDownloads)}
            className="px-8 py-4 border border-white/20 text-white font-semibold rounded-xl text-lg hover:bg-white/5 transition-all text-center w-full"
          >
            Download for {PLATFORM_INFO[detectedPlatform].label}
          </button>

          {showDownloads && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-[#1C1C1E] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50">
              {ALL_PLATFORMS.map((p) => {
                const info = PLATFORM_INFO[p];
                const isCurrent = p === detectedPlatform;
                return (
                  <a
                    key={p}
                    href={`${DOWNLOAD_BASE}/${info.file}`}
                    className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-white/10 ${
                      isCurrent ? 'text-[var(--accent)]' : 'text-white/70'
                    }`}
                  >
                    <span className="text-base w-5 text-center">{info.icon}</span>
                    <span className="flex-1">{info.label}</span>
                    <span className="text-[10px] text-white/30">{info.file}</span>
                  </a>
                );
              })}
              <a
                href={`https://github.com/${ELECTRON_REPO}/releases`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 text-sm text-white/40 hover:text-white/60 hover:bg-white/5 border-t border-white/5"
              >
                <span className="text-base w-5 text-center">...</span>
                <span>All releases</span>
              </a>
            </div>
          )}
        </div>
      </div>

      {popupBlocked && (
        <div className="bg-ios-red/20 border border-ios-red/40 rounded-lg px-6 py-4 max-w-md text-center">
          <p className="text-ios-red font-medium">Popup was blocked by your browser.</p>
          <p className="text-white/60 text-sm mt-1">
            Allow popups for this site, or{' '}
            <a href="./index.html" className="underline text-[var(--accent)]">
              open the simulator in this tab
            </a>
            .
          </p>
        </div>
      )}

      <div className="mt-4">
        <p className="text-white/40 text-sm mb-3">Or launch a specific device:</p>
        <div className="flex gap-3">
          {DEVICES.map((d) => (
            <button
              key={d.id}
              onClick={() => handleLaunch(d.id)}
              className="px-4 py-2 border border-white/10 rounded-lg text-sm text-white/70 hover:bg-white/5 hover:text-white transition-all"
            >
              {d.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
