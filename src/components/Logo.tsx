import { Home, Star } from 'lucide-react';

export function Logo({ size = 'lg' }: { size?: 'sm' | 'lg' }) {
  const isLg = size === 'lg';

  return (
    <div className="flex items-center gap-2">
      <div
        className={`relative flex items-center justify-center ${
          isLg ? 'w-10 h-10' : 'w-8 h-8'
        } rounded-xl bg-gradient-to-br from-coral to-[#FF8A5C]`}
      >
        <Home className={`${isLg ? 'w-5 h-5' : 'w-4 h-4'} text-white`} />
        <Star
          className={`absolute ${
            isLg ? '-top-1 -right-1 w-3.5 h-3.5' : '-top-0.5 -right-0.5 w-3 h-3'
          } text-coral fill-coral`}
        />
      </div>
      <span
        className={`font-bold ${isLg ? 'text-2xl' : 'text-xl'} text-white`}
      >
        Air
        <span className="text-coral">Score</span>
      </span>
    </div>
  );
}
