import React from 'react';
import { Leaf, Gauge } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full py-8">
      <div className="max-w-5xl mx-auto px-6 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center">
          <Leaf size={22} />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Carbon Emission Tracker</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Gauge size={16} /> Estimate website CO₂ emissions per visit
          </p>
        </div>
      </div>
    </header>
  );
}
