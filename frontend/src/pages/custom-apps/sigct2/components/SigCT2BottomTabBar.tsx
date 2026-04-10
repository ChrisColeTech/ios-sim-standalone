import { LuChartColumn, LuSearch, LuInfo } from 'react-icons/lu';

export type SigCT2Tab = 'sales' | 'dsc' | 'info';

type SigCT2BottomTabBarProps = {
  activeTab: SigCT2Tab;
  showDSC: boolean;
  isDark: boolean;
  onTabChange: (tab: SigCT2Tab) => void;
};

const TABS: { id: SigCT2Tab; label: string; icon: typeof LuChartColumn }[] = [
  { id: 'sales', label: 'Sales', icon: LuChartColumn },
  { id: 'dsc', label: 'D&SC', icon: LuSearch },
  { id: 'info', label: 'Information', icon: LuInfo },
];

export function SigCT2BottomTabBar({ activeTab, showDSC, isDark, onTabChange }: SigCT2BottomTabBarProps) {
  const bg = isDark ? 'bg-black/60' : 'bg-white/70';
  const textColor = isDark ? 'text-white' : 'text-black';
  const activeColor = isDark ? 'text-blue-400' : 'text-blue-600';
  const inactiveColor = isDark ? 'text-white/50' : 'text-black/40';

  const visibleTabs = TABS.filter((t) => t.id !== 'dsc' || showDSC);

  return (
    <div className={`mx-4 mb-2 flex items-center justify-around rounded-full ${bg} px-4 py-1.5 backdrop-blur-xl`}>
      {visibleTabs.map((tab) => {
        const isActive = tab.id === activeTab;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-0.5 ${isActive ? activeColor : inactiveColor} ${textColor}`}
          >
            <Icon className="h-4 w-4" />
            <span className={`text-[8px] ${isActive ? 'font-bold' : 'font-normal'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
