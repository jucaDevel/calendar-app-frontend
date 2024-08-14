import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';

import LogoutIcon from '@mui/icons-material/Logout';

export const Navbar = () => {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    // const google = google.accounts.id;
    // google.revoke( 'jucavelarde8822@gmail.com', done =>{
    //   localStorage.clear();
      dispatch(startLogout())
    // })
    // // console.log(google.accounts.id.revoke);
  }
  return (
    <div className='navbar-container'>
        <span className='navbar-user-name'>
            { name }
        </span>
        <LogoutIcon className='pointer' onClick={handleLogout} sx={{
          fontSize:'40px',
          color: '#ffffff'
        }}/>
    </div>
  )
}
