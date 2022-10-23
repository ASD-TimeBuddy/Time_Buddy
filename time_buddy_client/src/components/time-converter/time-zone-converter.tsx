import { useState } from 'react';
import zip from 'lodash/zip';
import DateTimePicker from 'react-datetime-picker';
import {
  Box,
  Stack,
  Container,
  Text,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  useColorModeValue,
} from '@chakra-ui/react';
import format from 'date-fns/fp/format';
import utcToZonedTime from 'date-fns-tz/fp/utcToZonedTime';

import CountdownTimer from './countdown-timer';
import SelectTimeZone from './select-time-zone';

import { timezones } from '../../data/constants';

// for transformative functions prefer currying
export const convertTz = (date: Date) => (zone: string) =>
  utcToZonedTime(zone, date);

const TimeConverterCardContent = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [zone, setZone] = useState<string>('GMT');
  const [zones, setZones] = useState<string[]>([]);
  const [times, setTimes] = useState<string[]>([]);

  const convertTzD = convertTz(date);
  const formatter = format('do MMMM yyyy hh:mm aa');

  const handleSelectDates = (d: Date) => setDate(d);
  const handleSelectZone = (z: string) => {
    setZone(z);
  };

  const handleConvertDate = () => {
    const newZones = [...zones, zone];
    setZones(() => newZones);
    setTimes(() => newZones.map(convertTzD).map(formatter));
  };

  const convertedZones = zip(zones, times).map(([z, t]) => (
    <Stack>
      <Text fontSize="md" fontWeight="medium">{`Location: ${z}`}</Text>
      <Text fontSize="sm">{t}</Text>
    </Stack>
  ));

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
        <SelectTimeZone
          placeholder={timezones.GMT}
          zones={timezones}
          onChange={handleSelectZone}
        />
        <Button bg="bg-accent" color="on-accent" onClick={handleConvertDate}>
          Add
        </Button>
        {convertedZones}
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
