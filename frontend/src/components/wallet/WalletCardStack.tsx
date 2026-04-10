import { motion } from 'framer-motion';
import { WalletCardContent } from './WalletCardContent';
import type { WalletCardStackProps } from '../../types/wallet';

export function WalletCardStack(props: WalletCardStackProps) {
  const cardHeight = 150;
  const overlap = 44;

  return (
    <div className="relative mx-4 mt-3" style={{ height: `${cardHeight + (props.cards.length - 1) * overlap}px` }}>
      {props.cards.map((card, index) => (
        <motion.button
          key={card.id}
          className="absolute inset-x-0 cursor-pointer appearance-none border-0 p-0 text-left"
          style={{
            top: `${index * overlap}px`,
            zIndex: index,
            height: `${cardHeight}px`
          }}
          whileHover={{ scale: 1.03, y: -6 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onClick={() => props.onSelectCard(card.id)}
          type="button"
        >
          <WalletCardContent card={card} />
        </motion.button>
      ))}
    </div>
  );
}
