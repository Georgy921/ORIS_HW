import { useCallback } from 'react'; 
import { useSearchForm } from '../../hooks/useSearchForm'; 
import { useTourFilters } from '../../hooks/useTourFilters';
function FilterSearch(){
    
    
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
      
    return (
        <>
            <div className="search-form-container">
                <form className="search-form" onSubmit={(e) => { e.preventDefault(); handleSearchSubmit(); }}>
                
                {/* Откуда */}
                <div className="search-field-wrapper">
                    <label className="floating-label">Откуда</label>
                    <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Город вылета"
                    value={formValues.from}  // ✅ Локальное состояние
                    onChange={(e) => updateField('from', e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{ borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }} 
                    />
                </div>
                <div className="search-field-wrapper">
                    <label className="floating-label">Куда</label>
                    <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Курорт"
                    value={formValues.to}
                    onChange={(e) => updateField('to', e.target.value)}
                    onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="search-field-wrapper">
                    <label className="floating-label">Дата вылета</label>
                    <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Например: 5 мар."
                    value={formValues.departure_date}
                    onChange={(e) => updateField('departure_date', e.target.value)}
                    onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="search-field-wrapper">
                    <label className="floating-label">Длительность</label>
                    <input 
                    type="number" 
                    className="input-field" 
                    placeholder="Ночей"
                    min="1"
                    max="30"
                    value={formValues.nights}
                    onChange={(e) => updateField('nights', e.target.value)}
                    onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="search-field-wrapper">
                    <label className="floating-label">Кто едет</label>
                    <input 
                    type="number" 
                    className="input-field" 
                    placeholder="Взрослых"
                    min="1"
                    max="10"
                    value={formValues.adults}
                    onChange={(e) => updateField('adults', e.target.value)}
                    onKeyDown={handleKeyDown}
                    />
                </div>

                <button className="search-btn" type="submit">
                    {loading ? 'Поиск...' : 'Найти'}
                </button>
                </form>
            </div>

        </>
    );
}
export default FilterSearch;