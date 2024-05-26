import { useRef, useEffect, useState, SyntheticEvent } from "react";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
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
  Tab,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useAuth from "../hooks/useAuth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { blue, orange } from "@mui/material/colors";
import { useNavigate, Link, useLocation, Navigate } from "react-router-dom";
import axios from "../api/axios";
import { Helmet } from "react-helmet";
import Login from "./Login";
import Register from "./Register";
const LOGIN_URL = "/auth";
const URL = "http://localhost:3000";

const outerTheme = createTheme({
  palette: {
    success: {
      main: orange[500],
      color: "white",
    },
    primary: {
        main: orange[500],
        color: "white",
      },
      secondary: {
        main: blue[300],
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


const useStyles = makeStyles({
  Login: {
    backgroundColor: "rgba(250,250,250,0.2)",
    width: "35%",
    height: 850,
    overflow: "hidden",
    position: "fixed",
    top: "0%",
    right: "0%",
    // borderRadius: "12px",
    alignItems: "center",
    color: "white",
    backdropFilter: "blur(30px)",
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
   // backgroundImage: `url('${URL}/1338193.png')`,
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
    width: "180px",
    height: "60px",
   // marginLeft: "5%",
   // margin: "1%",
    position: 'absolute',
    top: '30%',
    left: '20%'
  },
});
const backgroundImages = [
    `${URL}/wallpaper/1338193.png`,
    `${URL}/wallpaper/026.png`,
    `${URL}/wallpaper/1338186.png`,
    `${URL}/wallpaper/026.jpg`,
    `${URL}/wallpaper/pexels-hasan-albari-1424745.jpg`
    
    // Add more background image URLs here
  ];

export default function BasicTabs() {
  const [value, setValue] = useState("1");
  const [backgroundImage, setBackgroundImage] = useState("");
  const classes = useStyles();
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    const randomBackgroundImage = backgroundImages[randomIndex];
    setBackgroundImage(randomBackgroundImage);
  }, []);


  return (
    <ThemeProvider theme={outerTheme}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Nexus - login</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Box className={classes.Background} style={{ backgroundImage: `url('${backgroundImage}')` }}>
        <Box sx={{ backdropFilter: "blur(4px)", width: "100%", height: 850 }} />

        
          <img className={classes.logom} src={`${URL}/n.png`} />
      <Typography variant="h6"  sx={{ position: 'absolute',
    top: '38%',
    left: '20%',
    color: 'white'
    }}>Sign in or create an account</Typography>
        <Box sx={{ typography: "body1" }} className={classes.Login}>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                width: "42%",
                position: "absolute",
                left: '25%',
                top: "14%",
              }}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                color="success"
                
              >
                <Tab label="Sign In" value="1" />
                <Tab label="Sign Up" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Login />
            </TabPanel>
            <TabPanel value="2"><Register/></TabPanel>
          </TabContext>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
