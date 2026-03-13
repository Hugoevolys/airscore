import { motion } from 'framer-motion';
import { ScoreRing } from './ScoreRing';
import type { CategoryScore } from '../types';
import { CheckCircle } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  icon: string;
  weight: string;
  data: CategoryScore;
  index: number;
}

export function CategoryCard({ name, icon, weight, data, index }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
      className="glass-card rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{icon}</span>
            <h3 className="text-lg font-bold text-white">{name}</h3>
          </div>
          <span className="text-xs text-white/30 font-medium">Poids : {weight}</span>
        </div>
        <ScoreRing
          score={data.score}
          size={72}
          strokeWidth={5}
          delay={0.5 + index * 0.15}
          showLabel={false}
        />
      </div>

      {/* Verdict */}
      <p className="text-white/60 text-sm mb-5 leading-relaxed">{data.verdict}</p>

      {/* Recommendations */}
      <div className="space-y-2.5">
        {data.recommendations.map((rec, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-coral mt-0.5 flex-shrink-0" />
            <span className="text-sm text-white/70 leading-relaxed">{rec}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
