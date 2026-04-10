export type HelloPhase = 'writing' | 'holding' | 'fading';

export type HelloSvgPathProps = {
  text: string;
  phase: HelloPhase;
};

export type HelloAnimationState = {
  currentGreeting: string;
  greetingIndex: number;
  phase: HelloPhase;
};
