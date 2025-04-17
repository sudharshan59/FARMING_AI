import React from "react";
import { Container, Heading, Text, VStack, SimpleGrid, Box } from "@chakra-ui/react";
import { FaTint, FaFlask, FaLeaf } from "react-icons/fa"; // Importing icons

const phMetrics = [
  {
    name: "Real-Time pH Tracking",
    icon: FaTint,
    description: "Monitor soil and water pH levels in real time to ensure optimal plant health."
  },
  {
    name: "Nutrient Balance",
    icon: FaFlask,
    description: "Analyze how pH levels impact nutrient availability for crops."
  },
  {
    name: "Automatic Adjustments",
    icon: FaLeaf,
    description: "AI-driven recommendations for maintaining the right pH balance."
  }
];

const PHMonitoring = () => {
  return (
    <Container maxW="6xl" py={10}>
      <Heading size="2xl" textAlign="center" color="blue.500">pH Monitoring</Heading>
      <Text fontSize="lg" color="gray.600" textAlign="center" mt={3}>
        AI-powered pH sensors ensure plants get the right nutrients for healthy growth.
      </Text>

      <SimpleGrid columns={[1, 2, 3]} spacing={6} mt={10}>
        {phMetrics.map((metric, index) => (
          <Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="md" textAlign="center">
            <metric.icon size={50} color="blue" />
            <Heading size="md" mt={3}>{metric.name}</Heading>
            <Text mt={2}>{metric.description}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default PHMonitoring;