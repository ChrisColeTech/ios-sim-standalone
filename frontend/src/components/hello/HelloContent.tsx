import { HelloSvgPath } from './HelloSvgPath';
import { useHelloAnimation } from '../../hooks/useHelloAnimation';

export function HelloContent() {
  const { currentGreeting, phase } = useHelloAnimation();

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-center justify-center">
        <HelloSvgPath text={currentGreeting} phase={phase} />
      </div>
      <div className="mb-10 text-center text-sm text-white/60">
        Swipe up to open
      </div>
    </div>
  );
}
