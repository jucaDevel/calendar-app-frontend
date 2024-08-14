import React from 'react'
import { useDispatch } from 'react-redux'
import { handleModal } from '../../actions/ui';
import { setActive } from '../../actions/calendar';
import { Button } from '@mui/material';

export const AddNewFab = () => {

    const dispatch = useDispatch();
    const openModal = () => {
        dispatch(setActive(null))
        dispatch(handleModal(true))
    }
  return (
    <Button variant="contained" onClick={openModal} sx={{
      textTransform:'none',
      fontSize:'15px',
      background:
        "linear-gradient(100deg, rgba(110,78,244,0.8) 0%, rgba(152,71,245,0.8) 54%)",
  }}>Añadir</Button>
  )
}
