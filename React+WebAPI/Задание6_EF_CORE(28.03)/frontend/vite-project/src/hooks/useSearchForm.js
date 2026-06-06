// src/hooks/useSearchForm.js
import { useState, useCallback } from 'react';

export function useSearchForm(initialValues = {}) {
  // Локальное состояние формы (не синхронизируется с URL сразу)
  const [formValues, setFormValues] = useState(initialValues);

  // Обновление одного поля формы
  const updateField = useCallback((key, value) => {
    setFormValues(prev => ({ ...prev, [key]: value }));
  }, []);

  // Сброс формы
  const resetForm = useCallback(() => {
    setFormValues(initialValues);
  }, [initialValues]);

  // Получение текущих значений
  const getValues = useCallback(() => formValues, [formValues]);

  // Применение фильтров к внешнему хуку (вызывается по кнопке)
  const applyFilters = useCallback((externalSetters) => {
    const { setSearchField, setNumericFilter } = externalSetters;
    
    // Применяем текстовые поля
    if (formValues.from) setSearchField('from', formValues.from);
    else setSearchField('from', '');
    
    if (formValues.to) setSearchField('to', formValues.to);
    else setSearchField('to', '');
    
    if (formValues.departure_date) setSearchField('departure_date', formValues.departure_date);
    else setSearchField('departure_date', '');
    
    // Применяем числовые поля
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