// src/hooks/useFilterConfig.js
import { useState, useEffect } from 'react';

export function useFilterConfig() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadConfig() {
      try {
        const response = await fetch('/data/filters.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!cancelled) {
          setConfig(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
          console.error('Failed to load filters config:', err);
        }
      }
    }

    loadConfig();
    return () => { cancelled = true; };
  }, []);

  return { config, loading, error };
}