type SigCT2LoadingSpinnerProps = { isDark: boolean };

export function SigCT2LoadingSpinner({ isDark }: SigCT2LoadingSpinnerProps) {
  const borderColor = isDark ? 'border-white/20' : 'border-black/10';
  const spinColor = isDark ? 'border-t-white' : 'border-t-black';

  return (
    <div className="flex items-center justify-center py-8">
      <div
        className={`h-6 w-6 animate-spin rounded-full border-2 ${borderColor} ${spinColor}`}
      />
    </div>
  );
}
