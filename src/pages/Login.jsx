import React, { useState } from "react";
import { Container, Box, Input, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "s@.com" && password === "123") {
      navigate("/home"); // Redirect to Home page
    } else {
      alert("Invalid credentials!");
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Container maxW="lg" centerContent>
      <Box p={8} borderWidth={1} borderRadius="lg" shadow="md" textAlign="center">
        <Heading size="lg" color="teal.500">Login</Heading>
        <Text fontSize="md" color="gray.600" mt={2}>
          Enter your credentials to access AI Farming System
        </Text>

        <VStack spacing={4} mt={6} width="full">
          <Input
            placeholder="Email"
            type="email"
            focusBorderColor="teal.400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyPress} // Listen for Enter key
          />
          <Input
            placeholder="Password"
            type="password"
            focusBorderColor="teal.400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyPress} // Listen for Enter key
          />
          <Button 
            colorScheme="teal" 
            width="full" 
            onClick={handleLogin}
            isDisabled={!email || !password} // Disable button if fields are empty
          >
            Login
          </Button>
          {/* Register Button */}
          <Button 
            colorScheme="gray" 
            width="full" 
            onClick={() => navigate("/register")} // Navigate to register page
          >
            Register
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default Login;
