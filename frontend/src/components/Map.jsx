import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN;


function Map({ listing }) {
    const mapContainer = useRef(null);
       useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current, // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: listing.geometry.coordinates, // starting position [lng, lat]
            zoom: 9 // starting zoom
        });

        map.scrollZoom.disable();

        new mapboxgl.Marker({
            color : "#fe246e"
        })
            .setLngLat(listing.geometry.coordinates)
            .setPopup(
                new mapboxgl.Popup({ offset: 20 })
                    .setHTML(`<h6>${listing.title}</h5>
                        <p>${listing.location}</p>`
                    )
            )
            .addTo(map)
    }, [])

    return (
        <div ref={mapContainer}
            style={{ width: "95%", height: "450px", margin: "0.5rem 1rem 2rem 1rem", borderRadius : "1rem"}}
            className="map-container "
        />
    )

};

export default Map;