import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Header } from './Header';
import { NavigationDrawer } from './NavigationDrawer';
import CableIcon from '@mui/icons-material/Cable';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import PublicIcon from '@mui/icons-material/Public';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Routes, Route, useNavigate } from "react-router-dom";
import FeatureFlagListing from './FeatureFlag/FeatureFlagListing';
import { FeatureFlagDetail } from './FeatureFlag/FeatureFlagDetail';


const list = [
    { name: 'Feature flag', url: 'feature-flag', icon: <CableIcon /> },
    { name: 'Target groups', url: 'target-group', icon: <CrisisAlertIcon /> },
    { name: 'Environment', url: 'environment', icon: <PublicIcon /> }
]


export const Layout = () => {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const navigator = useNavigate();

    return <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header position="absolute" open={open}>
            <Toolbar
                sx={{
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: '36px',
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    Dashboard
                </Typography>
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </Header>
        <NavigationDrawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
                {
                    list.map((item) => (
                        <ListItem key={item.name} disablePadding onClick={() => {
                            navigator(item.url)
                        }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </NavigationDrawer>
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <Toolbar />
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Routes>
                    <Route path="feature-flag" element={<FeatureFlagListing />} />
                    <Route path="feature-flag/:id" element={<FeatureFlagDetail />} />
                    <Route path="target-group" element={<About />} />
                    <Route path="environment" element={<Dashboard />} />
                    <Route path="*" element={<Dashboard />} />
                </Routes>
            </Container>
        </Box>
    </Box>
}

function Home() {
    return (
        <div>
            <h2>Home</h2>
        </div>
    );
}

function About() {
    return (
        <div>
            <h2>About</h2>
        </div>
    );
}

function Dashboard() {
    return (
        <div>
            <h2>Dashboard</h2>
        </div>
    );
}