import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';

const STEPS = [
  { message: "Récupération de l'annonce...", icon: '🔗' },
  { message: 'Analyse des photos...', icon: '📸' },
  { message: 'Lecture des commentaires...', icon: '⭐' },
  { message: 'Étude des prix du secteur...', icon: '💰' },
  { message: 'Génération du rapport...', icon: '📊' },
];

interface LoadingScreenProps {
  url: string;
}

export function LoadingScreen({ url }: LoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 3500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + 0.5;
      });
    }, 100);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="w-full max-w-md mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-10 flex justify-center"
        >
          <Logo />
        </motion.div>

        {/* Animated spinner */}
        <motion.div
          className="w-20 h-20 mx-auto mb-8 relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-full h-full rounded-full border-4 border-white/10 border-t-coral" />
        </motion.div>

        {/* Step messages */}
        <div className="h-12 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center gap-3"
            >
              <span className="text-2xl">{STEPS[currentStep].icon}</span>
              <span className="text-white/80 text-lg font-medium">
                {STEPS[currentStep].message}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-coral to-[#FF8A5C]"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>

        <p className="text-white/30 text-sm">
          Analyse en cours...
        </p>

        {/* URL being analyzed */}
        <p className="text-white/20 text-xs mt-4 truncate max-w-sm mx-auto">
          {url}
        </p>
      </div>
    </motion.div>
  );
}
