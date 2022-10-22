import { render, screen, fireEvent } from '@testing-library/react';

import Wrapper from '../wrapper';
import SupportPage from '../../src/pages/support';

describe('Support Page', () => {
  it('should display faq page', () => {
    render(<SupportPage />, { wrapper: Wrapper });
    const faqPanel = screen.getByTestId('faq-panel');
    const contactPanel = screen.getByTestId('contact-panel');

    fireEvent.click(screen.getByTestId('faq-button'));

    expect(faqPanel).toBeVisible();
    expect(contactPanel).not.toBeVisible();
  });

  it('should display contact us page', () => {
    render(<SupportPage />, { wrapper: Wrapper });
    const faqPanel = screen.getByTestId('faq-panel');
    const contactPanel = screen.getByTestId('contact-panel');

    fireEvent.click(screen.getByTestId('contact-button'));

    expect(faqPanel).not.toBeVisible();
    expect(contactPanel).toBeVisible();
  });
});
