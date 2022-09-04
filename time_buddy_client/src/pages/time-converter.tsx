import { Text } from '@chakra-ui/react';
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';

const TimeConverter = () => {

    //Location and Weather

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

    //Countdown Timer

    const [eventTime, setEventTime] = useState(false);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const target = new Date("11/28/2022 13:48:59");

        const interval = setInterval(() => {
            const now = new Date();
            const difference = target.getTime() - now.getTime();

            const d = Math.floor(difference / (1000 * 60 * 60 * 24));
            setDays(d);

            const h = Math.floor(
                (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            setHours(h);

            const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            setMinutes(m);

            const s = Math.floor((difference % (1000 * 60)) / 1000);
            setSeconds(s);

            if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
                setEventTime(true);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="location">
            <b><h1>Location:</h1></b>
            <h1>{cityName}</h1>
            <h2>{temperature}°C</h2>
            <h2>{weather}</h2>
            <h1> </h1>
            <b><h2>Time till event: </h2></b>
            <span>{days}</span>
            <span> Days </span>
            <span>{hours}</span>
            <span> Hours </span>
            <span>{minutes}</span>
            <span> Minutes </span>
            <span>{seconds}</span>
            <span> Seconds </span>
        </div>  
    );

}

export default TimeConverter;