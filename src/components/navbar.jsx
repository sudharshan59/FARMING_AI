import { Link } from "react-router-dom";
import { Button, Flex, Box } from "@chakra-ui/react";

const Navbar = () => {
    return (
        <Box bg="blue.600" p={4} color="white">
            <Flex justify="space-between" align="center">
                <Box fontSize="xl" fontWeight="bold">🌾 AI Farming</Box>
                <Flex gap={3}>
                    <Link to="/">
                        <Button bg="teal.300" color="black">Home</Button>
                    </Link>
                    <Link to="/farmmap">
                        <Button bg="yellow.300" color="black">Farm Map</Button>
                    </Link>
                    <Link to="/prediction">  {/* ✅ Prediction button added */}
                        <Button bg="red.300" color="black">Prediction</Button>
                    </Link>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Navbar;
