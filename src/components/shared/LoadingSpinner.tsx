'use client';

import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => (
  <motion.div
    className="fixed inset-0 flex items-center justify-center bg-slate-900/80"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin" />
  </motion.div>
);

export default LoadingSpinner;