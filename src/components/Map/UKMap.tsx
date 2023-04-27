import React from "react";
import './Map.scss';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps"

const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

export default function MapChart() {
    const cities = [
        { name: "London", coordinates: [-0.118092, 51.509865] },
        { name: "India", coordinates: [78.9629, 20.5937] },
        { name: "Sydney", coordinates: [151.2164539, -33.8548157] },
        { name: "United States", coordinates: [37.0902, 95.7129] }
    ];
    return (
        <div className="map-container">
            <ComposableMap>
                <ZoomableGroup center={[0, 0]} zoom={0.75}>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            // geographies.filter(geo => geo.properties.name === "United Kingdom").map(geo => (
                            geographies.map((geo) => (
                                <Geography key={geo.rsmKey} geography={geo} fill="#EAEAEC"
                                    stroke="#D6D6DA" />
                            ))
                        }
                    </Geographies>
                    {cities.map(({ name, coordinates }) => (
                        <Marker key={name} coordinates={coordinates as [number, number]}>
                            <circle r={4} fill="yellow" onClick={() => console.log(name)} />
                            <text x={10} alignmentBaseline="middle" fill="#yellow" style={{ fontWeight: 500, fontSize: '12px' }}>
                                {name}
                            </text>
                        </Marker>
                    ))}
                </ZoomableGroup>
            </ComposableMap>

        </div>
    )
}
