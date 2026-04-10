import { LuSearch, LuX } from 'react-icons/lu';

type SigCT2SearchBarProps = {
  value: string;
  placeholder: string;
  isDark: boolean;
  onChange: (value: string) => void;
  onClear: () => void;
};

export function SigCT2SearchBar({ value, placeholder, isDark, onChange, onClear }: SigCT2SearchBarProps) {
  const bg = isDark ? 'bg-white/10' : 'bg-black/5';
  const textColor = isDark ? 'text-white' : 'text-black';
  const placeholderColor = isDark ? 'placeholder:text-white/40' : 'placeholder:text-black/30';
  const iconColor = isDark ? 'text-white/40' : 'text-black/30';

  return (
    <div className={`flex items-center gap-1.5 rounded-lg ${bg} px-2 py-1.5`}>
      <LuSearch className={`h-3 w-3 shrink-0 ${iconColor}`} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`min-w-0 bg-transparent text-[10px] outline-none ${textColor} ${placeholderColor}`}
        style={{ flex: '1 1 0' }}
      />
      {value && (
        <button onClick={onClear} className={`shrink-0 ${iconColor}`}>
          <LuX className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
