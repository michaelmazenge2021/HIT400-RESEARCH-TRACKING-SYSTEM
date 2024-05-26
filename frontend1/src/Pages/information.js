import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
Stack,
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
  Rating
} from "@mui/material";
import { Helmet } from "react-helmet";
import axios from "../api/axios";
import { saveAs } from 'file-saver';
import { useNavigate, useLocation } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import { SearchOutlined } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, orange, blue } from "@mui/material/colors";
import Navbar from "../Components/NavBar";
import DataList from "../Components/searchlist";
//import { copyToClipboard } from 'clipboard';


const outerTheme = createTheme({
  palette: {
    succes: {
      main: blue[500],
      color: "white",
    },
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
const labels = {
  0: 'No Rating!!!',
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor',
  2.5: 'Ok',
  3: 'Ok',
  3.5: 'Good',
  4: 'Good',
  4.5: 'Excellent',
  5: 'Excellent!!',
};
function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function Information({setSearch}) {
  const classes = useStyles();
  const location = useLocation();
  const item = location.state;
  const hostname = window.location.hostname;
  const currentPath = location.pathname;
  const url = window.location.href;
  const dbDate = item.date_posted;

const  unique = Date.now()
  const uniqueSuffix = new Date(unique);
  const year2 = uniqueSuffix.getFullYear();
  const month2 = (uniqueSuffix.getMonth() + 1).toString().padStart(2, '0');
  const day2 = uniqueSuffix.getDate().toString().padStart(2, '0');
  
  const formattedDate2 = `${year2}-${month2}-${day2}`;

const date = new Date(dbDate);


const year = date.getFullYear();
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const day = date.getDate().toString().padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;

const dbDate1 = item.date_created;
const date1 = new Date(dbDate1);

const year1 = date1.getFullYear();
const month1 = (date1.getMonth() + 1).toString().padStart(2, '0');
const day1 = date1.getDate().toString().padStart(2, '0');

const formattedDate1 = `${year1}-${month1}-${day1}`;

const cite = item.author.replace(/\s/g, "+")+`.`+item.title.replace(/\s/g, "+") +`-`+ url+`.`+formattedDate2
console.log(cite)

const [word, setWord] = useState(cite);
  const [copied, setCopied] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleCopy = () => {
     navigator.clipboard.writeText(word)
      .then(() => {
        setCopied(true);
        setErrMsg('Copied')
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      })
      .catch(err => {
        console.error('Failed to copy word:', err);
      });
  };
  //console.log(copied )
//copied = cite
const handleDownload = async () => {
  try {
    const response = await axios.get(`/files/${item.file}`,{
      responseType: 'blob'
    });
    const blob = new Blob([response.data], { type: 'application/pdf' });
    saveAs(blob, `${item.title}.pdf`);
  } catch (err) {
    console.log(err);
  }
};


const [value, setValue] = useState(0);
const [hover, setHover] = useState(-1);
  return (
    <ThemeProvider theme={outerTheme}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{item.title}-Nexus search</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    
        <Stack spacing={2} direction="row"     sx={{
          width: "45%",
        //  height: "100%",
          overflow: "auto",
          mt: "9%",
          ml: "6%",
          //backgroundColor: 'red'
        }}>
        <Button variant="contained" color="succes" onClick={handleDownload}>
          {" "}
          <Typography
            variant="subtitle1"
            component="h2"
            sx={{ textDecoration: "bold",
            color: "white",
            margin: "1px",
            
            //fontFamily: "Adam",
            fontWeight: "12px",
            //fontSize: "px",
          }}
          >
            Download This Paper
          </Typography>
        </Button>
        <Button color="succes" variant="outlined" onClick={handleCopy}>
        <Typography
            variant="subtitle1"
            component="h2"
            sx={{ textDecoration: "bold",
           // color: "white",
            margin: "1px",
            
            //fontFamily: "Adam",
            fontWeight: "2px",
            //fontSize: "px",
          }}
          >
            Cite this Paper
          </Typography>
        </Button></Stack>
        <Box sx={{ display: 'flex'}}>
        <Box component="section" sx={{ p: 2, border: '0.5px solid grey' ,
        mt: 2,
          width: "55%",
          height: "70%",
          overflow: "auto",
          // mt: "9%",
          ml: "6%",
          // backgroundColor: 'red'
        }}
   
      >
        <Typography
          variant="h5"
          component="h2"
          // sx={{ textDecoration: "underline" }}
        >
          {item.title}
        </Typography>
        <br />
        <Typography
          variant="subtitle1"
          display="block"
          color={"grey"}
          gutterBottom
        >
          {item.pages} Pages  .  Posted: {formattedDate}
          
        </Typography>
        <br />
        <Typography variant="subtitle1" display="block" sx={{color: "green",}} gutterBottom>
          {item.author}
        </Typography>
        <br />
        <Typography
          variant="subtitle1"
          display="block"
          color={"grey"}
          gutterBottom
        >
          Date Written: {formattedDate1}
        </Typography>
        <br />
        <Typography variant="h6" component="h2" sx={{ textDecoration: "bold", }}>
          Abstract
        </Typography>
        <Typography variant="body1" gutterBottom sx={{color: "grey",}}>
          {item.abstract}
        </Typography>
        <br />
        <Typography variant="subtitle1" gutterBottom>
          keywords:
          {item.keywords.map((word) => (
          <h style={{color: 'grey'}}> {word}, </h>
          ))}
        </Typography>
        <br/>
        <Typography variant="h6" component="h2" sx={{ color: "green", }}>
          Reference
        </Typography>
        
      </Box>
      <Box sx={{ 
        mt: 2,
          width: "25%",
          height: "0%",
          overflow: "auto",
          // mt: "9%",
          ml: "3%",
          // backgroundColor: 'red'
        }}>
      <Box sx={{ p: 2, backgroundColor: 'rgba(0,0,0,0.1)' ,
        //mt: 2,
        //  width: "100%",
          height: "0%",
          overflow: "auto",
          // mt: "9%",
          ml: "3%",
          // backgroundColor: 'red'
        }}>
          
   <Typography
          variant="h6"
          component="h2"
          // sx={{ textDecoration: "underline" }}
        >
          Paper Statics
        </Typography>
        <br />
        <Box display='flex'>
          <Box sx={{flex: 1}}>
        <Typography variant="body1" gutterBottom sx={{color: "grey",}}>
          Downloads
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ml: 2}}>
         1002
        </Typography>
        </Box>
        <Box sx={{flex: 2}}>
        <Typography variant="body1" gutterBottom sx={{color: "grey", ml: 2}}>
          Abstract Views

        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ml: 5}}>
         1002
        </Typography>
        </Box>
        <Box sx={{flex: 1, justifyContent: 'space-between'}}>
        <Typography variant="body1" gutterBottom sx={{color: "grey",ml: 2}}>
         Rank
        </Typography>
        <Typography variant="subtitle1" gutterBottom  sx={{ml: 2}}>
         1002
        </Typography>
        </Box>
        </Box>
        </Box>
        <Typography
          variant="h6"
          component="h2"
           sx={{ textDecoration: "underline", ml:3 }}
        >
          Rate this Paper
        </Typography>
        <Box
      sx={{
        width: 250,
        display: 'flex',
        alignItems: 'center',
        m:1,
        ml: 3
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={1}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2, color: blue[500] }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
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
      </Box>
      
      <Navbar setSearch={setSearch}/>
    </ThemeProvider>
  );
}
