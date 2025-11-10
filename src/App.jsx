import React, { useState } from 'react';
import Header from './components/Header.jsx';
import UrlInput from './components/UrlInput.jsx';
import Results from './components/Results.jsx';
import InfoPanel from './components/InfoPanel.jsx';

// Constants based on Sustainable Web Design model
// Energy: ~1.8 kWh per GB transferred
// Carbon intensity: ~442 gCO2 per kWh (global average)
const KWH_PER_GB = 1.8;
const BYTES_PER_GB = 1024 ** 3;
const KWH_PER_BYTE = KWH_PER_GB / BYTES_PER_GB;
const GRID_INTENSITY_G_PER_KWH = 442;

function estimateCO2(bytes, greenHosted) {
  const base = bytes * KWH_PER_BYTE * GRID_INTENSITY_G_PER_KWH; // grams
  const greenFactor = greenHosted ? 0.5 : 1; // simplistic reduction if using green hosting
  return base * greenFactor;
}

function guessGreen(hostname) {
  const greenHosts = ['vercel', 'netlify', 'cloudflare', 'github', 'gitlab', 'render', 'surge', 'firebase', 'pages.dev'];
  return greenHosts.some((h) => hostname.includes(h));
}

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const analyze = async (url) => {
    setLoading(true);
    setResult(null);

    let bytes = 0;
    let greenHosted = false;

    try {
      const { hostname } = new URL(url);
      greenHosted = guessGreen(hostname);

      // Try HEAD first to read Content-Length
      let contentLength = 0;
      try {
        const headRes = await fetch(url, { method: 'HEAD', cache: 'no-store' });
        const len = headRes.headers.get('content-length');
        if (len) contentLength = parseInt(len, 10);
      } catch (_) {
        // ignore
      }

      if (!contentLength) {
        // Try GET and read blob size (may be blocked by CORS)
        try {
          const getRes = await fetch(url, { method: 'GET', cache: 'no-store' });
          const len = getRes.headers.get('content-length');
          if (len) {
            contentLength = parseInt(len, 10);
          } else {
            const blob = await getRes.blob();
            contentLength = blob.size;
          }
        } catch (_) {
          // Final fallback: heuristic average page weight ~ 1.9 MB
          contentLength = 1.9 * 1024 * 1024;
        }
      }

      bytes = contentLength;
    } catch (e) {
      // Malformed URL or other issue
      bytes = 1.9 * 1024 * 1024;
    }

    const co2PerVisit = estimateCO2(bytes, greenHosted);

    const transfers = [
      { label: '1K', visits: 1000, co2: co2PerVisit * 1000 },
      { label: '10K', visits: 10000, co2: co2PerVisit * 10000 },
      { label: '100K', visits: 100000, co2: co2PerVisit * 100000 },
    ];

    const assumptions = [
      'Energy intensity of data transfer ≈ 1.8 kWh/GB',
      'Average grid carbon intensity ≈ 442 gCO₂/kWh',
      'If green hosting is detected, emissions are reduced by 50%',
      'Estimates consider network transfer of the main HTML only; assets, caching, and device energy can change results',
    ];

    setResult({ url, bytes, co2PerVisit, greenHosted, transfers, assumptions });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white text-foreground">
      <Header />

      <main className="max-w-5xl mx-auto px-6">
        <div className="text-center mt-4 mb-8">
          <h2 className="text-xl text-muted-foreground">Measure estimated CO₂ emitted when a page loads</h2>
        </div>

        <UrlInput onAnalyze={analyze} loading={loading} />

        <Results result={result} />

        <InfoPanel />
      </main>

      <footer className="mt-16 py-10 text-center text-xs text-muted-foreground">
        <p>For educational use. Results are estimates based on public models.</p>
      </footer>
    </div>
  );
}
