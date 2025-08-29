"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import MapContainer to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

interface locationType {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
  elevation?: number,
  feature_code?: string,
  country_code?: string,
  admin1_id?: number,
  admin2_id?: number,
  admin3_id?: number,
  timezone?: string,
  population?: number,
  country_id?: number,
  country: string,
  admin1?: string,
  admin2?: string,
  admin3?: string
}

const sampleLocation: locationType[] = [
  {
    "id": 1254046,
    "name": "Tura",
    "latitude": 25.51421,
    "longitude": 90.20239,
    "elevation": 313.0,
    "feature_code": "PPL",
    "country_code": "IN",
    "admin1_id": 1263207,
    "admin2_id": 8986228,
    "admin3_id": 12680493,
    "timezone": "Asia/Kolkata",
    "population": 63645,
    "country_id": 1269750,
    "country": "India",
    "admin1": "Meghalaya",
    "admin2": "West Garo Hills",
    "admin3": "Rongram"
  },
  {
    "id": 3043678,
    "name": "Tura",
    "latitude": 47.60924,
    "longitude": 19.60279,
    "elevation": 115.0,
    "feature_code": "PPL",
    "country_code": "HU",
    "admin1_id": 3046431,
    "timezone": "Europe/Budapest",
    "population": 8294,
    "country_id": 719819,
    "country": "Hungary",
    "admin1": "Pest County"
  },
  {
    "id": 2014833,
    "name": "Tura",
    "latitude": 64.27769,
    "longitude": 100.21849,
    "elevation": 214.0,
    "feature_code": "PPL",
    "country_code": "RU",
    "admin1_id": 1502020,
    "timezone": "Asia/Krasnoyarsk",
    "population": 5444,
    "country_id": 2017370,
    "country": "Russia",
    "admin1": "Krasnoyarsk Krai"
  },
  {
    "id": 149383,
    "name": "Tura",
    "latitude": -5.51667,
    "longitude": 33.83333,
    "elevation": 1254.0,
    "feature_code": "PPL",
    "country_code": "TZ",
    "admin1_id": 149653,
    "admin2_id": 7647455,
    "admin3_id": 11006863,
    "timezone": "Africa/Dar_es_Salaam",
    "country_id": 149590,
    "country": "Tanzania",
    "admin1": "Tabora",
    "admin2": "Uyui District",
    "admin3": "Tura"
  },
  {
    "id": 178930,
    "name": "Tura",
    "latitude": 0.53017,
    "longitude": 37.03626,
    "elevation": 1807.0,
    "feature_code": "PPL",
    "country_code": "KE",
    "admin1_id": 189794,
    "timezone": "Africa/Nairobi",
    "country_id": 192950,
    "country": "Kenya",
    "admin1": "Laikipia"
  },
  {
    "id": 347194,
    "name": "Ţurá",
    "latitude": 29.935,
    "longitude": 31.29,
    "elevation": 22.0,
    "feature_code": "PPL",
    "country_code": "EG",
    "admin1_id": 360631,
    "timezone": "Africa/Cairo",
    "country_id": 357994,
    "country": "Egypt",
    "admin1": "Cairo"
  },
  {
    "id": 1279836,
    "name": "Tura",
    "latitude": 37.58333,
    "longitude": 86.18333,
    "elevation": 3024.0,
    "feature_code": "PPL",
    "country_code": "CN",
    "admin1_id": 1529047,
    "admin2_id": 1529604,
    "timezone": "Asia/Urumqi",
    "country_id": 1814991,
    "country": "China",
    "admin1": "Xinjiang",
    "admin2": "Bayingolin Mongol Autonomous Prefecture"
  },
  {
    "id": 1352967,
    "name": "Tura",
    "latitude": 34.67828,
    "longitude": 71.11038,
    "elevation": 1481.0,
    "feature_code": "PPL",
    "country_code": "PK",
    "admin1_id": 1168873,
    "admin2_id": 1170122,
    "timezone": "Asia/Karachi",
    "country_id": 1168579,
    "country": "Pakistan",
    "admin1": "Khyber Pakhtunkhwa",
    "admin2": "Mohmand"
  },
  {
    "id": 1390695,
    "name": "Tura",
    "latitude": 34.63318,
    "longitude": 72.64375,
    "elevation": 1429.0,
    "feature_code": "PPL",
    "country_code": "PK",
    "admin1_id": 1168873,
    "admin2_id": 1182146,
    "timezone": "Asia/Karachi",
    "country_id": 1168579,
    "country": "Pakistan",
    "admin1": "Khyber Pakhtunkhwa",
    "admin2": "Buner"
  },
  {
    "id": 1512550,
    "name": "To’ra",
    "latitude": 40.43132,
    "longitude": 66.28715,
    "elevation": 724.0,
    "feature_code": "PPL",
    "country_code": "UZ",
    "admin1_id": 1114927,
    "timezone": "Asia/Samarkand",
    "country_id": 1512440,
    "country": "Uzbekistan",
    "admin1": "Samarqand Region"
  }
]

export default function Home() {
  const [locations, setLocations] = React.useState<locationType[]>(sampleLocation);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [selectedLocation, setSelectedLocation] = React.useState<locationType>(sampleLocation[0]);
  
  const handleLocationClick = (location: locationType) => {
    setSelectedLocation(location);
  };

  return (
    <div className="h-screen w-full grid grid-cols-1 lg:grid-cols-3">
      <div className="p-4 lg:block">
        <Input 
          placeholder="Search locations..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="mb-4"
        />
        <div className="flex flex-col h-[calc(100vh-120px)] overflow-y-auto">
          {locations.filter(location => 
            location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            location.country.toLowerCase().includes(searchTerm.toLowerCase())
          ).map(location => locationCard(location, handleLocationClick, selectedLocation.id === location.id))}
        </div>
      </div>
      <div className="col-span-1 lg:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedLocation.name}</h2>
            <p className="text-gray-600 mb-1">{selectedLocation.admin1}, {selectedLocation.country}</p>
            <p className="text-sm text-gray-500 mb-4">
              Lat: {selectedLocation.latitude.toFixed(4)}, Lon: {selectedLocation.longitude.toFixed(4)}
            </p>
            {selectedLocation.elevation && (
              <p className="text-sm text-gray-500 mb-2">Elevation: {selectedLocation.elevation}m</p>
            )}
            {selectedLocation.population && (
              <p className="text-sm text-gray-500 mb-2">Population: {selectedLocation.population.toLocaleString()}</p>
            )}
            {selectedLocation.timezone && (
              <p className="text-sm text-gray-500">Timezone: {selectedLocation.timezone}</p>
            )}
          </div>
          <div className="p-4">
            <div className="rounded-2xl h-full w-full overflow-hidden shadow-lg">
            {typeof window !== 'undefined' && (
              <MapContainer 
                center={[selectedLocation.latitude, selectedLocation.longitude] as [number, number]} 
                zoom={13} 
                style={{ height: '100%', width: '100%', minHeight: '400px' }}
                scrollWheelZoom={true}
                key={`${selectedLocation.latitude}-${selectedLocation.longitude}`}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[selectedLocation.latitude, selectedLocation.longitude] as [number, number]}>
                  <Popup>
                    <div className="text-center">
                      <strong>{selectedLocation.name}</strong><br />
                      {selectedLocation.admin1}, {selectedLocation.country}
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            )}
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Weather Information</h3>
              <p className="text-gray-600">Weather data will be displayed here</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Additional Details</h3>
              <p className="text-gray-600">More location details coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function locationCard(location: locationType, onClick: (location: locationType) => void, isSelected: boolean) {
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
