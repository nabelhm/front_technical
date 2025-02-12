import React, { useEffect, useState } from 'react'
import { PropertyContext } from './PropertyContext'
import { useProperties } from '../hooks/useFetchProperty';

export const PropertyProvider = ({children}) => {
  const { properties, total, currentPage, isLoading } = useProperties(1, {});
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [filters, setFilters] = useState([
    { key: 'bedrooms', value: '' },
    { key: 'propertyType', value: '' },
    { key: 'location', value: '' },
    { key: 'priceRange', value: { min: '', max: '' } },
    { key: 'areaRange', value: { min: '', max: '' } }
  ]);
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    if (!properties) return;

    let filtered = properties.filter((property) => {
      return filters.every((filter) => {
        if (!filter.value || filter.value === '') return true;

        if (filter.key === 'priceRange') {
          const { min, max } = filter.value;
          return (!min || property.price >= Number(min)) && 
                 (!max || property.price <= Number(max));
        }

        if (filter.key === 'areaRange') {
          const { min, max } = filter.value;
          return (!min || property.area >= Number(min)) && 
                 (!max || property.area <= Number(max));
        }

        return property[filter.key] == filter.value;
      });
    });

    // Aplicar ordenamiento
    if (sortOption) {
      const [field, direction] = sortOption.split('-');
      filtered = [...filtered].sort((a, b) => {
        if (direction === 'asc') {
          return a[field] - b[field];
        } else {
          return b[field] - a[field];
        }
      });
    }

    setFilteredProperties(filtered);
  }, [filters, properties, sortOption]);

  // useEffect(() => {
  //   if (!properties) return;

  //   setFilteredProperties(
  //     properties.filter((property) => {
  //       return filters.every((filter) => {
  //         if (!filter.value || filter.value === '') return true;

  //         if (filter.key === 'priceRange') {
  //           const { min, max } = filter.value;
  //           return (!min || property.price >= Number(min)) && 
  //                  (!max || property.price <= Number(max));
  //         }

  //         if (filter.key === 'areaRange') {
  //           const { min, max } = filter.value;
  //           return (!min || property.area >= Number(min)) && 
  //                  (!max || property.area <= Number(max));
  //         }

  //         return property[filter.key] == filter.value;
  //       });
  //     })
  //   );
  // }, [filters, properties]);
  
  return (
    <PropertyContext.Provider value={{ 
      properties, 
      filteredProperties, 
      total, 
      currentPage, 
      isLoading,
      filters,
      setFilters,
      sortOption,
      setSortOption 
    }}>
      {children}
    </PropertyContext.Provider>
  )
}