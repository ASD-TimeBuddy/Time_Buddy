import { render, screen } from '@testing-library/react';
import useSWR from 'swr';

import Wrapper from '../../wrapper';
import FrequentlyAskedQuestions from '../../../src/components/support/frequently-asked-questions';

describe('Frequently Asked Questions Component', () => {
  it('should display a loading animation', async () => {
    render(<FrequentlyAskedQuestions />, { wrapper: Wrapper });
    const loading = screen.getByTestId('faq-loading');

    expect(loading).toBeInTheDocument();
  });

  /*
  it('should display a loading animation', async () => {
    global.useSWR = jest.fn(() => stub);
    jest.mock('swr', () => ({
      _esModule: true,
      default: () => stub,
    }));

    render(<FrequentlyAskedQuestions />, { wrapper: ThemeWrapper });
    const response = screen.getByTestId('faq-accordion');

    expect(response).toBeInTheDocument();
  });
   */
});
