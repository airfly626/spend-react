import * as React from 'react';
import {
    AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, CardMedia, CardActions,
    Avatar, AvatarGroup, Box, Button, Link, Chip, Stack, IconButton, Divider, Paper
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ResponsiveDatePicker, isValidDate, localeDate } from '../../public/DateTime.jsx';
import { AutoSelectAutoComplete, InputAmountFields, BasicTextFields } from '../../public/InputField.jsx';
import { MoodSmileRating } from '../../public/IconRating.jsx';
import { AlertDialog } from '../../public/AlertDialog.jsx';
import RecordTable from './RecordTable';
import { getDailySpends, createDailySpend, deleteDailySpend, updateDailySpend } from '../../api/daily_spend_api';
import { getSpendCategories } from '../../api/spend_category_api';
import { handleSubmitError } from '../../api/request';
import { AutoSnackbar } from '../../context/SnackbarProvider';
import PropTypes from 'prop-types';


export default function RecordForm() {

    const initialState = {
        'spendDate': new Date(),
        'mood': 3,
        'categoryId': null,
        'amount': "",
        'description': ""
    };

    const initialErrorState = {
        'spendDate': "",
        'mood': "",
        'categoryId': "",
        'amount': "",
        'description': "",
        'errors': ""
    };

    const initialType = { type: 'ADD', id: null };

    const [formData, setFormData] = React.useState(initialState);
    const [formError, setFormError] = React.useState(initialErrorState);
    const [lifeCategory, setLifeCategory] = React.useState({});
    const [rows, setRows] = React.useState([]);
    const [currentType, setCurrentType] = React.useState(initialType);
    const [isSubmit, setIsSubmit] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const spendDateLocale = React.useMemo(() => {
        if (!formData.spendDate) return "";

        return localeDate(formData.spendDate);
    }, [formData.spendDate]);


    React.useEffect(() => {
        if (!spendDateLocale || spendDateLocale === 'Invalid Date') return;

        const fetchDailySpendDatas = () => {

            const conditions = {
                spendDate: spendDateLocale
            };

            getDailySpends(conditions, "record")
                .then(function (data) {
                    if (!data) {
                        return;
                    }

                    setRows(data["member"]);
                })
                ;
        }

        fetchDailySpendDatas();
    }, [spendDateLocale, isSubmit]);

    React.useEffect(() => {
        getSpendCategories({}, "recondSpendCategories")
            .then(function (data) {
                if (!data || !data["member"]) {
                    return;
                }

                const formattedCategories =
                    data["member"].map(item => ({
                        id: item["@id"],
                        label: item.categoryName,
                        value: item["@id"].split("/").pop()
                    }));

                setLifeCategory(formattedCategories);

                if (formattedCategories.length > 0) {
                    setFormData(prev => ({
                        ...prev,
                        'categoryId': formattedCategories[0]
                    }))
                }
            })
            .catch(
                err => console.error(err)
            )
            ;
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleDatePickerChange = (name) => (value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        setFormError(initialErrorState);
        setCurrentType(initialType);
    }

    const handleAutoSelectChange = (name) => (e, option) => {
        setFormData(prev => ({
            ...prev,
            [name]: option
        }));
    }

    const handleAmountChange = (e) => {
        const { name, value } = e.target;

        if (/^[\d]*$/.test(value)) {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        validator();
        const newFormData = {
            ...formData,
            spendDate: spendDateLocale,
            categoryId: formData.categoryId?.id || null
        }

        switch (currentType.type) {
            case "ADD":
                try {
                    await createDailySpend(newFormData);

                    handleInitialState();
                    AutoSnackbar("新增成功", "success");
                } catch (error) {

                    handleSubmitError(error, AutoSnackbar, setFormError);
                }

                break;
            case "UPDATE":
                try {
                    await updateDailySpend(newFormData, currentType.id);

                    handleInitialState();
                    AutoSnackbar("更新成功", "success");
                } catch (error) {

                    handleSubmitError(error, AutoSnackbar, setFormError);
                }

                break;
            case "DELETE":
                try {
                    setOpen(false);
                    deleteDailySpend({}, currentType.id);

                    handleInitialState();
                    AutoSnackbar("刪除成功", "success");
                } catch (error) {

                    handleSubmitError(error, AutoSnackbar, setFormError);
                }

                break;
            default:
                return;
        }

        setIsSubmit(!isSubmit);
    }

    const handleUpdate = (id) => {
        rows.filter((row) => {
            if (row.id === id) {
                setFormData(prev => ({
                    ...prev,
                    'spendDate': row.spendDate,
                    'mood': row.mood,
                    'categoryId': lifeCategory.find(item => item.id === row.categoryId["@id"]),
                    'amount': parseInt(row.amount),
                    'description': row.description
                }))

                setCurrentType({ type: "UPDATE", id });
                setFormError(initialErrorState);
            }
        })
    }

    const handleClickOpen = (id) => {
        setOpen(true);
        setCurrentType({ type: "DELETE", id });
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentType(initialType);
    };

    const handleInitialState = () => {
        setCurrentType(initialType);
        setFormData({ ...initialState, 'spendDate': formData.spendDate, categoryId: lifeCategory[0] });
        setFormError(initialErrorState);
    }

    const validator = () => {
        if (!isValidDate(spendDateLocale)) {
            setFormError(prev => ({
                ...prev,
                'spendDate': "不是有效日期!"
            }));
        }

        if (!/^[\d]*$/.test(formData.amount)) {
            setFormError(prev => ({
                ...prev,
                amount: "不是正確數字!"
            }));
        }
    }


    return (
        <>
            <Box component={'form'} onSubmit={handleSubmit} id="alert-dialog-form">
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 10, md: 8 }} offset={{ xs: 0, sm: 1, md: 2 }}>
                        <Card sx={{ bgcolor: 'inherit', color: 'inherit' }}>
                            <CardContent>
                                <Grid container rowSpacing={1} columnSpacing={3}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <ResponsiveDatePicker
                                            required={true}
                                            id="日期"
                                            label="日期"
                                            name={"spendDate"}
                                            value={formData.spendDate}
                                            helperText={formError.spendDate}
                                            onChange={handleDatePickerChange('spendDate')}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <MoodSmileRating
                                            id="心情"
                                            label="心情"
                                            name={"mood"}
                                            value={formData.mood}
                                            helperText={formError.mood}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>

                            <CardContent>
                                <Grid container rowSpacing={1} columnSpacing={3}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <AutoSelectAutoComplete
                                            required
                                            id="項目"
                                            label="項目"
                                            name={"categoryId"}
                                            value={formData.categoryId || null}
                                            helperText={formError.categoryId}
                                            options={lifeCategory}
                                            onChange={handleAutoSelectChange('categoryId')}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <InputAmountFields
                                            required={true}
                                            id="金額"
                                            name={"amount"}
                                            value={formData.amount}
                                            helperText={formError.amount}
                                            onChange={handleAmountChange}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12 }}>
                                        <BasicTextFields
                                            id="明細備註"
                                            label="明細備註"
                                            name={"description"}
                                            value={formData.description}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>

                            <CardActions sx={{ p: 2, pb: 4, pr: 4, display: "flex", justifyContent: "flex-end" }}>
                                <Button type='submit' variant="outlined" endIcon={<SendIcon />}>
                                    {currentType.type === 'ADD' ? '新增' : '更新'}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 1, md: 3 }}></Grid>
                </Grid>
            </Box>

            <RecordTable
                rows={rows}
                handleUpdate={handleUpdate}
                handleClickOpen={handleClickOpen}
            />

            <AlertDialog
                title={"警告"}
                contentText={"確認刪除？"}
                open={open}
                handleClose={handleClose}
            />
        </>
    );
}

RecordForm.propTypes = {
    lifeCategory: PropTypes.any
};