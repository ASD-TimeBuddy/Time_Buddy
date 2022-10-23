import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import {
  Box,
  Stack,
  Container,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  useColorModeValue,
} from '@chakra-ui/react';
import utcToZonedTime from 'date-fns-tz/fp/utcToZonedTime';

import CountdownTimer from './countdown-timer';

// import { timezones } from '../data/constants';

// for transformative functions prefer currying
export const convertTz = utcToZonedTime;

const TimeConverterCardContent = () => {
  const [date, setDate] = useState<Date>(new Date());

  const handleSelectDates = (value: Date) => setDate(value);

  return (
    <Box
      as="form"
      borderWidth={{ base: '0', md: '1px' }}
      p={{ base: '0', md: '4' }}
      borderRadius="lg"
    >
      <Stack
        spacing="5"
        px={{ base: '4', md: '6' }}
        py={{ base: '5', md: '6' }}
      >
        <CountdownTimer eventDate={date} />
        <FormControl>
          <FormLabel>Select Date and Time</FormLabel>
          <DateTimePicker onChange={handleSelectDates} value={date} />
          <FormHelperText>
            What do you want to convert to an international time!
          </FormHelperText>
        </FormControl>
      </Stack>
    </Box>
  );
};

const TimeZoneConverter = () => (
  <Container maxW="3xl" py="4">
    <Box
      bg="bg-surface"
      boxShadow={useColorModeValue('sm', 'sm-dark')}
      borderRadius="lg"
      p={{ base: '4', md: '6' }}
    >
      <Stack spacing="5">
        <Stack spacing="1">
          <Text fontSize="lg" fontWeight="bold">
            Convert Time
          </Text>
          <Text fontSize="sm" color="muted">
            You can convert some time into any timezone here.
          </Text>
        </Stack>

        <TimeConverterCardContent />
      </Stack>
    </Box>
  </Container>
);

export default TimeZoneConverter;
