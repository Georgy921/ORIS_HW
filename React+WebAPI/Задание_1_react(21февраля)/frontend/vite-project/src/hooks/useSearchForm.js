import { useState, useCallback } from 'react';

export function useSearchForm(initialValues = {}) {
  const [formValues, setFormValues] = useState(initialValues);

  const updateField = useCallback((key, value) => {
    setFormValues(prev => ({ ...prev, [key]: value }));
  }, []);

  // Сброс формы
  const resetForm = useCallback(() => {
    setFormValues(initialValues);
  }, [initialValues]);

  const getValues = useCallback(() => formValues, [formValues]);

  const applyFilters = useCallback((externalSetters) => {
    const { setSearchField, setNumericFilter } = externalSetters;
    
    if (formValues.from) setSearchField('from', formValues.from);
    else setSearchField('from', '');
    
    if (formValues.to) setSearchField('to', formValues.to);
    else setSearchField('to', '');
    
    if (formValues.departure_date) setSearchField('departure_date', formValues.departure_date);
    else setSearchField('departure_date', '');
    
    if (formValues.nights) setNumericFilter('nights', formValues.nights);
    else setNumericFilter('nights', '');
    
    if (formValues.adults) setNumericFilter('adults', formValues.adults);
    else setNumericFilter('adults', '');
  }, [formValues]);

  return {
    formValues,
    updateField,
    resetForm,
    getValues,
    applyFilters,
  };
}

export default useSearchForm