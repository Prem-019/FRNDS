import React from "react";
import {
  AppBar,
  Popover,
  CssBaseline,
  CardMedia,
  CardContent,
  CardActions,
  Container,
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
  ListItemButton,
  Tab,
  Stack,
  Tooltip,
  Checkbox
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";

const theme = createTheme();

const doctors = [
  {
    name: "Casey L",
    address: "941 Dougal Ave",
    time: "Mon - Fri : 3PM to 5PM",
    fee: "150$/session",
    post: "Therapist",
    image:
      "https://images.unsplash.com/photo-1484863137850-59afcfe05386?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    name: "Mike L",
    address: "300 Jannet Ave",
    time: "Mon - Wed : 10AM to 12PM",
    fee: "125$/session",
    post: "Therapist",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    name: "Paul R",
    address: "500 Atkinson Ave",
    time: "Mon - Fri : 1PM to 3PM",
    fee: "170$/session",
    post: "Therapist",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njh8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    name: "Rose M",
    address: "246 Erie St",
    time: "Mon - Fri : 8AM to 10AM",
    fee: "150$/session",
    post: "Therapist",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    name: "Victoria Z",
    address: "1786 Howard Ave",
    time: "Mon - Wed : 10AM to 5PM",
    fee: "125$/session",
    post: "Therapist",
    image:
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODd8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    name: "James H",
    address: "535 Giles Ave",
    time: "Mon - Fri : 11AM to 1PM",
    fee: "130$/session",
    post: "Therapist",
    image:
      "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
  }
];

function Doctors() {
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
          alignItems: "center"
        }}
      >
        <Typography variant="h3" sx={{fontFamily:"monospace", fontWeight:"500"}}>Doctors Near You</Typography>
      </Box>
      <Container sx={{ p: 4 }} maxWidth="lg">
        {/* End hero unit */}
        <Grid container spacing={6}>
          {doctors.map((doctor) => (
            <Grid item key={doctor} xs={12} sm={12} md={6}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  width:"100%"
                }}
                raised
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      sx={{ height: "75px", fontWeight:700 }}
                    >
                      {doctor.name}
                      <Typography >{`${doctor.post}`}</Typography>
                    </Typography>
                    <Divider />
                    <Typography
                      mt={1}
                    >{`Address: ${doctor.address}`}</Typography>
                    <Typography
                      mt={0.5}
                    >{`Available Time: ${doctor.time}`}</Typography>
                    <Typography mt={0.5}>{`Fees: ${doctor.fee}`}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="medium"
                      variant="contained"
                      color="secondary"
                      sx={{ ml: 1, mb: 2 }}
                      onClick={() => {
                        toast.success("Appointment Email sent!");
                      }}
                    >
                      Book Appointment
                    </Button>
                    <ToastContainer />
                  </CardActions>
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 150, height: 150, borderRadius:"10%", justifyContent: "flex-end", marginTop:"1em", marginRight:"1em"}}
                  image={doctor.image}
                  alt="Doctor image"

                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default Doctors;
