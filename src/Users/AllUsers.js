import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Route, Routes, Link, useNavigate } from "react-router-dom";
import {Button,TextField, Box} from '@mui/material';
import ChackPermissionsComp from './Permission Chaking';
function AllusersComp()
{
     const user_data = useSelector(state=>state)
     const permissins = useSelector(state=>state.userDetails.permissions)
     const dispatch=useDispatch()
     const [user,setUser] = useState([])
     const navigate=useNavigate()
     useEffect(()=>{
    let arr=[]
    user_data.usersLogin[0].forEach(e => {
    let id = e._id
    let permisio=[]
    let userlog  =  e.UserName
    let password=e.Password
    let username= user_data.users[0].find(x=>x._id===id)
    console.log(username);
    let permission =user_data.permissions[0].find(x=>x._id===id)
    if (permission)
    {
        if (permission.permissions[0].ViewSubscriptions===true){permisio.push("View Subscriptions")}
        if (permission.permissions[1].CreatSubscriptions===true){permisio.push("Creat Subscriptions")}
        if (permission.permissions[2].DeleteSubscriptions===true){permisio.push("Delete Subscriptions")}
        if (permission.permissions[3].UpdateSubscriptions===true){permisio.push("Update Subscriptions")}
        if (permission.permissions[4].ViewMovies===true){permisio.push("View Movies")}
        if (permission.permissions[5].CreatMovies===true){permisio.push("Creat Movies")}
        if (permission.permissions[6].DeleteMovies===true){permisio.push("Delete Movies")}
        if (permission.permissions[7].UpdateMovies===true){permisio.push("Update Movies")}
    
    let obj =({id:id,fname:username.first_name,lname:username.last_name,user:userlog,password:password,sessiontimeout:username.SessionTimeOut,created_data:username.created_date,Arrpermisions:permisio,permissions:permission.permissions})
    arr.push(obj)
    }});
    setUser(arr)
     },[user_data.users.length])
     const edit=(id,usr)=>
     {
      dispatch({type:"EDIT_USER",payload:usr})
      navigate("/edit_user/"+id)
     }
     const Delete_user=(id)=>
     {
       dispatch({type:"DELETE_USER",payload:id})
       navigate("/all_users")  
     }
    

return(
    <div>
    <h1>All user</h1>
{
    user.map((item,index)=>
    {return <div style={{width : "300px", borderStyle : "solid", borderColor : 'yellow', borderWidth : "5px"}} key={index}>Name: {item.fname} {item.lname}
    <br/>User Name: {item.user}<br/>
    Session Time Out: {item.sessiontimeout}
    <br/>Created Data: {item.created_data}
    <br/>Permissions:{item.Arrpermisions.map((it,ind)=>
    {
        return <li key={ind}>{it}</li>
    })}
   <br/>{ChackPermissionsComp(permissins,"updateSub")&&<input type={'button'} value={'Edit'} onClick={()=>edit(item.id,user[index])} ></input>} &nbsp;
    {ChackPermissionsComp(permissins,"deleteSub")&&<input type={'button'} value={'Delete'} onClick={()=>Delete_user(item.id)}></input>} 
    </div>})
}
    
 
</div>
)
}
export default AllusersComp