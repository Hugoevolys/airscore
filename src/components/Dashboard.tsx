import { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { RotateCcw, Download, Trophy } from 'lucide-react';
import type { AnalysisResult, CategoryMeta } from '../types';
import { Logo } from './Logo';
import { ScoreRing } from './ScoreRing';
import { CategoryCard } from './CategoryCard';
import { ActionPlan } from './ActionPlan';
import { ConversionFunnel } from './ConversionFunnel';
import { ReviewInsights } from './ReviewInsights';
import { getScoreLabel } from '../lib/utils';

interface DashboardProps {
  result: AnalysisResult;
  onReset: () => void;
}

const CATEGORIES: CategoryMeta[] = [
  { key: 'photos', name: 'Photos', icon: '📸', weight: '30%' },
  { key: 'description', name: 'Description', icon: '✍️', weight: '25%' },
  { key: 'reviews', name: 'Commentaires & Réputation', icon: '⭐', weight: '25%' },
  { key: 'pricing', name: 'Prix & Positionnement', icon: '💰', weight: '10%' },
  { key: 'amenities', name: 'Équipements & Services', icon: '🏡', weight: '10%' },
];

export function Dashboard({ result, onReset }: DashboardProps) {
  // Confetti if score > 8
  useEffect(() => {
    if (result.global_score > 8) {
      const timer = setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.3 },
          colors: ['#FF5A5F', '#FF8A5C', '#C084FC', '#22C55E', '#F59E0B'],
        });
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [result.global_score]);

  const handleDownloadPdf = useCallback(() => {
    window.print();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen px-4 py-8 sm:py-12"
    >
      <div className="max-w-[860px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-10"
        >
          <Logo size="sm" />
          <button
            onClick={onReset}
            className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Nouvelle analyse
          </button>
        </motion.div>

        {/* Global Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="glass-card rounded-2xl p-8 sm:p-10 text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Trophy className="w-6 h-6 text-coral" />
            <h2 className="text-xl font-bold text-white">Score Global</h2>
          </div>

          <div className="flex justify-center mb-6">
            <ScoreRing
              score={result.global_score}
              size={160}
              strokeWidth={10}
              delay={0.3}
              showLabel={false}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-coral/20 to-coral/10 text-coral border border-coral/20 mb-4">
              {getScoreLabel(result.global_score)}
            </span>
            <p className="text-white/60 text-base max-w-lg mx-auto leading-relaxed">
              {result.global_verdict}
            </p>
          </motion.div>
        </motion.div>

        {/* Category scores */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <span className="text-xl">📊</span>
            Scores par Catégorie
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CATEGORIES.map((cat, i) => (
              <CategoryCard
                key={cat.key}
                name={cat.name}
                icon={cat.icon}
                weight={cat.weight}
                data={result.categories[cat.key]}
                index={i}
              />
            ))}
          </div>
        </motion.div>

        {/* Conversion Funnel */}
        {result.conversion_funnel && (
          <div className="mb-8">
            <ConversionFunnel funnel={result.conversion_funnel} globalScore={result.global_score} />
          </div>
        )}

        {/* Action Plan */}
        <div className="mb-8">
          <ActionPlan actions={result.action_plan} />
        </div>

        {/* Review Insights */}
        {result.review_insights && (
          <div className="mb-10">
            <ReviewInsights insights={result.review_insights} />
          </div>
        )}

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <button
            onClick={onReset}
            className="btn-coral text-white font-semibold px-8 py-3.5 rounded-xl flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Analyser une autre annonce
          </button>
          <button
            onClick={handleDownloadPdf}
            className="px-8 py-3.5 rounded-xl font-semibold text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Télécharger le rapport PDF
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
