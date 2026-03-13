import type { AnalysisResult } from '../types';
import type { UserMetrics } from '../components/MetricsForm';

const API_URL = import.meta.env.VITE_API_URL || '';

export async function analyzeListingApi(url: string, metrics: UserMetrics): Promise<AnalysisResult> {
  const response = await fetch(`${API_URL}/api/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, metrics }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Erreur inconnue' }));
    throw new Error(error.error || `Erreur serveur (${response.status})`);
  }

  return response.json();
}
