// src/components/Filters/FiltersSidebar.jsx
import { useState, useEffect } from 'react';
import { useTourFilters } from '../../hooks/useTourFilters';

// ✅ Вспомогательная функция: всегда возвращает массив
const getSelectedValues = (filters, key) => {
  const val = filters[key];
  if (Array.isArray(val)) return val;
  if (val === undefined || val === '') return [];
  return [val];
};

function FilterSection({ section, filters, toggleFilter, setRangeFilter, setSearchFilter }) {
  const [isOpen, setIsOpen] = useState(true);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000000 });

  useEffect(() => {
    if (section.type === 'range') {
      setPriceRange({
        min: Number(filters[`${section.id}_min`]) || 0,
        max: Number(filters[`${section.id}_max`]) || 2000000,
      });
    }
  }, [filters, section]);

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
                  <div className="price-slider-fill" id="priceFill"/>
                </div>
                <input type="range" min="0" id='min-price' max="2000000" value={priceRange.min} onChange={(e) => handlePriceChange('min', e.target.value)} className="range-input range-min" />
                <input type="range" min="0" id='max-price' max="2000000" value={priceRange.max} onChange={(e) => handlePriceChange('max', e.target.value)} className="range-input range-max" />
              </div>
              <div className="price-values">
                <span>{priceRange.min.toLocaleString('ru-RU')} ₽</span>
                <span>{priceRange.max.toLocaleString('ru-RU')} ₽</span>
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
  const { tours, filters, toggleFilter, setRangeFilter, setSearchFilter, resetFilters } = useTourFilters();

  const filterConfig = [
    {
      id: 'popular',
      title: 'Популярные фильтры',
      type: 'checkbox',
      options: [
        { value: 'all-inclusive', label: 'Все включено' },
        { value: 'wi-fi', label: 'Бесплатный Wi-Fi' },
        { value: 'first-line', label: '1-я линия' },
        { value: 'beach', label: 'Пляжный отдых'},
        { value: 'regular-flight', 'label': "Регулярный перелет" }
      ],
    },
    {
      id: 'price',
      title: 'Стоимость',
      type: 'range',
      min: 0,
      max: 2000000,
      step: 10,
    },
    {
      id: 'search_bar',
      title: 'Поиск отеля',
      type: 'search_hotel',
      placeholder: 'Название отеля'
    },
    {
      id: 'region',
      title: 'Регионы и курорты',
      type: 'checkbox',
      options: [
        { value: 'antalya', label: 'Анталья' },
        { value: 'alanya', label: 'Аланья' },
        { value: 'kemer', label: 'Кемер' },
        { value: 'belek', label: 'Белек' },
        { value: 'bodrum', label: 'Бодрум' },
        { value: 'dalaman', label: 'Даламан' },
        { value: 'stambul', label: 'Стамбул' },
        { value: 'fethie', label: 'Фетхие' },
        { value: 'erzurum', label: 'Эрзурум' },
        { value: 'side', label: 'Сиде'}
      ],
    },
    {
      id: 'category_hotel',
      title: 'Категория отеля',
      type: 'checkbox',
      options: [
        { value: '5', label: '5★' },
        { value: '4', label: '4★' },
        { value: '3', label: '3★' },
        { value: '2', label: '2★' },
        { value: '1', label: '1★' }
      ]
    },
    {
      id: 'nutrition',
      title: 'Питание',
      type: 'checkbox',
      options: [
        { value: 'ultra_all', label: 'Ультра все включено' },
        { value: 'all', label: 'Все включено' },
        { value: 'breakfest', label: 'Завтрак' },
        { value: 'without_food', label: 'Без питания' },
        { value: 'pansion', label: 'Полупансион' },
        { value: 'full_pansion', label: 'Полный пансион' },
      ]
    }
  ];

  return (
    <aside className="sidebar-filters">
      <div className="map-preview">
        <img src="src/maps.png" alt="Карта" className="map-image" />
        <button className="map-button" type="button">Посмотреть на карте</button>
      </div>

      {filterConfig.map(section => (
        <FilterSection
          key={section.id}
          section={section}
          filters={filters}
          toggleFilter={toggleFilter}
          setRangeFilter={setRangeFilter}
          setSearchFilter={setSearchFilter}
        />
      ))}

      <button className="reset-filters-btn" onClick={resetFilters} type="button">
        Сбросить все фильтры
      </button>
    </aside>
  );
}