import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const theme = createTheme();

export default function SignIn() {
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({
    email: "",
    password: ""
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const isLetters = (str) => /^[A-Za-z ]*$/.test(str);
  const isEmail = (str) =>
    /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(str);

  const checkPassword =(p) => {
    if (p.length < 8) {
      toast.error("Your password must be at least 8 characters"); 
      return false;
  }
  if (p.search(/[a-z]/i) < 0) {
      toast.error("Your password must contain at least one letter.");
      return false;
  }
  if (p.search(/[0-9]/) < 0) {
      toast.error("Your password must contain at least one digit."); 
      return false;
  }
  // if (errors.length > 0) {
  //     alert(errors.join("\n"));
  // }
  return true;
}


  React.useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    let path;
    if(user){
      if(user.isAdmin){
        path = `/admin`;
      }
      else{
        path = `/dashboard`
      }
      navigate(path);
    }
  }, [])

  const handleChange = (event) => {
    const {name, value} = event.target;
    
      setUserDetails({
        ...userDetails,
        [name]: value,
      });
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = userDetails;

    // if(checkPassword(user.password)){
      if((isEmail(data.email))) {
    
      const config = {
      method: "post",
      url: `https://frnds-server.onrender.com/api/users/login`,
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify(data)
    };

    axios(config)
      .then(function (response) {
        if (response.status === 200) {
          let path
          if(response.data.isAdmin){
            path = `/admin`;
          }
          else{
            path = `/dashboard`
          }
          toast.success("Login Successful")
          navigate(path);
          localStorage.setItem("user", JSON.stringify(response.data))
          localStorage.setItem("token",response.data.token)
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.response.data.message)
      });
    }
    else{
      toast.error("Please enter correct email")
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer autoClose={1000}/>
      <Container component="main" maxWidth="xs" sx={{}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px",
            background: "rgba( 255, 255, 255, 0.25 )",
            boxShadow: "0 4px 28px 0 rgba( 31, 38, 135, 0.37 )",
            backdropFilter: "blur( 5px )",
            WebkitBackdropFilter: "blur( 5px )",
            borderRadius: "10px",
            border: "1px solid rgba( 255, 255, 255, 0.18 )"
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, p: 3 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              value={userDetails.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={userDetails.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )
              }}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="caption">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/signup" variant="caption">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
