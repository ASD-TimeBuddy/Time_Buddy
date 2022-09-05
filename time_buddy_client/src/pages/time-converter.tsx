import { Text } from '@chakra-ui/react';
import React, {useState} from "react";
import { useForm } from 'react-hook-form';
import "./App.css";

const TimeConverter = () => <Text>Please enter time conversion details:</Text>;

export default TimeConverter;

function App() {
    const [values, setValues] = useState({
        time: "",
        date: "",
    });
    
    return (
        <div className="form-container">
            
        </div>
    )
}