import { render } from '@testing-library/react';

import Wrapper from '../wrapper';
import TimeconverterPage from '../../src/pages/time-converter';

describe('Timeconverter Page should be display', () => {
  it('should display Timeconverter', () => {
    render(<TimeconverterPage />, { wrapper: Wrapper });
  });
});

