import Swal from "sweetalert2"
import { privateFetch } from "../helpers/fetch"
import { prepareEvents } from "../helpers/prepareEvents"
import { types } from "../types/types"

export const setActive = (eventCalendar) => {
    return {
        type: types.calendarSetActive,
        payload: eventCalendar
    }
}

export const startAddNewEvent = ( event ) => {
    return async (dispatch, getState ) => {
        const { uid, name } = getState().auth;
        try {
            const resp = await privateFetch({
                endpoint: 'event/create', 
                data: event, 
                method: 'POST'
            })
            const { ok, data } = await resp.json();
            if( ok ){
                event.id = data.id
                event.users = {
                    _id: uid,
                    name
                }
                event.status = data.status
                dispatch(addNewEvent( event ))
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const startLoadingEvents = ( userId ) => {
    return async (dispatch ) => {
        try {
            const resp = await privateFetch({
                endpoint: `event/${userId}`
            })
            const { ok, data } = await resp.json();
            const events = prepareEvents(data)
            if( ok ){
                dispatch(loadEvents( events ))
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const startLoadingUsers = ( ) => {
    return async (dispatch ) => {
        try {
            const resp = await privateFetch({
                endpoint: 'auth/'
            })
            const { ok, data } = await resp.json();
            if( ok ){
                dispatch(loadUsers( data ))
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const loadEvents = ( events ) => {
    return {
        type: types.calendarLoad,
        payload: events
    }
}

const loadUsers = ( users ) => {
    return {
        type: types.calendarSetUsers,
        payload: users
    }
}

const addNewEvent = (eventToAdd) => {
    return {
        type: types.calendarAddNew,
        payload: {...eventToAdd}
    }
}

export const startUpdateEvent = ( id, eventToUpdate ) => {
    return async ( dispatch ) => {
        try {
            const resp = await privateFetch({
                endpoint:`event/update/${id}`,
                data: eventToUpdate,
                method: 'PUT'
            });
    
            const { ok, data } = await resp.json()
    
            if(ok){
                dispatch( updateEvent(id, data) );
            }
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error', 'Error', 'error');
        }
    }
}

const updateEvent = (id, eventToUpdate) => {
    return {
        type: types.calendarUpdate,
        payload: {
            id,
            event: eventToUpdate
        }
    }
}

export const startDeleteEvents = ( id ) => {
    return async ( dispatch ) => {
        try {
            const resp = await privateFetch({
                endpoint: `event/remove/${id}`,
                method: 'PUT'
            });
            const { ok, data } = await resp.json()
            if (ok) {
                dispatch( deleteEvent( data ) )
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const deleteEvent = ( data ) => {
    return {
        type: types.calendarDelete,
        payload: data
    }
}