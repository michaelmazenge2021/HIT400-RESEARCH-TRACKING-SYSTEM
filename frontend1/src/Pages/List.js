import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import axios from "../api/axios";
import { Button, Divider, Paper, Typography } from "@mui/material";
import { Height } from "@mui/icons-material";
import { useNavigate, useLocation, Link } from "react-router-dom";
export default function PinnedSubheaderList(daa) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const routeChange = () => {
    let path = `newPath`;
    navigate("/showall");
  };
 const inf = daa.items.filter(item => item.department === daa.department)
  const visibleItems = inf.slice(0, 4);
  const viItems = daa.items.slice(0, 4);
  return (
    daa.faculty === daa.department ? 
    <List
      sx={{
        width: "100%",
        maxWidth: 400,
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: 420,
        "& ul": { padding: 0 },
      }}
      subheader={<li />}
    >
      <Typography variant="h5" gutterBottom color={"black"} ml={7} mt={3}>
        Projects List
      </Typography>
      {daa.items?.length ? (
        <ul>
          {viItems.map((pdf, i) => (
            <ListItem key={i}>
              <Paper
                sx={{
                  width: 400,
                  height: 50,
                  justifyContent: "space-between",
                  
                }}
              >
                {" "}
                <Typography
                  variant="body"
                  gutterBottom
                  color={"black"}
                  ml={2}
                  mt={9}
                  
                >
                  {pdf?.title}
                </Typography>
                <Button ml={2}sx={{
                 // backgroundColor: 'green',
                 flex: 'end'
                  
                }}>View</Button>
              </Paper>
              
            </ListItem>
          ))}
        <Link    
         to={'/showall'}
        state={daa}
       
    
        >View All</Link> </ul>
      ) : (
        <p>No pdf to display</p>
      )}
    </List>
    :
    <List
    sx={{
      width: "100%",
      maxWidth: 400,
      bgcolor: "background.paper",
      position: "relative",
      overflow: "auto",
      maxHeight: 420,
      "& ul": { padding: 0 },
    }}
    subheader={<li />}
  >
    <Typography variant="h5" gutterBottom color={"black"} ml={7} mt={3}>
      Projects List
    </Typography>
    {daa.items?.length ? (
      <ul>
        {visibleItems.map((pdf, i) => (
          <ListItem key={i}>
            <Paper
              sx={{
                width: 400,
                height: 50,
                justifyContent: "space-between",
                
              }}
            >
              {" "}
              <Typography
                variant="body"
                gutterBottom
                color={"black"}
                ml={2}
                mt={9}
                
              >
                {pdf?.title}
              </Typography>
              <Button ml={2}sx={{
               // backgroundColor: 'green',
               flex: 'end'
                
              }}>View</Button>
            </Paper>
            
          </ListItem>
        ))}
      <Link    
       to={'/showall'}
      state={daa}
     
  
      >View All</Link> </ul>
    ) : (
      <p>No pdf to display</p>
    )}
  </List>
  );
}
