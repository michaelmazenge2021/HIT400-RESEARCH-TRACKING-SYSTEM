import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { makeStyles } from '@material-ui/styles';
import SidebarItem from "./SideBaritem";
import items from "./sidebar.json"

import Bookmark from  '@mui/material/Button';
const useStyles = makeStyles({
    body:{
      background: '#011'
    },
    Bar:{
        backgroundColor: 'rgba(255,255,255,1)',
        width: '20%',
        height: '80%',
        borderRadius: '30px',
        position: 'absolute',
        left: '1%',
        top: '15%',
        overflow: 'hidden',
        '@media (maxWidth: 1000px)':{
          display: 'none',

        }
        
    },
    Ul:{
     // backgroundColor: 'green',
      textDecoration: 'none',
      width: '80%',
      padding: '0px'
      //alignItems: 'center',
      //marginLeft: '30%',
      //position: 'absolute',
     
      
    },
    li:{
      textDecoration: 'none',
      listStyle: 'none',
      //margin: '15px',
    
      //padding: '2px',
      //borderRadius: '10px',
      width: '100%',
      height: '100%',
      //alignItems: 'center',
    },
    a:{
      textDecoration: 'none',
      color: '#777',
      display: 'flex',
      fontSize: '14px',
     // alignItems: 'center',
      '&:hover':{
        color: 'rgb(226,112,63)'
      
      }
    },
    at:{
     
      textDecoration: 'none',
      backgroundColor: 'green'
    },
    typography:{
        height: '100%',
        width: '100%',
        //backgroundColor: 'green',
      //overflow: 'hidden',
      
      
    },
    h5:{
      marginBottom: '0px'
    },
    h3:{
      marginBottom: '0px'
    },
    Toolbar:{
      width: '100%',
      //backgroundColor: 'green',
       overflow: 'hidden'
    }
  
})

export default function Bar ( faculty ) {
 const classes = useStyles();
 //const Fav = Icon;\
 console.log(faculty)
 const list = items.filter(item => item.faculty === faculty.faculty)
  return (
          	<div  className={classes.Bar}>
     		<Toolbar className={classes.Toolbar}>
     		  <Typography className={classes.typography}>
           <h3>Filter</h3>
            {list.map( (item, index) => <SidebarItem key={index} item={item}/>)}
            </Typography>
     		</Toolbar>
     	</div>
  
  );
}

