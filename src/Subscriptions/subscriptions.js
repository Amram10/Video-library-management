import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Route, Routes, Link, useNavigate } from "react-router-dom";
import {Button,TextField, Box} from '@mui/material';
import AllMembersComp from './allMembers';
import AddMemberComp from './AddMember';
function Subscriptions()
{
     const [all,setAll]= useState(true)
     const [add,setAdd]= useState(false)
const All_members=()=>
    {
     setAll(!all)
     setAdd(false)
    }

const Add_member=()=>
    {
     setAdd(!add)
     setAll(false)
    }
const Cancel=()=>
    {
     setAdd(!add)
     setAll(true)
    }

return(
    <div>
    <h1>Subscriptions</h1>
    <input type={'button'} value={"All Members"} onClick={All_members}></input>
    <input type={'button'} value={"Add Member"} onClick={Add_member}></input>
   

    {
        all?<div><AllMembersComp/></div>:<div></div>
    }
    {
        add?<div><AddMemberComp  callback={data=>All_members(data)}/><input type={'button'} value={'Cancel'} onClick={Cancel}></input> </div>:<div></div>
    }
    
    

</div>
)
}
export default Subscriptions