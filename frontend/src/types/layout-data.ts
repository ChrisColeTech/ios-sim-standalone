export type EditingLayoutConfig = {
  title: string;
  sidebar: string[];
  panel: string;
};

export type MapLayoutContent = {
  title: string;
  subtitle: string;
};

export type MapViewStateConfig = {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch?: number;
  bearing?: number;
};

export type MapMarkerConfig = {
  id: string;
  longitude: number;
  latitude: number;
  label?: string;
};

export type MapSceneConfig = {
  styleUrlLight: string;
  styleUrlDark: string;
  viewState: MapViewStateConfig;
  markers?: MapMarkerConfig[];
};
