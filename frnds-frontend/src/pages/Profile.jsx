import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfile } from "../components/account-profile";
import { AccountProfileDetails } from "../components/account-profile-details";
import { AccountPreferences } from "../components/account-preferences";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  console.log(user.isAdmin)
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Profile
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails />
            </Grid>
          </Grid>
          {user.isAdmin ||
          <Grid container spacing={3} my={6} px={3}>
            <AccountPreferences />
          </Grid>
          }
        </Container>
      </Box>
    </>
  );
};

export default Profile;
