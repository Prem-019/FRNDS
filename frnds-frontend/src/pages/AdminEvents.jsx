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
  Tooltip,
  MenuItem
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [currentEvent, setCurrentEvent] = React.useState([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [events, setEvents] = React.useState([]);
  const [attendees, setAttendees] = React.useState([]);
  const [eventDetails, setEventDetails] = React.useState({
    name: "",
    city: "",
    details: "",
    venue: "",
    date: " ",
    createdBy: "",
    registeredUsers: [],
    minimumScore: 0,
    emotion: 0,
    anxiety: 0,
    personality: "",
    startTime: " ",
    endTime: " ",
    score: 0,
    limit: 30
  });

  const navigate = useNavigate()

  const convertDate = (date) => {
    const dateString = new Date(date);
    const isoDate = dateString.toISOString(); // "2023-03-09T15:30:00.000Z"
    const isoDateWithMilliseconds = isoDate.slice(0, -1) + "28Z";
    return isoDateWithMilliseconds; // "2023-03-09T15:30:00.028Z"
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleToggle = (value) => () => {
    const currentIndex = attendees.indexOf(value);
    const newChecked = [...attendees];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    console.log(newChecked);
    setAttendees(newChecked);
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
        if(error.response.data.message === "Not Authorized, Token Failed"){
          navigate("/signin");
          localStorage.removeItem("user")
          localStorage.removeItem("token")
        }
      });
  };

  const createEvent = () => {
    let data = eventDetails;
    data.date = convertDate(eventDetails.date);
    data["startTime"] = convertDate(eventDetails["startTime"]);
    data["endTime"] = convertDate(eventDetails["endTime"]);
    data["createdBy"] = user._id;
    console.log(data);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://frnds-server.onrender.com/api/events/create",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      data: data
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        toast.success("Event Created Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };

  const deleteEvent = (eventId) => {
    var config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `https://frnds-server.onrender.com/api/events/${eventId}`,
      headers: {
        Authorization: "Bearer " + token
      }
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        toast.success("Event Deleted");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateAttendees = (details) => {
    let data = { ...details, attendedUsers: attendees };
    console.log(data)
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `https://frnds-server.onrender.com/api/events/${details._id}`,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      data: data
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        // updateScore(id)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateScore = (id) => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://frnds-server.onrender.com/api/users/score/${id}`,
      headers: {
        Authorization: "Bearer " + token
      }
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        toast.success("Updated users score successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error updating users score");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer autoClose={1000}/>
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
                  id="name"
                  label="Event Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  size="small"
                  variant="filled"
                  value={eventDetails.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="details"
                  label="Event Details"
                  name="details"
                  autoComplete="details"
                  autoFocus
                  size="small"
                  variant="filled"
                  value={eventDetails.details}
                  maxRows={5}
                  multiline
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="img"
                  label="Event Image"
                  name="img"
                  autoComplete="img"
                  autoFocus
                  size="small"
                  variant="filled"
                  value={eventDetails.img}
                  onChange={handleChange}
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
                  value={eventDetails.venue}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="city"
                  autoFocus
                  size="small"
                  variant="filled"
                  value={eventDetails.city}
                  onChange={handleChange}
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
                  type="datetime-local"
                  value={eventDetails.date}
                  onChange={handleChange}
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
                  value={eventDetails.personality}
                  onChange={handleChange}
                  select
                >
                  <MenuItem value={"Introvert"}>Introvert</MenuItem>
                  <MenuItem value={"Extrovert"}>Extrovert</MenuItem>
                  <MenuItem value={"Ambivert"}>Ambivert</MenuItem>
                </TextField>
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
                  value={eventDetails.anxiety}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="emotion"
                  label="Min. Emotional Score"
                  name="emotion"
                  autoComplete="emotion"
                  autoFocus
                  size="small"
                  variant="filled"
                  type="number"
                  value={eventDetails.emotion}
                  onChange={handleChange}
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
                  value={eventDetails.score}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="limit"
                  label="Limit"
                  name="limit"
                  autoComplete="limit"
                  autoFocus
                  size="small"
                  variant="filled"
                  value={eventDetails.limit}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="startTime"
                  label="Booking Start Time"
                  name="startTime"
                  autoComplete="startTime"
                  autoFocus
                  size="small"
                  variant="filled"
                  type="datetime-local"
                  value={eventDetails.startTime}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="endTime"
                  label="Booking End Time"
                  name="endTime"
                  autoComplete="endTime"
                  autoFocus
                  size="small"
                  variant="filled"
                  type="datetime-local"
                  value={eventDetails.endTime}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                createEvent()
                handleClose()
              }}
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
            {events.map((card, key) => {
              return (
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
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        sx={{
                          fontSize: {
                            lg: 24,
                            md: 20,
                            sm: 18,
                            xs: 15
                          }
                        }}
                      >
                        {card.name}
                      </Typography>
                      <Typography
                        mb={2}
                        sx={{
                          height: "200px",
                          fontSize: {
                            lg: 15,
                            md: 14,
                            sm: 14,
                            xs: 12
                          }
                        }}
                      >
                        {card.details}
                      </Typography>
                      <Divider />
                      <Typography
                        mt={2}
                        color="primary"
                        sx={{
                          fontSize: {
                            lg: 16,
                            md: 12,
                            sm: 14,
                            xs: 12
                          }
                        }}
                      >
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
                        sx={{
                          ml: 1,
                          mb: 2,
                          fontSize: {
                            lg: 15,
                            md: 10,
                            sm: 14,
                            xs: 12
                          }
                        }}
                        onClick={() => {
                          setCurrentUsers(card.registeredUsers);
                          setAttendees([]);
                          handleUserOpen();
                        }}
                        disabled={
                          card.registeredUsers.length > 0 ? false : true
                        }
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
                              const labelId = `checkbox-${value}`;
                              return (
                                <ListItem
                                  key={value}
                                  secondaryAction={
                                    <Checkbox
                                      edge="end"
                                      onChange={handleToggle(user.name)}
                                      checked={
                                        attendees.indexOf(user.name) !== -1
                                      }
                                      inputProps={{
                                        "aria-labelledby": labelId
                                      }}
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
                              // console.log(events[key])
                              // setCurrentEvent(card)
                              // updateAttendees(currentEvent);
                              toast.success("Updated users score")
                            }}
                          >
                            Save
                          </Button>
                        </Box>
                      </Modal>
                      <ToastContainer autoClose={1000}/>
                      <Tooltip title="Delete Event">
                        <IconButton
                          aria-label="delete"
                          color="error"
                          sx={{ ml: 1, mb: 2 }}
                          onClick={() => deleteEvent(card._id)}
                        >
                          <DeleteIcon size="large" />
                        </IconButton>
                      </Tooltip>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default AdminEvents;
