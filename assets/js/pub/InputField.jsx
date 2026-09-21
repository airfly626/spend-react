import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';


export function ComboBoxAutoComplete(props) {
    const {
        label = 'Movie',
        options = lifeCategory,
    } = props;

    return (
        <Autocomplete
            {...props}
            disablePortal
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) =>
                <TextField
                    {...props}
                    {...params}
                    label={label}
                />
            }
        />
    );
}

ComboBoxAutoComplete.propTypes = {
    label: PropTypes.string,
    options: PropTypes.any
};


export function AutoSelectAutoComplete(props) {
    const {
        id = 'auto-select',
        label = 'autoSelect',
        options = [],
        variant = 'standard',
        name,
        value,
        required = false,
        onChange,
        helperText
    } = props;

    return (
        <Autocomplete
            autoSelect
            id={id}
            value={value}
            options={options}
            onChange={onChange}
            getOptionLabel={(option) => option.label || null}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderInput={(params) => (
                <TextField
                    {...params}
                    required={required}
                    variant={variant}
                    label={label}
                    name={name}
                    error={!!helperText?.length}
                    helperText={helperText}
                />
            )}
            sx={{ my: 1 }}
        />
    )
}

AutoSelectAutoComplete.propTypes = {
    id: PropTypes.any,
    label: PropTypes.string,
    options: PropTypes.any,
    variant: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.any,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    helperText: PropTypes.string,
};


export const lifeCategory = [
    { label: '食', value: 1 },
    { label: '衣', value: 2 },
    { label: '住', value: 3 },
    { label: '交通', value: 4 },
    { label: '教育、學習', value: 5 },
    { label: '娛樂', value: 6 },
    { label: '卡費', value: 7 },
    { label: '雜項', value: 99 },
    { label: '收入', value: 21 },
];


export function BasicTextFields(props) {
    const {
        id = 'standard-basic',
        label = 'Standard',
        variant = 'standard',
        helperText
    } = props;

    return (
        <Box
            sx={{ my: 1 }}
            autoComplete="off"
        >
            <TextField
                {...props}
                id={id}
                label={label}
                variant={variant}
                fullWidth
                error={helperText && helperText.length > 0 ? true : false}
                helperText={helperText}
            />
        </Box>
    );
}

BasicTextFields.propTypes = {
    id: PropTypes.any,
    label: PropTypes.string,
    variant: PropTypes.string,
    helperText: PropTypes.string,
};


export function InputAmountFields(props) {
    const {
        id = 'Amount',
        variant = 'standard',
        currencySymbol = 'NTD',
        required = false,
        name,
        value,
        onChange,
        helperText
    } = props;

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', my: 1 }}>
            <FormControl fullWidth variant={variant}
                required={required}
                error={!!helperText?.length}
            >
                <InputLabel htmlFor={id}>
                    {id}
                </InputLabel>
                <Input
                    id={id}
                    startAdornment={
                        <InputAdornment position="start">{currencySymbol}</InputAdornment>
                    }
                    name={name}
                    value={value}
                    onChange={onChange}
                    type='number'
                    aria-describedby={`${id}-error-text`}
                />
                <FormHelperText id={`${id}-error-text`}>{helperText}</FormHelperText>
            </FormControl>
        </Box>
    )
}

InputAmountFields.propTypes = {
    id: PropTypes.any,
    variant: PropTypes.string,
    currencySymbol: PropTypes.string,
    required: PropTypes.bool,
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    helperText: PropTypes.string
};


export function AmountTextField(props) {
    const {
        id = 'standard-basic-symbol',
        label = 'With normal TextField',
        variant = 'standard',
        currencySymbol = 'NTD',
        helperText
    } = props;

    return (
        <Box
            sx={{ my: 1 }}
            autoComplete="off"
        >
            <TextField
                {...props}
                label={label}
                id={id}
                slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start">{currencySymbol}</InputAdornment>,
                    },
                }}
                variant={variant}
                fullWidth
                error={helperText && helperText.length > 0 ? true : false}
                helperText={helperText}
            />
        </Box>
    )
}

AmountTextField.propTypes = {
    id: PropTypes.any,
    label: PropTypes.string,
    variant: PropTypes.string,
    currencySymbol: PropTypes.string,
    helperText: PropTypes.string,
};