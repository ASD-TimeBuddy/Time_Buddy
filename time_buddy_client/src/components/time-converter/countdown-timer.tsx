import { useState, useEffect } from 'react';
import { Alert, AlertIcon } from '@chakra-ui/react';

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
    <Alert status="warning" data-testid="countdown-panel">
      <AlertIcon /> Event is happening now!
    </Alert>
  ) : (
    <Alert status="info">
      <AlertIcon />
      {`Time till event: ${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`}
    </Alert>
  );
};

export default CountdownTimer;
