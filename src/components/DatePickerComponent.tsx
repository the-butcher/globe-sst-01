// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// import DateAdapter from '@mui/lab/AdapterDateFns';
import { useState } from "react";
import { IInstantProps } from "./IInstantProps";

function DatePickerComponent(props: IInstantProps) {

  const { handleInstantChange } = props;
  const [callbackTimeout, setCallbackTimeout] = useState<number>(-1);

  /**
   * fires twice upon change for unknown reasons
   * there timeout implemented to catch first call and fire upon second
   * @param date
   */
  const handleInstantChange2 = (date: Date | null) => {
    window.clearTimeout(callbackTimeout);
    const _callbackTimeout = window.setTimeout(() => {
      handleInstantChange(date!.getTime());
    }, 10);
    setCallbackTimeout(_callbackTimeout);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={'"month" and "year"'} views={['year']}
        value={new Date(props.instant)}
        minDate={new Date("2022-01-01")}
        maxDate={new Date("2023-07-23")}
        onChange={handleInstantChange2}

      // inputFormat={'dd.MM.yyyy'}
      // mask={'__.__.____'}
      // renderInput={(params) => <TextField style={{ margin: '10px', marginRight: '24px' }} size="small" {...params} variant="standard" />}
      />
    </LocalizationProvider>
  );

}

export default DatePickerComponent;