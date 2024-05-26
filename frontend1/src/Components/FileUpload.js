import { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Divider,
  TextField,
  InputAdornment,
  Paper,
  Skeleton,
  Box,
  Button,
  Input,
  Dialog,
  Typography,
  Alert,
  Snackbar
} from "@mui/material";
import axios from "../api/axios";

import { AddCircleOutline, SearchOutlined } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, orange } from "@mui/material/colors";
import { useNavigate, useLocation } from "react-router-dom";

const outerTheme = createTheme({
  palette: {
    primary: {
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
export default function UploadFiles(daa) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [errMsg, setErrMsg] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const [Abstract, setAbstract] = useState("");
  const [file, setFile] = useState("");
  const [reference, setRef] = useState("");
  const classes = useStyles();
//console.log(daa)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Abstract", Abstract);
   // formData.append("reference", reference);
    formData.append("faculty", daa.faculty);
    formData.append("department", daa.department);
    formData.append("file", file);

    try {
      const response = await axios.post("/upload", formData, {
        headers: { "Content-Type": "application/pdf" },
        withCredentials: true,
      });
      setErrMsg("Success");
      setAbstract(" ");
      setFile(" ");
      setRef(" ")
      
    } catch (err) {
      console.log(err);
    }
  };

  
  return (
    <ThemeProvider theme={outerTheme}>
      <Box sx={{ display: "block", mr: 1.5,ml: 1 }}>
        <Button
          elevation={1}
          onClick={handleOpen}
          sx={{
           
            width: 250,
            height: 150,
            boxShadow: 1,
            backgroundColor: "white",
            color: "grey",
            textTransform: "none",
          }}
        >
          <AddCircleOutline sx={{ height: 80, width: 80 }} />{" "}
          <Typography variant="subAbstract1" gutterBottom color={"grey"} ml={1}>
            Upload Pdf
          </Typography>
        </Button>
        <Dialog onClose={handleClose} open={open}>
          <Box
            sx={{
              height: 600,
              width: 500,
              overflow: "auto",
              mt: "7%",
              ml: "3%",
              backgroundColor: "white",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Input
                type={"file"}
                inputProps={{ accept: "application/pdf" }}
                sx={{
                  m: 1,
                  width: "90%",
                  // height: 128,
                  boxShadow: 1,
                  backgroundColor: "white",
                  color: "grey",
                }}
                accept="application/pdf"
                required
                onChange={(e) => setFile(e.target.files[0])}
              />

              <TextField
                id="outlined-basic"
                label={"Abstract"}
                variant="outlined"
                color="success"
                onChange={(e) => setAbstract(e.target.value)}
                multiline
                rows={13}
                autoComplete="none"
                value={Abstract}
                required
                aria-describedby="uidnote"
                type={"text"}
                sx={{
                  width: "90%",
                  // height: "11%",
                  marginTop: "45px",
                  // marginLeft: "15%",
                  border: "none",
                  // borderRadius: "10px",
                  padding: "3px",
                  input: { color: "black" },
                }}
                InputProps={{
                  style: { borderRadius: "10px" },
                }}
              />
           
              <Box
                sx={{
                  display: "flex",
                  //justifyContent: "space-evenly",
                  marginTop: "45px",
                }}
              >
                <Button
                  onClick={handleClose}
                  style={{
                    background: "red",
                    color: "white",
                    width: "40%",
                    height: 60,
                    //marginTop: "25px",
                    //marginLeft: "15%",
                    margin: 7,
                    border: "none",
                    borderRadius: "40px",
                    //fontFamily: "Adam",
                    fontWeight: "5px",
                  }}
                >
                  cancel
                </Button>
                <Button
                  type="submit"
                  style={{
                    background: "rgb(90,180,80)",
                    color: "white",
                    width: "40%",
                    height: 60,

                    margin: 7,
                    // marginTop: "25px",
                     marginLeft: "8%",
                    border: "none",
                    borderRadius: "40px",
                    // fontFamily: "Adam",
                    fontWeight: "5px",
                  }}
                >
                  submit
                </Button>
              </Box>
            </form>
          </Box>
          <Snackbar
            open={errMsg}
            autoHideDuration={2000}
            onClose={setErrMsg}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
              {errMsg}
            </Alert>
          </Snackbar>
        </Dialog>
      </Box>{" "}
    </ThemeProvider>
  );
}
