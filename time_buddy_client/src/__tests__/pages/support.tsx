import { render, screen } from '@testing-library/react';

import SupportPage from '../../pages/support';

describe('Support Page', () => {
  it('should have a header', () => {
    render(<SupportPage />);
    const supportHeader = screen.getByTestId('support-header');

    expect(supportHeader).toHaveTextContent('Time Buddy Support');
  });
});
