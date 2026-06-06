// src/pages/ToursPage.jsx (или App.jsx)
import { useState, useEffect, useCallback } from 'react';
import AuthModal from '../components/AuthModal/AuthModal';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
// import TourCard from '../components/TourCard/TourCard'; // Не нужен здесь, он внутри ToursSlider
import { FiltersSidebar } from '../components/Filters/FiltersSidebar';
import ToursSlider from '../components/TourCard/ToursSlider'; // Проверьте путь!
import { useTourFilters } from '../hooks/useTourFilters'; // ✅ Импортируем хук
import { useSearchForm } from '../hooks/useSearchForm';
import FilterSearch from '../components/Filters/FiltersSearch';


function ToursPage() {
  const { 
    setSearchField, 
    setNumericFilter,
    loading, 
    error 
  } = useTourFilters();

  const { 
    formValues, 
    updateField, 
    resetForm, 
    applyFilters 
  } = useSearchForm({
    from: '',
    to: '',
    departure_date: '',
    nights: '',
    adults: ''
  });

  const handleSearchSubmit = useCallback(() => {
    applyFilters({ setSearchField, setNumericFilter });
  }, [applyFilters, setSearchField, setNumericFilter]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  }, [handleSearchSubmit]);

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>
        <h2>Ошибка: {error}</h2>
        <button onClick={() => window.location.reload()}>Попробовать снова</button>
      </div>
    );
  }

  return (
    <div className="main-wrapper">
      <Header />
      <FilterSearch/>
      <div className="page-layout">
        <aside className="sidebar-column">
          <FiltersSidebar />
        </aside>
        <main className="content-column">
          <ToursSlider />
        </main>
      </div>

      <Footer />
      <AuthModal />
    </div>
  );
}

export default ToursPage;