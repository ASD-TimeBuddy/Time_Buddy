import { render, screen } from '@testing-library/react';


import Wrapper from '../wrapper';
import TimeConverter from '../../src/pages/time-converter';

describe('LocationCardContent', () => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
      Promise.resolve(
        success({
          coords: {
            latitude: 51.1,
            longitude: 45.3,
          },
        }),
      ),
    ),
  };

  global.navigator.geolocation = mockGeolocation;

  it('should display location', () => {
    render(<TimeConverter />, { wrapper: Wrapper });
    const location = screen.getByTestId('location-test');

    expect(location).toBeVisible();
  });
});
