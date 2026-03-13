import { motion } from 'framer-motion';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Logo } from './Logo';

interface ErrorScreenProps {
  message: string;
  onRetry: () => void;
}

export function ErrorScreen({ message, onRetry }: ErrorScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="w-full max-w-md mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-8 mb-6"
        >
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-500/20 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-3">Erreur d'analyse</h2>
          <p className="text-white/60 text-sm leading-relaxed">{message}</p>
        </motion.div>

        <button
          onClick={onRetry}
          className="btn-coral text-white font-semibold px-8 py-3.5 rounded-xl inline-flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Réessayer
        </button>
      </div>
    </motion.div>
  );
}
