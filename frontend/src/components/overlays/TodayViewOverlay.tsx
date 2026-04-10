import { motion } from 'framer-motion';

type Props = {
  onClose: () => void;
};

export function TodayViewOverlay(props: Props) {
  return (
    <motion.div className="absolute inset-0 z-40" initial={{ opacity: 0.01 }} animate={{ opacity: 1 }} exit={{ opacity: 0.01 }} onClick={props.onClose}>
      <motion.section
        className="absolute inset-y-0 left-0 w-[min(25rem,48vw)] border-r border-white/20 bg-white/18 p-4 text-white backdrop-blur-3xl"
        initial={{ x: -80 }}
        animate={{ x: 0 }}
        exit={{ x: -80 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/72">Widgets</div>
        <div className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Today View</div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-[24px] border border-white/15 bg-white/16 px-3 py-6 backdrop-blur-2xl">Weather</div>
          <div className="rounded-[24px] border border-white/15 bg-white/16 px-3 py-6 backdrop-blur-2xl">Calendar</div>
          <div className="col-span-2 rounded-[24px] border border-white/15 bg-white/16 px-3 py-6 backdrop-blur-2xl">Reminders</div>
        </div>
      </motion.section>
    </motion.div>
  );
}
