import React, { useState } from "react";
import { Container, Box, Input, Button, Heading, VStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", { email, password });
      alert(response.data.message);
      navigate("/"); // Redirect to login page upon successful registration
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container maxW="lg" centerContent>
      <Box p={8} borderWidth={1} borderRadius="lg" shadow="md" textAlign="center">
        <Heading size="lg" color="teal.500">Register</Heading>
        <VStack spacing={4} mt={6} width="full">
          <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Input placeholder="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {error && <Text color="red.500">{error}</Text>}
          <Button colorScheme="teal" width="full" onClick={handleRegister}>Register</Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default Register;
