import { IoChevronForward } from 'react-icons/io5';
import { OneColLayout, TwoColLayout } from '../../components/layout';
import { AppPageShell } from '../../components/layout/shared/AppPageShell';
import { HEALTH_PINNED_CARDS, HEALTH_PROFILE, HEALTH_SIDEBAR } from '../../constants/apps/health-layout';
import { useSelectionState } from '../../hooks/useSelectionState';
import type { HealthPageProps } from '../../types/app-pages';

export function HealthPage(props: HealthPageProps) {
  const isDark = props.theme === 'dark';
  const { selectedRowId, setSelectedRowId } = useSelectionState('summary');

  if (props.deviceFamily === 'iphone') {
    return (
      <AppPageShell
        backgroundClassName={isDark ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}
      >
        <OneColLayout
          deviceFamily={props.deviceFamily}
          isLandscape={props.isLandscape}
          theme={props.theme}
          toolbar={{ title: 'Health', leadingLabel: 'Back' }}
          sections={[{ id: 'summary', rows: [{ id: 'summary', title: 'Summary' }, { id: 'sharing', title: 'Sharing' }] }]}
        />
      </AppPageShell>
    );
  }

  return (
    <AppPageShell
      backgroundClassName={isDark ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}
    >
      <TwoColLayout
        theme={props.theme}
        toolbarTitle="Health"
        sidebar={HEALTH_SIDEBAR}
        selectedSidebarRowId={selectedRowId}
        onSidebarSelect={setSelectedRowId}
        detail={{
          toolbarActions: [{ id: 'edit', label: 'Edit' }],
          sections: [],
          content: <HealthSummary isDark={isDark} />
        }}
      />
    </AppPageShell>
  );
}

function HealthSummary(props: { isDark: boolean }) {
  const { isDark } = props;

  return (
    <div className={`h-full overflow-auto px-2 pb-3 ${isDark ? 'text-white' : 'text-black'}`}>
      <div className="flex items-center gap-2 pb-2 pt-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-300 via-pink-200 to-blue-200 text-[10px] font-semibold text-black/70">
          {HEALTH_PROFILE.initials}
        </div>
        <div>
          <h1 className="text-[13px] font-bold">{HEALTH_PROFILE.name}</h1>
          <button className={`text-[8px] ${isDark ? 'text-white' : 'text-black'}`} type="button">
            Profile <IoChevronForward className="inline h-1.5 w-1.5" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between pb-1">
        <h2 className="text-[11px] font-bold">Pinned</h2>
        <button className={`text-[8px] ${isDark ? 'text-white' : 'text-black'}`} type="button">Edit</button>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        {HEALTH_PINNED_CARDS.map((card) => (
          <div
            key={card.id}
            className={`rounded-lg p-1.5 ${isDark ? 'bg-ios-surface/80' : 'bg-white shadow-sm shadow-black/5'}`}
          >
            <div className="flex items-center justify-between pb-0.5">
              <span className={`text-[7px] font-semibold ${card.labelColor}`}>{card.label}</span>
              <span className={`text-[6px] text-ios-gray`}>{card.time}</span>
            </div>
            {card.activityRings && card.activityData ? (
              <div className="flex items-center justify-between pt-0.5">
                <div className="flex gap-2">
                  <div>
                    <div className="text-[6px] text-red-500">Move</div>
                    <div className="text-[9px] font-bold">{card.activityData.move}</div>
                  </div>
                  <div className={`border-l ${isDark ? 'border-white/10' : 'border-black/10'} pl-2`}>
                    <div className="text-[6px] text-green-500">Exercise</div>
                    <div className="text-[9px] font-bold">{card.activityData.exercise}</div>
                  </div>
                  <div className={`border-l ${isDark ? 'border-white/10' : 'border-black/10'} pl-2`}>
                    <div className="text-[6px] text-cyan-400">Stand</div>
                    <div className="text-[9px] font-bold">{card.activityData.stand}</div>
                  </div>
                </div>
                <div className="flex h-6 w-6 items-center justify-center">
                  <div className="h-5 w-5 rounded-full border-2 border-red-500 p-px">
                    <div className="h-full w-full rounded-full border-2 border-green-500 p-px">
                      <div className="h-full w-full rounded-full border border-cyan-400" />
                    </div>
                  </div>
                </div>
              </div>
            ) : card.status ? (
              <div className="flex items-center justify-between pt-0.5">
                <div>
                  <div className={`text-[6px] text-ios-gray`}>{card.unit}</div>
                  <div className="flex items-center gap-0.5">
                    <span className="text-[6px] text-green-500">●</span>
                    <span className="text-[9px] font-bold">{card.status}</span>
                  </div>
                </div>
                {card.hasChart ? (
                  <div className="flex h-4 items-end gap-px">
                    {[3, 5, 4, 6, 3, 5, 7].map((h, i) => (
                      <div key={i} className="w-1 rounded-sm bg-ios-green/50" style={{ height: `${h * 2}px` }} />
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="flex items-center justify-between pt-0.5">
                <div>
                  {card.value ? <div className="text-[10px] font-bold">{card.value}</div> : null}
                  <div className={`text-[7px] text-ios-gray`}>{card.unit}</div>
                </div>
                {card.hasChart ? (
                  <div className="flex h-4 items-end gap-px">
                    {[2, 4, 3, 5, 4, 6, 3, 5, 4, 3].map((h, i) => (
                      <div key={i} className="w-0.5 rounded-sm bg-red-400/60" style={{ height: `${h * 2}px` }} />
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        className={`mt-2 flex w-full items-center gap-1 rounded-lg p-1.5 text-[8px] ${isDark ? 'bg-ios-surface/80 text-white' : 'bg-white text-black shadow-sm shadow-black/5'}`}
        type="button"
      >
        <span className="text-red-500">●</span>
        <span className="flex-1">Show All Health Data</span>
        <IoChevronForward className={`h-2 w-2 text-ios-gray`} />
      </button>

      <h2 className="pb-1 pt-2 text-[11px] font-bold">Trends</h2>
      <div className={`rounded-lg p-1.5 text-[8px] ${isDark ? 'bg-ios-surface/80 text-ios-gray' : 'bg-white text-ios-gray shadow-sm shadow-black/5'}`}>
        No trends available yet
      </div>
    </div>
  );
}
