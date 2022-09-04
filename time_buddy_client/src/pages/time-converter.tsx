import { useEffect, useState } from 'react';
import { Alert, AlertIcon } from '@chakra-ui/react';
// import useSWR from 'swr';
// import { Text } from '@chakra-ui/react';
// import axios from "axios";
// import dayjs from 'dayjs';

type CountdownTimerProps = {
  eventDate: Date;
};

const CountdownTimer = (props: CountdownTimerProps) => {
  const { eventDate } = props;

  const [isHappening, setIsHappening] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setIsHappening(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [eventDate]);

  return isHappening ? (
    <Alert status="warning">
      <AlertIcon /> Event is happening now!
    </Alert>
  ) : (
    <Alert status="info">
      <AlertIcon />
      {`Time till event: ${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`}
    </Alert>
  );
};

const TimeConverter = () => {
  /*
  const { locationData, apiError } = useSWR(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=aab18fa42aadc68ffbaecb30509333fe&units=metric`,
  );
  // Location and Weather
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weather, setWeather] = useState('');
  const [temperature, setTemperature] = useState(0);
  const [cityName, setCityName] = useState('');

  const savePositionToState = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };
  */
  /*
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
            // console.log(res.data);
        } catch (err) {
            // console.error(err);
        }
    };
    useEffect(() => {
        fetchLocation();
    }, [latitude, longitude]);
     */
  // Countdown Timer

  const target = new Date('11/28/2022 13:48:59');

  return (
    <>
      <b>
        <h1>Location:</h1>
      </b>
      <h1> </h1>
      <CountdownTimer eventDate={target} />
    </>
  );
};

export default TimeConverter;

