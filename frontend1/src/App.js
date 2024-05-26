import {useState} from "react";

import { makeStyles } from '@material-ui/styles';
import Login from "./Pages/Login";
import { Route, Routes , useNavigate, useLocation , Navigate} from "react-router-dom";
import Search from "./Pages/search";
import axios from "./api/axios";
import Register from "./Pages/Register";
import Layout from './Pages/Layout';
import RequireAuth from './Pages/RequireAuth';
import PersistLogin from './Pages/PersistLogin';
import Unauthorized from './Pages/Unauthorized';
import Result from "./Pages/Result";
import Manage from "./Pages/Manage";
import Information from "./Pages/information";
import ShowAll from "./Pages/allfiles";
import BasicTabs from './Pages/index'
import RequireNoAuth from "./Pages/RequireNoAuth";
import useLocalStorage from "./hooks/useLocalStorage";
import useAuth  from './hooks/useAuth';
const useStyles = makeStyles({
    home: {
      backgroundColor: "rgb(245,247,250)",
      width: "100%",
    height: 820,
     
      overflow: "hidden",
    //  overflowY: "auto",
    },
    Image: {
      position: "absolute",
      flex: 1,
    },
  });

export default function App() {
    const classes = useStyles();
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useLocalStorage("searchTerm", '');
    const [searchData, setData] = useState([]);
    const location = useLocation();
    const state = location.state;
    const { auth } = useAuth();

    const performSearch = async (t) => {
      try {
        const response = await axios.get('/search', {
          params: { query: t }
        });
  
        // Handle the response data
        const searchData = response.data;
        setData(searchData);
        // Process and display the search results as needed
      //  console.log(data)
  
      } catch (error) {
        console.error('Error performing search:', error);
        // Handle any errors that occurred during the search request
      }
    };

    //set search term
    const setSearch = async (term) => {
      setSearchTerm(term);
      
      performSearch(term);
      navigate('/result');
    };
  return (
    <div className={classes.home}>
                <Routes>
                <Route path="/" element={<Layout />}>
                
                {auth?.accessToken ? (
            // User is already logged in, redirect to the search page
            <Route path="login" element={<Navigate to="/" replace />} />
          ) : (
            // User is not logged in, render the login page
            <Route path="login" element={<BasicTabs />} />
          )}
                 <Route path="unauthorized" element={<Unauthorized />} />
                 <Route element={<PersistLogin/>}>
                 <Route element={<RequireAuth allowedRoles={[2001]} />}>
                 
                 <Route path="/" element={<Search setSearch={setSearch}/>}></Route>
                 <Route path="result" element={<Result  searchTerm={searchTerm} setSearch={setSearch} searchData={searchData}/> }></Route>
                 <Route path="/result/information/:title" element={<Information state={state} setSearch={setSearch}/>  }></Route>
                <Route element={<RequireAuth allowedRoles={[6700,4001,2013 ]} />}>
                 <Route path="Manage" element={<Manage/>}></Route>
                 <Route path="Showall" element={<ShowAll/>}></Route></Route>
                 </Route>
                 </Route>
                 
                 </Route>
                 
                </Routes>
                
     	</div>
  
  );
}

