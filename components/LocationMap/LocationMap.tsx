"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { locationType } from "../types";

// Dynamically import react-leaflet components for SSR safety
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

export interface LocationMapProps {
  location: locationType;
}

export default function LocationMap({ location }: LocationMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="rounded-2xl h-full w-full overflow-hidden shadow-lg">
      {isClient && (
        <MapContainer 
          center={[location.latitude, location.longitude] as [number, number]}
          zoom={13}
          style={{ height: '100%', width: '100%', minHeight: '400px' }}
          scrollWheelZoom={true}
          key={`${location.latitude}-${location.longitude}`}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[location.latitude, location.longitude] as [number, number]}>
            <Popup>
              <div className="text-center">
                <strong>{location.name}</strong><br />
                {location.admin1}, {location.country}
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}