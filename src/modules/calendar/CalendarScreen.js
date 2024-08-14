import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Navbar } from '../../components/ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';

import moment from 'moment';
import './calendar.css'

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { handleModal } from '../../actions/ui';
import { setActive, startLoadingEvents, startLoadingUsers } from '../../actions/calendar';
import { AddNewFab } from '../../components/ui/AddNewFab';
import { DeleteFab } from '../../components/ui/DeleteFab';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
moment.locale('es');

const localizer = momentLocalizer(moment); // or globalizeLocalizer

export const CalendarScreen = () => {

    const [view, setView] = useState(localStorage.getItem('lastView') || 'day')
    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector((state) => state.calendar);
    const { uid } = useSelector((state) => state.auth);

    const onDoubleClick = (e) => {
        dispatch(handleModal(true))
    }

    const onSelectEvent = (e) => {
        dispatch(setActive(e))
    }

    const onViewChange = (e) => {
        localStorage.setItem('lastView', e);
        setView(e)
    }

    const onSelectSlot = () => {
        dispatch(setActive(null))
    }

    useEffect(() => {
      dispatch( startLoadingEvents(uid) )
      dispatch( startLoadingUsers() )
    }, [dispatch,uid])
    
    return (
        <div className='calendar-screen'>
            <Navbar/>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onSelectSlot={onSelectSlot}
                selectable={true}
                onView={onViewChange}
                view={view}
                components={{
                    event:CalendarEvent
                }}
            />
            <div className='footer-calendar'>    
                {
                    (activeEvent && activeEvent.status !== 0) && (
                        <DeleteFab/>       
                    )
                }
                <AddNewFab/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <CalendarModal/>
                </LocalizationProvider>
            </div>
        </div>
    )
}
