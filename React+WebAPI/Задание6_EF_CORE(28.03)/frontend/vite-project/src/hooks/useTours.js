// hooks/useTours.js
import { useState, useCallback } from 'react';
import { toursApi } from '../services/api'; // ваш API-клиент

export function useTours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTours = useCallback(async (filtersPayload) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await toursApi.filter(filtersPayload);
      setTours(response.data.tours || []);
      return response.data;
    } catch (err) {
      console.error('[Filter Sync ERROR]', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { tours, loading, error, loadTours };
}

export default useTours