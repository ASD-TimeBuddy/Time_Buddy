import { render, screen } from '@testing-library/react';

import ThemeWrapper from '../theme_wrapper';
import LocationCardContent from '../../src/pages/time-converter';

describe('LocationCardContent', () => {
  it('should display location', () => {
    render(<LocationCardContent />, { wrapper: ThemeWrapper });
    const location = screen.getByTestId('location-test');

    expect(location).toBeVisible();
  });
});