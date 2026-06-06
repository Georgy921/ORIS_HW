// src/hooks/useTourFilters.js
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useTourFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allTours, setAllTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let isMounted = true;
    
    const loadTours = async () => {
      try {
        setLoading(true);
        const response = await fetch('data/tours.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (isMounted) {
          setAllTours(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to load tours:', err);
          setError(err.message);
          setAllTours([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    loadTours();
    
    return () => { isMounted = false; };
  }, []);

  const filters = useMemo(() => {
    const result = {};
    for (const key of searchParams.keys()) {
      const values = searchParams.getAll(key);
      result[key] = values.length > 1 ? values : values[0];
    }
    return result;
  }, [searchParams]);

  const filteredTours = useMemo(() => {
    if (!allTours || allTours.length === 0) return [];
    
    return allTours.filter(tour => {

      if (filters.from && !tour.departure_city?.toLowerCase().includes(filters.from)) {
        return false;
      }

      if (filters.to && !tour.arrival_city?.toLowerCase().includes(filters.to)) {
        return false;
      }

      if (filters.departure_date && !tour.departure_date?.toLowerCase().includes(filters.departure_date)) {
        return false;
      }

      if (filters.nights && tour.nights_count !== Number(filters.nights)) {
        return false;
      }

      if (filters.adults && tour.adults_count < Number(filters.adults)) {
        return false;
      }
      if (filters.region) {
        const regions = Array.isArray(filters.region) ? filters.region : [filters.region];
        const cityToKey = {
          'Анталья': 'antalya', 'Аланья': 'alanya', 'Кемер': 'kemer',
          'Белек': 'belek', 'Бодрум': 'bodrum', 'Даламан': 'dalaman',
          'Стамбул': 'stambul', 'Фетхие': 'fethie', 'Эрзурум': 'erzurum', 'Сиде': 'side'
        };
        const tourKey = cityToKey[tour.arrival_city];
        if (!tourKey || !regions.includes(tourKey)) return false;
      }

      if (filters.price_min && tour.tour_price < Number(filters.price_min)) return false;
      if (filters.price_max && tour.tour_price > Number(filters.price_max)) return false;

      if (filters.popular) {
        const popular = Array.isArray(filters.popular) ? filters.popular : [filters.popular];
        const tourFilters = (tour.popular_filters || '').split(',').map(f => f.trim());
        if (!popular.some(p => tourFilters.includes(p))) return false;
      }

      if (filters.category_hotel) {
        const stars = Array.isArray(filters.category_hotel) ? filters.category_hotel : [filters.category_hotel];
        if (!stars.includes(String(tour.rating))) return false;
      }

      if (filters.nutrition) {
        const meals = Array.isArray(filters.nutrition) ? filters.nutrition : [filters.nutrition];
        if (!meals.includes(tour.meal_plan)) return false;
      }

      if (filters.search_bar && !tour.name?.toLowerCase().includes(filters.search_bar.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [allTours, filters]); 

  const toggleFilter = useCallback((key, value) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      const current = next.getAll(key);
      if (current.includes(value)) {
        next.delete(key);
        current.filter(v => v !== value).forEach(v => next.append(key, v));
      } else {
        next.append(key, value);
      }
      if (next.getAll(key).length === 0) next.delete(key);
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  const setRangeFilter = useCallback((prefix, min, max) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set(`${prefix}_min`, min ?? '');
      next.set(`${prefix}_max`, max ?? '');
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  const setSearchFilter = useCallback((key, value) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (value) next.set(key, value);
      else next.delete(key);
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  const resetFilters = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  const setSearchField = useCallback((key, value) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (value && value.trim() !== '') {
        next.set(key, value.trim().toLowerCase());
      } else {
        next.delete(key);
      }
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  const setNumericFilter = useCallback((key, value) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      const numValue = Number(value);
      if (numValue > 0) {
        next.set(key, String(numValue));
      } else {
        next.delete(key);
      }
      return next;
    }, { replace: true });
  }, [setSearchParams]);


  return {
    tours: filteredTours,
    allTours,
    filters,
    loading, 
    error,      
    toggleFilter,
    setRangeFilter,
    setSearchFilter,
    resetFilters,
    setSearchField,
    setNumericFilter,
  };
}