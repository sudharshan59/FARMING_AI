import React from "react";
import { Container, Heading, Text, SimpleGrid, Box, Icon } from "@chakra-ui/react";
import { FaCloudRain, FaTint, FaLeaf, FaWater } from "react-icons/fa";

const irrigationFeatures = [
  {
    name: "Automated Watering",
    icon: FaCloudRain,
    description: "AI-powered smart irrigation systems ensure plants get the right amount of water at the right time."
  },
  {
    name: "Moisture Sensors",
    icon: FaTint,
    description: "Real-time soil moisture sensors adjust watering schedules based on soil conditions."
  },
  {
    name: "Water Conservation",
    icon: FaWater,
    description: "Reduces water waste by optimizing irrigation based on weather forecasts and plant needs."
  },
  {
    name: "Eco-Friendly System",
    icon: FaLeaf,
    description: "Uses AI to promote sustainable and eco-friendly farming practices."
  }
];

const SmartIrrigation = () => {
  return (
    <Container maxW="6xl" py={10}>
      <Heading size="2xl" textAlign="center" color="cyan.600">Smart Irrigation</Heading>
      <Text fontSize="lg" color="gray.600" textAlign="center" mt={3}>
        AI-powered irrigation systems that optimize water usage and prevent overwatering.
      </Text>

      <SimpleGrid columns={[1, 2, 2]} spacing={6} mt={10}>
        {irrigationFeatures.map((feature, index) => (
          <Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="md" textAlign="center">
            <Icon as={feature.icon} boxSize={12} color="cyan.500" />
            <Heading size="md" mt={3}>{feature.name}</Heading>
            <Text mt={2}>{feature.description}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default SmartIrrigation;
