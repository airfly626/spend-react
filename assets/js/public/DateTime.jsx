import * as React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn.js';
import updateLocale from "dayjs/plugin/updateLocale.js";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider, DatePicker, MobileDatePicker, DesktopDatePicker, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';


export function BasicDatePicker() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker label="Basic date picker" />
            </DemoContainer>
        </LocalizationProvider>
    );
}

export function ResponsiveDatePicker(props) {
    const {
        label = 'Responsive variant',
        variant = 'standard',
        required = false,
        value,
        helperText
    } = props;

    const [error, setError] = React.useState(null);
    const errorMessage = React.useMemo(() => {
        switch (error) {
            case 'maxDate':
            case 'minDate': {
                return 'Please select a date in the first quarter of 2022';
            }

            case 'invalidDate': {
                return '日期無效或必填';
            }

            default: {
                return '';
            }
        }
    }, [error]);

    dayjs.extend(updateLocale);
    dayjs.updateLocale("zh-cn", {
        weekStart: 0
    });


    return (
        <Box sx={{ my: 1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-cn">
                <DatePicker
                    {...props}
                    label={label}
                    value={dayjs(value)}
                    format='YYYY/MM/DD'
                    views={['year', 'month', 'day']}
                    onError={(newError) => setError(newError)}
                    slotProps={{
                        textField: {
                            variant: variant,
                            error: !!helperText?.length || !!error,
                            helperText: helperText?.length ? helperText : errorMessage,
                            fullWidth: true,
                            required: { required },
                        },
                    }}
                />
            </LocalizationProvider>
        </Box>
    )
}


export const localeDate = (date) => dayjs(date).format('YYYY-MM-DD');


export function isValidDate(dateStr) {
    let dateObj = new Date(Date.parse(dateStr));
    let dateStrArr = dateStr.split('-');
    let dateObjArr = [];
    let isValid = true;

    dateObjArr.push(dateObj.getFullYear());
    dateObjArr.push(String(dateObj.getMonth() + 1).padStart(2, '0'));
    dateObjArr.push(String(dateObj.getDate()).padStart(2, '0'));

    for (const [k, element] of dateObjArr.entries()) {
        if (element != dateStrArr[k]) {
            isValid = false;

            break;
        }
    }

    return isValid;
}

ResponsiveDatePicker.propTypes = {
    label: PropTypes.string,
    variant: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.any,
    errorMessage: PropTypes.string,
    helperText: PropTypes.string,
};