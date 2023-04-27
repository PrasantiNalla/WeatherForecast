import React from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const cities = [
    { name: "London", coordinates: [-0.118092, 51.509865] },
    { name: "Manchester", coordinates: [-2.242631, 53.480759] },
    { name: "Birmingham", coordinates: [-1.893592, 52.486243] },
    { name: "Liverpool", coordinates: [-3.002465, 53.409836] }
];

export default function MapChart() {
    return (
        <ComposableMap projection="geoMercator" projectionConfig={{ scale: 6000 }}>
            <Geographies geography={geoUrl}>
                {({ geographies }) =>
                    geographies.filter(geo => geo.properties.NAME === "United Kingdom").map(geo => (
                        <Geography key={geo.rsmKey} geography={geo} />
                    ))
                }
            </Geographies>
            {cities.map(({ name, coordinates }) => (
                <Marker key={name} coordinates={coordinates as [number, number]}>
                    <circle r={4} fill="#F53" onClick={() => console.log(name)} />
                    <text x={10} alignmentBaseline="middle" fill="#F53" style={{ fontWeight: 500, fontSize: '12px' }}>
                        {name}
                    </text>
                </Marker>
            ))}
        </ComposableMap>
    );
}
