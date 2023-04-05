import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { MainListItems, secondaryListItems } from '../components/listItems';
import Events from './Events'
import Profile from './Profile'
import Associations from './Associations'
import Doctors from './Doctors'
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';
import {ListItemText,
  ListItemIcon,
  ListItemAvatar,
  ListItem,
  List,
  Popover,
  Avatar
} from '@mui/material'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const [userOpen, setUserOpen] = React.useState(false);
  const handleUserOpen = () => setUserOpen(true);
  const handleUserClose = () => setUserOpen(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const avatarOpen = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  let navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") )
  console.log(user);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvtar = () => {
    setAnchorEl(null);
  };
  
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const currentTab = localStorage.getItem('currentTab') ?? "Account";
  console.log(currentTab)

  React.useEffect(() => {
    console.log(user)
    if(user == null){
      navigate("/signin")
    }
  }, [])

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} color="secondary">
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
              FRNDS
            </Typography>
            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <AccountCircleIcon
              sx={{ ml: 3, fontSize: "36px", cursor: "pointer" }}
              onClick={handleClick}
            />
            <Popover
              id={id}
              open={avatarOpen}
              anchorEl={anchorEl}
              onClose={handleAvtar}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper"
                }}
              >
                <List sx={{ p: 1 }}>
                  <ListItem sx={{ p: 1 }}>
                    <ListItemAvatar>
                      <Avatar
                        alt={user.name}
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText primary={user.name} />
                  </ListItem>
                  {/* <ListItem sx={{ p: 1, pl: 2 }}>
                    <ListItemIcon>
                      <EmojiEventsIcon />
                    </ListItemIcon>
                    <ListItemText secondary="Score: 100" />
                  </ListItem> */}
                  <Divider />
                  <ListItem sx={{ p: 1, pl: 2, cursor:"pointer" }} onClick={()=>{
                      localStorage.setItem("currentTab", "Account");
                      window.location.reload();
                    }}>
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText secondary="Profile Settings"  />
                  </ListItem>
                  <Divider />
                  <ListItem sx={{ p: 1, pl: 2, cursor:"pointer" }} onClick={
                    () => { 
                      localStorage.removeItem("user")
                      localStorage.removeItem("token")
                      navigate("/signin")
                    }
                  }>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText secondary="Logout" />
                  </ListItem>
                </List>
              </Box>
            </Popover>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
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
            <MainListItems />
            {/* <Divider sx={{ my: 1 }} />
            {secondaryListItems} */}
          </List>
        </Drawer>
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid item xs={12} md={12} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: "100%",
                  }}
                >
                  {(currentTab === "Events" || currentTab === "Événements") && <Events/>}
                  {(currentTab === "My Profile" || currentTab === "Mon profil") && <Profile/>}
                  {currentTab === "Associations" && <Associations/>}
                  {(currentTab === "Doctors" || currentTab === "Médecins") && <Doctors/>}
                </Paper>
              </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}