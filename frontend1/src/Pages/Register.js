import { useRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Button,
  Alert,
  AlertTitle,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Snackbar,
  Typography
} from "@mui/material";
import { green, orange } from "@mui/material/colors";
import "../index.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "../api/axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
const URL = 'http://localhost:3000'
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
    position: "absolute",
    top: "0%",
    right: "0%",
    "@media (max-width: 780px)": {
      display: "none",
    },
  },

  Background: {
    backgroundColor: "rgb(16,47,66)",
    backgroundImage: `url('${URL}/wallpaper.png')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
    height: 850,
   // backdropFilter: "blur(3px)",
  },

  logo: {
    width: "15%",
    height: "15%",
    marginLeft: "42%",
    "@media (max-width: 780px)": {
      marginTop: "5%",
      width: "15%",
      height: "9%",
    },
  },
  logom: {
    width: "58px",
    height: "58px",
    marginLeft: "5%",
    margin: "1%",
  },
});
const USER_REGEX = /^(?=.*[A-z])(?=.*[0-9])(?=.*[a-z]).{8,10}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

export default function Register() {
  const classes = useStyles();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const routeChange = () => {
    let path = `newPath`;
    navigate("/login");
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
    
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else if (err.response?.status === 503) {
        setErrMsg("IDNumber Invalid");
      } else {
        
        setErrMsg("Registration Failed");
      }
     // errRef.current.focus();
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [showPasswordC, setShowPasswordC] = useState(false);

  const handleClickShowPasswordC = () => setShowPasswordC((show) => !show);

  const handleMouseDownPasswordC = (event) => {
    event.preventDefault();
  };
  return (
 
    <Box>
    
    
     
     
      <form className={classes.Login} onSubmit={handleSubmit}>
        
        <TextField
                    id="outlined-basic"
                    label="ID Number"
                    variant="standard"
          color="success"
          onChange={(e) => setUser(e.target.value)}
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          ref={userRef}
          value={user}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
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
            style:{ borderRadius: '40px'},}}
        />

        <TextField
                  id="outlined-basic"
            
                  variant="standard"
          
          label="Password"
       
          color="success"
          //autoComplete="current-password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          type={showPassword ? "text" : "password"}
          InputProps={{
            style:{ borderRadius: '40px'},
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
        />

        <TextField
         id="outlined-basic"
            
         variant="standard"
 
 label="Password"

          color="success"
          //autoComplete="current-password"
          onChange={(e) => setMatchPwd(e.target.value)}
          value={matchPwd}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
          type={showPasswordC ? "text" : "password"}
          InputProps={{
            style:{ borderRadius: '40px'},
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordC}
                  onMouseDown={handleMouseDownPasswordC}
                  edge="end"
                >
                  {showPasswordC ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
        />

        <Button
         variant="contained" color="success"
         sx={{
          //background: "rgb(90,180,80)",
         
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
          disabled={!validName || !validPwd || !validMatch ? true : false}
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
            Register
          </Typography>
        </Button>
        <Box
            sx={{
              // background: "rgb(90,180,80)",
              color: "white",
              width: "70%",
              height: "6%",
              display: "flex",
              marginLeft: { md: "15%", lg: "15%", xs: "7%" },
              border: "none",
              justifyContent: "space-between",
              marginTop: "15px",
            }}
            onClick={routeChange}
          >
       
          </Box>
      </form>
      <Snackbar
            open={userFocus && !validName}
            autoHideDuration={2000}
            onClose={user}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert severity="info" variant="filled" sx={{ width: "100%" }}>
            <AlertTitle>instructions</AlertTitle>
        8 characters.
        <br />
        Must begin with a letter.
        <br />
        Letters & numbers
            </Alert>
          </Snackbar>
          <Snackbar
            open={!validMatch}
            autoHideDuration={2000}
            onClose={matchFocus}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
            <AlertTitle>Error</AlertTitle>
        Must match the first password input field.
            </Alert>
          </Snackbar>
          
          <Snackbar
            open={pwdFocus && !validPwd}
            autoHideDuration={2000}
            onClose={pwd}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert severity="info" variant="filled" sx={{ width: "100%" }}>
            <AlertTitle>instructions</AlertTitle>
            8 to 24 characters.
        <br />
        Must include uppercase and lowercase letters, a number and a special
        character.
        <br />
        Allowed special characters: <span aria-label="exclamation mark">
          !
        </span>{" "}
        <span aria-label="at symbol">@</span>{" "}
        <span aria-label="hashtag">#</span>{" "}
        <span aria-label="dollar sign">$</span>{" "}
        <span aria-label="percent">%</span>
            </Alert>
          </Snackbar>
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
