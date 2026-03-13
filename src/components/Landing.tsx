import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Zap, Shield } from 'lucide-react';
import { isValidAirbnbUrl, normalizeUrl } from '../lib/utils';
import { Logo } from './Logo';

interface LandingProps {
  onAnalyze: (url: string) => void;
}

export function Landing({ onAnalyze }: LandingProps) {
  const [url, setUrl] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      setValidationError('Veuillez entrer une URL.');
      return;
    }

    if (!isValidAirbnbUrl(url.trim())) {
      setValidationError("L'URL doit provenir d'Airbnb (ex: airbnb.fr/rooms/...)");
      return;
    }

    setValidationError('');
    onAnalyze(normalizeUrl(url.trim()));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-12"
      >
        <Logo />
      </motion.div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-10"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
          Optimisez votre annonce Airbnb{' '}
          <span className="gradient-text">en 60 secondes</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/60 font-light">
          Analyse complète &bull; Scoring pr&eacute;cis &bull; Recommandations actionnables
        </p>
        <p className="text-sm text-white/35 mt-3">
          Basé sur vos données réelles Airbnb et l'analyse de votre annonce
        </p>
      </motion.div>

      {/* Search form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        onSubmit={handleSubmit}
        className="w-full max-w-[640px] mx-auto mb-8"
      >
        <div className="glass-card rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
          <div className="flex-1 flex items-center gap-3 px-4 py-3">
            <Search className="w-5 h-5 text-white/40 flex-shrink-0" />
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setValidationError('');
              }}
              placeholder="Collez l'URL de votre annonce Airbnb..."
              className="w-full bg-transparent text-white placeholder:text-white/30 outline-none text-base"
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="btn-coral text-white font-semibold px-8 py-3.5 rounded-xl text-base whitespace-nowrap flex items-center justify-center gap-2"
          >
            Analyser mon annonce
            <span className="text-lg">&rarr;</span>
          </button>
        </div>
        {validationError && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-coral text-sm mt-3 text-center"
          >
            {validationError}
          </motion.p>
        )}
      </motion.form>

      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex flex-wrap justify-center gap-4"
      >
        {[
          { icon: Sparkles, label: 'IA Avancée' },
          { icon: Zap, label: 'Analyse en temps réel' },
          { icon: Shield, label: '100% Gratuit' },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-white/60"
          >
            <Icon className="w-4 h-4 text-coral" />
            {label}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
