import React from "react";
import { Container, Heading, Text, VStack, SimpleGrid, Box } from "@chakra-ui/react";
import { FaSeedling, FaChartLine, FaMicroscope } from "react-icons/fa"; // Importing icons

const trackingFeatures = [
  {
    name: "Growth Analysis",
    icon: FaSeedling,
    description: "AI tracks plant development stages and suggests optimal growth conditions."
  },
  {
    name: "Predictive Insights",
    icon: FaChartLine,
    description: "Predict yield and identify potential growth issues early."
  },
  {
    name: "Health Monitoring",
    icon: FaMicroscope,
    description: "Monitor plant health using image recognition and real-time data."
  }
];

const PlantGrowthTracking = () => {
  return (
    <Container maxW="6xl" py={10}>
      <Heading size="2xl" textAlign="center" color="green.500">Plant Growth Tracking</Heading>
      <Text fontSize="lg" color="gray.600" textAlign="center" mt={3}>
        AI-driven analysis helps track and improve plant development efficiently.
      </Text>

      <SimpleGrid columns={[1, 2, 3]} spacing={6} mt={10}>
        {trackingFeatures.map((feature, index) => (
          <Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="md" textAlign="center">
            <feature.icon size={50} color="green" />
            <Heading size="md" mt={3}>{feature.name}</Heading>
            <Text mt={2}>{feature.description}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default PlantGrowthTracking;
