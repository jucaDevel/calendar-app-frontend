import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startDeleteEvents } from '../../actions/calendar'
import { Button } from '@mui/material'

export const DeleteFab = () => {

    const dispatch = useDispatch()
    const { activeEvent } = useSelector( (state) => state.calendar )

    const handleDelete = () => {
        dispatch( startDeleteEvents( activeEvent.id ))
    }

  return (
    <Button className='fab' variant="contained" onClick={handleDelete} sx={{
      textTransform:'none',
      fontSize:'15px',
      background:
        "rgba(252, 73, 124, 0.773)",
      width: '80px'
  }}>Cancelar</Button>
  )
}
