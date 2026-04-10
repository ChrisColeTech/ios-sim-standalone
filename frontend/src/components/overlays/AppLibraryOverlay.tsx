import { motion } from 'framer-motion';

type Props = {
  onClose: () => void;
};

export function AppLibraryOverlay(props: Props) {
  return (
    <motion.div className="absolute inset-0 z-40" initial={{ opacity: 0.01 }} animate={{ opacity: 1 }} exit={{ opacity: 0.01 }} onClick={props.onClose}>
      <motion.section
        className="absolute inset-y-0 right-0 w-[min(26rem,52vw)] border-l border-white/20 bg-white/18 p-4 text-white backdrop-blur-3xl"
        initial={{ x: 90 }}
        animate={{ x: 0 }}
        exit={{ x: 90 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="rounded-[24px] border border-white/15 bg-white/16 px-4 py-3 text-sm text-white/70 backdrop-blur-2xl">Search App Library</div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          {['Suggestions', 'Recently Added', 'Utilities', 'Productivity'].map((item) => (
            <div key={item} className="rounded-[24px] border border-white/15 bg-white/16 px-3 py-5 backdrop-blur-2xl">{item}</div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
