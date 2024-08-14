import { Box } from '@mui/material';
import React from 'react'

export const CalendarEvent = ({event}) => {
    const { title, name, notes, status } = event;
  return (
    <Box className={`calendar-event ${status!==1 && 'calendar-event-canceled'}`} sx={{
      textDecoration: (status !== 1) && 'line-through',
    }}>
      <div className='calendar-event-header'>
        <div className={`${ status===1 ? 'calendar-event-container-color':'calendar-event-container-canceled'}`}></div>
        <span className='calendar-event-title'>{ title }</ span>
      </div>
      {/* <div className='calendar-event-info'>
        <strong>{ name }</strong>
        <strong>{ notes }</strong>
        {
          (status !== 1) && 
          <strong>Cancelado</strong>
        }
      </div> */}
    </Box>
  )
}
