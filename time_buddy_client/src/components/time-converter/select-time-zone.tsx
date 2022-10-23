import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import type { TimezoneT } from '../../data/constants';

type SelectTimeZoneProps = {
  placeholder: string;
  onChange: (tz: string) => void;
  zones: TimezoneT;
};

const SelectTimeZone = (props: SelectTimeZoneProps) => {
  const { zones, placeholder, onChange } = props;

  const selectOption = ([k, v]: [string, string]) => (
    <option key={k} value={k}>
      {v}
    </option>
  );

  const selectOptions = Object.entries(zones).map(selectOption);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <FormControl>
      <FormLabel>Select Timezone</FormLabel>
      <Select onChange={handleSelectChange} placeholder={placeholder}>
        {selectOptions}
      </Select>
    </FormControl>
  );
};

export default SelectTimeZone;
