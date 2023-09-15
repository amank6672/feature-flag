import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getFeatureFlag, updateFeatureFlag } from "../../service/featureFlagService";
import { Box, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Switch, Tab, Tabs, Typography, styled } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
}));

export const FeatureFlagDetail = () => {
    const { id } = useParams();
    const [flag, setFlag] = useState({});
    useEffect(() => {
        if (id) {

            getFeatureFlag(id).
                then(setFlag);
        }
    }, [id])

    const updateFlagStatus = (e) => {
        const flagState = e.target.checked;
        updateFeatureFlag({ id: flag.uuid, flagState })
            .then(res => {
                getFeatureFlag(id)
                    .then(setFlag)
            })
    }
    console.log('flag', flag)
    return <Box sx={{ flexGrow: 1, height: '100%' }} >
        <Grid container spacing={0} >
            <Grid item xs={4}>
                <Item>
                    <Box paddingBottom={3}>
                        <Typography fontWeight="bold">Name: {flag?.name}</Typography>
                    </Box>
                    <Box paddingBottom={3}>
                        <Typography>Identifier: {flag?.identifier}</Typography>
                        <Typography>Created at: {new Date(flag?.createdAt).toDateString()}</Typography>
                        <Typography>Updated at: {new Date(flag?.updatedAt).toDateString()}</Typography>
                    </Box>

                    <Box>
                        <Typography >Prerequisites</Typography>
                        <span>What’s required before enabling this flag</span>
                        <Box display="flex" alignItems="center">
                            {
                                flag.prerequisite ?
                                    <Typography>{flag.prerequisite} : true</Typography>
                                    :
                                    <>
                                        <Typography>Add Prerequisites</Typography>
                                        <AddIcon />
                                    </>
                            }
                        </Box>
                    </Box>
                </Item>
            </Grid>
            <Grid item xs={8}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                    <Tabs value={0} >
                        <Tab label="Targeting" />
                    </Tabs>
                </Box>
                <Box padding={3} paddingTop={2}>
                    <Item>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={flag.flagState}
                                    onChange={updateFlagStatus}
                                />}
                            label={`Flag is ${flag.flagState ? 'Enabled' : 'Disabled'}`}
                        />

                    </Item>
                </Box>

                <Box padding={3} paddingTop={2}>
                    <Item>
                        <Typography fontWeight="bold">When the Flag is Enabled</Typography>
                        <Box sx={{ minWidth: 120, maxWidth: 120 }} >
                            <FormControl fullWidth size="small">
                                <Select
                                    labelId="enabled-rule"
                                    id="enabled-rule"
                                    value={flag.flagEnabledState}
                                // onChange={handleChange}
                                >
                                    <MenuItem value={true}>True</MenuItem>
                                    <MenuItem value={false}>False</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <br />
                        <hr />
                        <br />
                        <Typography>Specific Targeting</Typography>
                        <Box sx={{ minWidth: 120, maxWidth: 120 }} >
                            <FormControl fullWidth size="small">
                                <Select
                                    labelId="enabled-rule"
                                    id="enabled-rule"
                                    value={flag.flagEnabledState}
                                // onChange={handleChange}
                                >
                                    <MenuItem value={true}>True</MenuItem>
                                    <MenuItem value={false}>False</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Item>
                </Box>

                <Box padding={3} paddingTop={2}>
                    <Item>
                        <Typography fontWeight="bold">When the Flag is Disabled</Typography>
                        <Box sx={{ minWidth: 120, maxWidth: 120 }} >
                            <FormControl fullWidth size="small">
                                <Select
                                    labelId="enabled-rule"
                                    id="enabled-rule"
                                    value={flag.flagDisabledState}
                                // onChange={handleChange}
                                >
                                    <MenuItem value={true}>True</MenuItem>
                                    <MenuItem value={false}>False</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Item>
                </Box>
            </Grid>
        </Grid>
    </Box>
}