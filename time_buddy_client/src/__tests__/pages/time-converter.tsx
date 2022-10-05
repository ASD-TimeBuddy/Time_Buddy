import { render, screen } from '@testing-library/react';

import LocationCardContent from '../../pages/time-converter';

test('should show location', () => {
    render(<LocationCardContent />);
    const location = screen.getByTestId('location-test');

    expect(location).toBeDefined();
});

//import CountdownTimer from '../../pages/support';

//describe('CountdownTimer', () => {
 // it('should be in DHMS format', () => {
  //  render(<CountdownTimer />);
  //  const supportHeader = screen.getByTestId('countdown-test');

  //  expect(supportHeader).toHaveTextContent('Days');
 // });
//});
