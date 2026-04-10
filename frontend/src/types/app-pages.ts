import type { AppPageCommonProps } from './components';

export type TVPageProps = AppPageCommonProps;

export type BooksPageProps = AppPageCommonProps;

export type NewsPageProps = AppPageCommonProps;

export type ClockPageProps = AppPageCommonProps;

export type MapsPageProps = AppPageCommonProps & {
  appId: string;
};

export type CameraPageProps = AppPageCommonProps;

export type CalculatorPageProps = AppPageCommonProps;

export type CalendarPageProps = AppPageCommonProps;

export type HealthPageProps = AppPageCommonProps;

export type StocksPageProps = AppPageCommonProps;

export type WeatherPageProps = AppPageCommonProps;

export type EditingPageProps = AppPageCommonProps & {
  appId: string;
};

export type WalletPageProps = AppPageCommonProps;

export type AppStorePageProps = AppPageCommonProps;

export type KeynotePageProps = AppPageCommonProps;

export type PagesAppPageProps = AppPageCommonProps;

export type SafariPageProps = AppPageCommonProps;

export type KeynoteTemplatePickerProps = {
  isDark: boolean;
  theme: 'light' | 'dark';
  onSelect: () => void;
};

export type KeynoteWorkspaceProps = {
  isDark: boolean;
  theme: 'light' | 'dark';
  onBack: () => void;
};

export type PagesTemplatePickerProps = {
  isDark: boolean;
  theme: 'light' | 'dark';
  onSelect: () => void;
};

export type PagesWorkspaceProps = {
  isDark: boolean;
  theme: 'light' | 'dark';
  onBack: () => void;
};
