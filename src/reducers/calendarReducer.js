import { types } from '../types/types';
 
 const initialState = {
    events:[],
    activeEvent: null,
    usersActive: []
 }


export const calendarReducer = ( state = initialState, action) => {
    switch (action.type) {
        case types.calendarSetActive:
            
            return {
                ...state,
                activeEvent: action.payload
            }
        case types.calendarAddNew:
            
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }
        case types.calendarUpdate:
            const events = state.events.filter(event => event.id !== action.payload.id);
            return {
                ...state,
                events: [
                    ...events,
                    action.payload.event
                ]
            }
        case types.calendarDelete:
            const currentEvents = state.events.filter(event => event.id !== state.activeEvent.id);
            return {
                ...state,
                events: [
                    ...currentEvents,
                    action.payload
                ],
                activeEvent: null
            }
        case types.calendarLoad:
            return {
                ...state,
                events: [
                    ...action.payload
                ]
            }
        case types.calendarSetUsers:
            
            return {
                ...state,
                usersActive: action.payload
            }

    
        default:
            return state
    }
}