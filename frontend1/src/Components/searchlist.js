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
  Typography,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useLocation, Link, Form, Navigate } from "react-router-dom";
import axios from "../api/axios";
import { SearchOutlined } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, orange, blue } from "@mui/material/colors";

const useStyles = makeStyles({
    Info: {
        margin: '1',
        width: "55%",
        backgroundColor: 'rgba(0,0,0,0.05)',
        textDecoration: 'none',
        
    }
});

export default function DataList({ data }) {


  const classes = useStyles();

  return (
    <Box sx={{overflow: 'hidden'}}> <Typography variant="overline" display="block" gutterBottom  sx={{
      ml: 10,
        marginTop: { md: "10%", xs: "50%", lg: "10%" },
       //flexWrap: "wrap",
    }}>
    total results found {data.length}
  </Typography>
    <List
    sx={{
      ml: 10,
       // marginTop: { md: "10%", xs: "50%", lg: "10%" },
       //flexWrap: "wrap",
        width: {md: '90%'},
        maxHeight: 580,
      //maxWidth: 400,
     // bgcolor: "background.paper",
     // position: "relative",
      overflow: "auto",
      //axHeight: 420,
      "& ul": { padding: 0 },
    }}
    subheader={<li />}
    >

     
      <ul>
      {data.map((item, i) => (
        <ListItem key={i}>
        <Link    
         to={`/result/information/${item.title}`}
        state={item}
        className={classes.Info}
    
        >
        <Paper
          elevation={0}
          sx={{
            // height: { lg: "15%", md: "12%", sx: "200px" },
            width: "100%",
            shadow: "none",
           // height: 150,
            // backgroundColor: "rgb(237,240,239)",
            justifyContent: "space-between",
          
            // overflow: "hidden",
            //height: 150,
            '&:hover':{
                backgroundColor: 'rgba(0,0,0,0.05)',
                transition: 'width 0.3s ease-in-out',
                cursor: 'pointer'
            }
          }}
          
        >
          
          <Typography variant="caption" display="block" gutterBottom  ml={1}>
            {item.author}
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            sx={{ textDecoration: "underline", color: blue[500] }}
            ml={1}
          >
            {item.title}
          </Typography>
          <Typography
          ml={1}
            variant="body1"
            gutterBottom
            sx={{ overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",        
        }}
          >
           {item.abstract}
          </Typography>
          <Typography variant="overline" display="block" gutterBottom ml={1}>
          
            {item.date_created}
          </Typography>
        </Paper>
        </Link>
        </ListItem>
      ))}
    </ul>
    </List>
    </Box>
  );
}
