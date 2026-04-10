import type { TwoColSidebarConfig } from '../../types/layouts';

export const STOCKS_SIDEBAR: TwoColSidebarConfig = {
  searchPlaceholder: 'Search',
  sections: [
    {
      id: 'watchlist',
      header: 'Business News',
      rows: [
        { id: 'dji', title: 'Dow Jones', subtitle: 'Dow Jones Industrial A...' },
        { id: 'sp500', title: 'S&P 500', subtitle: "Standard & Poor's 500" },
        { id: 'sbux', title: 'SBUX', subtitle: 'Starbucks Corporation' },
        { id: 'aapl', title: 'AAPL', subtitle: 'Apple Inc.' },
        { id: 'brk', title: 'BRK-B', subtitle: 'Berkshire Hathaway Inc.' },
        { id: 'dis', title: 'DIS', subtitle: 'The Walt Disney Comp...' },
        { id: 'ge', title: 'GE', subtitle: 'GE Aerospace' },
        { id: 'hd', title: 'HD', subtitle: 'The Home Depot Inc.' }
      ]
    }
  ]
};

export const STOCKS_PRICES: Record<string, { price: string; change: string; up: boolean }> = {
  dji: { price: '45,143.49', change: '+151.03', up: true },
  sp500: { price: '6,083.16', change: '+9.62', up: true },
  sbux: { price: '86.63', change: '+0.82', up: true },
  aapl: { price: '260.24', change: '+3.14', up: true },
  brk: { price: '458.54', change: '+2.88', up: true },
  dis: { price: '115.33', change: '+0.23', up: true },
  ge: { price: '168.58', change: '+0.88', up: true },
  hd: { price: '415.40', change: '+1.22', up: true }
};

export const STOCKS_ARTICLE = {
  category: 'Stock Analyst Note',
  title: 'Starbucks Earnings: Focus on Services and Cost-Cutting to Fuel Turnaround; Shares Not Cheap',
  author: 'Dan Su',
  date: 'Jul 30, 2025',
  excerpt: "Starbucks' sales grew by 4% in the third quarter of fiscal 2025 as a global comparable store sales decline of 2% was more than offset by store expansion. Operating profit..."
};
