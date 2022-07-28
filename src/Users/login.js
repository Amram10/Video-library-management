import {useState} from "react"
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import {Button,TextField, Box} from '@mui/material';
import {Route, Routes, Link, useNavigate } from "react-router-dom";
import CreateAccount from "../creat_account";
import MainPage from "../Movies/movies";
import ChackPermissionsComp from "./Permission Chaking";
function LoginPage()
{
    const navigate = useNavigate()
    //const url ="http://192.168.68.101:5000/" 
    const url = "http://192.168.1.110:5000/"
    const [user,setUser] = useState({UserName:"",Password:""})
    const [ wrong, setWrong] = useState(true)
    const disptch = useDispatch()
    const store_data = useSelector(state=>state)
    const chackUser= async()=>
    {
      let userToken = await axios.post(url+"auth/login",user)
      if (userToken.data==="Wrong user")
        {
        setWrong(false)
        }
      if(userToken.data!=="Wrong user")
        {
            setWrong(true)
             let usr=user.UserName
             let pwd = user.Password
             let idt = userToken.data
            let permis = store_data.permissions[0].find(x=>x._id===idt)
            console.log(permis);
             let obj = {User_name:usr,password:pwd, tokenId:idt, token:true, permissions:permis.permissions}
             console.log(obj);
            disptch({type:"DETAILS", payload:obj})
           if (ChackPermissionsComp(permis.permissions,"movies"))
           {
            navigate("/main_page")
           }
           else
           if(ChackPermissionsComp(permis.permissions,"subscriptions"))
           {
            navigate("/subscriptions")
           }
           

            
        }
    }
    const creatAccount = ()=>
    {
         navigate("/creat_account")
    }
return(
<div>
        <Box textAlign={"center"}>
        <h1>Welcome to Login page</h1>
Please enter a Username and password:<br/><br/>

      <TextField id="outlined-basic" label="User Name" variant="outlined" onChange={e=> setUser({...user, UserName: e.target.value})} /><br/><br/> 

      <TextField id="outlined-basic" label="Password" variant="outlined" onChange={e=> setUser({...user, Password: e.target.value})} /><br/><br/> 

        <Button variant="contained" onClick={chackUser}>Login</Button>
      { !wrong?<div><h2>Incorrect user
Please enter a username and password</h2></div>:<div>
</div>}
        <hr/>
       New User?<br/><br/>
        <Button variant="contained" onClick={creatAccount}>Create Account</Button>
    </Box>

</div>

);}
export default LoginPage;


