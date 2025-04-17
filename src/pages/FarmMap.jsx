import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// Function to fetch place name from coordinates
const fetchPlaceName = async (lat, lng) => {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await response.json();
        return data.display_name || `Unknown Location`;
    } catch (error) {
        console.error("Error fetching place name:", error);
        return `Unknown Location`;
    }
};

// Component to handle map clicks
const LocationSelector = ({ onSelect }) => {
    useMapEvents({
        click: async (e) => {
            const { lat, lng } = e.latlng;
            const placeName = await fetchPlaceName(lat, lng);
            onSelect(lat, lng, placeName);
        },
    });
    return null;
};

const FarmMap = () => {
    const [farms, setFarms] = useState([]);
    const navigate = useNavigate();

    const handleMapClick = async (lat, lng, placeName) => {
        const soilTypes = ["Loamy", "Clay", "Sandy"];
        const randomSoil = soilTypes[Math.floor(Math.random() * soilTypes.length)];

        const temperature = Math.floor(Math.random() * 15) + 20;
        const humidity = Math.floor(Math.random() * 40) + 50;
        const phLevel = (Math.random() * 2 + 5).toFixed(1);

        const newFarm = {
            name: `Farm ${farms.length + 1}`,
            soilType: randomSoil,
            temperature,
            humidity,
            phLevel,
            location: { lat, lng },
            placeName,
        };

        setFarms([...farms, newFarm]);
    };

    const handlePredictionClick = () => {
        navigate("/prediction", { state: { farms } });
    };

    return (
        <div>
            <h1>🌱 AI-Powered Farming System</h1>

            <MapContainer center={[28.7041, 77.1025]} zoom={5} style={{ height: "400px", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationSelector onSelect={handleMapClick} />
                {farms.map((farm, index) => (
                    <Marker key={index} position={[farm.location.lat, farm.location.lng]}>
                        <Popup>
                            <b>{farm.name}</b> <br />
                            📍 Place: {farm.placeName} <br />
                            🌱 Soil Type: {farm.soilType} <br />
                            🌡️ Temperature: {farm.temperature}°C <br />
                            💧 Humidity: {farm.humidity}% <br />
                            🧪 pH Level: {farm.phLevel} <br />
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            <h2>📝 Farm Data</h2>
            <Table variant="simple" size="md" mt={4} border="1px solid gray">
                <Thead>
                    <Tr>
                        <Th>Farm Name</Th>
                        <Th>Place Name</Th>
                        <Th>Soil Type</Th>
                        <Th>Temperature</Th>
                        <Th>Humidity</Th>
                        <Th>pH Level</Th>
                        <Th>Latitude</Th>
                        <Th>Longitude</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {farms.map((farm, index) => (
                        <Tr key={index}>
                            <Td>{farm.name}</Td>
                            <Td>{farm.placeName}</Td>
                            <Td>{farm.soilType}</Td>
                            <Td>{farm.temperature}°C</Td>
                            <Td>{farm.humidity}%</Td>
                            <Td>{farm.phLevel}</Td>
                            <Td>{farm.location.lat}</Td>
                            <Td>{farm.location.lng}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <Button colorScheme="blue" mt={4} onClick={handlePredictionClick}>
                🔮 Predict & Visualize Data
            </Button>
        </div>
    );
};

export default FarmMap;
