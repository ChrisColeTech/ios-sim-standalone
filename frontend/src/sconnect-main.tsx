import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { SConnectHomePage } from './pages/custom-apps/sconnect-home/SConnectHomePage';
import { TitleBar } from './components/titlebar/TitleBar';
import { useSimulatorWs } from './hooks/useSimulatorWs';
import { useUiStoreState } from './store/uiStore';

function SConnectStandaloneApp() {
  const wsState = useSimulatorWs();
  const setSimulatorState = useUiStoreState((s) => s.setSimulatorState);

  // Sync WS state to store globally to force StatusBar themes dynamically
  useEffect(() => {
    if (wsState.theme) {
      setSimulatorState({
        deviceFamily: 'ipad',
        isLandscape: true,
        theme: wsState.theme,
      });
    }
  }, [wsState.theme, setSimulatorState]);

  const theme = wsState.theme || 'dark';

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <TitleBar />
      <div className="flex-1 min-h-0 overflow-hidden">
        <SConnectHomePage
          deviceFamily="ipad"
          isLandscape={true}
          theme={theme}
          onClose={() => window.close()}
        />
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SConnectStandaloneApp />
  </StrictMode>,
);
