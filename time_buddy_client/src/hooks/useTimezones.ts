import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { formatTime, formatDate } from "../components/search-functions";

function useTimezones() {
  const [city, setCity] = useState(null);
  const [cityTimezoneList, setCityTimeZoneList] = useState([]);
  useEffect(() => {
    if (city) {
      getTimezoneByCity(city)
    }
  }, [city]);
  useEffect(() => {
    const myTimeout = setTimeout(timeSet, 500);
    function timeSet() {
    getTimezoneByCity('Beijing,China');
    getTimezoneByCity('New York,America');
  }

  }, []);
  // update time every second;
  useEffect(() => {
    const id = setInterval(() => {
      setCityTimeZoneList((list) => {
        const res = list.map(c => {
          const add = moment(c.dateTime).add(1, 's');
          const d = add.format();
          return { ...c, dateTime: d, time: add.format('HH:mm'), date: add.format('ddd,D MMM') }
        });
        return res;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const getCity = (city) => axios.get(`/v1/current_time/?api_key=6fa4b2e9fbd848bc97011e5e7537387d&location=${city}`)
  const getTimezoneByCity = async (city) => {
    getCity(city).then((res: { data: { datetime: any; requested_location: any; timezone_abbreviation: any; }; }) => {
      setCityTimeZoneList((list) => {
        const data = formatData(res.data);
        return [data, ...list];
      })
    })
  };
  const formatData = (res: object) => {
    const { datetime, requested_location, timezone_abbreviation } = res;
    const c_c = requested_location.split(',');
    const city = c_c[0];
    const country = c_c[1];
    const data = {
      city,
      country,
      dateTime: datetime,
      timeZone: timezone_abbreviation,
      time: moment(datetime).format('HH:mm'),
      date: moment(datetime).format('ddd,D MMM')
    };
    return data;
  }
  return {
    setCity,
    cityTimezoneList,
    setCityTimeZoneList
  }
}

export { useTimezones };