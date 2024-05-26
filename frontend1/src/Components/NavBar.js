import { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Divider,
  TextField,
  InputAdornment,
  Paper,
  Skeleton,
  Box,
  IconButton,
} from "@mui/material";

import { useNavigate, Link, Form } from "react-router-dom";
import axios from "../api/axios";
import { SearchOutlined } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, orange } from "@mui/material/colors";

import User from "./user";
import useLocalStorage from "../hooks/useLocalStorage";

const useStyles = makeStyles({
  logom: {
    width: "15%",
    height: "90%",
    marginLeft: "40%",
    margin: "14%",
    top: "30%",
  },
  logo: {
    marginLeft: "3%",
    marginTop: "1%",
    width: "100px",
    height: "30px",
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
      width: "50px",
      height: '50px',
       marginLeft: "0%",

      top: "5%",
      
    },
  },
  Search: {
    width: "70%",
    height: "70%",
    marginTop: "0.5%",
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

export default function Navbar({ searchTerm, setSearch }) {
  const navigate = useNavigate();
  const userRef = useRef();
  const [userFocus, setUserFocus] = useState(false);
  const [term, setTerm] = useState("");
  const [data, setData] = useState([]);
  const routeChange = () => {
    let path = `newPath`;
    navigate("/");
  };
  const routeChanger = () => {
    let path = `newPath`;
    navigate("/result");
  };
  const classes = useStyles();
  useEffect(() => {
    setTerm(searchTerm);
    // eslint-disable-next-line
  }, []);

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

  return (
    <Box
      sx={{
        position: "fixed",
        top: "2%",
        left: '2%',
        width: "95%",
       // backgroundColor: "white",
        borderRadius: '20px',
       // height: "75px",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          // height: { lg: "5%", md: "5%", sx: "12%" },
          width: "100%",
          shadow: "none",
          //backgroundColor: "rgb(237,240,239)",
          justifyContent: "space-between",
          display: { lg: "flex", md: "flex", xs: "content" },
          // position: "fixed",
          top: "0%",
          paddingTop: "8px",
          paddingBottom: "5px",
          overflow: "hidden",
          // height: '1%'
        }}
      >
        <img
          onClick={routeChange}
          className={classes.logo}
          src={`http://localhost:3000/n2.png`}
        />
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "space-around",
            //backgroundColor: "red",
          }}
        >
          <img
            className={classes.logos}
            src={`http://localhost:3000/nexus.ico`}
          />
          <User />
        </Box>

        <form className={classes.Search} onSubmit={(e) => handleSubmit(e)}>
          <TextField
            id="outlined"
            variant="outlined"
            color="success"
            placeholder="what are looking you for?"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            defaultValue={term}
            type={"text"}
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            sx={{
              "& fieldset": { border: 'none' },
              width: { lg: "50%", md: "50%", xs: "95%" },
              p: { lg: 0, md: 0, xs: 1 },
             
            borderRadius: "40px",
              // padding: "3px",
              // boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.19)'  #2e3191,
              fontFamily: "Adam",
             
               backgroundColor: 'rgb(245,247,250)',
               height: '40px',
              //backgroundColor: "white",
              '&:hover':{
                boxShadow: 3
              },
              input: { color: "black" },
              ...(userFocus && {
                width: { lg: "70%", md: "50%", xs: "95%" },
                transition: "width 0.3s ease-in-out",
                border: '1px solid #f6921e',
                boxShadow: 3
              }),
              // ...(!userFocus && { transform: 'scale(1)' }), // Increase size when focused
            }}
           size="small"
            InputProps={{
              style: { borderRadius: "40px", },
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    aria-label="search"
                    type="submit"
                    color="primary"
                    size="small"
                  >
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
        <Box sx={{ display: { xs: "none", md: "flex",height: "5%", 
      padding: "2px", } }}>
          <User />
        </Box>
      </Paper>

      
    </Box>
  );
}
