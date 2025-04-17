import React, { useState } from "react";
import { Container, Heading, Text, VStack, SimpleGrid, Box } from "@chakra-ui/react";
import { FaLeaf, FaSeedling, FaTree, FaMountain, FaTint, FaSun } from "react-icons/fa"; // Importing relevant icons

const soilTypes = [
  {
    name: "Alluvial Soil",
    icon: FaTint,
    description: "Fertile soil found in river basins, rich in potash and lime. Suitable for wheat, rice, and sugarcane."
  },
  {
    name: "Black Soil",
    icon: FaLeaf,
    description: "Clayey soil rich in calcium carbonate, ideal for cotton and pulses. Retains moisture well."
  },
  {
    name: "Red Soil",
    icon: FaSun,
    description: "Iron-rich soil found in warm climates. Supports crops like millets, groundnuts, and pulses."
  },
  {
    name: "Laterite Soil",
    icon: FaSeedling,
    description: "High iron and aluminum content, good for tea, coffee, and cashew plantations. Needs fertilizers."
  },
  {
    name: "Mountain Soil",
    icon: FaMountain,
    description: "Found in hilly regions, supports fruits, tea, and spices. Varies in fertility."
  },
  {
    name: "Desert Soil",
    icon: FaTree,
    description: "Sandy and saline, supports drought-resistant crops like barley and millet. Needs irrigation."
  }
];

const SoilHealth = () => {
  const [selectedSoil, setSelectedSoil] = useState(null);

  return (
    <Container maxW="6xl" py={10}>
      <Heading size="2xl" textAlign="center" color="teal.500">Soil Health</Heading>
      <Text fontSize="lg" color="gray.600" textAlign="center" mt={3}>
        Understanding soil types is essential for sustainable farming and gardening.
      </Text>

      <SimpleGrid columns={[1, 2, 3]} spacing={6} mt={10}>
        {soilTypes.map((soil, index) => (
          <Box 
            key={index} 
            p={5} 
            shadow="md" 
            borderWidth="1px" 
            borderRadius="md" 
            textAlign="center" 
            cursor="pointer" 
            bg={selectedSoil === soil.name ? "teal.100" : "white"} 
            _dark={{ bg: selectedSoil === soil.name ? "teal.900" : "gray.800" }}
            onClick={() => setSelectedSoil(soil.name)}
          >
            <soil.icon size={50} color="teal" />
            <Heading size="md" mt={3}>{soil.name}</Heading>
            <Text mt={2}>{soil.description}</Text>
          </Box>
        ))}
      </SimpleGrid>

      {selectedSoil && (
        <Box mt={8} p={5} borderWidth="1px" borderRadius="md" shadow="lg" bg="gray.100" _dark={{ bg: "gray.700" }}>
          <Heading size="lg" color="teal.600">{selectedSoil}</Heading>
          <Text mt={2} color="gray.700" _dark={{ color: "gray.300" }}>{soilTypes.find(soil => soil.name === selectedSoil)?.description}</Text>
        </Box>
      )}
    </Container>
  );
};

export default SoilHealth;
