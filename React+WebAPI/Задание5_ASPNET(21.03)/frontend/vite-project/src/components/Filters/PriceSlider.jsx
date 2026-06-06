// components/Filters/PriceSlider.jsx
import { useState, useEffect, useCallback } from 'react';
import { useFilters } from '../../hooks/useFilters';

export function PriceSlider() {
  const { price, updatePriceRange } = useFilters();
  const [localMin, setLocalMin] = useState(price.min);
  const [localMax, setLocalMax] = useState(price.max);

  const MIN = 0;
  const MAX = 2000000;

  // Форматирование цены
  const formatPrice = (amount) => 
    new Intl.NumberFormat('ru-RU', { 
      style: 'currency', 
      currency: 'RUB', 
      maximumFractionDigits: 0 
    }).format(amount);

  // Debounce для отправки на сервер
  const debouncedUpdate = useCallback(
    ((callback, delay) => {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => callback(...args), delay);
      };
    })((min, max) => updatePriceRange(min, max), 300),
    [updatePriceRange]
  );

  const handleMinChange = (e) => {
    const value = Math.min(parseInt(e.target.value), localMax);
    setLocalMin(value);
    debouncedUpdate(value, localMax);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(parseInt(e.target.value), localMin);
    setLocalMax(value);
    debouncedUpdate(localMin, value);
  };

  // Синхронизация при сбросе фильтров
  useEffect(() => {
    setLocalMin(price.min);
    setLocalMax(price.max);
  }, [price.min, price.max]);

  // Расчет процентов для заполнения полосы
  const minPercent = ((localMin - MIN) / (MAX - MIN)) * 100;
  const maxPercent = ((localMax - MIN) / (MAX - MIN)) * 100;

  return (
    <div className="price-slider-container">
      <div className="price-slider-track">
        <div 
          className="price-slider-fill" 
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        />
      </div>
      
      <input
        type="range"
        min={MIN}
        max={MAX}
        value={localMin}
        onChange={handleMinChange}
        className="slider-input slider-min"
      />
      <input
        type="range"
        min={MIN}
        max={MAX}
        value={localMax}
        onChange={handleMaxChange}
        className="slider-input slider-max"
      />

      <div className="price-values">
        <span>{formatPrice(localMin)}</span>
        <span>{formatPrice(localMax)}</span>
      </div>
    </div>
  );
}