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

const associations = [
  {
    name: "Connex Ontario",
    website: "https://www.connexontario.ca/en-ca/",
    contact: "https://www.connexontario.ca/en-ca/send-email",
    phone: "519-439-0174",
    description:"We are here to connect the people of Ontario to mental health, addictions, and problem gambling services. Whether for yourself, a loved one, or a client, our confidential and free services are available 24/7."
  },
  {
    name: "Good2Talk",
    website: "https://good2talk.ca/ontario/",
    contact: "https://good2talk.ca/ontario/contact-us/",
    phone: "1-866-925-5454",
    description:"Free, confidential support 24/7. Mental health and well-being is different for everyone. We’re Good2Talk whenever you need us."
  },
  {
    name: "Hope for Wellness Helpline",
    website: "https://www.hopeforwellness.ca/",
    contact: "https://www.hopeforwellness.ca/",
    phone: "1-855-242-3310",
    description:"Hope for Wellness Helpline is available 24/7 to all Indigenous people across Canada. Whether you prefer to talk to someone on the phone or online, we’re here to support you anytime."
  },
  {
    name: "Bounce Back Ontario",
    website: "https://bouncebackontario.ca/",
    contact: "bb-referral@cmha-yr.on.ca",
    phone: " 905-430-1768",
    description: "Managed by the Canadian Mental Health Association (CMHA). It is designed to help adults and youth 15+ manage low mood, mild to moderate depression and anxiety, stress or worry. "
  },
  {
    name: "Ontario Association of Mental Health Professionals",
    website: "https://oamhp.ca/",
    contact: "https://oamhp.ca/about-us/",
    phone: "888-622-2779",
    description:"OAMHP Supports People for Education’s Distressing Report about Ontario Students’ Mental Health"
  },
  {
    name: "Windsor Essex Compassion Care Community",
    website: "https://www.weccc.ca/",
    contact: "https://www.weccc.ca/contact",
    phone: "519-728-1435 ext 208 ",
    description:"We aspire to raise happiness, improve quality of life and reduce inequities for elderly and vulnerable citizens. We know service to others and to the community makes each of us happier, healthier and stronger. Working together, our impact is greater and our community thrives and prospers."
  }
];

function Associations() {
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
        <Typography variant="h3" sx={{fontFamily:"monospace", fontWeight:"500", }}>Associations Near You</Typography>
      </Box>
      <Container sx={{ p: 4 }} maxWidth="lg">
        {/* End hero unit */}
        <Grid container spacing={6}>
          {associations.map((association) => (
            <Grid item key={association} xs={12} sm={12} md={12}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
                }}
                raised
              >
                {/* <CardMedia
                    component="img"
                    image={association.image}
                    alt="random"
                    sx={{ width: "100%", height: "300px" }}
                  /> */}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h4" component="h2" sx={{height:"120px", fontWeight:700 }}>
                    {association.name}
                    <Typography variant="body2" mt={2} sx={{fontFamily:"cursive"}}>{association.description}</Typography>
                  </Typography>
                  <Divider />
                  {association.contact && (
                    <Typography mt={1}>
                      {`Contact: ${association.contact}`}
                    </Typography>
                  )}
                  {association.phone && (
                    <Typography mt={1}>
                      {`Phone: ${association.phone}`}
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Button
                    size="medium"
                    variant="contained"
                    color="secondary"
                    sx={{ ml: 1, mb: 2 }}
                    onClick={() => {
                      window.open(association.website, "_blank");
                    }}
                  >
                    View more
                  </Button>
                  <ToastContainer />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default Associations;
