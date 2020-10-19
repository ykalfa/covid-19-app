import React from 'react'
import { Map as MapLeaflet, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css'
import './Map.css';
import { showDataOnMap } from '../util'

function Map({center, zoom, countries, casesType }) {
    return (
        <div className="map">
            <MapLeaflet center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=http://osm.org/copyright>OpenStreetMap</a> contributors"
                />
                {showDataOnMap(countries, casesType)}
                {console.log("MAP",center)}
            </MapLeaflet>
        </div>
    )
}

export default Map;
