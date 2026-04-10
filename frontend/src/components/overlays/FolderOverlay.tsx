import { motion } from 'framer-motion';

type Props = {
  onClose: () => void;
};

export function FolderOverlay(props: Props) {
  return (
    <motion.div className="absolute inset-0 z-40 bg-black/8" initial={{ opacity: 0.01 }} animate={{ opacity: 1 }} exit={{ opacity: 0.01 }} onClick={props.onClose}>
      <motion.section
        className="absolute left-1/2 top-[18%] w-[min(24rem,76vw)] -translate-x-1/2 rounded-[34px] border border-white/25 bg-white/68 p-4 text-black shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur-2xl"
        initial={{ y: 48, scale: 0.92 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 48, scale: 0.92 }}
        transition={{ type: 'spring', damping: 24, stiffness: 320 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="text-center text-lg font-semibold tracking-[-0.03em]">Folder</div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
          {['App 1', 'App 2', 'App 3', 'App 4', 'App 5', 'App 6'].map((item) => (
            <div key={item} className="rounded-2xl bg-white/70 px-3 py-5 text-center shadow-sm">{item}</div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
