import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronUp, BarChart3, HelpCircle } from 'lucide-react';
import { Logo } from './Logo';
import { Footer } from './Footer';

export interface UserMetrics {
  impressions_rate: number;
  search_to_click: number;
  click_to_booking: number;
}

interface MetricsFormProps {
  url: string;
  onSubmit: (metrics: UserMetrics) => void;
  onBack: () => void;
}

export function MetricsForm({ url, onSubmit, onBack }: MetricsFormProps) {
  const [impressions, setImpressions] = useState('');
  const [searchToClick, setSearchToClick] = useState('');
  const [clickToBooking, setClickToBooking] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      impressions_rate: parseFloat(impressions) || 0,
      search_to_click: parseFloat(searchToClick) || 0,
      click_to_booking: parseFloat(clickToBooking) || 0,
    });
  };

  const isValid = impressions !== '' && searchToClick !== '' && clickToBooking !== '';

  return (
    <motion.div
      key="metrics"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
    >
      <Logo size="sm" />

      <div className="w-full max-w-[560px] mt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-4">
            <BarChart3 className="w-3.5 h-3.5" />
            Étape 2/3
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Vos données de performance
          </h1>
          <p className="text-white/50 text-sm leading-relaxed max-w-md mx-auto">
            Pour un diagnostic précis, nous avons besoin de vos métriques de conversion réelles.
          </p>
          <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-xl bg-coral/10 border border-coral/20">
            <span className="text-coral text-sm">📅</span>
            <span className="text-coral/90 text-sm font-medium">
              Sélectionnez la période des <strong className="text-white">3 derniers mois</strong> dans Airbnb
            </span>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6 sm:p-8 mb-4"
        >
          <div className="space-y-5">
            {/* Metric 1 */}
            <div>
              <label className="block text-white font-medium text-sm mb-2">
                📊 Taux d'impression en 1ère page
              </label>
              <p className="text-white/40 text-xs mb-2">
                % de fois où votre annonce apparaît en première page des résultats
              </p>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  placeholder="Ex: 45"
                  value={impressions}
                  onChange={(e) => setImpressions(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-coral/50 focus:ring-1 focus:ring-coral/30 transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">%</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div>
              <label className="block text-white font-medium text-sm mb-2">
                👁️ Conversion recherche → consultation
              </label>
              <p className="text-white/40 text-xs mb-2">
                % de personnes qui cliquent sur votre annonce depuis les résultats
              </p>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  placeholder="Ex: 8.5"
                  value={searchToClick}
                  onChange={(e) => setSearchToClick(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-coral/50 focus:ring-1 focus:ring-coral/30 transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">%</span>
              </div>
            </div>

            {/* Metric 3 */}
            <div>
              <label className="block text-white font-medium text-sm mb-2">
                📅 Conversion consultation → réservation
              </label>
              <p className="text-white/40 text-xs mb-2">
                % de visiteurs de l'annonce qui finissent par réserver
              </p>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  placeholder="Ex: 3.2"
                  value={clickToBooking}
                  onChange={(e) => setClickToBooking(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-coral/50 focus:ring-1 focus:ring-coral/30 transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">%</span>
              </div>
            </div>
          </div>

          {/* URL reminder */}
          <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-2 text-white/30 text-xs">
            <span>Annonce :</span>
            <span className="text-white/50 truncate">{url}</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full mt-6 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
              isValid
                ? 'btn-coral text-white'
                : 'bg-white/5 text-white/30 cursor-not-allowed'
            }`}
          >
            Lancer l'analyse
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.form>

        {/* Help section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="w-full flex items-center justify-between px-6 py-4 text-left"
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-coral" />
              <span className="text-white/70 text-sm font-medium">
                Où trouver ces données ?
              </span>
            </div>
            {showHelp ? (
              <ChevronUp className="w-4 h-4 text-white/40" />
            ) : (
              <ChevronDown className="w-4 h-4 text-white/40" />
            )}
          </button>

          {showHelp && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="px-6 pb-5 border-t border-white/5"
            >
              <div className="pt-4 space-y-4 text-sm">
                <div className="flex gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-coral/20 text-coral text-xs font-bold flex items-center justify-center">1</span>
                  <p className="text-white/60">
                    Connectez-vous à <strong className="text-white/80">airbnb.com</strong> et allez sur votre <strong className="text-white/80">tableau de bord hôte</strong>
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-coral/20 text-coral text-xs font-bold flex items-center justify-center">2</span>
                  <p className="text-white/60">
                    Cliquez sur <strong className="text-white/80">Performance</strong> dans le menu à gauche
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-coral/20 text-coral text-xs font-bold flex items-center justify-center">3</span>
                  <p className="text-white/60">
                    Sélectionnez l'onglet <strong className="text-white/80">Conversion</strong>
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-coral/20 text-coral text-xs font-bold flex items-center justify-center">4</span>
                  <p className="text-white/60">
                    <strong className="text-coral">⚠️ Important :</strong> Réglez la période sur les <strong className="text-white/80">3 derniers mois</strong> et sélectionnez votre annonce
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-coral/20 text-coral text-xs font-bold flex items-center justify-center">5</span>
                  <p className="text-white/60">
                    Vous y trouverez les 3 métriques demandées : <strong className="text-white/80">taux d'impression</strong>, <strong className="text-white/80">recherche → consultation</strong>, et <strong className="text-white/80">consultation → réservation</strong>
                  </p>
                </div>

                <div className="mt-3 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                  <p className="text-indigo-300 text-xs leading-relaxed">
                    💡 <strong>Astuce :</strong> Ces données se trouvent dans l'app Airbnb aussi — onglet Annonces → votre annonce → Performance → Conversion
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Back link */}
        <div className="text-center mt-5">
          <button
            onClick={onBack}
            className="text-white/30 hover:text-white/50 text-sm transition-colors"
          >
            ← Modifier l'URL
          </button>
        </div>
      </div>

      <div className="mt-auto pt-8">
        <Footer />
      </div>
    </motion.div>
  );
}
