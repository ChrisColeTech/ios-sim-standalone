import type { MapLayoutContent, MapSceneConfig } from '../../types/layout-data';

const STYLE_URL_LIGHT = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
const STYLE_URL_DARK = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

export const MAPS_LAYOUT_CONTENT: MapLayoutContent = {
  title: 'Explore the world',
  subtitle: 'San Francisco waterfront, 3D view'
};

export const FIND_MY_LAYOUT_CONTENT: MapLayoutContent = {
  title: 'Alejandra Delgado',
  subtitle: '537 W 22nd St, New York, United States'
};

export const MAPS_SCENE: MapSceneConfig = {
  styleUrlLight: STYLE_URL_LIGHT,
  styleUrlDark: STYLE_URL_DARK,
  viewState: {
    longitude: -122.4058,
    latitude: 37.7876,
    zoom: 12.2,
    pitch: 30,
    bearing: -10
  },
  markers: [
    { id: 'ferry-building', longitude: -122.3937, latitude: 37.7955, label: 'Ferry Building' },
    { id: 'coit-tower', longitude: -122.4058, latitude: 37.8024, label: 'Coit Tower' }
  ]
};

export const FIND_MY_SCENE: MapSceneConfig = {
  styleUrlLight: STYLE_URL_LIGHT,
  styleUrlDark: STYLE_URL_DARK,
  viewState: {
    longitude: -73.9923,
    latitude: 40.7465,
    zoom: 13.2,
    pitch: 40,
    bearing: -18
  },
  markers: [
    { id: 'alejandra', longitude: -73.9947, latitude: 40.7443, label: 'Alejandra Delgado' },
    { id: 'airtag-keys', longitude: -73.9893, latitude: 40.7477, label: 'Keys' }
  ]
};

export function isFindMyLayout(appId: string) {
  return appId === 'find-my';
}

export function getMapLayoutContent(appId: string) {
  return isFindMyLayout(appId) ? FIND_MY_LAYOUT_CONTENT : MAPS_LAYOUT_CONTENT;
}

export function getMapScene(appId: string) {
  return isFindMyLayout(appId) ? FIND_MY_SCENE : MAPS_SCENE;
}
