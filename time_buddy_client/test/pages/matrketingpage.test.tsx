import { render, screen, fireEvent } from '@testing-library/react';

import ThemeWrapper from '../theme_wrapper';
import Marketingpage from '../../src/pages/home';


describe('Marketing Page should be display', () => {
  it('should display event countdown', () => {
    
    render(<Marketingpage />, { wrapper: ThemeWrapper });
  });


});