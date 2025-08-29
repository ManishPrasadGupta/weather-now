"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { locationType } from "../types";
import LocationCard from "../LocationCard/LocationCard";

export interface LocationListProps {
  locations: locationType[];
  searchTerm: string;
  selectedLocationId: number;
  onLocationClick: (location: locationType) => void;
  onSearchTermChange: (term: string) => void;
}

export default function LocationList({
  locations, searchTerm, selectedLocationId, onLocationClick, onSearchTermChange
}: LocationListProps) {
  return (
    <div className="p-4 lg:block">
      <Input 
        placeholder="Search locations..." 
        value={searchTerm} 
        onChange={(e) => onSearchTermChange(e.target.value)} 
        className="mb-4"
      />
      <div className="flex flex-col h-[calc(100vh-120px)] overflow-y-auto">
        {locations.filter(location => 
          location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          location.country.toLowerCase().includes(searchTerm.toLowerCase())
        ).map(location => (
          <LocationCard
            key={location.id}
            location={location}
            onClick={onLocationClick}
            isSelected={selectedLocationId === location.id}
          />
        ))}
      </div>
    </div>
  );
}