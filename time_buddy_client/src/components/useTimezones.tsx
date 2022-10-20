import { useState, useEffect } from "react";
import axios from "axios";
import { formatTime, formatDate } from "./search-functions";
function useTimezones () {
  const [city, setCity] = useState(null);
  const [cityTimezoneList, setCityTimeZoneList] = useState([]);
  useEffect(() => {
    if (city) {
      getTimezoneByCity(city)
    }
  }, [city]);
  const getTimezoneByCity = (city: never) => {
    axios.get(`/v1/current_time/?api_key=6fa4b2e9fbd848bc97011e5e7537387d&location=${city}`).then((res: { data: { datetime: any; requested_location: any; timezone_abbreviation: any; }; }) => {

      setCityTimeZoneList((list) => {
        const { datetime, requested_location, timezone_abbreviation, } = res.data;
        const c_c = requested_location.split(',');
        const city = c_c[0];
        const country = c_c[1];
        const data = {
          city,
          country,
          timeZone: timezone_abbreviation,
          time: formatTime(datetime),
          date: formatDate(datetime)
        };
        return [data, ...list];
      })
    })
  }
  return {
    setCity,
    cityTimezoneList
  }
}

export { useTimezones };