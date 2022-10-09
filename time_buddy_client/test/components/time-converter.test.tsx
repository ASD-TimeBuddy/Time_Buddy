import { render } from '@testing-library/react';
import { CurrentTimeZoneSelector } from '../../src/components/time-zone-converter/current-timezone-selector';

describe('CurrentTimeZoneSelector', () => {
  it('should call handle checkbox when checkbox clicked', () => {
    const handleCheckboxSelect = jest.fn();
    const currentTimezoneComponent = render(<CurrentTimeZoneSelector currentSelected={true} onChange={handleCheckboxSelect}/>);
    const checkbox = currentTimezoneComponent.getByTestId("current-timezone-selector");
    checkbox.click();
    expect(handleCheckboxSelect).toHaveBeenCalledTimes(1);
});
});
