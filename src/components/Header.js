import React, { useState } from 'react'
import {AppBar,Toolbar, Typography,Box,Button,Tabs,Tab}from '@mui/material'
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../store'

const Header = () => {
  const dispath =useDispatch()
  const isLoggedIn=useSelector(state=>state.isLoggedIn)
  const [value, setvalue] = useState()
  return (
   <AppBar position="sticky">
    <AppBar position="sticky"
    sx={{background:"linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(177,22,126,1) 35%, rgba(0,212,255,1) 100%)"}}>
      <Toolbar>
        <Typography variant="h4" >
          BlogsApp
        </Typography>  <Typography variant="h6" >
          -developed by Surajit
        </Typography>
      
         <Box sx={{display:"flex", marginLeft:"auto"}}>
         {!isLoggedIn && <Button LinkComponent={Link} to="/auth"  variant ="contained"sx={{margin:1,borderRadius:10}}color="warning">Login </Button>}

         

         {isLoggedIn && <Button onClick={()=>dispath(authActions.logout())} LinkComponent={Link} to="/auth"  variant ="contained"
          sx={{margin:1,borderRadius:10}} color="warning">Logout</Button>}
        </Box>
      </Toolbar>
    </AppBar>
     {isLoggedIn && <AppBar  position="sticky"
    sx={{background:" radial-gradient(circle, rgba(54,62,5,1) 0%, rgba(15,1,4,1) 100%)"}}>
     <Toolbar>
    <Box display ="flex" marginLeft={"auto"} marginRight={"auto"}>
            <Tabs textColor="inherit" value={value} onChange={(e,val)=>setvalue(val)}>
              <Tab LinkComponent={Link} to="/blogs" label="All Blogs"/>
              <Tab  LinkComponent={Link} to="/myBlogs" label="My Blogs"/>
           
            <Tab  LinkComponent={Link} to="/blogs/add" label="Add Blogs"/>
            </Tabs>
        </Box>
     </Toolbar>
    </AppBar>}
    </AppBar>
  )
}

export default Header