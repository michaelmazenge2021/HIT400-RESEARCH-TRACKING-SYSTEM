import { useEffect, useState } from "react";
import useLogout from "../hooks/useLogout";
import { jwtDecode } from "jwt-decode";
import useAuth from "../hooks/useAuth";
import { makeStyles } from "@material-ui/styles";
import {
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Badge,
  Button,
  Box,
  Chip,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate, Link, Form } from "react-router-dom";
import Popover from "@mui/material/Popover";

import {
  HistoryOutlined,
  InfoOutlined,
  LoginOutlined,
  NoAccountsRounded,
  NotificationImportant,
  Notifications,
  Settings,
  SettingsAccessibilityOutlined,
} from "@mui/icons-material";
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function User() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [role, roleUpdate] = useState("");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const routeChange = () => {
    let path = `newPath`;
    navigate("/Manage");
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
const Admin =  [ 6700,2013, 4001]
  const { auth } = useAuth();
  const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;

  const firstname = decoded?.UserInfo?.firstname || [];
  const lastname = decoded?.UserInfo?.lastname || [];
  const username = decoded?.UserInfo?.username || [];
  const roles = Object.values(decoded?.UserInfo?.roles).filter(Boolean) || [];
  
  return (
    roles.some((element) => Admin.includes(element))?

    <Box sx={{ mr: '10px', display: 'flex', width: 100, justifyContent: 'space-between',mt: '4px'}} >
      <Tooltip title="Notifications" sx={{ mt: '0px' }}>
  <IconButton><Badge badgeContent={4} color="error">
    <Notifications color="secondary"  style={{ cursor: "pointer", width: 30, height: 30, }}/>
  </Badge></IconButton>
</Tooltip>
      
        
          <Avatar
            {...stringAvatar(`${firstname} ${lastname}`)}
            style={{ cursor: "pointer", width: 40, height: 40, color: "white" , mt: '15px',ml: '10px', fontSize: '15px', }}

           onClick={handleClick} 
          />
       

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{justifyItems: 'center'}}
      >
        <Typography
          sx={{
            p: 1,
            borderRadius: "25px",
            width: 400,
            alignContent: "center",
          }}
        >
           <Typography variant="subtitle2" gutterBottom color={'grey'} ml={21} mb={1}>{username}</Typography>
        
          <Avatar
            {...stringAvatar(`${firstname} ${lastname}`)}
            style={{ width: 80, height: 80, marginLeft: "40%" }}
          />
         <Typography variant="h4" gutterBottom  ml={13} mb={1} mt={2}>{firstname} {lastname}</Typography>
         <Typography variant="subtitle2" gutterBottom color={'grey'} ml={21} mb={1}>Administrator</Typography>
          <Divider />
          <Box sx={{ height: 65, display: "flex" }}>
            <Button
              style={{
                color: "black",
                margin: "10px",
                marginLeft: "1%",
                // fontFamily: "Adam",
                fontWeight: "12px",
                cursor: "pointer",
                //justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "rgb(245,240,240)",
                width: "45%",
                height: 60,
                AllCaps: "off",
                borderTopLeftRadius: "40px",
                borderBottomLeftRadius: "40px",
                textTransform: "none",
              }}
              startIcon={<Settings />}
              onClick={signOut}
            >
              Settings
            </Button>
            <Button
              style={{
                color: "red",
                margin: "10px",
                marginLeft: "1%",
                // fontFamily: "Adam",
                fontWeight: "12px",
                cursor: "pointer",
                //justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "rgb(245,240,240)",
                width: "45%",
                height: 60,
                AllCaps: "off",
                borderTopRightRadius: "40px",
                borderBottomRightRadius: "40px",
                textTransform: "none",
              }}
              startIcon={<LoginOutlined />}
              onClick={signOut}
            >
              Sign Out
            </Button>
          </Box>
          <Typography variant="subtitle2" gutterBottom color={'grey'} ml={2} mt={3}>More</Typography>
          <Divider/>
          <Button
            style={{
              //  color: "red",
              margin: "10px",
              marginLeft: "1%",
              // fontFamily: "Adam",
              fontWeight: "12px",
              cursor: "pointer",
              //justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "rgb(245,240,240)",
              width: "90%",
              height: 60,
              AllCaps: "off",
              borderTopRightRadius: "40px",
              borderTopLeftRadius: "40px",
              textTransform: "none",
            }}
            startIcon={<HistoryOutlined />}
            onClick={signOut}
          >
            Search History
          </Button>
          <Button
            style={{
              //color: "white",
              margin: "10px",
              marginLeft: "1%",
              // fontFamily: "Adam",
              fontWeight: "12px",
              cursor: "pointer",
              //justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "rgb(245,240,240)",
              width: "90%",
              height: 60,
              AllCaps: "off",
              borderBottomRightRadius: "40px",
              borderBottomLeftRadius: "40px",
              textTransform: "none",
            }}
            startIcon={<InfoOutlined/>}
            onClick={signOut}
          >
            About Account
          </Button>
          <Button
            style={{
              color: "green",
              margin: "10px",
              marginLeft: "1%",
              // fontFamily: "Adam",
              fontWeight: "12px",
              cursor: "pointer",
              //justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "rgb(245,240,240)",
              width: "90%",
              height: 60,
              AllCaps: "off",
              borderRadius: "40px",
              textTransform: "none",
            }}
            startIcon={<SettingsAccessibilityOutlined />}
            onClick={routeChange}
          >
            Manage the System
          </Button>
        </Typography>
      </Popover>
    </Box>:
     <Box sx={{ mr: '10px', display: 'flex', width: 100, justifyContent: 'space-between',mt: '4px'}} >
     <Tooltip title="Notifications" sx={{ mt: '0px' }}>
 <IconButton><Badge badgeContent={4} color="error">
   <Notifications color="secondary"  style={{ cursor: "pointer", width: 30, height: 30, }}/>
 </Badge></IconButton>
</Tooltip>
     
       
         <Avatar
           {...stringAvatar(`${firstname} ${lastname}`)}
           style={{ cursor: "pointer", width: 40, height: 40, color: "white" , mt: '15px',ml: '10px', fontSize: '15px', }}

          onClick={handleClick} 
         />
  
    
<Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{justifyItems: 'center'}}
      >
        <Typography
          sx={{
            p: 1,
            borderRadius: "25px",
            width: 400,
            alignContent: "center",
          }}
        >
           <Typography variant="subtitle2" gutterBottom color={'grey'} ml={21} mb={1}>{username}</Typography>
        
          <Avatar
            {...stringAvatar(`${firstname} ${lastname}`)}
            style={{ width: 80, height: 80, marginLeft: "40%" }}
          />
         <Typography variant="h4" gutterBottom  ml={13} mb={2} mt={2}>{firstname} {lastname}</Typography>
         <Typography variant="subtitle2" gutterBottom color={'grey'} ml={21} mb={1}>Student</Typography>
          <Divider />
          <Box sx={{ height: 65, display: "flex" }}>
            <Button
              style={{
                color: "black",
                margin: "10px",
                marginLeft: "1%",
                // fontFamily: "Adam",
                fontWeight: "12px",
                cursor: "pointer",
                //justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "rgb(245,240,240)",
                width: "45%",
                height: 60,
                AllCaps: "off",
                borderTopLeftRadius: "40px",
                borderBottomLeftRadius: "40px",
                textTransform: "none",
              }}
              startIcon={<Settings />}
              onClick={signOut}
            >
              Settings
            </Button>
            <Button
              style={{
                color: "red",
                margin: "10px",
                marginLeft: "1%",
                // fontFamily: "Adam",
                fontWeight: "12px",
                cursor: "pointer",
                //justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "rgb(245,240,240)",
                width: "45%",
                height: 60,
                AllCaps: "off",
                borderTopRightRadius: "40px",
                borderBottomRightRadius: "40px",
                textTransform: "none",
              }}
              startIcon={<LoginOutlined />}
              onClick={signOut}
            >
              Sign Out
            </Button>
          </Box>
          <Typography variant="subtitle2" gutterBottom color={'grey'} ml={2} mt={3}>More</Typography>
          <Divider/>
          <Button
            style={{
              //  color: "red",
              margin: "10px",
              marginLeft: "1%",
              // fontFamily: "Adam",
              fontWeight: "12px",
              cursor: "pointer",
              //justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "rgb(245,240,240)",
              width: "90%",
              height: 60,
              AllCaps: "off",
              borderTopRightRadius: "40px",
              borderTopLeftRadius: "40px",
              textTransform: "none",
            }}
            startIcon={<HistoryOutlined />}
            onClick={signOut}
          >
            Search History
          </Button>
          <Button
            style={{
              //color: "white",
              margin: "10px",
              marginLeft: "1%",
              // fontFamily: "Adam",
              fontWeight: "12px",
              cursor: "pointer",
              //justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "rgb(245,240,240)",
              width: "90%",
              height: 60,
              AllCaps: "off",
              borderBottomRightRadius: "40px",
              borderBottomLeftRadius: "40px",
              textTransform: "none",
            }}
            startIcon={<InfoOutlined/>}
            onClick={signOut}
          >
            About Account
          </Button>  
      </Typography>
    </Popover>
  </Box>
  );
}
