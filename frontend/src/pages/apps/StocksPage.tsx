import { OneColLayout, TwoColLayout } from '../../components/layout';
import { AppPageShell } from '../../components/layout/shared/AppPageShell';
import { STOCKS_ARTICLE, STOCKS_PRICES, STOCKS_SIDEBAR } from '../../constants/apps/stocks-layout';
import { useSelectionState } from '../../hooks/useSelectionState';
import type { StocksPageProps } from '../../types/app-pages';

export function StocksPage(props: StocksPageProps) {
  const isDark = props.theme === 'dark';
  const { selectedRowId, setSelectedRowId } = useSelectionState('sbux');

  if (props.deviceFamily === 'iphone') {
    return (
      <AppPageShell
        backgroundClassName={isDark ? 'bg-ios-gray-dark' : 'bg-ios-gray-light'}
      >
        <OneColLayout
          deviceFamily={props.deviceFamily}
          isLandscape={props.isLandscape}
          theme={props.theme}
          toolbar={{ title: 'Stocks', leadingLabel: 'Back' }}
          searchPlaceholder="Search"
          sections={STOCKS_SIDEBAR.sections}
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
        toolbarTitle="Stocks"
        sidebar={STOCKS_SIDEBAR}
        selectedSidebarRowId={selectedRowId}
        onSidebarSelect={setSelectedRowId}
        renderSidebarRowTrailing={(row) => {
          const data = STOCKS_PRICES[row.id];
          if (!data) return null;
          return (
            <div className="flex items-center gap-1">
              <svg className="h-2.5 w-5" viewBox="0 0 20 10">
                <polyline points="0,8 4,6 8,7 12,4 16,5 20,2" fill="none" stroke={data.up ? '#22c55e' : '#ef4444'} strokeWidth="1.5" />
              </svg>
              <div className="text-right">
                <div className={`text-[8px] font-medium ${isDark ? 'text-white' : 'text-black'}`}>{data.price}</div>
                <span className={`inline-block rounded px-0.5 text-[6px] font-medium text-white ${data.up ? 'bg-green-600' : 'bg-red-600'}`}>{data.change}</span>
              </div>
            </div>
          );
        }}
        detail={{
          sections: [],
          content: <StocksArticle isDark={isDark} />
        }}
      />
    </AppPageShell>
  );
}

function StocksArticle(props: { isDark: boolean }) {
  const { isDark } = props;
  const article = STOCKS_ARTICLE;

  return (
    <div className={`h-full overflow-auto px-3 pb-3 pt-1 ${isDark ? 'text-white' : 'text-black'}`}>
      <p className={`pb-0.5 text-[7px] font-semibold uppercase tracking-wider ${isDark ? 'text-ios-gray' : 'text-ios-gray'}`}>{article.category}</p>
      <h1 className="pb-1 text-[13px] font-bold leading-tight">{article.title}</h1>

      <div className="flex items-center gap-1 pb-2">
        <div className={`flex h-4 w-4 items-center justify-center rounded-full text-[6px] font-bold ${isDark ? 'bg-ios-surface-elevated text-white/70' : 'bg-ios-separator-light text-black/70'}`}>MC</div>
        <span className={`text-[7px] ${isDark ? 'text-ios-gray' : 'text-ios-gray'}`}>{article.author} · {article.date}</span>
      </div>

      <div className="mb-2 aspect-[16/10] overflow-hidden rounded-lg bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500" />

      <p className={`text-[9px] leading-relaxed ${isDark ? 'text-white/70' : 'text-black/70'}`}>{article.excerpt}</p>
    </div>
  );
}
