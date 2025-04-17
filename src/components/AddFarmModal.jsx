// src/components/AddFarmModal.js
import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, FormControl, FormLabel } from "@chakra-ui/react";

const AddFarmModal = ({ isOpen, onClose, formData, handleInputChange, handleSubmit }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Farm Data</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Farm Name</FormLabel>
                        <Input name="name" value={formData.name} onChange={handleInputChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Location</FormLabel>
                        <Input name="location" value={formData.location} onChange={handleInputChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Soil Type</FormLabel>
                        <Input name="soilType" value={formData.soilType} onChange={handleInputChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Temperature</FormLabel>
                        <Input name="temperature" value={formData.temperature} onChange={handleInputChange} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Humidity</FormLabel>
                        <Input name="humidity" value={formData.humidity} onChange={handleInputChange} />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>Save</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddFarmModal;
