import { useState } from 'react';
import {
  Box,
  Container,
  Text,
  useColorModeValue,
  Input,
  Checkbox,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import TimezoneSelect from 'react-timezone-select';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import DatePicker from "react-datepicker";

// for transformative functions prefer currying
export const convertTz = (time: Dayjs) => (zone: string) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  
  return time.tz(zone);
}

type TimeZoneConverterProps = {
  time: Dayjs
};

const TimeZoneConverter = (props: TimeZoneConverterProps) => {
  const { time } = props;

  const [selectedDate, setSelectedDate] = useState(time);

  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );

  const convertTzSelected = convertTz(selectedDate)(selectedTimezone);

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
                value={selectedTimezone}
                onChange={(zone) => setSelectedTimezone(zone.value)}
              />
          </GridItem>
          <GridItem colSpan={2}>
            <Box border="1px solid #3182ce">
              <DatePicker
                selected={selectedDate.toDate()}
                onChange={(date) => setSelectedDate(dayjs(date))}
                showTimeSelect
                dateFormat="MM dd, yyyy hh:mm aa"
              />
  
            </Box>
          </GridItem>
          
        
          <GridItem colSpan={5}>
              <Text>Use current timezone and date/time: <b>{`${selectedTimezone} ${selectedDate.format('MM dd, yyyy hh:mm aa')}`}</b></Text>
              <Checkbox data-testid="current-timezone-selector" defaultChecked={!selectedTimezone} />
              <br/>
          </GridItem>
          <GridItem colSpan={1}>
              <Text> Target: </Text>
          </GridItem>
          
          <GridItem colSpan={2} >
              <Input disabled placeholder="" variant="outline" borderColor="#3182ce" colorScheme="white" value={convertTzSelected.format('MM dd, yyyy hh:mm aa')}/>
          </GridItem>
        </Grid>
      </Box>
  
      </Container>
  );
}

export default TimeZoneConverter;
