// components/AnimatedComponent.tsx
'use client';

import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

interface AnimatedComponentProps {
  children: ReactNode; // Specify that children can be any valid React node
}

export const fadeUpVariant = {
  initial: { opacity: 0, y: 100 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const AnimatedComponent: React.FC<AnimatedComponentProps> = ({ children }) => {
  return (
    <motion.div variants={fadeUpVariant} initial="initial" animate="animate">
      {children}
    </motion.div>
  );
};

export default AnimatedComponent;