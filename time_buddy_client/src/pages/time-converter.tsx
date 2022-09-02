import { Text } from '@chakra-ui/react';
import { useDate } from '../components/useDate';
const TimeConverter = () => {
    
    const { date, time, wish } = useDate();
  
    return (
      <div className="greetings-container">
        <h1>
          {wish}
         
        </h1>
  
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

export default TimeConverter;
