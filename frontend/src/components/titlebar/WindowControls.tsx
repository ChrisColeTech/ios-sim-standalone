import { Close, Maximise, Minimise } from '../../services/electron';
import { useUiStoreState } from '../../store/uiStore';

type WindowButton = {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  isClose?: boolean;
};

function MinimizeIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M0,5 L10,5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function MaximizeIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M0,0 L10,0 L10,10 L0,10 Z" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M0,0 L10,10 M10,0 L0,10" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function WindowControls() {
  const theme = useUiStoreState((s) => s.theme);
  const isDark = theme === 'dark';

  const defaultColor = isDark ? 'text-white' : 'text-black';
  const hoverBg = isDark ? 'hover:bg-white/10' : 'hover:bg-black/10';

  const buttons: WindowButton[] = [
    { label: 'Minimize', icon: <MinimizeIcon />, onClick: () => Minimise() },
    { label: 'Maximize', icon: <MaximizeIcon />, onClick: () => Maximise() },
    { label: 'Close', icon: <CloseIcon />, onClick: () => Close(), isClose: true },
  ];

  return (
    <div className="wails-no-drag flex h-[38px]">
      {buttons.map((btn) => (
        <button
          key={btn.label}
          aria-label={btn.label}
          onClick={btn.onClick}
          className={`flex items-center justify-center w-[46px] h-[38px] border-0 outline-none transition-colors ${defaultColor} ${
            btn.isClose ? 'hover:bg-ios-red hover:text-white' : hoverBg
          }`}
        >
          {btn.icon}
        </button>
      ))}
    </div>
  );
}
