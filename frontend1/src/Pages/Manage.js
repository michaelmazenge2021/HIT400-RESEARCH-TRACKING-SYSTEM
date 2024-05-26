import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Divider,
  TextField,
  InputAdornment,
  Paper,
  Skeleton,
  Box,
  Button,
  Dialog,
  Typography,
} from "@mui/material";
import UploadFiles from "../Components/FileUpload";
import { useNavigate, Link, Form } from "react-router-dom";
import PinnedSubheaderList from "./List";
import { AddCircleOutline, SearchOutlined } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, orange } from "@mui/material/colors";
import { jwtDecode } from "jwt-decode";
import useAuth from "../hooks/useAuth";
import Navbar from "../Components/NavBar";
import axios from "../api/axios";
import detal from "../Components/sidebar.json"

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
      marginLeft: "35%",

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
const URL = "http://localhost:3000";
export default function Manage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/get-files")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  //console.log(data);
  const role = {
    "Admin": {
      6700: 'Infor.Comm.Tech',
      2013: 'Accounting',
      4001: 'Pharmacy'
    }
  };
  const part = {
    "Dept": {
      6701: 'Software',
      6702: 'Cloud Computin',
      6703: 'Computer Science'
    }
  };
  const { auth } = useAuth();
  const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
  const dept = decoded?.UserInfo?.department || [];
  const roles = Object.values(decoded?.UserInfo?.roles).filter(Boolean) || [];
  const lastElement = roles.pop();
console.log(dept)
  const items = data.filter(item => item.faculty === lastElement)
  const i = detal.filter(item => item.faculty === lastElement)
  const space = i[0].children.filter(item => item.code  === dept)
 //console.log(space);
 const info = data.filter(item => item.department === space[0].code)
  const classes = useStyles();
  return (
    lastElement === space[0].code ? 
    <ThemeProvider theme={outerTheme}>
      <Box
        sx={{
          display: "block",
         // backgroundColor: "#eef0f2",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            width: "95%",
            height: "70%",
            overflow: "auto",
            mt: "9%",
            ml: "3%",
          }}
        >
          <Typography variant="h4" gutterBottom ml={1}>
          Projects for {space.length > 0 ? space[0].title : ''}
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            color={"grey"}
            ml={1}
            mb={0}
          >
            Overall
          </Typography>
          <Box sx={{ display: "flex", width: "100%" }}>
           
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                width: "75%",
                "& > :not(style)": {
                  m: 1,
                  width: "22%",
                  height: 150,
                },
              }}
            >
              <Paper>
                {" "}
                <Typography
                  variant="h3"
                  gutterBottom
                  ml={1}
                  mb={0}
                  color={"green"}
                >
                  {items.length}
                </Typography>
                <Typography variant="h5" gutterBottom color={"black"} ml={1}>
                  Total Projects
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  color={"grey"}
                  ml={1}
                  mt={4}
                >
                  last added Yesterday
                </Typography>
              </Paper>
              <Paper>
                {" "}
                <Typography
                  variant="h3"
                  gutterBottom
                  ml={1}
                  mb={0}
                  color={"orange"}
                >
                  1486
                </Typography>
                <Typography variant="h5" gutterBottom color={"black"} ml={1}>
                  Total Searches
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  color={"grey"}
                  ml={1}
                  mt={4}
                >
                  100 searches Today
                </Typography>
              </Paper>
              <Paper>
                {" "}
                <Typography
                  variant="h3"
                  gutterBottom
                  ml={1}
                  mb={0}
                  color={"purple"}
                >
                  432
                </Typography>
                <Typography variant="h5" gutterBottom color={"black"} ml={1}>
                  Most Viewed
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  color={"grey"}
                  ml={1}
                  mt={4}
                >
                  Search on A.I
                </Typography>
              </Paper>
              <Paper>
                {" "}
                <Typography
                  variant="h3"
                  gutterBottom
                  ml={1}
                  mb={0}
                  color={"red"}
                >
                  66
                </Typography>
                <Typography variant="h5" gutterBottom color={"black"} ml={1}>
                  Appreciations
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  color={"grey"}
                  ml={1}
                  mt={4}
                >
                  last added Yesterday
                </Typography>
              </Paper>
            </Box>
          </Box>
          <Box sx={{ display: "flex", width: "100%" }}>
            <Paper
              elevation={1}
              sx={{
                m: 1,
                width: "60%",
                height: 400,
              }}
            />
            <Paper
              elevation={1}
              sx={{
                m: 1,
                width: "33%",
                height: 400,
              }}
            >
              <PinnedSubheaderList items= {items} faculty={lastElement} department={space[0].code} />
            </Paper>
          </Box>
        </Box>
        <Navbar />
      </Box>{" "}
    </ThemeProvider>
  :<ThemeProvider theme={outerTheme}>
  <Box
    sx={{
      display: "block",
     // backgroundColor: "#eef0f2",
      width: "100%",
      height: "100%",
    }}
  >
    <Box
      sx={{
        width: "95%",
        height: "70%",
        overflow: "auto",
        mt: "9%",
        ml: "3%",
      }}
    >
      <Typography variant="h4" gutterBottom ml={1}>
      Projects for {space.length > 0 ? space[0].title : ''}
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        color={"grey"}
        ml={1}
        mb={0}
      >
        Overall
      </Typography>
      <Box sx={{ display: "flex", width: "100%" }}>
      <UploadFiles faculty={lastElement} department={space[0].code}/>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: "75%",
            justifyContent: 'space-between',
            "& > :not(style)": {
            //  mr: 1,
              width: "23%",
              height: 150,
            },
          }}
        >
          <Paper>
            {" "}
            <Typography
              variant="h3"
              gutterBottom
              ml={1}
              mb={0}
              color={"green"}
            >
              {info.length}
            </Typography>
            <Typography variant="h5" gutterBottom color={"black"} ml={1}>
              Total Projects
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              color={"grey"}
              ml={1}
              mt={4}
            >
              last added Yesterday
            </Typography>
          </Paper>
          <Paper>
            {" "}
            <Typography
              variant="h3"
              gutterBottom
              ml={1}
              mb={0}
              color={"orange"}
            >
              1486
            </Typography>
            <Typography variant="h5" gutterBottom color={"black"} ml={1}>
              Total Searches
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              color={"grey"}
              ml={1}
              mt={4}
            >
              100 searches Today
            </Typography>
          </Paper>
          <Paper>
            {" "}
            <Typography
              variant="h3"
              gutterBottom
              ml={1}
              mb={0}
              color={"purple"}
            >
              432
            </Typography>
            <Typography variant="h5" gutterBottom color={"black"} ml={1}>
              Most Viewed
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              color={"grey"}
              ml={1}
              mt={4}
            >
              Search on A.I
            </Typography>
          </Paper>
          <Paper>
            {" "}
            <Typography
              variant="h3"
              gutterBottom
              ml={1}
              mb={0}
              color={"red"}
            >
              66
            </Typography>
            <Typography variant="h5" gutterBottom color={"black"} ml={1}>
              Appreciations
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              color={"grey"}
              ml={1}
              mt={4}
            >
              last added Yesterday
            </Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Paper
          elevation={1}
          sx={{
            m: 1,
            width: "60%",
            height: 400,
          }}
        />
        <Paper
          elevation={1}
          sx={{
            m: 1,
            width: "33%",
            height: 400,
          }}
        >
          <PinnedSubheaderList items= {items} faculty={lastElement} department={space[0].code}/>
        </Paper>
      </Box>
    </Box>
    <Navbar />
  </Box>{" "}
</ThemeProvider>
  )}
