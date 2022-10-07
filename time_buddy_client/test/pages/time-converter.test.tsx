import { render, screen, fireEvent } from '@testing-library/react';

import ThemeWrapper from '../theme_wrapper';
import TimeConverterPage from '../../src/pages/time-converter';
import NavPage from '../../src/components/navbar';
import useDateHook from '../../src/hooks/useDate';

describe('Time converter Page', () => {
  it('should display event countdown', () => {
    
    render(<TimeConverterPage />, { wrapper: ThemeWrapper });
  });


});