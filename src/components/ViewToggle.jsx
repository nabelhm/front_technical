export const ViewToggle = ({ view, setView }) => {
    return (
      <div className="d-flex justify-content-end mb-3">
        <div className="btn-group" role="group" aria-label="View toggle">
          <button 
            type="button" 
            className={`btn ${view === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setView('grid')}
          >
            <i className="bi bi-grid-3x3-gap-fill me-2"></i>
            Grid
          </button>
          <button 
            type="button" 
            className={`btn ${view === 'map' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setView('map')}
          >
            <i className="bi bi-map-fill me-2"></i>
            Mapa
          </button>
        </div>
      </div>
    );
  };