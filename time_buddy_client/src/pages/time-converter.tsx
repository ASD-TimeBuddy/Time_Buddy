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
import DatePicker from "react-datepicker";
import useSWR from 'swr';
import useDate from '../hooks/useDate';
import "react-datepicker/dist/react-datepicker.css";
import TimezoneSelect from 'react-timezone-select';
import timeZoneConverter from 'time-zone-converter';
import { format } from "date-fns";
 
 
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
 
 
const TimeZoneConverter = () => {
  const options = [
    'one', 'two', 'three'
  ];
 
  const [startDate, setStartDate] = useState(new Date());
  const [convertedDate, setConvertedDate] = useState("");
 
  const [selectedSourceTimezone, setSelectedSourceTimezone] = useState<any>({});
  const [selectedDestTimezone, setSelectedDestTimezone] = useState<any>({});
  const [currentSelected, setCurrentSelected] = useState<boolean>(false);
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
 
  const handleCheckboxSelect = () => {
    if(currentSelected) {
      setCurrentSelected(false);
    } else {
      setCurrentSelected(true);
    }
  }
 
  const convertTimezoneValues = () => {
    if(currentSelected && selectedDestTimezone && selectedDestTimezone.offset) {
      const dest = selectedDestTimezone.offset;
      const src = ((new Date()).getTimezoneOffset())/60;
 
      console.log("src ",src,dest);
      const newDateTime = timeZoneConverter(startDate, src, dest, 'YYYY/MM/DD HH:mm:ss')
      setConvertedDate(newDateTime);
    }
    else if(selectedSourceTimezone && selectedDestTimezone) {
      const src = selectedSourceTimezone.offset;
      const dest = selectedDestTimezone.offset;
      if(!src || !dest) {
        return;
      }
 
      const newDateTime = timeZoneConverter(startDate, src, dest, 'YYYY/MM/DD HH:mm:ss')
      setConvertedDate(newDateTime);
 
    }
  }
 
  useEffect(()=>{
    convertTimezoneValues();
  },[selectedSourceTimezone,selectedDestTimezone,currentSelected]);
 
  return (
    <Container maxW="3xl" py="4">
    <Box
      bg="bg-surface"
      boxShadow={useColorModeValue('sm', 'sm-dark')}
      borderRadius="lg"
      p={{ base: '4', md: '8' }}
    >
    <Grid
        templateRows='1fr 0.5fr 2fr'
        templateColumns='repeat(5, 1fr)'
        gap={4}
        h='200px'
      >
        <GridItem colSpan={1}>
            <Text> Source: </Text>
        </GridItem>
        <GridItem colSpan={2}>
            <TimezoneSelect
              value={selectedSourceTimezone}
              onChange={setSelectedSourceTimezone}
            />
        </GridItem>
        <GridItem colSpan={2}>
          <Box border="1px solid #3182ce">
            <DatePicker
              selected={startDate}
              onChange={(date:Date) => setStartDate(date)}
              showTimeSelect
              dateFormat="MMM dd, yyyy h:mm aa"
            />
 
          </Box>
        </GridItem>
       
     
        <GridItem colSpan={5}>
            <Checkbox defaultChecked={currentSelected} onChange={handleCheckboxSelect}/>
            <Text>Use current timezone and date/time: <b>{timeZone +"    "+(format(new Date(), "MMM dd, yyyy h:mm aa"))}</b></Text>
            <br/>
        </GridItem>
        <GridItem colSpan={1}>
            <Text> Target: </Text>
        </GridItem>
        <GridItem colSpan={2}>
          {/* <Select placeholder='Timezone' size='md' /> */}
          <TimezoneSelect
            value={selectedDestTimezone}
            onChange={setSelectedDestTimezone}
          />
        </GridItem>
        <GridItem colSpan={2} >
            <Input disabled={true} placeholder="" variant="outline" borderColor="#3182ce" colorScheme="white" value={convertedDate}/>
        </GridItem>
      </Grid>
    </Box>
 
    </Container>
  );
 
}
 
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
 
  const date = new Date();
  const dateToString = date.toString();
 
  if (isLoading) {
    return (
      <>
        <Skeleton h="32px" />
        <SkeletonText mt="2" noOfLines={2} />
        <Skeleton mt="2" h="32px" />
        <SkeletonText mt="2" noOfLines={2} />
        <Skeleton mt="2" h="32px" />
        <SkeletonText mt="2" noOfLines={2} />
      </>
    );
  }
 
  if (isError) {
    return <Text>Unexpected Error occurred fetching data...</Text>;
  }
 
  return (
    <>
      <Stack justify="start" align="center" direction="row" spacing="4">
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
          <Text color="muted">{dateToString}</Text>
        </Stack>
      </Stack>
      <Stack justify="start" align="center" direction="row" spacing="4">
        <Icon as={FiThermometer} boxSize="6" />
        <Stack spacing="0.5" fontSize="sm">
          <Text color="emphasized" fontWeight="medium">
            Temperature
          </Text>
          <Text color="muted">{locationData.main.temp}</Text>
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
    <Alert status="info">
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