import React from "react";
import { locationType } from "../types";

export interface LocationDetailsProps {
  location: locationType;
}

export default function LocationDetails({ location }: LocationDetailsProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex flex-col justify-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{location.name}</h2>
      <p className="text-gray-600 mb-1">{location.admin1}, {location.country}</p>
      <p className="text-sm text-gray-500 mb-4">
        Lat: {location.latitude.toFixed(4)}, Lon: {location.longitude.toFixed(4)}
      </p>
      {location.elevation && (
        <p className="text-sm text-gray-500 mb-2">Elevation: {location.elevation}m</p>
      )}
      {location.population && (
        <p className="text-sm text-gray-500 mb-2">Population: {location.population.toLocaleString()}</p>
      )}
      {location.timezone && (
        <p className="text-sm text-gray-500">Timezone: {location.timezone}</p>
      )}
    </div>
  );
}