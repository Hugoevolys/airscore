import { motion } from 'framer-motion';
import { MessageSquareWarning, ThumbsUp, AlertCircle, Info, ChevronRight } from 'lucide-react';
import type { ReviewInsights as ReviewInsightsType } from '../types';

interface ReviewInsightsProps {
  insights: ReviewInsightsType;
}

const SEVERITY_CONFIG = {
  critique: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    text: 'text-red-400',
    label: 'Critique',
    icon: AlertCircle,
  },
  'modéré': {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    text: 'text-yellow-400',
    label: 'Modéré',
    icon: Info,
  },
  mineur: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-400',
    label: 'Mineur',
    icon: Info,
  },
};

export function ReviewInsights({ insights }: ReviewInsightsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.5 }}
    >
      <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
        <span className="text-xl">💬</span>
        Analyse des Commentaires
      </h2>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="glass-card rounded-xl p-5 mb-4"
      >
        <p className="text-white/70 text-sm leading-relaxed">{insights.summary}</p>
      </motion.div>

      {/* Recurring issues */}
      {insights.recurring_issues.length > 0 && (
        <div className="space-y-3 mb-4">
          <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
            <MessageSquareWarning className="w-3.5 h-3.5" />
            Points d'attention récurrents
          </h3>
          {insights.recurring_issues.map((issue, i) => {
            const config = SEVERITY_CONFIG[issue.severity] || SEVERITY_CONFIG['mineur'];
            const SeverityIcon = config.icon;

            return (
              <motion.div
                key={issue.theme}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                className={`glass-card rounded-xl p-4 border ${config.border}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <SeverityIcon className={`w-4 h-4 ${config.text} shrink-0`} />
                    <h4 className="text-white font-semibold text-sm">{issue.theme}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.bg} ${config.text}`}>
                      {config.label}
                    </span>
                    <span className="text-white/30 text-xs">
                      {issue.occurrences}x mentionné
                    </span>
                  </div>
                </div>

                <p className="text-white/40 text-xs italic mb-2 pl-6">
                  "{issue.example_quote}"
                </p>

                <div className="flex items-start gap-2 pl-6">
                  <ChevronRight className="w-3 h-3 text-coral shrink-0 mt-0.5" />
                  <p className="text-coral/90 text-xs leading-relaxed">{issue.fix}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Positive highlights */}
      {insights.positive_highlights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="glass-card rounded-xl p-4 border border-green-500/20 bg-green-500/5"
        >
          <div className="flex items-center gap-2 mb-3">
            <ThumbsUp className="w-4 h-4 text-green-400" />
            <h3 className="text-green-400 font-semibold text-sm">Ce que les voyageurs adorent</h3>
          </div>
          <div className="space-y-2">
            {insights.positive_highlights.map((highlight, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-green-400 text-xs mt-0.5">+</span>
                <p className="text-white/60 text-sm leading-relaxed">{highlight}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
