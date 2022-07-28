import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
import {Button,TextField, Box} from '@mui/material';
function EditMemberComp()
{
  let dispatch=useDispatch()
  let navigate=useNavigate()
  const member = useSelector(state=>state.editMember)
  console.log(member)
  const [upmember,setUpmember]= useState({_id:member._id, email:member.email, name:member.name, city:member.city})
  console.log(upmember);
  const update=()=>
  {
    dispatch({type:"UPDATE_MEMBER",payload:upmember})
    navigate("/subscriptions")
  }
  const cancel=()=>
  {
    navigate("/subscriptions")
  }

return(
  <div><h2>Edit member: {member.name}</h2>
   Name :  &nbsp; <input type={"text"} defaultValue={member.name} onChange={e=>setUpmember({...upmember,name:e.target.value})}></input><br/>
   Email : &nbsp;&nbsp;&nbsp;<input type={"text"}  defaultValue={member.email}onChange={e=>setUpmember({...upmember,email:e.target.value})}></input><br/>
   City :  &nbsp;&nbsp; &nbsp;&nbsp;<input type={"text"} defaultValue={member.city} onChange={e=>setUpmember({...upmember,city:e.target.value})}></input><br/>
  <input type={'button'} value={'update'} onClick={update} ></input>&nbsp;
  <input type={'button'} value={'cancel'} onClick={cancel}></input>
  </div>
)
}
export default EditMemberComp