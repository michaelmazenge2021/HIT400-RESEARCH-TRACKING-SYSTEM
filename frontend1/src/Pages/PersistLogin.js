import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

    useEffect(() => {
      
        
    }, [isLoading])

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ?   <Backdrop
                    sx={{ color: 'orange', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={true}
                  ><CircularProgress color="inherit" /></Backdrop>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin