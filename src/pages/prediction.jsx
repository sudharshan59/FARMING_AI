import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    Button,
    Flex,
    Heading,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Text,
    VStack,
    HStack,
    Spinner,
    Alert,
    AlertIcon,
    Divider,
    Icon
} from "@chakra-ui/react";
import { FaLeaf, FaMapMarkerAlt, FaTemperatureHigh, FaTint, FaAward, FaChartBar } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

const Prediction = () => {
    const [farms, setFarms] = useState([]);
    const [bestFarm, setBestFarm] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [realTimeData, setRealTimeData] = useState(null);

    useEffect(() => {
        // Simulate real-time farm data updates (Replace with WebSockets)
        const interval = setInterval(() => {
            setRealTimeData({
                temp: (20 + Math.random() * 10).toFixed(2),
                humidity: (50 + Math.random() * 20).toFixed(2),
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Fetch farm data
    const handlePrediction = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get("http://localhost:5000/api/farms");
            const fetchedFarms = response.data;

            if (fetchedFarms.length === 0) {
                setError("No farm locations available.");
                setLoading(false);
                return;
            }

            setFarms(fetchedFarms);

            // Find the best farm based on conditions
            const best = fetchedFarms.reduce((best, farm) => {
                if (farm.temperature >= 20 && farm.temperature <= 30 && 
                    farm.humidity >= 50 && farm.humidity <= 70) {
                    return farm;
                }
                return best;
            }, fetchedFarms[0]);

            setBestFarm(best);
        } catch (err) {
            setError("Failed to fetch farm data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Flex h="100vh" bg="gray.100">
            {/* Sidebar */}
            <VStack bg="green.800" color="white" w="250px" p="6" spacing="5" align="stretch">
                <Heading size="md">🌱 AI Farming</Heading>
                <Button leftIcon={<FaLeaf />} colorScheme="green" onClick={handlePrediction}>
                    Get Best Farm Prediction
                </Button>
                {realTimeData && (
                    <Box bg="gray.700" p="4" borderRadius="md">
                        <Text fontSize="lg">🌡️ Real-Time Data</Text>
                        <HStack>
                            <Icon as={FaTemperatureHigh} />
                            <Text>Temp: {realTimeData.temp}°C</Text>
                        </HStack>
                        <HStack>
                            <Icon as={FaTint} />
                            <Text>Humidity: {realTimeData.humidity}%</Text>
                        </HStack>
                    </Box>
                )}
            </VStack>

            {/* Main Content */}
            <Box flex="1" p="6">
                <Heading mb="4" color="green.700">
                    📊 AI Farm Prediction Dashboard
                </Heading>

                {loading && <Spinner color="green.500" size="xl" />}
                {error && (
                    <Alert status="error" mb="4">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}

                {/* Best Farm */}
                {bestFarm && (
                    <Box bg="yellow.100" p="5" borderRadius="md" mb="4">
                        <Heading size="md"><Icon as={FaAward} /> Best Farm Location</Heading>
                        <Text><strong>Farm Name:</strong> {bestFarm.name}</Text>
                        <HStack>
                            <Icon as={FaMapMarkerAlt} />
                            <Text><strong>Location:</strong> {bestFarm.placeName} ({bestFarm.location.lat}, {bestFarm.location.lng})</Text>
                        </HStack>
                        <Text><strong>Soil Type:</strong> {bestFarm.soilType}</Text>
                        <Text><strong>Suggested Crop:</strong> {bestFarm.suggestedCrop}</Text>
                        <Text><strong>Animal Health:</strong> {bestFarm.animalHealth}</Text>
                    </Box>
                )}

                {/* Farm Data Table */}
                {farms.length > 0 && (
                    <>
                        <Table variant="simple" mt="4" bg="white" borderRadius="md" shadow="md">
                            <Thead bg="green.500">
                                <Tr>
                                    <Th color="white">Farm Name</Th>
                                    <Th color="white">Place</Th>
                                    <Th color="white">Soil Type</Th>
                                    <Th color="white">Temperature</Th>
                                    <Th color="white">Humidity</Th>
                                    <Th color="white">pH Level</Th>
                                    <Th color="white">Latitude</Th>
                                    <Th color="white">Longitude</Th>
                                    <Th color="white">Suggested Crop</Th>
                                    <Th color="white">Animal Health</Th>
                                    <Th color="white">Best Farm?</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {farms.map((farm, index) => (
                                    <Tr key={index} bg={farm === bestFarm ? "yellow.200" : "white"}>
                                        <Td>{farm.name}</Td>
                                        <Td>{farm.placeName}</Td>
                                        <Td>{farm.soilType}</Td>
                                        <Td>{farm.temperature}°C</Td>
                                        <Td>{farm.humidity}%</Td>
                                        <Td>{farm.phLevel}</Td>
                                        <Td>{farm.location.lat}</Td>
                                        <Td>{farm.location.lng}</Td>
                                        <Td>{farm.suggestedCrop}</Td>
                                        <Td>{farm.animalHealth}</Td>
                                        <Td>{farm === bestFarm ? "✅ Best!" : "❌"}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>

                        {/* Visualization Section */}
                        <Divider my="6" />
                        <Heading size="lg" color="green.700">📊 Data Visualization</Heading>

                        <Box mt="6">
                            <Heading size="md"><Icon as={FaChartBar} /> Temperature & Humidity</Heading>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={farms}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="temperature" fill="#8884d8" name="Temperature (°C)" />
                                    <Bar dataKey="humidity" fill="#82ca9d" name="Humidity (%)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>

                        <Box mt="6">
                            <Heading size="md"><Icon as={FaChartBar} /> Soil pH Level Distribution</Heading>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={farms}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="phLevel" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="phLevel" fill="#ff7300" name="pH Level" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </>
                )}
            </Box>
        </Flex>
    );
};

export default Prediction;
