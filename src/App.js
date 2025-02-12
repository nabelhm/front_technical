import { useState } from "react";
import "./App.css";
import { PropertyGrid } from "./components/PropertyGrid";
import { PropertyFilterForm } from "./components/PropertyFilterForm";
import { PropertySortBar } from "./components/PropertySortBar";
import { PropertyMap } from "./components/PropertyMap";
import { ViewToggle } from "./components/ViewToggle";

/*
Real Estate Technical Assessment (60 minutes)

OBJECTIVE:
Create a property explorer application that allows users to search, filter, 
and view real estate properties.

API ENDPOINTS:
- GET /api/properties - List all properties (supports pagination & filters)
- GET /api/properties/{id} - Get property details
- GET /api/locations - Get available locations/neighborhoods

REQUIREMENTS:

1. Property Grid/List View
   - Display properties in a responsive grid ok
   - Show key information: image, price, location, bedrooms, area ok
   - Implement loading states
   - Handle errors gracefully

2. Filtering System
   - Price range
   - Number of bedrooms
   - Property type (House, Apartment, etc.)
   - Location/neighborhood
   - Area range

3. Map View
   - Toggle between grid and map views
   - Show property markers on map
   - Basic marker clustering for dense areas
   - Property preview on marker click

4. Search & Sort
   - Search by location or property features
   - Sort by price (asc/desc)
   - Sort by date listed

BONUS:
- URL params for filter state
- Responsive design
- Performance optimizations
- Clean code architecture
- TypeScript usage

Good luck!
*/

function App() {
    const [view, setView] = useState("grid");

    return (
        <div className="App">
            <header className="header">
                <h1>Property Explorer</h1>
            </header>

            <main className="main-content">
                <aside className="filters-panel">
                    <PropertyFilterForm />
                </aside>

                <section className="properties-view">
                    <div className="view-toggle"><ViewToggle view={view} setView={setView} /></div>
                    {view === "grid" ? (
                        <div className="content-area d-flex flex-column">
                                <PropertySortBar />
                                <PropertyGrid />
                        </div>
                    ) : (
                        <div className="content-area d-flex flex-column">
                            <PropertyMap />
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default App;
