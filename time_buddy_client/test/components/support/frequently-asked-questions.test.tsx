import { render, screen } from '@testing-library/react';
import useSWR from 'swr';

import ThemeWrapper from '../../theme_wrapper';
import FrequentlyAskedQuestions from '../../../src/components/support/frequently-asked-questions';

describe('Frequently Asked Questions Component', () => {
  jest.mock('swr');

  it('should display a loading animation', async () => {
    // simulate loading state
    useSWR.mockImplementation(() => ({
      data: null,
    }));
    // global.useSWR = jest.fn(() => ({ data: null }));
    /*
    jest.mock('swr', () => ({
      _esModule: true,
      default: () => ({ data: null }),
    }));
     */

    render(<FrequentlyAskedQuestions />, { wrapper: ThemeWrapper });
    const loading = screen.getByTestId('faq-loading');

    expect(loading).toBeInTheDocument();
  });

  const stub = {
    data: {
      results: [
        { id: 1, question: 'q_one', answer: 'a_one' },
        { id: 2, question: 'q_two', answer: 'a_two' },
        { id: 3, question: 'q_three', answer: 'a_three' },
      ],
    },
  };

  it('should display a loading animation', async () => {
    global.useSWR = jest.fn(() => stub);
    /*
    jest.mock('swr', () => ({
      _esModule: true,
      default: () => stub,
    }));
     */

    render(<FrequentlyAskedQuestions />, { wrapper: ThemeWrapper });
    const response = screen.getByTestId('faq-accordion');

    expect(response).toBeInTheDocument();
  });
});
