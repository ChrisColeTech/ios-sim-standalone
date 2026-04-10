import { OneColLayout } from '../../../../components/layout';
import type { SigCT2PlaceholderScreenProps } from '../../../../types/custom-apps/sigct2';

export function SigCT2PlaceholderScreen(props: SigCT2PlaceholderScreenProps) {
  return (
    <OneColLayout
      deviceFamily="iphone"
      isLandscape={props.isLandscape}
      theme={props.isDark ? 'dark' : 'light'}
      toolbar={{ title: props.title, leadingLabel: 'Back' }}
      onLeadingAction={props.onBack}
      sections={[]}
      bottomContent={
        <div className={`py-12 text-center ${props.isDark ? 'text-white/60' : 'text-black/50'}`}>
          <div className="text-[24px]">{'\u23F3'}</div>
          <div className="mt-2 text-[12px] font-medium">Coming Soon</div>
        </div>
      }
    />
  );
}
