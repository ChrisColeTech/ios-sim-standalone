import type { EditingWorkspaceLayoutProps } from '../../../types/layouts';

export function EditingWorkspaceLayout(props: EditingWorkspaceLayoutProps) {
  const isDark = props.theme === 'dark';

  return (
    <section className={`flex h-full min-h-0 flex-col ${isDark ? 'bg-ios-gray-dark text-white' : 'bg-ios-gray-light text-black'}`}>
      <header className={`flex items-center justify-between border-b px-2 py-1 ${isDark ? 'border-white/10 bg-ios-gray-dark' : 'border-black/10 bg-ios-gray-light'}`}>
        <button className="text-[10px]" type="button">Back</button>
        <h1 className="text-[10px] font-semibold">{props.documentTitle}</h1>
        <div className="flex gap-1">
          {props.tools.slice(0, 4).map((tool) => (
            <button key={tool.id} className={`rounded-full px-2 py-1 text-xs ${isDark ? 'bg-white/10' : 'bg-black/5'}`} type="button">
              {tool.label}
            </button>
          ))}
        </div>
      </header>

      <div className="flex min-h-0 flex-1 gap-1.5 p-1.5">
        <aside className={`w-[75px] shrink-0 space-y-0.5 overflow-auto rounded-lg p-1.5 ${isDark ? 'bg-ios-gray-dark' : 'bg-white'}`}>
          {props.sidebarItems.map((item, index) => (
            <button key={item} className={`w-full rounded-md px-1.5 py-0.5 text-left text-[9px] ${index === 0 ? (isDark ? 'bg-ios-surface-elevated text-white' : 'bg-ios-gray-light text-black') : isDark ? 'text-white/70 hover:bg-white/5' : 'text-black/70 hover:bg-black/5'}`} type="button">
              {item}
            </button>
          ))}
        </aside>
        <main className={`relative min-h-0 flex-1 rounded-xl ${isDark ? 'bg-ios-gray-dark' : 'bg-white'} shadow-sm shadow-black/10`}>
          <div className={`absolute inset-2 rounded border border-dashed ${isDark ? 'border-white/20' : 'border-black/20'}`} />
          {props.floatingPanelTitle ? (
            <div className={`absolute left-1/2 top-6 -translate-x-1/2 rounded-2xl border px-3 py-2 text-xs ${isDark ? 'border-white/10 bg-ios-surface/90' : 'border-black/10 bg-white/95'} shadow-lg`}>
              {props.floatingPanelTitle}
            </div>
          ) : null}
        </main>
      </div>
    </section>
  );
}
