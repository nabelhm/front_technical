import React, { useContext } from 'react';
import { useForm } from '../hooks/useForm';
import { PropertyContext } from '../context/PropertyContext';

export const PropertyFilterForm = () => {
  const { setFilters } = useContext(PropertyContext);

  const { formState, onInputChange, onResetForm } = useForm({
    bedrooms: '',
    propertyType: '',
    location: '',
    priceMin: '',
    priceMax: '',
    areaMin: '',
    areaMax: ''
  });

  const { 
    bedrooms, 
    propertyType, 
    location, 
    priceMin, 
    priceMax,
    areaMin,
    areaMax 
  } = formState;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newFilters = [
      { key: 'bedrooms', value: bedrooms },
      { key: 'propertyType', value: propertyType },
      { key: 'location', value: location },
      { key: 'priceRange', value: { min: priceMin, max: priceMax } },
      { key: 'areaRange', value: { min: areaMin, max: areaMax } }
    ];

    setFilters(newFilters);
  };

  const handleReset = () => {
    onResetForm();
    setFilters([
      { key: 'bedrooms', value: '' },
      { key: 'propertyType', value: '' },
      { key: 'location', value: '' },
      { key: 'priceRange', value: { min: '', max: '' } },
      { key: 'areaRange', value: { min: '', max: '' } }
    ]);
  };

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* Bedrooms */}
          <div className="mb-3">
            <label className="form-label">Habitaciones</label>
            <select
              className="form-select"
              name="bedrooms"
              value={bedrooms}
              onChange={onInputChange}
            >
              <option value="">Todas</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4+</option>
            </select>
          </div>

          {/* Property Type */}
          <div className="mb-3">
            <label className="form-label">Tipo de propiedad</label>
            <select
              className="form-select"
              name="propertyType"
              value={propertyType}
              onChange={onInputChange}
            >
              <option value="">Todos</option>
              <option value="House">Casa</option>
              <option value="Apartment">Apartamento</option>
              <option value="Penthouse">Ático</option>
              <option value="Villa">Chalet</option>
              <option value="Duplex">Dúplex</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="mb-3">
            <label className="form-label">Rango de precio</label>
            <div className="row g-2">
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Min €"
                  name="priceMin"
                  value={priceMin}
                  onChange={onInputChange}
                />
              </div>
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Max €"
                  name="priceMax"
                  value={priceMax}
                  onChange={onInputChange}
                />
              </div>
            </div>
          </div>

          {/* Area Range */}
          <div className="mb-3">
            <label className="form-label">Rango de superficie (m²)</label>
            <div className="row g-2">
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Min m²"
                  name="areaMin"
                  value={areaMin}
                  onChange={onInputChange}
                />
              </div>
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Max m²"
                  name="areaMax"
                  value={areaMax}
                  onChange={onInputChange}
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Aplicar filtros
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleReset}
            >
              Limpiar filtros
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};