import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './PropertyMap.css';
import { useContext, useEffect, useRef } from 'react';
import { PropertyContext } from '../context/PropertyContext';

export const PropertyMap = () => {
  const { filteredProperties } = useContext(PropertyContext);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  useEffect(() => {
    // Centro de Madrid
    const madrid = [40.4168, -3.7038];

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(madrid, 13);

      // Añadir capa de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);

      // Crear capa para los marcadores
      markersLayerRef.current = L.layerGroup().addTo(mapInstanceRef.current);
    }

    // Actualizar marcadores cuando cambien las propiedades
    if (filteredProperties && markersLayerRef.current) {
      // Limpiar marcadores anteriores
      markersLayerRef.current.clearLayers();

      // Crear bounds para ajustar el zoom
      const bounds = L.latLngBounds();

      filteredProperties.forEach(property => {
        // Crear marcador personalizado
        const marker = L.marker([property.lat, property.lng], {
          icon: L.divIcon({
            className: 'custom-marker',
            html: `<div class="marker-price">${property.price.toLocaleString()}€</div>`,
          })
        });

        // Contenido del popup
        const popupContent = `
          <div class="property-popup">
            <img src="${property.image}" alt="${property.location}" 
                 class="popup-image"/>
            <div class="popup-content">
              <h6>${property.location}</h6>
              <p class="price">${property.price.toLocaleString()}€</p>
              <p>${property.bedrooms} hab. | ${property.area}m²</p>
              <p>${property.propertyType}</p>
            </div>
          </div>
        `;

        // Añadir popup al marcador
        marker.bindPopup(popupContent);
        
        // Añadir marcador a la capa
        marker.addTo(markersLayerRef.current);
        
        // Extender los bounds
        bounds.extend([property.lat, property.lng]);
      });

      // Ajustar el mapa para mostrar todos los marcadores
    //   if (!bounds.isEmpty()) {
    //     mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
    //   }
    }

    // Cleanup al desmontar
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [filteredProperties]);

  return (
    <div className="card shadow-sm border-0">
      <div 
        ref={mapRef} 
        style={{ width: '100%', height: '600px' }}
      />
    </div>
  );
};
