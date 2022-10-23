import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Stack,
  Icon,
  Text,
  Skeleton,
  SkeletonText,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiCloud, FiThermometer, FiGlobe, FiClock } from 'react-icons/fi';
import useSWR from 'swr';

import useDate from '../../hooks/useDate';

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
  const { date, time } = useDate();

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
          <Text color="muted">
            {date}
            {time}
          </Text>
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

const LocationCard = () => {
  const { wish, time } = useDate();
  return (
    <Container maxW="3xl" py="4">
      <Box
        bg="bg-surface"
        boxShadow={useColorModeValue('sm', 'sm-dark')}
        borderRadius="lg"
        p={{ base: '4', md: '6' }}
      >
        <Text fontSize="lg" fontWeight="bold">
          {time}
        </Text>
        <Stack spacing="5">
          <Stack spacing="1">
            <Text fontSize="lg" fontWeight="bold">
              {wish}
            </Text>
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
};

export default LocationCard;
