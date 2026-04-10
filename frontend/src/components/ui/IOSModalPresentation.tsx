import { AnimatePresence, motion } from 'framer-motion';
import type { IOSModalPresentationProps } from '../../types/ui-components';

/**
 * iOS 13+ card-style modal presentation (UIModalPresentationStyle.automatic).
 * Slides up from the bottom on enter, slides down on exit.
 */
export function IOSModalPresentation({ open, children }: IOSModalPresentationProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="absolute inset-0 z-40">
          {/* Dimmed backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          {/* Modal card — slides up from bottom */}
          <motion.div
            className="absolute inset-x-0 bottom-0 top-[18px] overflow-hidden rounded-t-[10px] shadow-2xl"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220, mass: 1 }}
          >
            {/* Drag indicator */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center pt-[4px]">
              <div className="h-[3px] w-[28px] rounded-full bg-white/30" />
            </div>
            <div className="h-full">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
