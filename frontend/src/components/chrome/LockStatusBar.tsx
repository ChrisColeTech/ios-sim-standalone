import { IoBatteryFull, IoCellular, IoWifi } from 'react-icons/io5';
import { useUiStoreState } from '../../store/uiStore';

export function LockStatusBar() {
  const battery = useUiStoreState((s) => s.battery);

  return (
    <header className="flex h-4 items-center justify-end px-3 text-[10px] font-medium leading-none text-white">
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
