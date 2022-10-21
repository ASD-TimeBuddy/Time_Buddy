import { useEffect, useState } from 'react';
import {
  Alert,
  AlertIcon,
  Box,
  Container,
  Stack,
  Icon,
  Text,
  Skeleton,
  SkeletonText,
  useColorModeValue,
  Input,
  Select,
  Grid,
  GridItem,
  Checkbox
} from '@chakra-ui/react';
import { FiCloud, FiThermometer, FiGlobe, FiClock } from 'react-icons/fi';
import useSWR from 'swr';
import useDate from '../hooks/useDate';
import { TimeZoneConverter } from '../components/time-zone-converter';


const SelectTime = () => {
  const { date, time, wish } = useDate();

  return (
    <div className="greetings-container">
      <h1>{wish}</h1>

      <div>
        <h3>
          {date}
          <br />
          {time}
        </h3>
      </div>
    </div>
  );
};



// import dayjs from 'dayjs';

// Always try to split code into as many seperate functions as possible

// use this to fetch the location information from the website
// use useSWR for all data fetching
const useFetchLocation = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const { data, error } = useSWR(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=aab18fa42aadc68ffbaecb30509333fe&units=metric`,
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, [latitude, longitude, data]);

  return {
    locationData: data,
    isLoading: !error && !data,
    isError: error,
  };
};

// this shows the location card content thingo
const LocationCardContent = () => {
  const { locationData, isLoading, isError } = useFetchLocation();


  const [currentDate, setCurrentDate] = useState(
    new Date(Date.now()).toISOString(),
  );

  const updateDate = () => {
    setCurrentDate(new Date(Date.now()).toISOString());
  };

  setInterval(updateDate, 1000);


  if (isLoading) {
    return (
      <>
        <Skeleton h="32px" data-testid="location-test" />
        <SkeletonText mt="2" noOfLines={2} />
        <Skeleton mt="2" h="32px" />
        <SkeletonText mt="2" noOfLines={2} />
        <Skeleton mt="2" h="32px" />
        <SkeletonText mt="2" noOfLines={2} />
      </>
    );
  }

  if (isError) {
    return (
      <Text data-testid="location-test">
        Unexpected Error occurred fetching data...
      </Text>
    );
  }

  return (
    <>
      <Stack
        justify="start"
        align="center"
        direction="row"
        spacing="4"
        data-testid="location-test"
      >
        <Icon as={FiGlobe} boxSize="6" />
        <Stack spacing="0.5" fontSize="sm">
          <Text color="emphasized" fontWeight="medium">
            City
          </Text>
          <Text color="muted">{locationData.name}</Text>
        </Stack>
      </Stack>
      <Stack justify="start" align="center" direction="row" spacing="4">
        <Icon as={FiClock} boxSize="6" />
        <Stack spacing="0.5" fontSize="sm">
          <Text color="emphasized" fontWeight="medium">
            Current Time
          </Text>
          <Text color="muted">{currentDate}</Text>
        </Stack>
      </Stack>
      <Stack justify="start" align="center" direction="row" spacing="4">
        <Icon as={FiThermometer} boxSize="6" />
        <Stack spacing="0.5" fontSize="sm">
          <Text color="emphasized" fontWeight="medium">
            Temperature
          </Text>
          <Text color="muted">{locationData.main.temp}°C</Text>
        </Stack>
      </Stack>
      <Stack justify="start" align="center" direction="row" spacing="4">
        <Icon as={FiCloud} boxSize="6" />
        <Stack spacing="0.5" fontSize="sm">
          <Text color="emphasized" fontWeight="medium">
            Weather
          </Text>
          <Text color="muted">{locationData.weather[0].description}</Text>
        </Stack>
      </Stack>
    </>
  );
};

const LocationCard = () => (
  <Container maxW="3xl" py="4">
    <Box
      bg="bg-surface"
      boxShadow={useColorModeValue('sm', 'sm-dark')}
      borderRadius="lg"
      p={{ base: '4', md: '6' }}
    >
      <Stack spacing="5">
        <Stack spacing="1">
          <Text fontSize="lg" fontWeight="medium">
            Location
          </Text>
          <Text fontSize="sm" color="muted">
            Do more with time buddy location services.
          </Text>
        </Stack>
        <Box
          borderWidth={{ base: '0', md: '1px' }}
          p={{ base: '0', md: '4' }}
          borderRadius="lg"
        >
          <LocationCardContent />
        </Box>
      </Stack>
    </Box>
  </Container>
);

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
    <Alert status="info" data-testid="countdown-test">
      <AlertIcon />
      {`Time till event: ${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`}
    </Alert>
  );
};

const TimeConverter = () => {
  const target = new Date('11/28/2022 13:48:59');

  return (
    <>
      <CountdownTimer eventDate={target} />
      <LocationCard />
      <SelectTime />
      <TimeZoneConverter />
    </>
  );
};
 
export default TimeConverter;
