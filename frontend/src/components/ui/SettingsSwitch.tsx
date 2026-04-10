import * as Switch from '@radix-ui/react-switch';

export type SettingsSwitchProps = {
  on: boolean;
  theme: 'light' | 'dark';
  onToggle?: () => void;
};

export function SettingsSwitch(props: SettingsSwitchProps) {
  return (
    <Switch.Root
      checked={props.on}
      onCheckedChange={() => props.onToggle?.()}
      className={`relative h-3.5 w-7 shrink-0 cursor-pointer rounded-full p-px transition-colors duration-150 ${props.on ? 'bg-emerald-500' : props.theme === 'dark' ? 'bg-white/25' : 'bg-black/20'}`}
    >
      <Switch.Thumb className={`block h-3 w-3 rounded-full bg-white shadow-sm transition-transform duration-150 ${props.on ? 'translate-x-3.5' : 'translate-x-0'}`} />
    </Switch.Root>
  );
}
