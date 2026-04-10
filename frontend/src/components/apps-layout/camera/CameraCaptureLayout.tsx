import type { CameraCaptureLayoutProps } from '../../../types/layouts';

export function CameraCaptureLayout(props: CameraCaptureLayoutProps) {
  const isDark = props.theme === 'dark';

  return (
    <section className="relative h-full overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(132,204,22,0.35),transparent_35%),radial-gradient(circle_at_65%_70%,rgba(14,165,233,0.30),transparent_35%),linear-gradient(180deg,#111,#000)]" />

      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col items-center gap-3">
        {['fx', 'timer', 'flip'].map((id) => (
          <button key={id} className="h-11 w-11 rounded-full bg-black/55 text-white backdrop-blur-sm" type="button">
            •
          </button>
        ))}
        <button className="mt-1 h-16 w-16 rounded-full border-4 border-ios-separator-light bg-white" type="button" />
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-xs text-white backdrop-blur-sm">
        VIDEO  <span className="mx-2 rounded-full bg-yellow-400 px-2 py-1 text-black">{props.modeLabel}</span>  PORTRAIT
      </div>

      <div className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/45 px-3 py-2 text-xs text-white backdrop-blur-sm">1x</div>
      <div className={`absolute left-4 top-3 text-xs ${isDark ? 'text-white/80' : 'text-black'}`}>9:41</div>
    </section>
  );
}
