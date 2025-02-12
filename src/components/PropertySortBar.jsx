import { useContext } from "react";
import { PropertyContext } from "../context/PropertyContext";

export const PropertySortBar = () => {
    const { setSortOption } = useContext(PropertyContext);
  
    const handleSortChange = (e) => {
      setSortOption(e.target.value);
    };
  
    return (
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="d-flex align-items-center gap-3">
            <label className="text-nowrap mb-0">Ordenar por:</label>
            <select 
              className="form-select" 
              onChange={handleSortChange}
              defaultValue=""
            >
              <option value="">Por defecto</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="area-asc">Área: Menor a Mayor</option>
              <option value="area-desc">Área: Mayor a Menor</option>
              <option value="bedrooms-asc">Habitaciones: Menor a Mayor</option>
              <option value="bedrooms-desc">Habitaciones: Mayor a Menor</option>
            </select>
          </div>
        </div>
      </div>
    );
  };