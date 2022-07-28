import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate  } from "react-router-dom";
import {Button,TextField, Box} from '@mui/material';
import AdduserComp from './AddUser';
function EdituserComp()
{
const userEdit=useSelector(state=>state.editUser)
const navigate= useNavigate()
const dispatch= useDispatch()
const [user,setUser]=useState({UserName:userEdit.user,Password:userEdit.password,first_name:userEdit.fname, last_name:userEdit.lname, SessionTimeOut:userEdit.sessiontimeout, created_date:userEdit.created_data})
const [permissions,setPermissions]=useState({ViewSubscriptions:userEdit.permissions[0].ViewSubscriptions,CreatSubscriptions:userEdit.permissions[1].CreatSubscriptions,
    DeleteSubscriptions:userEdit.permissions[2].DeleteSubscriptions,
UpdateSubscriptions:userEdit.permissions[3].UpdateSubscriptions,
     ViewMovies:userEdit.permissions[4].ViewMovies,
     CreatMovies:userEdit.permissions[5].CreatMovies,
     DeleteMovies:userEdit.permissions[6].DeleteMovies,
     UpdateMovies:userEdit.permissions[7].UpdateMovies})
const update_user=()=>
{
  let  perArr={user,Permissions:{_id:userEdit.id,permissions:[{ViewSubscriptions:permissions.ViewSubscriptions},{CreatSubscriptions:permissions.CreatSubscriptions},{DeleteSubscriptions:permissions.DeleteSubscriptions},{UpdateSubscriptions:permissions.UpdateSubscriptions}, {ViewMovies:permissions.ViewMovies},{CreatMovies:permissions.CreatMovies},{DeleteMovies:permissions.DeleteMovies},{UpdateMovies:permissions.UpdateMovies}]}}
  dispatch({type:"UPDATE_USER", payload:perArr})
  navigate('/all_users')
console.log(perArr);

}
const cancel=()=>
{
navigate("/users_management")
}

return(
  <div>
        <Box textAlign={"center"}>
        <h2>Edit User</h2>
Please update the details as follows :<br/><br/>

     <TextField id="outlined-basic" label="First Name" variant="outlined" defaultValue={userEdit.fname} onChange={e=>{setUser({...user,first_name:e.target.value})}} /><br/><br/> 
     <TextField id="outlined-basic" label="Last Name" variant="outlined" defaultValue={userEdit.lname} onChange={e=>{setUser({...user,last_name:e.target.value})}} /><br/><br/> 
     <TextField id="outlined-basic" label="User Name" variant="outlined" defaultValue={userEdit.user} onChange={e=>{setUser({...user,UserName:e.target.value})}} /><br/><br/> 
     <TextField id="outlined-basic" label="Password" variant="outlined"  defaultValue={userEdit.password} onChange={e=>{setUser({...user,Password:e.target.value})}} /><br/><br/>
     <TextField id="outlined-basic" label="Session tume out (Minutes)"  defaultValue={userEdit.sessiontimeout} variant="outlined" onChange={e=>{setUser({...user,SessionTimeOut:e.target.value})}}/><br/><br/>
     <TextField id="outlined-basic" label="Date" variant="outlined"  defaultValue={userEdit.created_data} onChange={e=>{setUser({...user,created_date:e.target.value})}}/><br/><br/> </Box>
     <h3>permissions:</h3>
    <input type={'checkbox'} defaultChecked={userEdit.permissions[0].ViewSubscriptions} onClick={e=>{setPermissions({...permissions,ViewSubscriptions:e.target.checked})}}/>View Subscriptions<br/>
    <input type={'checkbox'} defaultChecked={userEdit.permissions[1].CreatSubscriptions} onClick={e=>{setPermissions({...permissions,CreatSubscriptions:e.target.checked})}}/>Creat Subscriptions<br/>
    <input type={'checkbox'} defaultChecked={userEdit.permissions[2].DeleteSubscriptions} onClick={e=>{setPermissions({...permissions,DeleteSubscriptions:e.target.checked})}}/>Delete Subscriptions<br/>
    <input type={'checkbox'} defaultChecked={userEdit.permissions[3].UpdateSubscriptions} onClick={e=>{setPermissions({...permissions,UpdateSubscriptions:e.target.checked})}}/>Update Subscriptions<br/>
    <input type={'checkbox'} defaultChecked={userEdit.permissions[4].ViewMovies} onClick={e=>{setPermissions({...permissions,ViewMovies:e.target.checked})}}/>View Movies<br/>
    <input type={'checkbox'} defaultChecked={userEdit.permissions[5].CreatMovies} onClick={e=>{setPermissions({...permissions,CreatMovies:e.target.checked})}}/>Creat Movies<br/>
    <input type={'checkbox'} defaultChecked={userEdit.permissions[6].DeleteMovies} onClick={e=>{setPermissions({...permissions,DeleteMovies:e.target.checked})}}/>Delete Movies<br/>
    <input type={'checkbox'} defaultChecked={userEdit.permissions[7].UpdateMovies} onClick={e=>{setPermissions({...permissions,UpdateMovies:e.target.checked})}}/>Update Movies<br/>

    <input type={'button'} value={'save'} onClick={update_user}/>&nbsp;
    <input type={'button'} value={'Cancel'} onClick={cancel}></input> 


</div>
)
}
export default EdituserComp