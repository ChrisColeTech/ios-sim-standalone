import { WiCloudy, WiDayCloudy, WiDaySunny, WiHumidity, WiMoonWaxingCrescent3, WiNightClear, WiRain, WiStrongWind, WiThermometer, WiBarometer, WiRaindrops } from 'react-icons/wi';
import { LuEye, LuSun } from 'react-icons/lu';
import { MediaTopBar, TwoColLayout } from '../../components/layout';
import { AppPageShell } from '../../components/layout/shared/AppPageShell';
import { WEATHER_CURRENT, WEATHER_DAILY, WEATHER_HOURLY, WEATHER_SIDEBAR, WEATHER_TABS } from '../../constants/apps/weather-layout';
import { useSelectionState } from '../../hooks/useSelectionState';
import type { WeatherPageProps } from '../../types/app-pages';
import type { DailyIcon, HourlyIcon } from '../../constants/apps/weather-layout';

const HOURLY_ICON: Record<HourlyIcon, React.ReactNode> = {
  sunny: <WiDaySunny className="h-3 w-3 text-yellow-300" />,
  partlyCloudy: <WiDayCloudy className="h-3 w-3 text-white/80" />,
  moon: <WiNightClear className="h-3 w-3 text-white/70" />
};

const DAILY_ICON: Record<DailyIcon, React.ReactNode> = {
  sunny: <WiDaySunny className="h-3 w-3 text-yellow-300" />,
  partlyCloudy: <WiDayCloudy className="h-3 w-3 text-white/80" />,
  cloudy: <WiCloudy className="h-3 w-3 text-white/60" />,
  rain: <WiRain className="h-3 w-3 text-white/70" />
};

export function WeatherPage(props: WeatherPageProps) {
  const { selectedRowId, setSelectedRowId } = useSelectionState('10-day');

  if (props.deviceFamily === 'iphone') {
    return (
      <AppPageShell
        statusBarForceTextColor="white"
        backgroundClassName="bg-gradient-to-b from-sky-400 to-sky-600"
      >
        <WeatherIPhoneDetail onClose={props.onClose} />
      </AppPageShell>
    );
  }

  return (
    <AppPageShell
      statusBarForceTextColor="white"
      backgroundClassName="bg-gradient-to-b from-sky-400 to-sky-600"
    >
      <TwoColLayout
        theme="dark"
        presentation="immersive"
        backgroundClassName="bg-transparent text-white"
        sidebarClassName="border border-white/15 backdrop-blur-2xl shadow-lg shadow-black/20"
        toolbarClassName="border border-white/15 backdrop-blur-2xl"
        toolbarContent={<MediaTopBar theme="dark" title="Weather" tabs={WEATHER_TABS} activeTabId={selectedRowId} onTabSelect={setSelectedRowId} />}
        sidebar={WEATHER_SIDEBAR}
        selectedSidebarRowId="cupertino"
        onSidebarSelect={() => {}}
        detail={{
          sections: [],
          content: <WeatherDetail />
        }}
      />
    </AppPageShell>
  );
}

function WeatherDetail() {
  const w = WEATHER_CURRENT;

  return (
    <div className="h-full overflow-auto px-3 pt-1 pb-3 text-white">
      {/* Hero card */}
      <section className="relative overflow-hidden rounded-xl border border-white/15 backdrop-blur-2xl" style={{ aspectRatio: '16 / 7' }}>
        <div className="absolute inset-0 bg-white/5" />
        <div className="relative flex h-full flex-col items-center justify-center">
          <p className="text-[7px] text-white/70">My Location</p>
          <h1 className="text-[13px] font-medium">{w.location}</h1>
          <p className="text-[28px] font-thin leading-none">{w.temp}</p>
          <p className="text-[8px] text-white/90">{w.condition}</p>
          <p className="text-[8px] text-white/70">H:{w.high}  L:{w.low}</p>
        </div>
      </section>

      {/* Hourly forecast */}
      <div className="mt-2 rounded-lg border border-white/15 p-1.5 backdrop-blur-2xl">
        <p className="border-b border-white/20 pb-1 text-[6px] text-white/70">{w.description}</p>
        <div className="flex gap-0 overflow-x-auto pt-1">
          {WEATHER_HOURLY.map((h) => (
            <div key={h.time} className="flex w-[10%] shrink-0 flex-col items-center gap-0.5">
              <span className="text-[6px] text-white/80">{h.time}</span>
              {HOURLY_ICON[h.icon]}
              <span className="text-[7px] font-medium">{h.temp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 10-day forecast + Map */}
      <div className="mt-1.5 flex gap-1.5">
        <div className="w-1/2 rounded-lg border border-white/15 p-1.5 backdrop-blur-2xl">
          <p className="border-b border-white/20 pb-0.5 text-[5px] font-semibold uppercase tracking-wide text-white/50">10-Day Forecast</p>
          {WEATHER_DAILY.map((d, i) => (
            <div key={i} className="flex items-center gap-0.5 border-b border-white/10 py-0.5 last:border-b-0">
              <span className="w-[22px] text-[6px] font-medium">{d.day}</span>
              <span className="flex w-[14px] justify-center">{DAILY_ICON[d.icon]}</span>
              <span className="w-[16px] text-right text-[6px] text-white/60">{d.low}</span>
              <div className="mx-0.5 h-0.5 flex-1 overflow-hidden rounded-full bg-white/20">
                <div className="h-full rounded-full bg-gradient-to-r from-sky-300 to-yellow-300" style={{ width: `${d.barPct}%` }} />
              </div>
              <span className="w-[16px] text-[6px]">{d.high}</span>
            </div>
          ))}
        </div>
        <div className="w-1/2 overflow-hidden rounded-lg border border-white/15 backdrop-blur-2xl">
          <div className="relative h-full min-h-[120px]">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-700/40 via-sky-600/30 to-green-800/20" />
            <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 100 100">
              <path d="M0,40 Q25,35 50,42 T100,38" stroke="white" strokeWidth="0.5" fill="none" />
              <path d="M0,60 Q30,55 60,62 T100,58" stroke="white" strokeWidth="0.5" fill="none" />
              <rect x="20" y="30" width="25" height="20" rx="2" fill="white" fillOpacity="0.15" />
              <rect x="55" y="45" width="30" height="25" rx="2" fill="white" fillOpacity="0.1" />
            </svg>
            <div className="absolute bottom-1.5 left-1.5">
              <p className="text-[5px] font-semibold uppercase tracking-wide text-white/50">Precipitation</p>
              <p className="text-[8px] font-medium">Radar</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detail cards grid */}
      <div className="mt-1.5 grid grid-cols-2 gap-1.5">
        <div className="rounded-lg border border-white/15 p-1.5 backdrop-blur-2xl">
          <p className="flex items-center gap-0.5 text-[5px] font-semibold uppercase tracking-wide text-white/50"><LuSun className="h-1.5 w-1.5" /> UV Index</p>
          <p className="pt-0.5 text-[10px] font-medium">4</p>
          <p className="text-[6px]">Moderate</p>
          <svg className="mt-1 w-full" viewBox="0 0 100 12" height="8">
            <defs><linearGradient id="uv-grad"><stop offset="0%" stopColor="#4ade80" /><stop offset="33%" stopColor="#facc15" /><stop offset="66%" stopColor="#f97316" /><stop offset="100%" stopColor="#ef4444" /></linearGradient></defs>
            <rect x="0" y="4" width="100" height="4" rx="2" fill="url(#uv-grad)" opacity="0.5" />
            <circle cx="40" cy="6" r="3" fill="white" />
          </svg>
        </div>
        <div className="rounded-lg border border-white/15 p-1.5 backdrop-blur-2xl">
          <p className="flex items-center gap-0.5 text-[5px] font-semibold uppercase tracking-wide text-white/50"><WiStrongWind className="h-2 w-2" /> Wind</p>
          <div className="flex items-center justify-between pt-0.5">
            <div>
              <p className="text-[10px] font-medium">8 mph</p>
              <p className="text-[5px] text-white/50">WSW</p>
            </div>
            <div className="relative flex h-7 w-7 items-center justify-center rounded-full border border-white/25">
              <span className="absolute -top-0.5 text-[4px] text-white/40">N</span>
              <span className="absolute -bottom-0.5 text-[4px] text-white/40">S</span>
              <span className="absolute -left-0.5 text-[4px] text-white/40">W</span>
              <span className="absolute -right-0.5 text-[4px] text-white/40">E</span>
              <div className="h-0.5 w-3 rotate-[225deg] rounded-full bg-white/70" />
              <div className="absolute h-1 w-1 rounded-full bg-white/60" />
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-white/15 p-1.5 backdrop-blur-2xl">
          <p className="flex items-center gap-0.5 text-[5px] font-semibold uppercase tracking-wide text-white/50"><WiMoonWaxingCrescent3 className="h-2 w-2" /> Moon</p>
          <div className="flex items-center justify-between pt-0.5">
            <div>
              <p className="text-[8px] font-medium">Waxing Crescent</p>
              <p className="text-[5px] text-white/50">Moonrise: 9:42 PM</p>
            </div>
            <WiMoonWaxingCrescent3 className="h-7 w-7 text-yellow-200/80" />
          </div>
        </div>
        <div className="rounded-lg border border-white/15 p-1.5 backdrop-blur-2xl">
          <p className="flex items-center gap-0.5 text-[5px] font-semibold uppercase tracking-wide text-white/50"><WiRaindrops className="h-2 w-2" /> Precipitation</p>
          <p className="pt-0.5 text-[10px] font-medium">0&quot;</p>
          <p className="text-[5px] text-white/50">in last 24h</p>
        </div>
        <div className="rounded-lg border border-white/15 p-1.5 backdrop-blur-2xl">
          <p className="flex items-center gap-0.5 text-[5px] font-semibold uppercase tracking-wide text-white/50"><WiThermometer className="h-2 w-2" /> Feels Like</p>
          <p className="pt-0.5 text-[10px] font-medium">70°</p>
          <p className="text-[5px] text-white/50">Similar to the actual temperature.</p>
        </div>
        <div className="rounded-lg border border-white/15 p-1.5 backdrop-blur-2xl">
          <p className="flex items-center gap-0.5 text-[5px] font-semibold uppercase tracking-wide text-white/50"><WiHumidity className="h-2 w-2" /> Humidity</p>
          <p className="pt-0.5 text-[10px] font-medium">25%</p>
          <div className="mt-0.5 h-0.5 w-full overflow-hidden rounded-full bg-white/20">
            <div className="h-full w-[25%] rounded-full bg-white/60" />
          </div>
          <p className="pt-0.5 text-[5px] text-white/50">Dew point: 34°</p>
        </div>
        <div className="rounded-lg border border-white/15 p-1.5 backdrop-blur-2xl">
          <p className="flex items-center gap-0.5 text-[5px] font-semibold uppercase tracking-wide text-white/50"><LuEye className="h-1.5 w-1.5" /> Visibility</p>
          <p className="pt-0.5 text-[10px] font-medium">10 mi</p>
          <p className="text-[5px] text-white/50">Clear</p>
        </div>
        <div className="rounded-lg border border-white/15 p-1.5 backdrop-blur-2xl">
          <p className="flex items-center gap-0.5 text-[5px] font-semibold uppercase tracking-wide text-white/50"><WiBarometer className="h-2 w-2" /> Pressure</p>
          <p className="pt-0.5 text-[10px] font-medium">30.1 in</p>
          <p className="text-[5px] text-white/50">Rising</p>
        </div>
      </div>
    </div>
  );
}

function WeatherIPhoneDetail(props: { onClose: () => void }) {
  void props.onClose;
  const w = WEATHER_CURRENT;

  return (
    <div className="flex h-full flex-col text-white">
      <div className="shrink-0 px-2 pb-1 pt-0.5">
        <div className="flex items-center gap-1 rounded-md bg-white/15 px-1.5 py-1 backdrop-blur-sm">
          <LuEye className="h-2 w-2 text-white/50" />
          <span className="text-[8px] text-white/40">Search Location</span>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-auto px-2 pb-3">
        <div className="flex flex-col items-center pb-1 pt-1">
          <p className="text-[6px] text-white/70">My Location</p>
          <h1 className="text-[11px] font-medium">{w.location}</h1>
          <p className="text-[22px] font-thin leading-none">{w.temp}</p>
          <p className="text-[7px] text-white/90">{w.condition}</p>
          <p className="text-[7px] text-white/70">H:{w.high}  L:{w.low}</p>
        </div>
        <div className="rounded-lg border border-white/15 p-1.5 backdrop-blur-2xl">
          <p className="border-b border-white/20 pb-0.5 text-[5px] text-white/70">{w.description}</p>
          <div className="flex gap-0 overflow-x-auto pt-1">
            {WEATHER_HOURLY.map((h) => (
              <div key={h.time} className="flex w-[10%] shrink-0 flex-col items-center gap-0.5">
                <span className="text-[5px] text-white/80">{h.time}</span>
                {HOURLY_ICON[h.icon]}
                <span className="text-[6px] font-medium">{h.temp}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-1 rounded-lg border border-white/15 p-1.5 backdrop-blur-2xl">
          <p className="border-b border-white/20 pb-0.5 text-[5px] font-semibold uppercase tracking-wide text-white/50">10-Day Forecast</p>
          {WEATHER_DAILY.map((d, i) => (
            <div key={i} className="flex items-center gap-0.5 border-b border-white/10 py-0.5 last:border-b-0">
              <span className="w-[22px] text-[6px] font-medium">{d.day}</span>
              <span className="flex w-[14px] justify-center">{DAILY_ICON[d.icon]}</span>
              <span className="w-[16px] text-right text-[6px] text-white/60">{d.low}</span>
              <div className="mx-0.5 h-0.5 flex-1 overflow-hidden rounded-full bg-white/20">
                <div className="h-full rounded-full bg-gradient-to-r from-sky-300 to-yellow-300" style={{ width: `${d.barPct}%` }} />
              </div>
              <span className="w-[16px] text-[6px]">{d.high}</span>
            </div>
          ))}
        </div>
        <div className="mt-1 space-y-1">
          <div className="rounded-lg border border-white/15 p-1.5 backdrop-blur-2xl">
            <p className="flex items-center gap-0.5 text-[5px] font-semibold uppercase tracking-wide text-white/50"><LuSun className="h-1.5 w-1.5" /> UV Index</p>
            <p className="pt-0.5 text-[9px] font-medium">4</p>
            <p className="text-[5px]">Moderate</p>
          </div>
          <div className="rounded-lg border border-white/15 p-1.5 backdrop-blur-2xl">
            <p className="flex items-center gap-0.5 text-[5px] font-semibold uppercase tracking-wide text-white/50"><WiStrongWind className="h-2 w-2" /> Wind</p>
            <p className="pt-0.5 text-[9px] font-medium">8 mph WSW</p>
          </div>
          <div className="rounded-lg border border-white/15 p-1.5 backdrop-blur-2xl">
            <p className="flex items-center gap-0.5 text-[5px] font-semibold uppercase tracking-wide text-white/50"><WiThermometer className="h-2 w-2" /> Feels Like</p>
            <p className="pt-0.5 text-[9px] font-medium">70°</p>
          </div>
          <div className="rounded-lg border border-white/15 p-1.5 backdrop-blur-2xl">
            <p className="flex items-center gap-0.5 text-[5px] font-semibold uppercase tracking-wide text-white/50"><WiHumidity className="h-2 w-2" /> Humidity</p>
            <p className="pt-0.5 text-[9px] font-medium">25%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
