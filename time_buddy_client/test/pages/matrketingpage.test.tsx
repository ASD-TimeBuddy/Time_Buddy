import { render, screen, fireEvent } from '@testing-library/react';

import ThemeWrapper from '../theme_wrapper';
import Marketingpage from '../../src/pages/home';
import NavPage from '../../src/components/navbar';
import useDateHook from '../../src/hooks/useDate';

describe('Time converter Page', () => {
  it('should display event countdown', () => {
    
    render(<Marketingpage />, { wrapper: ThemeWrapper });
  });


});