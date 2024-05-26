import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Stack, Box, Typography, Button, Grid } from "@mui/material";
import { Helmet } from "react-helmet";
import axios from "../api/axios";
import { useLocation } from "react-router-dom";

import { SearchOutlined } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, orange } from "@mui/material/colors";
import Navbar from "../Components/NavBar";
import DataList from "../Components/searchlist";
import Form from "../Components/Form";
import Bar from "../Components/SideNavBar";
import { useSelector } from "react-redux";

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

export default function ShowAll() {
  const classes = useStyles();
  const location = useLocation();
  const daa = location.state;
  //console.log(daa);
  const [filterTerms, setFilterTerms] = useState(
    JSON.parse(localStorage.getItem("filter")) || {}
  );
  const [filteredData, setFilteredData] = useState([]);
  const [filtedData, setFiltedData] = useState([]);
  useEffect(() => {
    // Update filteredData whenever filterTerms or daa.items change
    const data = daa.items.filter((item) => filterTerms[item.department]);
    setFilteredData(data);
  }, [filterTerms, daa.items]);
  useEffect(() => {
    // Update filteredData whenever filterTerms or daa.items change
    const data = daa.items.filter((item) => daa.department === item.department);
    setFiltedData(data);
  }, []);
 

  return daa.faculty === daa.department ? (
    <ThemeProvider theme={outerTheme}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All-Nexus search</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Box
        sx={{
          width: "75%",
          height: "82%",
          overflow: "none",
          position: "absolute",
          top: "15%",
          left: "24%",
        }}
      >
        <h1>Projects</h1>
        <Box sx={{ overflowY: "scroll", width: "100%", height: 550 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {Object.keys(filterTerms).length === 0 ? (
              daa.items.map((item) => (
                <Grid item xs={2} sm={4} md={3} key={item._id}>
                  <Form key={item._id} item={item} />
                </Grid>
              ))
            ) : filteredData.length === 0 ? (
              <Typography>No items found.</Typography>
            ) : (
              filteredData.map((item) => (
                <Grid item xs={2} sm={4} md={3} key={item._id}>
                  <Form key={item._id} item={item} />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Box>
      <Bar faculty={daa.faculty} />
      <Navbar />
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={outerTheme}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All-Nexus search</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Box
        sx={{
          width: "95%",
          height: "82%",
          overflow: "none",
          position: "absolute",
          top: "15%",
          left: "2%",
        }}
      >
        <h1>Projects</h1>
        <Box sx={{ overflowY: "scroll", width: "100%", height: 550 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {filtedData.map((item) => (
              <Grid item xs={2} sm={5} md={3} key={item._id}>
                <Form key={item._id} item={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Navbar />
    </ThemeProvider>
  );
}
