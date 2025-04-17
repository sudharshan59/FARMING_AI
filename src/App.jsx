import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Box, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Home from "./pages/home";
import FarmMap from "./pages/FarmMap";
import Prediction from "./pages/Prediction";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SoilHealth from "./pages/SoilHealth";
import PHMonitoring from "./pages/PHMonitoring";
import SmartIrrigation from "./pages/SmartIrrigation";
import PlantGrowthTracking from "./pages/PlantGrowthTracking";
import AddFarmModal from "./components/AddFarmModal"; // Import the modal

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "", location: "", soilType: "", temperature: "", humidity: ""
    });

    useEffect(() => {
        const pageTitles = {
            "/": "🌱 AI Farming | Login",
            "/register": "🌱 AI Farming | Register",
            "/home": "🌱 AI Farming | Dashboard",
            "/farmmap": "🌍 AI Farming | Farm Map",
            "/prediction": "📊 AI Farming | Predictions",
            "/soil-health": "🌾 AI Farming | Soil Health Monitoring",
            "/ph-monitoring": "🧪 AI Farming | pH Level Monitoring",
            "/smart-irrigation": "💧 AI Farming | Smart Irrigation",
            "/plant-growth-tracking": "🌱 AI Farming | Growth Tracking",
        };

        document.title = pageTitles[location.pathname] || "🌱 AI Farming";
    }, [location.pathname]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/farms", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert("✅ Thank you! Farm data saved successfully.");
                setIsOpen(false);
                setFormData({ name: "", location: "", soilType: "", temperature: "", humidity: "" });
            } else {
                alert("❌ Failed to save data. Please try again.");
            }
        } catch (error) {
            console.error("❌ Error saving farm data:", error);
            alert("❌ Error connecting to the server.");
        }
    };

    // Hide Navbar and Add Button on Login/Register Pages
    const isAuthPage = location.pathname === "/" || location.pathname === "/register";

    return (
        <Box minH="100vh">
            {!isAuthPage && <Navbar />}
            {!isAuthPage && (
                <IconButton
                    icon={<AddIcon />}
                    aria-label="Add Farm"
                    position="absolute"
                    top="115px"
                    right="30px"
                    onClick={() => setIsOpen(true)}
                />
            )}

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/farmmap" element={<FarmMap />} />
                <Route path="/prediction" element={<Prediction />} />
                <Route path="/soil-health" element={<SoilHealth />} />
                <Route path="/ph-monitoring" element={<PHMonitoring />} />
                <Route path="/smart-irrigation" element={<SmartIrrigation />} />
                <Route path="/plant-growth-tracking" element={<PlantGrowthTracking />} />
            </Routes>

            {/* Use AddFarmModal */}
            <AddFarmModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
            />
        </Box>
    );
}

export default App;
