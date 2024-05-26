import { useRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Button,
  Alert,
  AlertTitle,
  TextField,
  InputAdornment,
  IconButton,
  Slide,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Box,
  Typography,
  Tabs,
  Tab
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useAuth from "../hooks/useAuth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { green, orange } from "@mui/material/colors";
import { useNavigate, Link, useLocation, Navigate } from "react-router-dom";
import axios from "../api/axios";
import {Helmet} from "react-helmet";
const LOGIN_URL = "/auth";
const URL = "http://localhost:3000";

const outerTheme = createTheme({
  palette: {
    success: {
      main: orange[500],
      color: "white",
    },
  },
  breakpoints: {
    values: {
      xxs: 0, // small phone
      xs: 300, // phone
      sm: 600, // tablets
      md: 900, // small laptop
      lg: 1200, // desktop
      xl: 1536, // large screens
    },
  },
});

const innerTheme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
});

const useStyles = makeStyles({
  Login: {
    //backgroundColor: "rgba(250,250,250,0)",
    width: "100%",
    height: 550,
    overflow: "hidden",
    position: "fixed",
    top: "20%",
    right: "0%",
   // borderRadius: "12px",
    alignItems: "center",
    color: "white",
    justifyContent: 'space-between',
   // backdropFilter: "blur(30px)",
    "@media (max-width: 780px)": {
      width: "100%",
      top: "0",
      right: "0",
      height: "100%",
      position: "absolute",
    },
  },
  Toolbar: {
    //  backgroundColor: "rgb(33,33,33)",
    width: "100%",
    height: "9%",
    overflow: "hidden",
    position: "fixed",
    top: "0%",
    right: "0%",
    "@media (max-width: 780px)": {
      display: "none",
    },
  },

  Background: {
    backgroundColor: "rgb(16,47,66)",
    backgroundImage: `url('${URL}/1338193.png')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
    height: 850,
    backdropFilter: "blur(3px)",
  },

  logo: {
    width: "15%",
    height: "15%",
    marginLeft: "42%",
    "@media (max-width: 780px)": {
      marginTop: "20%",
      width: "15%",
      height: "10%",
    },
  },
  logom: {
    width: "60px",
    height: "60px",
    marginLeft: "5%",
    margin: "1%",
  },
});

export default function Login() {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const userRef = useRef();
  const errRef = useRef();

  const classes = useStyles();
  const [user, usernameUpdate] = useState("");

  const [pwd, passwordUpdate] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [open, setOpen] = useState(false);
  const routeChange = () => {
    let path = `newPath`;
    navigate("/SignUp");
    
  };
  localStorage.removeItem('searchTerm');
  const LoginProceed = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;

      setAuth({ user, accessToken });
      usernameUpdate("");
      passwordUpdate("");
      navigate("/");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };
  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
  
      <Box >
    
        <form className={classes.Login} onSubmit={LoginProceed}>

         
          <TextField
            id="outlined-basic"
            label="ID Number"
            variant="standard"
            color="success"
            onChange={(e) => usernameUpdate(e.target.value)}
            type={"text"}
            sx={{
              width: { md: "70%", xs: "90%" },
              // height: "11%",
              marginTop: "45px",
              marginLeft: { md: "15%", lg: "15%", xs: "5%" },
              border: "none",
              borderRadius: "30px",
              padding: "3px",
              color: "white",
              input: { color: "white" },
            }}
            InputProps={{
              style: { borderRadius: "40px" },
            }}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="standard"
            color="success"
            //autoComplete="current-password"
            onChange={(e) => passwordUpdate(e.target.value)}
            type={showPassword ? "text" : "password"}
            InputProps={{
              style: { borderRadius: "40px" },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility sx={{color: "rgb(90,180,80)"}} /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              width: { md: "70%", xs: "90%" },
              height: "11%",
              marginTop: "45px",
              marginLeft: { md: "15%", lg: "15%", xs: "5%" },
              border: "none",
              borderRadius: "30px",
              padding: "3px",
              color: "white",
             // marginBottom: "25px",
              input: { color: "white" },
            }}
          />
          <Box
            sx={{
              // background: "rgb(90,180,80)",
              color: "white",
              width: { md: "70%", xs: "90%" },
              height: { md: "6%", xs: "3%" },
              display: "flex",
              marginLeft: { md: "15%", lg: "15%", xs: "5%" },
              border: "none",
              justifyContent: "space-between",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  onChange={togglePersist}
                  checked={persist}
                  color="success"
                />
              }
              label="Remember Me"
              style={{
                //margin: "1px",
                fontFamily: "Adam",
                fontWeight: "2px",
                // marginTop: "5px",
                cursor: "pointer",
              }}
            />
            <Typography
            color="secondary"
              style={{
                
               // margin: "1px",
                //  fontFamily: "Adam",
                fontWeight: "2px",
                marginTop: "5px",
                cursor: "pointer",
                textDecoration: 'underline',
              }}
            >
              forgot Password?
            </Typography>
          </Box>

          <Button
           variant="contained" color="success"
            sx={{
             // background: "rgb(90,180,80)",
              width: { md: "70%", lg: "70%", xs: "90%" },
              height: { md: "10%", xs: 60 },
              marginTop: "25px",
              marginLeft: { md: "15%", lg: "15%", xs: "5%" },
              border: "none",
              borderRadius: "40px",
              // fontFamily: "Adam",
              fontWeight: "5px",
            }}
            type="submit"
            // onClick={LoginProceed}
          >
              <Typography
            variant="body"
            sx={{
              color: "white",
              margin: "1px",
              
              //fontFamily: "Adam",
              fontWeight: "2px",
              //fontSize: "px",
            }}
          >
           Login
          </Typography>
          </Button>
         
        </form>
        <Snackbar
            open={errMsg}
            autoHideDuration={2000}
            onClose={setErrMsg}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
              {errMsg}
            </Alert>
          </Snackbar>
      </Box>
   
  );
}
