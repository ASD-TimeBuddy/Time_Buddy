import { render } from '@testing-library/react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import Wrapper from '../../wrapper';
import TimeZoneConverter, { convertTz } from '../../../src/components/time-converter/time-zone-converter';


describe('CurrentTimeZoneSelector', () => {
  it('Correctly converts timezones', () => {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    const time = dayjs.utc('2022-01-01T00:00:00.000Z');
    
    render(<TimeZoneConverter time={time} />, { wrapper: Wrapper });
   
    const testTime = convertTz(time);
    expect(time.format()).toBe('2022-01-01T00:00:00Z');
    expect(testTime('Australia/Sydney').format()).toBe('2022-01-01T11:00:00+11:00');
  });
});
