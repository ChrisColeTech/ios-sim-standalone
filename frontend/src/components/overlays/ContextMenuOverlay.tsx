import { motion } from 'framer-motion';

type Props = {
  onClose: () => void;
};

export function ContextMenuOverlay(props: Props) {
  return (
    <motion.div className="absolute inset-0 z-40 bg-black/8" initial={{ opacity: 0.01 }} animate={{ opacity: 1 }} exit={{ opacity: 0.01 }} onClick={props.onClose}>
      <motion.section
        className="absolute left-1/2 top-1/2 w-[min(18rem,70vw)] -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-white/30 bg-white/74 p-3 text-black shadow-[0_24px_80px_rgba(15,23,42,0.2)] backdrop-blur-2xl"
        initial={{ scale: 0.88 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.88 }}
        transition={{ type: 'spring', damping: 22, stiffness: 420 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="space-y-2 text-sm">
          {['Edit Home Screen', 'Share App', 'Remove App'].map((item) => (
            <div key={item} className="rounded-2xl bg-white/72 px-4 py-3 shadow-sm">{item}</div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
