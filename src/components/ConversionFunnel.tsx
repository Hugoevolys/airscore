import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Lightbulb, Search, Eye, MousePointerClick, CalendarCheck } from 'lucide-react';
import type { ConversionFunnel as ConversionFunnelType } from '../types';

interface ConversionFunnelProps {
  funnel: ConversionFunnelType;
  globalScore?: number;
}

const STATUS_COLORS = {
  fort: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', label: 'Fort' },
  moyen: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30', label: 'Moyen' },
  faible: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', label: 'Faible' },
};

function FunnelStepCard({
  icon: Icon,
  title,
  rate,
  status,
  diagnosis,
  fix,
  index,
}: {
  icon: typeof Search;
  title: string;
  rate: number;
  status: 'fort' | 'moyen' | 'faible';
  diagnosis: string;
  fix: string;
  index: number;
}) {
  const colors = STATUS_COLORS[status];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 + index * 0.15 }}
      className="relative"
    >
      {/* Connector line */}
      {index < 3 && (
        <div className="absolute left-6 top-full w-0.5 h-4 bg-white/10 z-0" />
      )}

      <div className={`glass-card rounded-xl p-5 border ${colors.border}`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${colors.text}`} />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">{title}</h4>
              <span className={`text-xs font-medium ${colors.text} ${colors.bg} px-2 py-0.5 rounded-full`}>
                {colors.label}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${colors.text}`}>
              {rate}%
            </div>
            <div className="text-white/30 text-xs">donnée réelle</div>
          </div>
        </div>

        <p className="text-white/60 text-sm mb-2 leading-relaxed">{diagnosis}</p>

        {status !== 'fort' && (
          <div className="flex items-start gap-2 mt-3 pt-3 border-t border-white/5">
            <span className="text-coral text-xs mt-0.5">→</span>
            <p className="text-coral/90 text-xs leading-relaxed">{fix}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function ConversionFunnel({ funnel, globalScore = 0 }: ConversionFunnelProps) {
  const steps = [
    {
      icon: Search,
      title: 'Impressions en 1ère page',
      rate: funnel.search_impressions.rate,
      status: funnel.search_impressions.status,
      diagnosis: funnel.search_impressions.diagnosis,
      fix: funnel.search_impressions.fix,
    },
    {
      icon: MousePointerClick,
      title: 'Recherche → Consultation',
      rate: funnel.search_to_click.rate,
      status: funnel.search_to_click.status,
      diagnosis: funnel.search_to_click.diagnosis,
      fix: funnel.search_to_click.fix,
    },
    {
      icon: CalendarCheck,
      title: 'Consultation → Réservation',
      rate: funnel.click_to_booking.rate,
      status: funnel.click_to_booking.status,
      diagnosis: funnel.click_to_booking.diagnosis,
      fix: funnel.click_to_booking.fix,
    },
  ];

  // Determine tone based on global score
  const isExcellent = globalScore >= 8;
  const isGood = globalScore >= 6;

  const insightConfig = isExcellent
    ? {
        border: 'border-green-500/30',
        bg: 'bg-green-500/5',
        icon: CheckCircle,
        iconColor: 'text-green-400',
        titleColor: 'text-green-400',
        title: 'Synthèse du funnel',
      }
    : isGood
      ? {
          border: 'border-yellow-500/30',
          bg: 'bg-yellow-500/5',
          icon: Lightbulb,
          iconColor: 'text-yellow-400',
          titleColor: 'text-yellow-400',
          title: 'Axe d\'optimisation principal',
        }
      : {
          border: 'border-coral/20',
          bg: 'bg-coral/5',
          icon: AlertTriangle,
          iconColor: 'text-coral',
          titleColor: 'text-coral',
          title: 'Point critique identifié',
        };

  const InsightIcon = insightConfig.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
        <span className="text-xl">🔬</span>
        Diagnostic de Conversion
      </h2>

      {/* Funnel steps */}
      <div className="space-y-4 mb-4">
        {steps.map((step, i) => (
          <FunnelStepCard key={step.title} {...step} index={i} />
        ))}
      </div>

      {/* Funnel insight — tone adapts to score */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className={`glass-card rounded-xl p-4 border ${insightConfig.border} ${insightConfig.bg}`}
      >
        <div className="flex items-start gap-3">
          <InsightIcon className={`w-5 h-5 ${insightConfig.iconColor} shrink-0 mt-0.5`} />
          <div>
            <h4 className={`${insightConfig.titleColor} font-semibold text-sm mb-1`}>{insightConfig.title}</h4>
            <p className="text-white/70 text-sm leading-relaxed">{funnel.funnel_insight}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
