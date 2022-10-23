import { render } from '@testing-library/react';

import Wrapper from '../../wrapper';
import TimeZoneConverter, {
  convertTz,
} from '../../../src/components/time-converter/time-zone-converter';

describe('CurrentTimeZoneSelector', () => {
  it('Correctly converts timezones', () => {
    const time = new Date(Date.UTC(2022, 1, 1, 0, 0));

    render(<TimeZoneConverter />, { wrapper: Wrapper });

    const testTime = convertTz(time);
    expect(time.toISOString()).toBe('2022-01-01T00:00:00Z');
    expect(testTime('Australia/Sydney')).toBe('2022-01-01T11:00:00+11:00');
  });
});
