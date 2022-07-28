import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button,TextField, Box} from '@mui/material';
import {useNavigate} from 'react-router-dom'
function CreateAccount()
{
     const [newUser, setNewUser]= useState({UserName:"", Password:""})
     const storeData = useSelector(state=>state);
     const dispatch =useDispatch()
     const navigate=useNavigate()

const newuser =()=>
{
    const data  =storeData.usersLogin
    const users =data[0]
    for (let i = 0; i<users.length; i++){
    if (users[i].UserName == newUser.UserName)
    {
     return alert ("An existing username in the system")
    }}
    dispatch ({type:"ADD_USERLOGIN" , payload: newUser})
  
    navigate('/')
    console.log(users)
}

return(
    <div>
                <Box textAlign={"center"}>
         <h2>Create an Account</h2>
Please enter a Username and password:<br/><br/>

      <TextField id="outlined-basic" label="User Name" variant="outlined" onChange={e=> setNewUser({...newUser, UserName: e.target.value})} /><br/><br/> 

      <TextField id="outlined-basic" label="Password" variant="outlined" onChange={e=> setNewUser({...newUser, Password: e.target.value})} /><br/><br/> 

        <Button variant="contained" onClick={newuser} >Creat</Button>

    </Box>
    </div>
)}
export default CreateAccount