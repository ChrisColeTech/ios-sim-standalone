import { OneColLayout } from '../../../../components/layout';
import type { SigCT2HelpScreenProps } from '../../../../types/custom-apps/sigct2';

export function SigCT2HelpScreen(props: SigCT2HelpScreenProps) {
  const helpContent = (
    <div className={`py-8 text-center ${props.isDark ? 'text-white/60' : 'text-black/50'}`}>
      <div className="text-[14px] font-medium">Help</div>
      <div className="mt-1 text-[10px]">
        For support, contact the SigCT help desk.
      </div>
    </div>
  );

  if (props.deviceFamily === 'ipad') {
    return helpContent;
  }

  return (
    <OneColLayout
      deviceFamily={props.deviceFamily}
      isLandscape={props.isLandscape}
      theme={props.theme}
      toolbar={{ title: 'Help', leadingLabel: 'Back' }}
      onLeadingAction={props.onBack}
      sections={[]}
      bottomContent={helpContent}
    />
  );
}
