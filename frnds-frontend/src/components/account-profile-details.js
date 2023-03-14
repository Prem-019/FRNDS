import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.substring(1);
};

export const AccountProfileDetails = (props) => {
  const [values, setValues] = useState(JSON.parse(localStorage.getItem('user') ));
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const token = localStorage.getItem('token')

  const updateUser = () => {
    const config = {
      method: "put",
      url: `http://localhost:3100/api/users/profile`,
      headers: { 
        'Authorization': 'Bearer '+ token, 
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(values)
    };

    axios(config)
      .then(function (response) {
        if (response.status === 201) {
          toast.success("Details Updated")
          localStorage.setItem("user", JSON.stringify(values))
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.response.data.message)
      });
  }

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <ToastContainer/>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
          <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                  variant="outlined"
                />
              </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="tel"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                onChange={handleChange}
                type="number"
                value={values.age}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Gender"
                name="gender"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.gender}
                variant="outlined"
              >
                {["Male", "Female", "Other"].map((option) => (
                  <option key={option} value={option}>
                    {capitalize(option)}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" onClick={updateUser}>
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
