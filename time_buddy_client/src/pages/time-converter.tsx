import { Text } from '@chakra-ui/react';
import axios from "axios";
import { useEffect, useState } from "react";

const TimeConverter = () => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [weather, setWeather] = useState("");
    const [temperature, setTemperature] = useState(0);
    const [cityName, setCityName] = useState("");

    const savePositionToState = (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    };

    const fetchLocation = async () => {
        try {
            navigator.geolocation.getCurrentPosition(
                savePositionToState
            );
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=aab18fa42aadc68ffbaecb30509333fe&units=metric`
            );
            setTemperature(res.data.main.temp);
            setCityName(res.data.name);
            setWeather(res.data.weather[0].main);
            await console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchLocation();
    }, [latitude, longitude]);

    return (
        <div className="location">
            <h1>{cityName}</h1>
            <h2>{temperature}°C</h2>
            <h2>{weather}</h2>
        </div>
    );

}

export default TimeConverter;