import React from 'react';
import { Info } from 'lucide-react';

export default function InfoPanel() {
  return (
    <section className="max-w-3xl mx-auto px-6 mt-10 text-sm text-muted-foreground">
      <div className="rounded-2xl border p-5 bg-background/60 backdrop-blur">
        <div className="flex items-start gap-2">
          <Info size={18} className="mt-0.5" />
          <div>
            <p>
              Estimates are based on total page weight and typical energy intensity of data transfer. If a site uses renewable-powered hosting, emissions are reduced.
            </p>
            <p className="mt-2">
              Want more accuracy? Measure with real network requests and include user devices, caching, and time-on-page.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
