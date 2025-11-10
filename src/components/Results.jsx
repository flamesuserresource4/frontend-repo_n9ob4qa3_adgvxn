import React from 'react';
import { Leaf, Link as LinkIcon, Database } from 'lucide-react';

function formatGrams(g) {
  if (g < 1) return `${(g * 1000).toFixed(0)} mg`;
  if (g < 1000) return `${g.toFixed(2)} g`;
  const kg = g / 1000;
  return `${kg.toFixed(2)} kg`;
}

export default function Results({ result }) {
  if (!result) return null;
  const {
    url,
    bytes,
    co2PerVisit,
    greenHosted,
    transfers,
    assumptions
  } = result;

  return (
    <section className="max-w-5xl mx-auto px-6 mt-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border p-6 bg-background/60 backdrop-blur">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Per-visit Emissions</h3>
            <Leaf className={greenHosted ? 'text-emerald-600' : 'text-amber-600'} size={18} />
          </div>
          <p className="text-3xl font-bold mt-2">{formatGrams(co2PerVisit)}</p>
          <p className="text-sm text-muted-foreground">Estimated CO₂ emitted to load this page once.</p>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Approx. data transferred: <span className="font-medium text-foreground">{(bytes/1024/1024).toFixed(2)} MB</span></p>
            <p>Green hosting detected: <span className={greenHosted ? 'text-emerald-600 font-medium' : 'text-amber-600 font-medium'}>{greenHosted ? 'Yes' : 'No'}</span></p>
          </div>
        </div>

        <div className="rounded-2xl border p-6 bg-background/60 backdrop-blur">
          <h3 className="font-semibold flex items-center gap-2"><Database size={18}/> Traffic Scenarios</h3>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            {transfers.map((t) => (
              <div key={t.label} className="rounded-xl border p-4">
                <p className="text-sm text-muted-foreground">{t.label}</p>
                <p className="text-xl font-semibold">{formatGrams(t.co2)}</p>
                <p className="text-xs text-muted-foreground">{t.visits.toLocaleString()} visits</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border p-6 bg-background/60 backdrop-blur mt-6">
        <h3 className="font-semibold flex items-center gap-2"><LinkIcon size={18}/> Analyzed URL</h3>
        <a href={url} target="_blank" rel="noreferrer" className="text-emerald-600 underline break-all">{url}</a>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Assumptions:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            {assumptions.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
