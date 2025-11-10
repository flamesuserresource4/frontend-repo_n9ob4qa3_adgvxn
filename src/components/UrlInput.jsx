import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function UrlInput({ onAnalyze, loading }) {
  const [url, setUrl] = useState('https://example.com');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) return;
    let formatted = url.trim();
    if (!/^https?:\/\//i.test(formatted)) {
      formatted = 'https://' + formatted;
    }
    try {
      new URL(formatted);
      onAnalyze(formatted);
    } catch (e) {
      alert('Please enter a valid URL');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-6">
      <div className="relative flex items-center">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full rounded-xl border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 px-4 py-4 pr-12 text-base outline-none focus:ring-2 ring-emerald-500"
          placeholder="Enter a website URL to analyze"
          aria-label="Website URL"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-1.5 my-1.5 rounded-lg px-4 py-2 bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Analyzing...' : (
            <span className="inline-flex items-center gap-2"><Search size={16} /> Analyze</span>
          )}
        </button>
      </div>
    </form>
  );
}
