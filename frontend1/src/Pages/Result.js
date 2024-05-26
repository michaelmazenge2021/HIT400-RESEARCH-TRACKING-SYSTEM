import {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Divider,
  TextField,
  InputAdornment,
  Paper,
  Skeleton,
  Box,
} from "@mui/material";
import {Helmet} from "react-helmet";

import { useNavigate, Link, Form } from "react-router-dom";

import { SearchOutlined } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, orange } from "@mui/material/colors";
import Navbar from "../Components/NavBar";
import DataList from "../Components/searchlist";


const outerTheme = createTheme({
  palette: {
    primary: {
      main: orange[500],
      color: "white",
    },
    secondary: {
      main: orange[500],
      color: "white",
    },
    color: "white",
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
    width: "15%",
    height: "90%",
    marginLeft: "40%",
    margin: "14%",
    top: "30%",
  },
  logo: {
    marginLeft: "7%",
    "@media (max-width: 780px)": {
      width: "30%",
      marginLeft: "25%",
      display: "none",
      top: "0%",
    },
  },
  logos: {
    marginLeft: "7%",
    "@media (max-width: 780px)": {
      width: "30%",
     // marginLeft: "35%",

      top: "0%",
    },
  },
  Search: {
    width: "70%",
    height: "70%",
    "@media (max-width: 780px)": {
      width: "100%",
    },
  },
  home: {
    backgroundColor: "red",
    width: "100%",
    height: "100%",
  },
  input: {
    color: "white",
  },
});

export default function Result({ searchTerm,setSearch, searchData }) {
  const classes = useStyles();
  const [term, setTerm] = useState('');
  //console.log(data)
  

  useEffect(() => {
    setTerm(searchTerm);
    // eslint-disable-next-line
  }, []);


  
  return (
    <ThemeProvider theme={outerTheme}>

<Helmet>
                <meta charSet="utf-8" />
                <title>{searchTerm} - Nexus search</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
   
     <DataList data={searchData}/>
       <Navbar searchTerm={searchTerm} setSearch={setSearch}/>
    </ThemeProvider>
  );
}
