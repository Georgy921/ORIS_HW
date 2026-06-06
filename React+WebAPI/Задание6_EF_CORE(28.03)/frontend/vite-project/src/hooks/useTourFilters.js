// src/hooks/useTourFilters.js
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFilterConfig } from './useFilterConfig';

export function useTourFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allTours, setAllTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // ✅ Получаем конфиг для динамического маппинга регионов
  const { config } = useFilterConfig();

  useEffect(() => {
    let isMounted = true;
    
    const loadTours = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5152/api/tours');
        
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

  // ✅ Динамический маппинг регион → город из конфига
  const regionToCityMap = useMemo(() => {
    if (!Array.isArray(config)) return {};
    const regionSection = config.find(s => s.id === 'region');
    if (!regionSection?.options) return {};
    const map = {};
    regionSection.options.forEach(opt => {
      map[opt.value] = opt.label; // 'antalya' → 'Анталья'
    });
    return map;
  }, [config]);

  const filteredTours = useMemo(() => {
    if (!allTours || allTours.length === 0) return [];
    
    return allTours.filter(tour => {
      // Поиск по названию
      if (filters.search_bar && !tour.name?.toLowerCase().includes(filters.search_bar.toLowerCase())) {
        return false;
      }

      // Город вылета
      if (filters.from && !tour.departureCity?.toLowerCase().includes(filters.from)) {
        return false;
      }

      // Город прилёта
      if (filters.to && !tour.arrivalCity?.toLowerCase().includes(filters.to)) {
        return false;
      }

      // Дата вылета
      if (filters.departure_date && !tour.departureDate?.toLowerCase().includes(filters.departure_date)) {
        return false;
      }

      // Ночи
      if (filters.nights && tour.nightsCount !== Number(filters.nights)) {
        return false;
      }

      // Взрослые
      if (filters.adults && tour.adultsCount < Number(filters.adults)) {
        return false;
      }

      // ✅ Регион — динамический маппинг из конфига
      if (filters.region) {
        const regions = Array.isArray(filters.region) ? filters.region : [filters.region];
        const cityToKey = Object.fromEntries(
          Object.entries(regionToCityMap).map(([k, v]) => [v, k])
        );
        const tourKey = cityToKey[tour.arrivalCity];
        if (!tourKey || !regions.includes(tourKey)) return false;
      }

      // Цена
      if (filters.price_min && tour.tourPrice < Number(filters.price_min)) return false;
      if (filters.price_max && tour.tourPrice > Number(filters.price_max)) return false;

      // ✅ Популярные фильтры — значение из API "all-inclusive"
      if (filters.popular) {
        const popular = Array.isArray(filters.popular) ? filters.popular : [filters.popular];
        // В API popularFilters может быть строкой или массивом
        let tourFilters = [];
        if (typeof tour.popularFilters === 'string') {
          tourFilters = tour.popularFilters.split(',').map(f => f.trim());
        } else if (Array.isArray(tour.popularFilters)) {
          tourFilters = tour.popularFilters;
        }
        if (!popular.some(p => tourFilters.includes(p))) return false;
      }

      // ✅ Категория отеля (звёзды)
      if (filters.category_hotel) {
        const stars = Array.isArray(filters.category_hotel) ? filters.category_hotel : [filters.category_hotel];
        if (!stars.includes(String(tour.rating))) return false;
      }

      // ✅ Питание — значение из API "ultra-all", "all-inclusive" и т.д.
      if (filters.nutrition) {
        const meals = Array.isArray(filters.nutrition) ? filters.nutrition : [filters.nutrition];
        if (!meals.includes(tour.mealPlan)) return false;
      }

      return true;
    });
  }, [allTours, filters, regionToCityMap]);

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