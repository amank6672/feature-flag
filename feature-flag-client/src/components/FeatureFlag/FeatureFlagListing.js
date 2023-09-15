import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Switch, TextField, Typography } from '@mui/material';
import { addFeatureFlag, convertToSnakeCase, getFeatureFlagList, updateFeatureFlag } from '../../service/featureFlagService';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const defaultFlag = {
    "identifier": "",
    "name": "",
    "description": "",
    "flagDisabledState": false,
    "flagEnabledState": true,
}

export default function FeatureFlagListing() {
    const [flagList, setFlagList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [flag, setFlag] = useState(defaultFlag);

    useEffect(() => {
        getFeatureFlagList()
            .then(setFlagList)
    }, []);

    const updateFlagStatus = (e, id) => {
        const flagState = e.target.checked;
        updateFeatureFlag({ id, flagState })
            .then(res => {
                getFeatureFlagList()
                    .then(setFlagList)
            })
    }

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setFlag((prevFlag) => ({ ...prevFlag, [name]: value }))
    }

    const createFlag = () => {
        const flagState = {
            ...flag,
            identifier: convertToSnakeCase(flag.name)
        };
        addFeatureFlag(flagState)
            .then(() => {
                setShowModal(false);
                setFlag(defaultFlag);
                getFeatureFlagList()
                    .then(setFlagList)
            })
    }

    return (
        <>
            <Button variant="contained" endIcon={<AddIcon />} onClick={() => setShowModal(!showModal)}>New feature flag </Button>
            <br />
            <br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell width="20%">Name</TableCell>
                            <TableCell width="20%">Identifier</TableCell>
                            <TableCell width="50%">Description</TableCell>
                            <TableCell align="right" width="10%">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {flagList.map((row) => (
                            <TableRow
                                key={row.identifier}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell width="20%" component="th" scope="row">
                                    <Typography fontWeight="bold">
                                        <Link to={`/feature-flag/${row.id}`}>
                                            {row.name}
                                        </Link>
                                    </Typography>
                                </TableCell>
                                <TableCell width="20%">{row.identifier}</TableCell>
                                <TableCell width="50%">{row.description}</TableCell>
                                <TableCell align="right" width="10%">
                                    <Switch
                                        checked={row.flagState}
                                        onChange={(e) => updateFlagStatus(e, row.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        About the flag
                    </Typography>
                    <Box display="flex" flexDirection="column">
                        <Box width={200} marginBottom={0.5}>
                            <TextField
                                label="Flag name"
                                name="name"
                                variant="standard"
                                value={flag.name}
                                onChange={handleChange}
                            />
                        </Box>
                        <Box width={400} marginBottom={5}>
                            <TextField
                                label="Description"
                                name='description'
                                variant="standard"
                                fullWidth
                                value={flag.description}
                                onChange={handleChange}
                            />
                        </Box>
                        <Typography>Default rules for the flag</Typography>
                        <Box display="flex" alignItems="center" marginBottom={1}>
                            <InputLabel id="when-enabled">If the flag is Enabled, serve </InputLabel>
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <Select
                                    labelId="when-enabled"
                                    id="when-enabled"
                                    name='flagEnabledState'
                                    value={flag.flagEnabledState}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={true}>True</MenuItem>
                                    <MenuItem value={false}>False</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <InputLabel id="when-enabled">If the flag is Disabled, serve </InputLabel>
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <Select
                                    labelId="when-enabled"
                                    id="when-enabled"
                                    name='flagDisabledState'
                                    value={flag.flagDisabledState}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={true}>True</MenuItem>
                                    <MenuItem value={false}>False</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="row-reverse">
                        <Button variant="contained" sx={{ m: 1 }} onClick={createFlag}>Create</Button>
                        <Button variant="outlined" sx={{ m: 1 }} onClick={() => {
                            setShowModal(false)
                            setFlag(defaultFlag);
                        }}>Cancel</Button>
                    </Box>
                </Box>
            </Modal>
        </>

    );
}