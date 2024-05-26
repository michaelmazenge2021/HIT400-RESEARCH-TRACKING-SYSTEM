import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { CheckBoxOutlineBlankOutlined, ExpandLess } from "@mui/icons-material";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import {
 


  Checkbox,
  FormControlLabel,
  
  Typography,
} from "@mui/material";

const useStyles = makeStyles({
  body: {
    display: "flex",
    alignItems: "center",
  },
  text: {
    margin: "10px",
    fontWeight: 10,
    fontSize: 13,
    fontStyle: "normal",
  },
});

export default function SidebarItem({ item }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [filterTerms, setFilterTerms] = useLocalStorage("filter", {});

  const handleChange = (e, index) => {
    const activeData = document.getElementById(index).checked;
  
    if (activeData) {
      // Add the item to filterTerms
      setFilterTerms((prevFilterTerms) => {
        return { ...prevFilterTerms, [e.target.value]: true };
      });
    } else {
      // Remove the item from filterTerms
      setFilterTerms((prevFilterTerms) => {
        const updatedFilterTerms = { ...prevFilterTerms };
        delete updatedFilterTerms[e.target.value];
        return updatedFilterTerms;
      });
    }

    window.location.reload();
  };
  

  if (item.children) {
    return (
      <div className={open ? "sidebar-item open" : "sidebar-item"}>
        <div className="sidebar-title">
          <span>
            <h4 style={{ margin: "1px" }}>{item.title}</h4>
          </span>
        </div>
        <div className="sidebar-content">
          {item.children.map((child, index) => (
            <div className={classes.body} key={index}>
            
              <FormControlLabel
              control={
                <Checkbox
                id={index}
                value={child.code}
                onChange={(e) => handleChange(e, index)}
                checked={filterTerms[child.code] || false}
                  color="success"
                />
              }
              label={child.title}
              style={{
                //margin: "1px",
                fontFamily: "Adam",
                fontWeight: "2px",
                // marginTop: "5px",
                cursor: "pointer",
              }}
            />
             
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="sidebar-item">
        <div className="sidebar-title">
          <span>{item.title}</span>
        </div>
      </div>
    );
  }
}