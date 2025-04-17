import React, { useState, useEffect } from "react";
import { Box, SimpleGrid, Icon, Text, Heading, VStack, Container, Button, Flex, Spacer, useColorMode } from "@chakra-ui/react";
import { FaSeedling, FaTint, FaWater, FaChartLine, FaTractor, FaSun, FaLeaf, FaSignOutAlt, FaMoon, FaSun as FaSunIcon } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status in localStorage
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Clear login state
    setIsLoggedIn(false);
    navigate("/"); // Redirect to login page
  };

  return (
    <Container maxW="6xl" py={10}>
      {/* Navigation Bar */}
      <Flex mb={6} alignItems="center">
        <Heading size="lg" color="teal.500">AI-Powered Farming</Heading>
        <Spacer />
        <Icon
          as={colorMode === "dark" ? FaMoon : FaSunIcon}
          w={6} h={6}
          cursor="pointer"
          onClick={toggleColorMode}
          mr={4}
        />
        <Button onClick={handleLogout} leftIcon={<FaSignOutAlt />} colorScheme="red">Logout</Button>
      </Flex>

      <Box textAlign="center" mb={10}>
        <Text fontSize="lg" color="gray.600" mt={3}>
          Optimize soil health, monitor plant growth, and enhance sustainability.
        </Text>
      </Box>

      <SimpleGrid columns={[1, 2, 3]} spacing={8}>
        <VStack>
          <Icon as={FaSeedling} w={20} h={20} color="green.500" />
          <Heading size="md" mt={4}>Soil Health</Heading>
          <Text textAlign="center">Analyzing soil quality, moisture, and pH levels to improve plant growth.</Text>
          <Button as={Link} to="/soil-health" colorScheme="teal">More</Button>
        </VStack>

        <VStack>
          <Icon as={FaTint} w={20} h={20} color="blue.400" />
          <Heading size="md" mt={4}>pH Monitoring</Heading>
          <Text textAlign="center">AI-powered pH sensors ensure plants get the right nutrients.</Text>
          <Button as={Link} to="/ph-monitoring" colorScheme="blue">More</Button>
        </VStack>

        <VStack>
          <Icon as={FaWater} w={20} h={20} color="cyan.500" />
          <Heading size="md" mt={4}>Smart Irrigation</Heading>
          <Text textAlign="center">Automated irrigation systems optimize water usage efficiently.</Text>
          <Button as={Link} to="/smart-irrigation" colorScheme="cyan">More</Button>
        </VStack>

        <VStack>
          <Icon as={FaChartLine} w={20} h={20} color="orange.500" />
          <Heading size="md" mt={4}>Plant Growth Tracking</Heading>
          <Text textAlign="center">AI-driven analysis helps track and improve plant development.</Text>
          <Button as={Link} to="/plant-growth-tracking" colorScheme="orange">More</Button>
        </VStack>

        <VStack>
          <Icon as={FaTractor} w={20} h={20} color="red.500" />
          <Heading size="md" mt={4}>Automated Farming</Heading>
          <Text textAlign="center">AI-controlled machinery for precision farming and crop monitoring.</Text>
          <Button as={Link} to="/automated-farming" colorScheme="red">More</Button>
        </VStack>

        <VStack>
          <Icon as={FaSun} w={20} h={20} color="yellow.500" />
          <Heading size="md" mt={4}>Weather Forecasting</Heading>
          <Text textAlign="center">Accurate weather predictions to help farmers plan efficiently.</Text>
          <Button as={Link} to="/weather-forecast" colorScheme="yellow">More</Button>
        </VStack>

        <VStack>
          <Icon as={FaLeaf} w={20} h={20} color="green.600" />
          <Heading size="md" mt={4}>Eco-Friendly Farming</Heading>
          <Text textAlign="center">Sustainable farming practices to improve environmental health.</Text>
          <Button as={Link} to="/eco-farming" colorScheme="green">More</Button>
        </VStack>
      </SimpleGrid>
    </Container>
  );
};

export default Home;
