import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import {Route, Link, Routes, useNavigate} from 'react-router-dom'
import LoginPage from "./Users/login";
import CreateAccount from "./creat_account";
import { useEffect ,useState} from "react";
import Logout_page from "./Movies/movies";
import Subscriptions from "./Subscriptions/subscriptions";
import Users_management_page from "./Users/users_management";
import EdituserComp from "./Users/edit_user";
import AllusersComp from "./Users/AllUsers";
import EditmovieComp from "./Movies/edit_movie";
import Movies_page from "./Movies/movies";
import EditMemberComp from "./Subscriptions/EditMember";
import ChackPermissionsComp from "./Users/Permission Chaking";


function MenuComp(){
 let movies=[];
 let members=[];
 let subscriptions=[];
 let users=[];
 let usersLogin=[];
 let permissions=[];
 const [istoken, setIstoken]=useState()
 const [permis,setPermis]=useState()
 const storeData = useSelector(state=>state);
 const dispatch = useDispatch();
 const navigate= useNavigate();
 //const url ="http://192.168.68.101:5000/"
 const url = "http://192.168.1.110:5000/"
  useEffect(()=>
  {
   let user_detail = storeData.userDetails
   setIstoken(user_detail.isToken)
   setPermis(user_detail.permissions)
  },[storeData.userDetails])
  useEffect(() =>
 {
   async function getData() {
    let movis = await axios.get(url+"movies" )
    movies.push(movis.data);
    let usrs = await axios.get(url+"users" ) 
    users.push(usrs.data);
    let membrs = await axios.get(url+"members" )
    members.push(membrs.data);
    let users_login = await axios.get(url+"usersLogin" )
    usersLogin.push(users_login.data);
    let permissins = await axios.get(url+"permissions" )
    permissions.push(permissins.data);
    let subscriptins = await axios.get(url+"subscriptions" )
    subscriptions.push(subscriptins.data);

    dispatch({type : "LOAD_USERS", payload : users})
    dispatch({type : "LOAD_PERMISSIONS", payload : permissions})
    dispatch({type : "LOAD_USERSLOGIN", payload : usersLogin})
    dispatch({type : "LOAD_MEMBERS", payload : members})
    dispatch({type : "LOAD_MOVIES", payload : movies})
    dispatch({type : "LOAD_SUBSCRIPTIONS", payload : subscriptions})
}getData()},[usersLogin.length, storeData.userDetails.length, storeData.usersLogin.length])
   const Logout=()=>
   {
   
    dispatch({type:"LOGOUT"})
    setIstoken({isToken:false})
     navigate("*")
   }
   const Movies =()=>
   {
    navigate("/main_page")
   }
      const subscription =()=>
   {
    navigate("/subscriptions")
   }
    const usersManagement =()=>
   {
    navigate("/users_management")
   }
return(
<div>
    {istoken?
    <div> 

       {permis?
       <div>
        {ChackPermissionsComp(permis,"sys_admin")&&<input type={'button'} onClick={usersManagement} value={"Users Management"}/>}
        {ChackPermissionsComp(permis,"movies")&&<input type={'button'} onClick={Movies} value={"Movies"}/>}
        {ChackPermissionsComp(permis,"subscriptions")&&<input type={'button'} onClick={subscription} value={"Subscriptions"}/>}
       </div>:<></>}
        <input type={'button'} onClick={Logout} value={"Logout"}/>
        
    <Routes>
        <Route path="*" element={<LoginPage/>}> </Route>
        <Route path="/main_page" element={<Logout_page/>}> </Route>
        <Route path="/subscriptions" element={<Subscriptions/>}> </Route>
        <Route path="/users_management" element={<Users_management_page/>}> </Route>
        <Route path="/edit_user/:id" element={<EdituserComp/>}> </Route>
        <Route path="/all_users" element={<AllusersComp/>}> </Route>
        <Route path="/edit_movie/:id" element={<EditmovieComp/>}> </Route>
        <Route path="/movies/:id" element={<Movies_page/>}> </Route>
        <Route path="/edit_member/:id" element={<EditMemberComp/>}> </Route>
        <Route path="/member/:id" element={<Subscriptions/>}> </Route>
    </Routes>

       
    </div>:<div>
    <Routes>
        <Route path="*" element={<LoginPage/>}> </Route>
        <Route path="/creat_account" element={<CreateAccount/>}> </Route>
    </Routes></div>}


</div>
)}
export default MenuComp