import { FormControl, MenuItem, Select } from '@mui/material';
import { useState } from "react";
import { IInstantProps } from "./IInstantProps";

function DatePickerComponent(props: IInstantProps) {

  // const { handleInstantChange } = props;
  // const [callbackTimeout, setCallbackTimeout] = useState<number>(-1);

  const [year, setYear] = useState<number>(2023);

  return (
    <FormControl >
      <Select
        disabled
        sx={{ fontSize: '14px', fontFamily: 'Courier Prime Sans', fontStyle: 'plain', padding: '11px' }}
        value={year}
        size='small'
        variant='standard'
        onChange={(e) => {
          setYear(e.target.value as number)
        }}
        disableUnderline
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value="2023">2023</MenuItem>

      </Select>
    </FormControl >
  );

}

export default DatePickerComponent;