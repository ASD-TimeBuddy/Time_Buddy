import { render, screen } from '@testing-library/react';

import ThemeWrapper from '../../_theme_wrapper';
import Navbar from '../../components/navbar';

describe('Navbar', () => {
  it('should have a nav container', () => {
    render(<Navbar />, { wrapper: ThemeWrapper });
  });
});
