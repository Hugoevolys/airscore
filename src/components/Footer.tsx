import { Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-6 text-center">
      <div className="flex items-center justify-center gap-2 text-white/30 text-sm">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Propulsé par Claude AI</span>
      </div>
    </footer>
  );
}
