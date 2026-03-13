import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import type { ActionItem } from '../types';
import { getPriorityBadge, getEffortBadge } from '../lib/utils';

interface ActionPlanProps {
  actions: ActionItem[];
}

export function ActionPlan({ actions }: ActionPlanProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="glass-card rounded-2xl p-6 sm:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <Target className="w-6 h-6 text-coral" />
        <h2 className="text-xl font-bold text-white">Plan d'Action Prioritaire</h2>
      </div>

      <div className="space-y-4">
        {actions.map((action, i) => {
          const priority = getPriorityBadge(action.priority);
          const effort = getEffortBadge(action.effort);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="flex flex-col sm:flex-row sm:items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
            >
              {/* Number */}
              <div className="flex items-center gap-3 sm:flex-shrink-0">
                <span className="w-7 h-7 rounded-full bg-coral/20 text-coral text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm mb-2">{action.action}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${priority.color}`}
                  >
                    {priority.emoji} {priority.label}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${effort.color}`}
                  >
                    {effort.label}
                  </span>
                </div>
                <p className="text-white/40 text-xs">{action.impact}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
