import { useDispatch} from 'react-redux'
import '../styles/profile.scss'
import "../styles/input.scss"
import { useDeleteUserMutation, useUpdateUserMutation } from '../app/services/auth/authService';
import { logout, updateUserInfo } from '../features/auth/authSlice';
import noprofile from '../assets/no-profile.svg'
import { useRef, useState } from 'react';
import CropImage from '../components/CropImage';
import { Dialog, Favourites } from '../components';
import { Outlet } from 'react-router-dom';
import { placeholder } from '../features/auth/placeholder';
const Profile = (props) => {
  const {userInfo}=props
  // const [deleteUser]=useDeleteUserMutation()
  const [updateUser]= useUpdateUserMutation()
  const [error, setError]=useState()
  const dispatch=useDispatch()
  const dialogRef=useRef()
  const [description, setDescription]=useState(userInfo?.desc? userInfo?.desc:"")

  // const handleDeleteUser=async()=>{
  //   await deleteUser().unwrap()
  //   .then(()=>{ dispatch(logout()) })
  // }


  const handleChange=async(data)=>{
      await updateUser(data).unwrap()
      .then(()=>dispatch(updateUserInfo(data)))
  }


  // DIALOG ONLY
  const openModal=()=>{
    dialogRef.current.showModal()
  }

  return (
    <div>
        <Dialog dialogRef={dialogRef} >
          <CropImage handleChange={handleChange} setError={setError} error={error} dialogRef={dialogRef}/>
        </Dialog>
        <Outlet/>
        <main>
          <div className='user-hero' >
            <div className="user-img" style={{backgroundImage:`url(${!userInfo?.image? noprofile :userInfo?.image})`}}>
              <div className='small-btn orange' onClick={()=>openModal()}>
                <span className="material-symbols-outlined">
                  add
                </span>
              </div>
            </div>
          </div>
          <div className="grid-container">
            <div className=" user-info">
                  <h4>
                    {userInfo?.name.toUpperCase()}
                  </h4>
                  <h6 style={{opacity:"0.5"}}>
                    {userInfo?.email}
                  </h6>            
                  <textarea name="description" defaultValue={description?description:""} placeholder={placeholder} 
                            cols="46" rows="10" maxLength="500" onChange={(e)=>setDescription(e.target.value)} 
                            onBlur={()=>handleChange({desc:description})}/>

                  <h6 style={{textAlign:"right", opacity:"0.3"}}>{description.length}/500</h6>
            </div>
            <Favourites {...props}/>   
          </div>
        </main>
          



              
    </div>
  )
}

export default Profile;