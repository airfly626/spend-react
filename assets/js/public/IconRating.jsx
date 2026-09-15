import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import MoodBadIcon from '@mui/icons-material/MoodBad';


const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
        color: (theme.vars || theme).palette.action.disabled
    },
}));

export const customIcons = {
    1: {
        icon: <MoodBadIcon color="error" sx={{ fontSize: 35, marginRight: 0.5 }} />,
        label: '非常不開心',
        color: "error"
    },
    2: {
        icon: <SentimentDissatisfiedIcon color="warning" sx={{ fontSize: 35, marginRight: 0.5 }} />,
        label: '不開心',
        color: "warning"
    },
    3: {
        icon: <SentimentSatisfiedIcon color="success" sx={{ fontSize: 35, marginRight: 0.5 }} />,
        label: '普通',
        color: "success"
    },
    4: {
        icon: <SentimentSatisfiedAltIcon color="info" sx={{ fontSize: 35, marginRight: 0.5 }} />,
        label: '開心',
        color: "info"
    },
    5: {
        icon: <SentimentVerySatisfiedIcon color="secondary" sx={{ fontSize: 35, marginRight: 0.5 }} />,
        label: '非常開心',
        color: "secondary"
    },
};

function IconContainer(props) {
    const { value, ...other } = props;

    return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
};

export function MoodSmileRating(props) {
    const {
        id,
        label = 'Controlled',
        name = 'highlight-selected-only',
        value = 3,
        onChange,
        helperText
    } = props;

    const [hover, setHover] = React.useState(-1);
    const showCondition = hover !== -1 ? hover : value;
    const error = !!helperText?.length;

    return (
        <Box sx={{ '& > legend': { mt: 1, mb: 0.5 } }}>
            <Typography
                component="legend"
                sx={{
                    fontSize: "0.75rem",
                    color: error ? "#d32f2f" : "#00000099"
                }}
            >
                {label}
                {value !== null && (
                    <Typography component={"span"} sx={{ fontSize: "0.75rem", fontWeight: 700 }} color={`${customIcons[showCondition].color}`}>
                        {customIcons[showCondition].label}
                    </Typography>
                )}
            </Typography>
            <StyledRating
                id={id}
                name={name}
                value={value}
                getLabelText={(value) => customIcons[value].label}
                slotProps={{
                    icon: { component: IconContainer }
                }}
                highlightSelectedOnly
                onChange={onChange}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
            />
            {
                error &&
                <Typography
                    component="p"
                    sx={{
                        fontSize: "0.75rem",
                        color: "#d32f2f"
                    }}>
                    {helperText}
                </Typography>
            }
        </Box>
    );
}

MoodSmileRating.propTypes = {
    id: PropTypes.any,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    helperText: PropTypes.string,
};


export function BasicRating(props) {
    const {
        label = 'Controlled',
    } = props;

    const [value, setValue] = React.useState(3);

    return (
        <Box sx={{ '& > legend': { mt: 1 } }}>
            <Typography
                {...props}
                component="legend"
                sx={{
                    fontSize: "0.75rem",
                    color: "#00000099"
                }}
            >
                {label}
            </Typography>
            <Rating
                {...props}
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            />
        </Box>
    );
}

BasicRating.propTypes = {
    label: PropTypes.string
};