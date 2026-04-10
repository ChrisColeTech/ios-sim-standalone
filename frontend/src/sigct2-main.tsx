import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { SigCT2Page } from './pages/custom-apps/sigct2/SigCT2Page';
import { TitleBar } from './components/titlebar/TitleBar';
import type { SimulatorTheme } from './types/app';

const params = new URLSearchParams(window.location.search);
const theme: SimulatorTheme = params.get('theme') === 'dark' ? 'dark' : 'light';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <TitleBar />
      <div className="flex-1 min-h-0 overflow-hidden">
        <SigCT2Page
          deviceFamily="iphone"
          isLandscape={false}
          theme={theme}
          onClose={() => window.close()}
        />
      </div>
    </div>
  </StrictMode>,
);
