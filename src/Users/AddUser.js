import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Route, Routes, Link, useNavigate } from "react-router-dom";
import {Button,TextField, Box} from '@mui/material';
import axios from "axios"

//const url ="http://192.168.68.101:5000/"
const url = "http://192.168.1.110:5000/"
function AdduserComp()
{
     const user_id= useSelector(state=>state.usersLogin)
     const dispatch =useDispatch()
     const navigate= useNavigate()
     const [userLogin,setUserLogin]= useState({UserName:"",Password:""})
     const [user,setUser]= useState({first_name:"", last_name:"", SessionTimeOut:"", created_date:""})
     const [permission,setPermission]= useState({ViewSubscriptions:false,CreatSubscriptions:false,DeleteSubscriptions:false,UpdateSubscriptions:false, ViewMovies:false,CreatMovies:false,DeleteMovies:false,UpdateMovies:false})
     const save_user=()=>
{
    axios.post(url+"usersLogin",userLogin).then((data)=>
    {
    let id = data.data
    const permision = {_id:id,permissions:[{ViewSubscriptions:permission.ViewSubscriptions},{CreatSubscriptions:permission.CreatSubscriptions},{DeleteSubscriptions:permission.DeleteSubscriptions},{UpdateSubscriptions:permission.UpdateSubscriptions}, {ViewMovies:permission.ViewMovies},{CreatMovies:permission.CreatMovies},{DeleteMovies:permission.DeleteMovies},{UpdateMovies:permission.UpdateMovies}]}
    const usr = {...user,_id:id}
    const userlogin  = {...userLogin,_id:id}
    const adduser = {user:usr,permissions:permision,userslogin:userlogin}
    axios.post(url+"users",usr)
    axios.post(url+"permissions",permision)
    dispatch({type:"ADD_USER", payload:adduser})
    navigate("/all_users")
    })
}

return(
    <div>
        <Box textAlign={"center"}>
        <h2>Add new User</h2>
Please enter the details as follows :<br/><br/>

     <TextField id="outlined-basic" label="First Name" variant="outlined" onChange={e=>{setUser({...user,first_name:e.target.value})}} /><br/><br/> 
     <TextField id="outlined-basic" label="Last Name" variant="outlined" onChange={e=>{setUser({...user,last_name:e.target.value})}} /><br/><br/> 
     <TextField id="outlined-basic" label="User Name" variant="outlined" onChange={e=>{setUserLogin({...userLogin,UserName:e.target.value})}} /><br/><br/> 
     <TextField id="outlined-basic" label="Password" variant="outlined" onChange={e=>{setUserLogin({...userLogin,Password:e.target.value})}} /><br/><br/>
     <TextField id="outlined-basic" label="Session tume out (Minutes)" variant="outlined" onChange={e=>{setUser({...user,SessionTimeOut:e.target.value})}}/><br/><br/>
     <TextField id="outlined-basic" label="Date" variant="outlined" onChange={e=>{setUser({...user,created_date:e.target.value})}}/><br/><br/> </Box>
     <h3>permissions:</h3>
    <input type={'checkbox'} onClick={e=>{setPermission({...permission,ViewSubscriptions:e.target.checked})}}/>View Subscriptions<br/>
    <input type={'checkbox'} onClick={e=>{setPermission({...permission,CreatSubscriptions:e.target.checked})}}/>Creat Subscriptions<br/>
    <input type={'checkbox'} onClick={e=>{setPermission({...permission,DeleteSubscriptions:e.target.checked})}}/>Delete Subscriptions<br/>
    <input type={'checkbox'} onClick={e=>{setPermission({...permission,UpdateSubscriptions:e.target.checked})}}/>Update Subscriptions<br/>
    <input type={'checkbox'}  onClick={e=>{setPermission({...permission,ViewMovies:e.target.checked})}}/>View Movies<br/>
    <input type={'checkbox'} onClick={e=>{setPermission({...permission,CreatMovies:e.target.checked})}}/>Creat Movies<br/>
    <input type={'checkbox'} onClick={e=>{setPermission({...permission,DeleteMovies:e.target.checked})}}/>Delete Movies<br/>
    <input type={'checkbox'} onClick={e=>{setPermission({...permission,UpdateMovies:e.target.checked})}}/>Update Movies<br/>

    <input type={'button'} value={'save'} onClick={save_user}/> 


</div>
)
}
export default AdduserComp