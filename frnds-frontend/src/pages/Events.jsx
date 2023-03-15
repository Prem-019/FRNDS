import React from "react";
import {
  AppBar,
  Popover,
  CssBaseline,
  CardMedia,
  CardContent,
  CardActions,
  Card,
  Button,
  Grid,
  Box,
  Toolbar,
  Typography,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  ListItem,
  List,
  Divider,
  Avatar,
  Tab,
  Stack,
  Tooltip
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4
};

const cards = [
  {
    title: "Post-Game Grill & Chill",
    venue: "157 University Ave W",
    city:"Windsor",
    message:"Registered successfully",
    details:
      "Includes live music, food and drink, games, contests, and opportunities for fans to meet and interact with players or performers.",
    image:
      "https://images.unsplash.com/photo-1671368913134-c211bc02487f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YmFza2V0YmFsbCUyMHdhdGNoaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60"
  },
  {
    title: "Cleans ‘n Eats",
    venue: "571 Erie St E",
    city:"Windsor",
    message:"Not enough score to register",
    details:
      "Join us for a day of fun, creativity, and baking magic! You'll have the opportunity to learn from professional bakers and get hands-on experience with various baking techniques and recipes.",
    image:
      "https://images.unsplash.com/photo-1532499016263-f2c3e89de9cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGJha2luZyUyMGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60"
  },
  {
    title: "Coffee & Conversation",
    venue: "800 Wyandotte St E",
    message:"Registered successfully",
    city:"Windsor",
    details:
      "Get ready for a day filled with the aromas and tastes of the world's finest coffees. You'll have the opportunity to sample a wide range of specialty coffees from around the world, including rare and exotic blends.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNvZmZlZSUyMGFuZCUyMGNvbnZlcnNhdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1400&q=60"
  },
  {
    title: "Google Developer Club Event",
    venue: "401 Sunset Avenue",
    city:"Windsor",
    message:"Registered successfully",
    details:
      "Join us for a day filled with thought-provoking talks and hands-on workshops led by industry experts and network with other tech enthusiasts.",
    image:
      "https://images.unsplash.com/photo-1638136264464-2711f0078d1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGdvb2dsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1400&q=60"
  },
  {
    title: "Easter 2023",
    venue: "300 Tecumseh Rd E",
    city:"Windsor",
    message:"Event fully booked out",
    details:
      "You'll have the opportunity to participate in an egg hunt, decorate Easter eggs, and take part in other festive activities.",
    image:
      "https://images.unsplash.com/photo-1521967663429-271bae24b5b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZWFzdGVyJTIwZXZlbnRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60"
  },
  {
    title: "Bibliophiles Meet",
    venue: "185 Ouellette Avenue",
    city:"Windsor",
    message:"Registeration closed",
    details:
      "Join us for a day filled with book discussions, author talks, and literary-themed activities. You'll have the opportunity to connect with other book lovers, discuss your favorite books, and discover new authors and genres.",
    image:
      "https://images.unsplash.com/photo-1558901357-ca41e027e43a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGJvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=1400&q=60"
  }
];

const users = [
  { name: "Remy Sharp" },
  { name: "Cindy Baker" },
  { name: "Joe Quinn" },
  { name: "Howard Tanner" },
  { name: "Peter Parker" }
];

const theme = createTheme();

function Events() {
  const [open, setOpen] = React.useState(false);
  const [userOpen, setUserOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleUserOpen = () => setUserOpen(true);
  const handleUserClose = () => setUserOpen(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState("1");
  const [current, setCurrent] = React.useState(null);
  const token = localStorage.getItem('token')
  const [events, setEvents] = React.useState([]);
  const [myEvents, setMyEvents] = React.useState([]);


  React.useEffect(() => {
    getEvents()
    getMyEvents()
    if(events.length === 0){
      setEvents(cards)
    }
    if(myEvents.length === 0){
      setMyEvents(cards.slice(2,4))
    }
  }, [])
  
  const getEvents = () => {
    const config = {
      method: 'get',
      url: 'http://localhost:3100/api/events',
      headers: { 
        'Authorization': 'Bearer '+ token
      },
    };
    
    axios(config)
    .then(function (response) {
      setEvents(response.data);
    })
    .catch(function (error) {
      console.log(error);
      toast.error(error.response.data.message)
    });
  }

  const getMyEvents = () => {
    const config = {
      method: 'get',
      url: 'http://localhost:3100/api/events/myEvents',
      headers: { 
        'Authorization': 'Bearer '+ token
      },
    };
    
    axios(config)
    .then(function (response) {
      setMyEvents(response.data);
    })
    .catch(function (error) {
      console.log(error);
      toast.error(error.response.data.message)
    });
  }

  const registerForEvent = (id, message) =>{
    // var config = {
    //   method: 'post',
    //   url: `http://localhost:3100/api/events/register/${id}`,
    //   headers: { 
    //     'Authorization': 'Bearer '+ token
    //   }
    // };
    
    // axios(config)
    // .then(function (response) {
    //   console.log(JSON.stringify(response.data));
    //   toast.success("Register Successfully")
    // })
    // .catch(function (error) {
    //   console.log(error);
    //   toast.error(error.response.data.message)
    // });
    toast.info(message)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvtar = () => {
    setAnchorEl(null);
  };

  const createEvent = () => {
    let score = Math.floor(Math.random() * (500 - 1 + 1)) + 1;
    if (score > 300) {
      toast.success("Event created");
    } else {
      toast.error("Not enough score to create event");
    }
  };

  const avatarOpen = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <CssBaseline />
      {/* <AppBar position="relative" color="secondary">
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Typography variant="h6" color="inherit" noWrap>
            FRNDS
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Button variant="contained" onClick={handleOpen}>
              Create Event
            </Button>
            <Modal open={open} onClose={handleClose}>
              <Box sx={style}>
                <Typography id="create-event-modal" variant="h6" component="h2">
                  Add Event Details
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Event Title"
                  name="title"
                  autoComplete="title"
                  autoFocus
                  size="small"
                  variant="filled"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="details"
                  label="Details"
                  name="details"
                  autoComplete="details"
                  autoFocus
                  size="small"
                  variant="filled"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="location"
                  label="Location"
                  name="location"
                  autoComplete="location"
                  autoFocus
                  size="small"
                  variant="filled"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="capacity"
                  label="Capacity"
                  name="capacity"
                  autoComplete="capacity"
                  autoFocus
                  size="small"
                  variant="filled"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={createEvent}
                >
                  Create
                </Button>
              </Box>
            </Modal>
            
          </Box>
        </Toolbar>
      </AppBar> */}
      <main>
      {/* <Box
          sx={{
            bgcolor: "background.paper",
            pt: 2,
            pr:2,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end"
          }}
        >
        <Button variant="contained" onClick={handleOpen}>
          Create Event
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography id="create-event-modal" variant="h6" component="h2">
              Add Event Details
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Event Title"
              name="title"
              autoComplete="title"
              autoFocus
              size="small"
              variant="filled"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="details"
              label="Details"
              name="details"
              autoComplete="details"
              autoFocus
              size="small"
              variant="filled"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="location"
              label="Location"
              name="location"
              autoComplete="location"
              autoFocus
              size="small"
              variant="filled"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="capacity"
              label="Capacity"
              name="capacity"
              autoComplete="capacity"
              autoFocus
              size="small"
              variant="filled"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={createEvent}
            >
              Create
            </Button>
          </Box>
        </Modal>
        </Box> */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 2,
            pb: 6,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange}>
                <Tab label="Events near you" value="1" />
                <Tab label="Registered Events" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Container sx={{ p: 4 }} maxWidth="lg">
                {/* End hero unit */}
                <Grid container spacing={4}>
                  {events.map((card) => (
                    <Grid item key={card} xs={12} sm={12} md={4}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column"
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={card.image}
                          alt="random"
                          sx={{ width: "100%", height: "300px" }}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {card.name}
                          </Typography>
                          <Typography mb={2} sx={{ height: "200px" }}>
                            {card.details}
                          </Typography>
                          <Divider />
                          <Typography mt={2} color="primary">
                            {card.venue + ", " + card.city}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            size="medium"
                            variant="contained"
                            color="secondary"
                            sx={{ ml: 1, mb: 2 }}
                            onClick={() =>
                              registerForEvent(card._id, card.message)
                            }
                          >
                            Join Event
                          </Button>
                          <ToastContainer />
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </TabPanel>
            <TabPanel value="2">
              <Container sx={{ p: 4 }} maxWidth="lg">
                <Grid container spacing={4}>
                  {myEvents.map((card) => (
                    <Grid item key={card} xs={12} sm={12} md={4}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column"
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={card.image}
                          alt="random"
                          sx={{ width: "100%", height: "300px" }}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {card.name}
                          </Typography>
                          <Typography mb={2} sx={{ height: "200px" }}>
                            {card.details}
                          </Typography>
                          <Divider />
                          <Typography mt={2} color="primary">
                            {card.venue + ", "+ card.city}
                          </Typography>
                        </CardContent>
                        <Divider />
                        <Typography variant="small" px={2} pt={2}>
                          Registered Users
                        </Typography>
                        <CardActions>
                          <Stack direction="row" spacing={2} p={2} pt={1}>
                            {users.map((name) => {
                              return (
                                <>
                                  <Avatar
                                    alt={name.name}
                                    src="/static/images/avatar/1.jpg"
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setCurrent(name.name);
                                      handleUserOpen();
                                    }}
                                  />
                                  <Modal
                                    open={userOpen}
                                    onClose={handleUserClose}
                                  >
                                    <Box sx={style}>
                                      <Stack direction="row" spacing={2} mb={2}>
                                        <Avatar
                                          alt={current}
                                          src="/static/images/avatar/1.jpg"
                                        />
                                        <Typography
                                          id="user-modal"
                                          variant="h6"
                                          component="h2"
                                          pt={0.5}
                                        >
                                          {current}
                                        </Typography>
                                      </Stack>
                                      <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="message"
                                        label="Type your message here"
                                        name="message"
                                        autoComplete="message"
                                        autoFocus
                                        size="small"
                                        variant="filled"
                                      />
                                      <Stack
                                        direction="row"
                                        spacing={2}
                                        p={2}
                                        mt={2}
                                      >
                                        <Tooltip title="Enter message that you want to send user">
                                          <Button
                                            type="submit"
                                            variant="contained"
                                            onClick={() => {
                                              handleUserClose();
                                              toast.success(
                                                "Message sent successfully"
                                              );
                                            }}
                                          >
                                            Message User
                                          </Button>
                                        </Tooltip>
                                        <Tooltip title="Enter reason for reporting user">
                                          <Button
                                            type="submit"
                                            variant="contained"
                                            onClick={() => {
                                              handleUserClose();
                                              toast.success("User Reported");
                                            }}
                                          >
                                            Report User
                                          </Button>
                                        </Tooltip>
                                      </Stack>
                                    </Box>
                                  </Modal>
                                </>
                              );
                            })}
                            <Typography variant="body2"> + 49 more</Typography>
                          </Stack>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </TabPanel>
          </TabContext>
        </Box>
      </main>
    </ThemeProvider>
  );
}

export default Events;
