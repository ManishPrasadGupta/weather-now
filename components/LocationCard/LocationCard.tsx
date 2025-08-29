import React from "react";
import { locationType } from "../types";

export interface LocationCardProps {
  location: locationType;
  onClick: (location: locationType) => void;
  isSelected: boolean;
}

export default function LocationCard({ location, onClick, isSelected }: LocationCardProps) {
  return (
    <div 
      key={location.id} 
      className={`p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer transition-colors ${
        isSelected ? 'bg-blue-50 border-blue-200' : ''
      }`}
      onClick={() => onClick(location)}
    >
      <div className="font-bold">{location.name}, {location.country}</div>
      <div className="text-sm text-gray-600">{location.admin1}{location.admin2 ? `, ${location.admin2}` : ''}</div>
      <div className="text-sm text-gray-600">Lat: {location.latitude.toFixed(4)}, Lon: {location.longitude.toFixed(4)}</div>
      {location.population && (
        <div className="text-xs text-gray-500 mt-1">Population: {location.population.toLocaleString()}</div>
      )}
    </div>
  );
}