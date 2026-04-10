import { OneColLayout } from '../../../../components/layout';
import { OneColSection } from '../../../../components/layout/1-col/OneColSection';
import type { SigCT2JobDetailScreenProps } from '../../../../types/custom-apps/sigct2';
import type { LayoutListSection } from '../../../../types/layouts';

export function SigCT2JobDetailScreen(props: SigCT2JobDetailScreenProps) {
  const { job, isDark, theme } = props;

  const daysText = job.days != null ? `${job.days} day${job.days === 1 ? '' : 's'}` : '-';
  const statusColor = (job.days ?? 0) < 0 ? 'text-red-400' : 'text-green-400';

  const statusHeader = (
    <div className={`px-3 py-2 text-center ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
      <div className={`text-[16px] font-bold ${statusColor}`}>{daysText}</div>
      <div className="text-[9px] opacity-60">
        {job.lastTransaction ?? 'Unknown status'}
      </div>
    </div>
  );

  const sections: LayoutListSection[] = [
    {
      id: 'job-info',
      header: 'Job Information',
      rows: [
        { id: 'jobNumber', title: 'Job Number', meta: job.jobNumber ?? '-' },
        { id: 'jobId', title: 'Job ID', meta: job.jobID ?? '-' },
        { id: 'lastTransaction', title: 'Last Transaction', meta: job.lastTransaction ?? '-' },
        { id: 'lastTransactionDate', title: 'Last Transaction Date', meta: job.lastTransactionDate?.displayValue ?? '-' },
        { id: 'promiseDate', title: 'Promise Date', meta: job.promiseDate?.displayValue ?? '-' },
        { id: 'days', title: 'Days', meta: daysText },
      ],
    },
  ];

  if (props.deviceFamily === 'ipad') {
    return (
      <>
        {statusHeader}
        {sections.map((s) => (
          <OneColSection key={s.id} section={s} compact theme={theme} />
        ))}
      </>
    );
  }

  return (
    <OneColLayout
      deviceFamily={props.deviceFamily}
      isLandscape={props.isLandscape}
      theme={theme}
      toolbar={{ title: 'Job Detail', leadingLabel: 'Back' }}
      onLeadingAction={props.onBack}
      topContent={statusHeader}
      topContentPlacement="fixed"
      sections={sections}
    />
  );
}
