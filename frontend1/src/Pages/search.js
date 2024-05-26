import {useState , useEffect} from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Badge,
  Box,
  Skeleton,
  Backdrop,
  Dialog,
  Typography,
} from "@mui/material";

import { useNavigate, Link, Form } from "react-router-dom";

import { SearchOutlined } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, orange,  } from "@mui/material/colors";
import useLocalStorage from "../hooks/useLocalStorage";
import User from "../Components/user";
import axios from "../api/axios";
import {Helmet} from "react-helmet";
const URL = 'http://localhost:3000'
const outerTheme = createTheme({
  palette: {
    success: {
      main: orange[500],
      color: "white",
    },
    secondary:{
      main:  orange[50],
    },
  
   // color: "white",
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
  logom: {
    width: "25%",
    
    //  backgroundColor: 'white',
    "@media (max-width: 780px)": {
      width: "50%",
      marginLeft: "25%",
      marginTop: "20%",
      top: "0%",
    },
    height: "90%",
    marginLeft: "35%",
    marginTop: "14%",
    top: "30%",
  },
  logo: {
    width: "100px",
    height: "30px",
     marginLeft: "5%",
     marginTop: '5px'

  },
  Search: {
    width: "100%",
   // height: "50%",
    overflow: "hidden",
     position: "fixed",
    top: "20%",
    "@media (max-width: 780px)": {
      top: "10%",
    },
    // backgroundColor: 'red'
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

  home: { 
    backgroundColor: "rgb(16,47,66)",
    width: "100%",
    height: "100%",
  },
  bg:{
    position: 'absolute',
    width: "100%",
    height: 790,
    overflow: 'none'

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

export default function Search({ setSearch }) {
 
  const [term, setTerm] = useState('');
  const [open, setUserFocus] = useState(false);
  const navigate = useNavigate();
  localStorage.removeItem('searchTerm');
  localStorage.setItem('filter', "{}");

 

  const classes = useStyles();
  const rootStyle = {
    backgroundColor:   "rgba(0,0,0,0.7)",
    transition: "background-color 0.3s",
    height:open ? 800: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      /^[a-zA-Z0-9].*/.test(term) ||
      /^[a-zA-Z0-9]+[" "]/.test(term) ||
      /^[" "]+[a-zA-Z0-9]/.test(term)
    ) {
      setSearch(term.trim());
    }
  };
  
  const [backgroundImage, setBackgroundImage] = useState("");
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    const randomBackgroundImage = backgroundImages[randomIndex];
    setBackgroundImage(randomBackgroundImage);
  }, []);

  return (
    <ThemeProvider theme={outerTheme}>

<Helmet>
                <meta charSet="utf-8" />
                <title>Nexus</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <Box className={classes.Background} style={{ backgroundImage: `url('${backgroundImage}')` }}>
      
        
      <Box
        style={{
          height: "5%",
          width: "85%",
          shadow: "none",
          //  background: "white",
          justifyContent: "space-between",
          display: "flex",
          position: "fixed",
          padding: "2px",
          top: "1%",
          left: '6%',
        }}
        
      >
        <img className={classes.logo} src={`${URL}/n.png`}/>
        <Box sx={{ width: '30%', justifyContent: 'space-between', height: "100%", display: 'flex', mr: '10%', mt: '5px' }}>
        <Typography variant="body2" gutterBottom sx={{color: "white", mt: '7px', cursor: 'pointer'}}>News</Typography>
        <Typography variant="body2" gutterBottom sx={{color: "white",mt: '7px', cursor: 'pointer'}}>Images</Typography>
        <Typography variant="body2" gutterBottom sx={{color: "white",mt: '7px', cursor: 'pointer'}}>Videos</Typography>
        
        <Typography variant="body2" gutterBottom sx={{color: "white",mt: '7px', cursor: 'pointer'}}>Info</Typography>
        <Typography variant="body2" gutterBottom sx={{color: "white",mt: '7px', cursor: 'pointer'}}>Contact</Typography>
        </Box>
        <User  />
      </Box>   
      <Box
        sx={{
           //bgcolor: 'white',
          p: {
            lg: 4,
            xs: 1,
            md: 4,
          },
          width: "95%",
         // display: { lg: "flex", md: "flex", xs: "block" },
          justifyContent: "space-between",
          position: 'fixed',
          top: '30%',
          height: 500,
          overflow: 'hidden',
          overflowY: "auto",
        }}
      >
    
        <Box  sx={{
        //bgcolor: 'white',
      
       width: "95%",
       display: { lg: "flex", md: "flex", xs: "block" },
       justifyContent: "space-between",
      // mt: '50%'
      }}>
        <Skeleton
          sx={{
            bgcolor: "grey.400",
            width: {
              lg: "20%",
              xs: "100%",
              md: "20%",
            },
            marginTop: { md: 0, xs: 2 },
          }}
          variant="rounded"
          height={200}
        />
        <Skeleton
          sx={{
            bgcolor: "grey.400",
            width: {
              lg: "20%",
              xs: "100%",
              md: "20%",
            },
            marginTop: { md: 0, xs: 2 },
          }}
          variant="rounded"
          height={200}
        />
        <Skeleton
          sx={{
            bgcolor: "grey.400",
            width: {
              lg: "20%",
              xs: "100%",
              md: "20%",
            },
            arginTop: { md: 0, xs: 2 },
          }}
          variant="rounded"
          height={200}
        />
        <Skeleton
          sx={{
            bgcolor: "grey.400",
            width: {
              lg: "20%",
              xs: "100%",
              md: "20%",
            },
            marginTop: { md: 0, xs: 2 },
          }}
          variant="rounded"
          height={200}
        />
        </Box>
      </Box> <Box style={rootStyle}>
  <form className={classes.Search} onSubmit={(e) => handleSubmit(e)}>
      
        <TextField
          id="outlined"
          variant="outlined"
         // color="success"
          placeholder="what are looking you for?"
          onChange={(e) => setTerm(e.target.value)}
          type={"text"}
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          sx={{
            width: { lg: "50%", md: "50%", xs: "90%" },
            // height: "11%",
            marginBottom: "15px",
            marginLeft: { lg: "15%", md: "15%", xs: "0%" },
            left: { lg: "6%", md: "5%", xs: "5%" },
            border: "none",
            borderRadius: "30px",
            //  padding: "3px",

            fontFamily: "Adam",
            backgroundColor: "white",
            boxShadow: 2,
          }}
          InputProps={{
            style: { borderRadius: "40px" },
            endAdornment: (
              <InputAdornment position="end">
                 <IconButton aria-label="search"  type="submit" color="success"  >
              <SearchOutlined/></IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
</Box>      
            
  </Box>
    </ThemeProvider>
  );
}
