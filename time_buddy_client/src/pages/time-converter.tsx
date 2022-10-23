import TimeZoneConverter from '../components/time-converter/time-zone-converter';
import LocationCard from '../components/time-converter/location-card';

// Always try to split code into as many seperate functions as possible

// use this to fetch the location information from the website
// use useSWR for all data fetching

const TimeConverter = () => (
  <>
    <LocationCard />
    <TimeZoneConverter />
  </>
);

export default TimeConverter;
