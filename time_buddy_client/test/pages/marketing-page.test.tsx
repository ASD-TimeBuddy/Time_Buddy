import { render } from '@testing-library/react';

import Wrapper from '../wrapper';
import MarketingPage from '../../src/pages/home';

describe('Marketing Page should be display', () => {
  it('should display event countdown', () => {
    render(<MarketingPage />, { wrapper: Wrapper });
  });
});
