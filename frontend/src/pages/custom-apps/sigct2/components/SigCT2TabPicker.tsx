type SigCT2TabPickerProps = {
  tabs: { id: string; label: string }[];
  activeId: string;
  onSelect: (id: string) => void;
  isDark: boolean;
};

export function SigCT2TabPicker({ tabs, activeId, onSelect, isDark }: SigCT2TabPickerProps) {
  const activeBg = isDark ? 'bg-white/20' : 'bg-black/10';
  const textColor = isDark ? 'text-white' : 'text-black';

  return (
    <div className="flex items-center justify-center gap-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          className={`rounded-full px-3 py-1 text-[9px] font-medium transition-colors ${textColor} ${
            tab.id === activeId ? `${activeBg} font-bold` : 'bg-transparent'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
