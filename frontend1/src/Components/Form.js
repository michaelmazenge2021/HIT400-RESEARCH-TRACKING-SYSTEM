import {React, useState} from "react";
import { makeStyles } from "@material-ui/styles";

import { Button ,Chip, Avatar,Paper} from "@mui/material";


const useStyles = makeStyles({
  Form: {
    backgroundColor: "white",
    height: "200px",
    width: "200px",
    borderRadius: "10px",
    padding: "2px",
    overflow: "hidden",
    margin: "10px"
  },
  img: {
    height: "30%",
    width: "30%",
    backgroundColor: "grey",
    margin: "5px",
    borderRadius: "10px",
  },
  h5: {
    margin: "5px",
  },
  bottom: {
    height: "20%",
    width: "100%",
    //backgroundColor: 'black',
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Middle: {
    height: "25%",
    width: "100%",
    //backgroundColor: 'black',
    display: "flex",
  },
  bubble: {
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: "10px",
    height: "20px",
    width: "80px",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "3px",
  },
  
});

export default function Form({item}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  const image = item.type;
  return (
    
    <Paper elevation={3} sx={{height: 150,
    width: 200,
    borderRadius: "10px",
    padding: "2px",
    overflow: "hidden",
    //display: 'flex',
    alignItems: 'center'
   }}>
        <h6 className={classes.h5} style={{ color: "gray" }}>
    {item.subject}
      </h6>
      
      <h5 className={classes.h5}>{item.title}</h5>
      <h6 className={classes.h5} style={{ color: "orange" }}>
    by {item.author}
      </h6>
      

    
    </Paper>
   
   
  );
}
