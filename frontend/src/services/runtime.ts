/**
 * Runtime detection — are we running inside Electron or in a plain browser?
 */

/** True when running in a plain browser (no Electron shell). */
export const isBrowser = !window.electronAPI;

/** True when running inside the Electron shell. */
export const isElectron = !!window.electronAPI;
