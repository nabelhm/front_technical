export const PropertyCard = ({ property }) => {
    const { 
      title, 
      price, 
      location, 
      image = 'https://placehold.co/600x400', 
      bedrooms, 
      area,
      features 
    } = property;
  
    const formatPrice = (price) => {
      return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(price).replace('EUR', '€');
    };
  
    return (
      <div className="card h-100 shadow-sm border-0 m-2">
        <img 
          src={image} 
          className="card-img-top" 
          alt={title}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title text-truncate">{title}</h5>
          <p className="card-text text-primary fw-bold fs-4">
            {formatPrice(price)}
          </p>
          <p className="card-text text-truncate text-muted mb-2">
            <i className="bi bi-geo-alt-fill me-1"></i>
            {location}
          </p>
          <div className="d-flex justify-content-between text-muted">
            <small>
              <i className="bi bi-door-open me-1"></i>
              {bedrooms} hab.
            </small>
            <small>
              <i className="bi bi-rulers me-1"></i>
              {area}m²
            </small>
          </div>
          <div className="d-flex justify-content-between text-muted">
            {features.map((feature) => (
                <small key={feature} className="me-2">
                    <i className="bi bi-check2-circle me-1"></i>
                    {feature}
                </small>
            ))}
          </div>
        </div>
        <div className="card-footer bg-white border-top-0">
          <button className="btn btn-outline-primary w-100">
            Ver detalles
          </button>
        </div>
      </div>
    );
  };