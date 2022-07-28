import {useState} from 'react'
import AdduserComp from './AddUser';
import AllusersComp from './AllUsers';
import {useSelector} from 'react-redux'
import ChackPermissionsComp from './Permission Chaking';

function Users_management_page()
{
     const [all,setAll]= useState(true)
     const [add,setAdd]= useState(false)
     const permissins = useSelector(state=>state.userDetails.permissions)

    const All_users=()=>
    {
     setAll(!all)
     setAdd(false)
    }

        const Add_uses=()=>
    {
     setAdd(!add)
     setAll(false)
    }
    const Cancel=()=>
    {
     setAdd(!add)
     setAll(false)
    }


return(
    <div>
    <h1>Users</h1>
    <input type={'button'} value={"All Users"} onClick={All_users}></input>
   {ChackPermissionsComp(permissins,"addSub")&&<input type={'button'} value={"Add Users"} onClick={Add_uses}></input>}

    {
        all?<div><AllusersComp/></div>:<div></div>
    }
    {
        add?<div><AdduserComp/><input type={'button'} value={'Cancel'} onClick={Cancel}></input> </div>:<div></div>
    }
    

</div>
)
}
export default Users_management_page