import { motion } from 'framer-motion';

type Props = {
  onClose: () => void;
};

export function AppSwitcherOverlay(props: Props) {
  void props.onClose;

  return (
    <motion.div
      className="absolute inset-0 z-40 flex items-center justify-center bg-black/10 backdrop-blur-sm"
      initial={{ opacity: 0.01 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.01 }}
    >
      <motion.h1
        className="text-4xl font-semibold text-white"
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        App Switcher
      </motion.h1>
    </motion.div>
  );
}
