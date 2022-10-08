
import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Text,
  useColorModeValue,
  Input,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import TimezoneSelect from 'react-timezone-select';
import timeZoneConverter from 'time-zone-converter';
import { format } from 'date-fns';

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { CurrentTimeZoneSelector } from './current-timezone-selector';

export const TimeZoneConverter = () => {
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
              <CurrentTimeZoneSelector currentSelected={currentSelected} onChange={handleCheckboxSelect}/>
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