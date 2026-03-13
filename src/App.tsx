import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { AnalysisResult } from './types';
import { Landing } from './components/Landing';
import { MetricsForm, type UserMetrics } from './components/MetricsForm';
import { LoadingScreen } from './components/LoadingScreen';
import { Dashboard } from './components/Dashboard';
import { ErrorScreen } from './components/ErrorScreen';
import { Footer } from './components/Footer';
import { analyzeListingApi } from './lib/api';

type AppState = 'landing' | 'metrics' | 'loading' | 'results' | 'error';

export default function App() {
  const [state, setState] = useState<AppState>('landing');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>('');
  const [analyzedUrl, setAnalyzedUrl] = useState('');

  const handleUrlSubmit = useCallback((url: string) => {
    setAnalyzedUrl(url);
    setState('metrics');
  }, []);

  const handleMetricsSubmit = useCallback(async (metrics: UserMetrics) => {
    setState('loading');
    setError('');

    try {
      const data = await analyzeListingApi(analyzedUrl, metrics);
      setResult(data);
      setState('results');
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue.');
      setState('error');
    }
  }, [analyzedUrl]);

  const handleReset = useCallback(() => {
    setState('landing');
    setResult(null);
    setError('');
    setAnalyzedUrl('');
  }, []);

  const handleBackToUrl = useCallback(() => {
    setState('landing');
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <AnimatePresence mode="wait">
          {state === 'landing' && (
            <Landing key="landing" onAnalyze={handleUrlSubmit} />
          )}
          {state === 'metrics' && (
            <MetricsForm
              key="metrics"
              url={analyzedUrl}
              onSubmit={handleMetricsSubmit}
              onBack={handleBackToUrl}
            />
          )}
          {state === 'loading' && (
            <LoadingScreen key="loading" url={analyzedUrl} />
          )}
          {state === 'results' && result && (
            <Dashboard key="dashboard" result={result} onReset={handleReset} />
          )}
          {state === 'error' && (
            <ErrorScreen key="error" message={error} onRetry={handleReset} />
          )}
        </AnimatePresence>
      </div>
      {state !== 'metrics' && state !== 'results' && <Footer />}
    </div>
  );
}
