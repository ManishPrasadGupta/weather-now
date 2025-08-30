"use client";

import React, { useState } from "react";
import { locationType } from "../components/types";
import LocationDetails from "@/components/LocationDetails/LocationDetails";
import LocationMap from "@/components/LocationMap/LocationMap";
import LocationList from "@/components/LocationList/LocationList";

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
		"admin3": "Rongram",
		"temperature": 50
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
		"admin1": "Pest County",
		"temperature": 40
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
		"admin1": "Krasnoyarsk Krai",
		"temperature": -5
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
		"admin3": "Tura",
    "temperature": 20
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
		"admin1": "Laikipia",
    "temperature": 18
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
		"admin1": "Cairo",
    "temperature": 22
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
		"admin2": "Bayingolin Mongol Autonomous Prefecture",
    "temperature": 22
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
		"admin2": "Mohmand",
    "temperature": 25
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
		"admin2": "Buner",
    "temperature": 25
	},
	{
		"id": 1512550,
		"name": "Tura",
		"latitude": 40.43132,
		"longitude": 66.28715,
		"elevation": 724.0,
		"feature_code": "PPL",
		"country_code": "UZ",
		"admin1_id": 1114927,
		"timezone": "Asia/Samarkand",
		"country_id": 1512440,
		"country": "Uzbekistan",
		"admin1": "Samarqand Region",
    "temperature": 30
	}
];

export default function Home() {
	const [locations, setLocations] = useState<locationType[]>(sampleLocation);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [selectedLocation, setSelectedLocation] = useState<locationType>(sampleLocation[0]);
  	const [temperature, setTemperature] = useState<number | null>(sampleLocation[0].temperature ?? null);

	const handleLocationClick = (location: locationType) => {
		setSelectedLocation(location);
	};

	return (
		<div className="h-screen w-full grid grid-cols-1 lg:grid-cols-3">
			<LocationList
				locations={locations}
				searchTerm={searchTerm}
				selectedLocationId={selectedLocation.id}
				onLocationClick={handleLocationClick}
				onSearchTermChange={setSearchTerm}
			/>
			<div className="col-span-1 lg:col-span-2">
				<div className="grid grid-cols-1 md:grid-cols-2 h-full">
					<LocationDetails location={selectedLocation} temperature={selectedLocation.temperature ?? null} />
					<div className="p-4">
						<LocationMap location={selectedLocation} />
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