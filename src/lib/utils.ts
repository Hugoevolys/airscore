import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getScoreColor(score: number): string {
  if (score < 5) return '#EF4444'; // red
  if (score <= 7) return '#F59E0B'; // orange
  return '#22C55E'; // green
}

export function getScoreLabel(score: number): string {
  if (score < 4) return 'Insuffisant';
  if (score < 5) return 'Passable';
  if (score < 6) return 'Correct';
  if (score < 7) return 'Bon';
  if (score < 8) return 'Très bon';
  if (score < 9) return 'Excellent';
  return 'Exceptionnel';
}

export function getPriorityBadge(priority: string): { label: string; color: string; emoji: string } {
  switch (priority) {
    case 'urgent':
      return { label: 'Urgent', color: 'bg-red-500/20 text-red-400 border-red-500/30', emoji: '🔴' };
    case 'important':
      return { label: 'Important', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', emoji: '🟡' };
    default:
      return { label: 'Bonus', color: 'bg-green-500/20 text-green-400 border-green-500/30', emoji: '🟢' };
  }
}

export function getEffortBadge(effort: string): { label: string; color: string } {
  switch (effort) {
    case 'facile':
      return { label: 'Facile', color: 'bg-emerald-500/20 text-emerald-400' };
    case 'moyen':
      return { label: 'Moyen', color: 'bg-amber-500/20 text-amber-400' };
    default:
      return { label: 'Difficile', color: 'bg-red-500/20 text-red-400' };
  }
}

export function normalizeUrl(url: string): string {
  let normalized = url.trim();
  if (!/^https?:\/\//i.test(normalized)) {
    normalized = 'https://' + normalized;
  }
  return normalized;
}

export function isValidAirbnbUrl(url: string): boolean {
  try {
    const parsed = new URL(normalizeUrl(url));
    return parsed.hostname.includes('airbnb');
  } catch {
    return false;
  }
}
