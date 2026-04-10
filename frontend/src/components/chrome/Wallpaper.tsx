import darkWallpaper from '../../assets/images/ios-hello-bg-dark.webp';
import lightWallpaper from '../../assets/images/ios-hello-bg-light.webp';
import type { WallpaperProps } from '../../types/components';

export function Wallpaper(props: WallpaperProps) {
  const source = props.theme === 'dark' ? darkWallpaper : lightWallpaper;

  return <img src={source} alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} />;
}
