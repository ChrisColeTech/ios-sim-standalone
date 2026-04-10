import { IoBatteryFull, IoCellular, IoWifi } from 'react-icons/io5';
import { useUiStoreState } from '../../store/uiStore';

export function StatusBar(props: { forceTextColor?: 'white' | 'black' }) {
  const theme = useUiStoreState((s) => s.theme);
  const time = useUiStoreState((s) => s.time);
  const battery = useUiStoreState((s) => s.battery);
  const textClassName = (props.forceTextColor ?? (theme === 'dark' ? 'white' : 'black')) === 'black' ? 'text-black' : 'text-white';

  return (
    <header className={`pointer-events-none absolute inset-x-0 top-0 z-20 flex h-4 items-center justify-between px-3 text-[10px] font-medium leading-none ${textClassName}`}>
      <span>{time}</span>
      <div className="flex items-center gap-2.5">
        <IoCellular />
        <IoWifi />
        <span className="flex items-center gap-1.5">
          <span>{battery}</span>
          <IoBatteryFull />
        </span>
      </div>
    </header>
  );
}
