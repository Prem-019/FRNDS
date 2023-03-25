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
  Typography,
  ListItemText,
  ListItemAvatar,
  ListItem,
  List,
  Divider,
  Avatar,
  ListItemButton,
  IconButton,
  Checkbox,
  Tooltip
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const eventModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
  scrollY: "auto",
  marginTop: "70px"
};

const partipantsModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "28%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px"
};

const cards = [
  {
    title: "Post-Game Grill & Chill",
    venue: "157 University Ave W",
    city: "Windsor",
    message: "Registered successfully",
    registeredUsers: [
      { name: "Remy Sharp" },
      { name: "Cindy Baker" },
      { name: "Joe Quinn" },
      { name: "Howard Tanner" },
      { name: "Peter Parker" }
    ],
    details:
      "Includes live music, food and drink, games, contests, and opportunities for fans to meet and interact with players or performers.",
    image:
      "https://images.unsplash.com/photo-1671368913134-c211bc02487f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YmFza2V0YmFsbCUyMHdhdGNoaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60"
  },
  {
    title: "Cleans ‘n Eats",
    venue: "571 Erie St E",
    city: "Windsor",
    message: "Not enough score to register",
    registeredUsers: [],
    details:
      "Join us for a day of fun, creativity, and baking magic! You'll have the opportunity to learn from professional bakers and get hands-on experience with various baking techniques and recipes.",
    image:
      "https://images.unsplash.com/photo-1532499016263-f2c3e89de9cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGJha2luZyUyMGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60"
  },
  {
    title: "Coffee & Conversation",
    venue: "800 Wyandotte St E",
    message: "Registered successfully",
    registeredUsers: [
      { name: "Cindy Baker" },
      { name: "Joe Quinn" },
      { name: "Howard Tanner" },
      { name: "Peter Parker" }
    ],
    city: "Windsor",
    details:
      "Get ready for a day filled with the aromas and tastes of the world's finest coffees. You'll have the opportunity to sample a wide range of specialty coffees from around the world, including rare and exotic blends.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNvZmZlZSUyMGFuZCUyMGNvbnZlcnNhdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1400&q=60"
  },
  {
    title: "Google Developer Club Event",
    venue: "401 Sunset Avenue",
    city: "Windsor",
    message: "Registered successfully",
    registeredUsers: [
      { name: "Remy Sharp" },
      { name: "Cindy Baker" },
      { name: "Joe Quinn" }
    ],
    details:
      "Join us for a day filled with thought-provoking talks and hands-on workshops led by industry experts and network with other tech enthusiasts.",
    image:
      "https://images.unsplash.com/photo-1638136264464-2711f0078d1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGdvb2dsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1400&q=60"
  },
  {
    title: "Easter 2023",
    venue: "300 Tecumseh Rd E",
    city: "Windsor",
    message: "Event fully booked out",
    registeredUsers: [],
    details:
      "You'll have the opportunity to participate in an egg hunt, decorate Easter eggs, and take part in other festive activities.",
    image:
      "https://images.unsplash.com/photo-1521967663429-271bae24b5b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZWFzdGVyJTIwZXZlbnRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60"
  },
  {
    title: "Bibliophiles Meet",
    venue: "185 Ouellette Avenue",
    city: "Windsor",
    message: "Registeration closed",
    registeredUsers: [
      { name: "Remy Sharp" },
      { name: "Howard Tanner" },
      { name: "Peter Parker" }
    ],
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

function AdminEvents() {
  const [open, setOpen] = React.useState(false);
  const [userOpen, setUserOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleUserOpen = () => setUserOpen(true);
  const handleUserClose = () => setUserOpen(false);
  const [currentUsers, setCurrentUsers] = React.useState([]);
  const token = localStorage.getItem("token");
  const [events, setEvents] = React.useState([]);
  const [checked, setChecked] = React.useState([1]);
  // const users = [
  //   { name: "Remy Sharp" },
  //   { name: "Cindy Baker" },
  //   { name: "Joe Quinn" },
  //   { name: "Howard Tanner" },
  //   { name: "Peter Parker" }
  // ];

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  React.useEffect(() => {
    getEvents();
    // getMyEvents();
    console.log(events);
    if (events.length === 0) {
      setEvents(cards);
    }
    // if(myEvents.length === 0){
    //   setMyEvents(cards.slice(2,4))
    // }
  }, []);

  const getEvents = () => {
    const config = {
      method: "get",
      url: "https://frnds-server.onrender.com/api/events/?city=Windsor",
      headers: {
        Authorization: "Bearer " + token
      }
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setEvents(response.data);
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };


  const createEvent = () => {
    let score = Math.floor(Math.random() * (500 - 1 + 1)) + 1;
    if (score > 300) {
      toast.success("Event created");
    } else {
      toast.error("Not enough score to create event");
    }
  };

  const deleteEvent = (eventId) => {
    var config = {
      method: 'delete',
    maxBodyLength: Infinity,
      url: `https://frnds-server.onrender.com/api/events/${eventId}`,
      headers: { 
        'Authorization': 'Bearer ' +  token
      }
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      toast.success("Event Deleted")
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 2,
          pr: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end"
        }}
      >
        <Button variant="contained" onClick={handleOpen}>
          Create Event
        </Button>
        <Modal open={open} onClose={handleClose} sx={{ overflow: "scroll" }}>
          <Box sx={eventModalStyle}>
            <Typography id="create-event-modal" variant="h6" component="h2">
              Add Event Details
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item md={6} xs={12}>
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
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="venue"
                  label="Venue"
                  name="venue"
                  autoComplete="venue"
                  autoFocus
                  size="small"
                  variant="filled"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="date"
                  label="Date"
                  name="date"
                  autoComplete="date"
                  autoFocus
                  size="small"
                  variant="filled"
                  shrink
                  type = "date"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="time"
                  label="Time"
                  name="time"
                  autoComplete="time"
                  autoFocus
                  size="small"
                  variant="filled"
                  type="time"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="personality"
                  label="Personality Type"
                  name="personality"
                  autoComplete="personality"
                  autoFocus
                  size="small"
                  variant="filled"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="anxiety"
                  label="Min. Anxiety Score"
                  name="anxiety"
                  autoComplete="anxiety"
                  autoFocus
                  size="small"
                  variant="filled"
                  type="number"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="emotional"
                  label="Min. Emotional Score"
                  name="emotional"
                  autoComplete="emotional"
                  autoFocus
                  size="small"
                  variant="filled"
                  type="number"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="score"
                  label="Min. User Score"
                  name="score"
                  autoComplete="score"
                  autoFocus
                  size="small"
                  variant="filled"
                  type="number"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="interests"
                  label="Interests"
                  name="interests"
                  autoComplete="interests"
                  autoFocus
                  size="small"
                  variant="filled"
                />
              </Grid>
              <Grid item md={6} xs={12}>
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
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="start-time"
                  label="Booking Start Time"
                  name="start-time"
                  autoComplete="start-time"
                  autoFocus
                  size="small"
                  variant="filled"
                  type="time"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="end-time"
                  label="Booking End Time"
                  name="end-time"
                  autoComplete="end-time"
                  autoFocus
                  size="small"
                  variant="filled"
                  type="time"
                />
              </Grid>
            </Grid>
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
                    image={
                      card.img ||
                      "https://images.unsplash.com/photo-1541014871-22a89a9281e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
                    }
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
                  <CardActions
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <Button
                      size="medium"
                      variant="contained"
                      color="secondary"
                      sx={{ ml: 1, mb: 2 }}
                      onClick={() => {
                        setCurrentUsers(card.registeredUsers);
                        handleUserOpen();
                      }}
                      disabled={card.registeredUsers.length > 0 ? false : true}
                    >
                      View participants
                    </Button>
                    <Modal open={userOpen} onClose={handleUserClose}>
                      <Box sx={partipantsModalStyle}>
                        <Typography
                          id="view-participants-modal"
                          variant="h6"
                          component="h2"
                        >
                          Select Attendees
                        </Typography>
                        <List
                          dense
                          sx={{
                            width: "100%",
                            maxWidth: 360,
                            bgcolor: "background.paper"
                          }}
                        >
                          {currentUsers.map((user, value) => {
                            const labelId = `checkbox-list-secondary-label-${value}`;
                            console.log(user.name);
                            return (
                              <ListItem
                                key={value}
                                secondaryAction={
                                  <Checkbox
                                    edge="end"
                                    onChange={handleToggle(value)}
                                    checked={checked.indexOf(value) !== -1}
                                    inputProps={{ "aria-labelledby": labelId }}
                                  />
                                }
                                disablePadding
                              >
                                <ListItemButton>
                                  <ListItemAvatar>
                                    <Avatar
                                      alt={user.name}
                                      src={`/static/images/avatar/${
                                        value + 1
                                      }.jpg`}
                                    />
                                  </ListItemAvatar>
                                  <ListItemText
                                    id={labelId}
                                    primary={user.name}
                                  />
                                </ListItemButton>
                              </ListItem>
                            );
                          })}
                        </List>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          // onClick={createEvent}
                          onClick={() => {
                            handleUserClose();
                            toast.success("Updated users score successfully!");
                          }}
                        >
                          Save
                        </Button>
                      </Box>
                    </Modal>
                    <ToastContainer />
                    <Tooltip title="Delete Event">
                    <IconButton
                      aria-label="delete"
                      color="error"
                      sx={{ ml: 1, mb: 2 }}
                      onClick={()=>deleteEvent(card._id)}
                    >
                      <DeleteIcon size="large"/>
                    </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default AdminEvents;
