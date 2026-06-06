// src/components/Filters/FiltersSidebar.jsx
import { useState, useEffect } from 'react';
import { useTourFilters } from '../../hooks/useTourFilters';
import { useFilterConfig } from '../../hooks/useFilterConfig';

// ✅ Вспомогательная функция: всегда возвращает массив
const getSelectedValues = (filters, key) => {
  const val = filters[key];
  if (Array.isArray(val)) return val;
  if (val === undefined || val === '') return [];
  return [val];
};

function FilterSection({ section, filters, toggleFilter, setRangeFilter, setSearchFilter, priceConfig }) {
  const [isOpen, setIsOpen] = useState(true);
  const [priceRange, setPriceRange] = useState({
    min: priceConfig?.min ?? 0,
    max: priceConfig?.max ?? 2000000,
  });

  useEffect(() => {
    if (section.type === 'range') {
      setPriceRange({
        min: Number(filters[`${section.id}_min`]) || priceConfig?.min || 0,
        max: Number(filters[`${section.id}_max`]) || priceConfig?.max || 2000000,
      });
    }
  }, [filters, section, priceConfig]);

  const handlePriceChange = (type, value) => {
    const numValue = Number(value);
    const newRange = type === 'min'
      ? { ...priceRange, min: Math.min(numValue, priceRange.max) }
      : { ...priceRange, max: Math.max(numValue, priceRange.min) };
    setPriceRange(newRange);
    setRangeFilter(section.id, newRange.min, newRange.max);
  };

  return (
    <div className={`filter-section ${isOpen ? 'active' : ''}`}>
      <div className='filter-header' onClick={() => setIsOpen(!isOpen)}>
        <h3>{section.title}</h3>
        <img src="src/arrow_down.png" alt="toggle" className={`filter-arrow ${isOpen ? 'rotated' : ''}`} />
      </div>

      {isOpen && (
        <div className='filter-content'>
          {section.type === 'checkbox' && section.options && (
            <div className="filter-group">
              {section.options.map(option => {
                const selected = getSelectedValues(filters, section.id);
                const isChecked = selected.includes(option.value);
                return (
                  <label key={option.value} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleFilter(section.id, option.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                );
              })}
            </div>
          )}

          {section.type === 'range' && (
            <>
              <div className="price-slider-container">
                <div className="price-slider-track">
                  <div className="price-slider-fill" id="priceFill" />
                </div>
                <input
                  type="range"
                  min={priceConfig?.min ?? 0}
                  max={priceConfig?.max ?? 2000000}
                  step={priceConfig?.step ?? 10}
                  id='min-price'
                  value={priceRange.min}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  className="range-input range-min"
                />
                <input
                  type="range"
                  min={priceConfig?.min ?? 0}
                  max={priceConfig?.max ?? 2000000}
                  step={priceConfig?.step ?? 10}
                  id='max-price'
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  className="range-input range-max"
                />
              </div>
              <div className="price-values">
                <span>{priceRange.min.toLocaleString('ru-RU')} {priceConfig?.currency ?? '₽'}</span>
                <span>{priceRange.max.toLocaleString('ru-RU')} {priceConfig?.currency ?? '₽'}</span>
              </div>
            </>
          )}

          {section.type === 'search_hotel' && (
            <input
              type="text"
              placeholder={section.placeholder || "Название отеля"}
              className="search-input"
              value={filters[section.id] || ''}
              onChange={(e) => setSearchFilter(section.id, e.target.value)}
            />
          )}
        </div>
      )}
    </div>
  );
}

export function FiltersSidebar() {
  const {
    filters,
    toggleFilter,
    setRangeFilter,
    setSearchFilter,
    resetFilters,
  } = useTourFilters();

  // ✅ Загружаем конфиг из filters.json через хук
  const { config, loading: configLoading, error: configError } = useFilterConfig();


  const priceConfig = (() => {
    if (!Array.isArray(config)) return { min: 0, max: 2000000, step: 10, currency: '₽' };
    const priceSection = config.find(s => s.id === 'price');
    return {
      min: priceSection?.min ?? 0,
      max: priceSection?.max ?? 2000000,
      step: priceSection?.step ?? 10,
      currency: priceSection?.currency ?? '₽',
    };
  })();

  if (configLoading) {
    return (
      <aside className="sidebar-filters">
        <div className="filters-loading">Загрузка фильтров...</div>
      </aside>
    );
  }

  if (configError) {
    return (
      <aside className="sidebar-filters">
        <div className="filters-error">Ошибка загрузки фильтров: {configError}</div>
      </aside>
    );
  }

  if (!config || !Array.isArray(config)) {
    return (
      <aside className="sidebar-filters">
        <div className="filters-empty">Фильтры недоступны</div>
      </aside>
    );
  }

  return (
    <aside className="sidebar-filters">
      <div className="map-preview">
        <img src="src/maps.png" alt="Карта" className="map-image" />
        <button className="map-button" type="button">Посмотреть на карте</button>
      </div>


      {config.map(section => (
        <FilterSection
          key={section.id}
          section={section}
          filters={filters}
          toggleFilter={toggleFilter}
          setRangeFilter={setRangeFilter}
          setSearchFilter={setSearchFilter}
          priceConfig={priceConfig}
        />
      ))}

      <button className="reset-filters-btn" onClick={resetFilters} type="button">
        Сбросить все фильтры
      </button>
    </aside>
  );
}