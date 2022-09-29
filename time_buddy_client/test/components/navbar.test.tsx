import { render } from '@testing-library/react';

import ThemeWrapper from '../theme_wrapper';
import Navbar from '../../src/components/navbar';

describe('Navbar', () => {
  it('should have a nav container', () => {
    render(<Navbar />, { wrapper: ThemeWrapper });
  });
});
