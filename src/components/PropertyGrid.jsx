import { useContext } from "react";
import { PropertyCard } from "./PropertyCard";
import { PropertyContext } from "../context/PropertyContext";
import { Spinner } from "./Spinner";

export const PropertyGrid = () => {
    const { filteredProperties, total, currentPage, isLoading } = useContext(PropertyContext);
    
    return (
        isLoading ? <Spinner /> :
        <div className="content-area">
            {filteredProperties?.map((property) => (
                <div key={property.id} className="col">
                    <PropertyCard property={property} />
                </div>
            ))}
        </div>
    );
};
