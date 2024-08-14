import { types } from "../types/types";

const initialState = {
    modalOpen: false,
    isLoading: true
}

export const uiReducer = ( state = initialState, action) => {
    switch (action.type) {
        case types.uiHandleModal:
            return {
                ...state,
                modalOpen:action.payload
            }
        case types.uiSetLoading:
            return {
                ...state,
                isLoading:true
            }
        case types.uiFinishLoading:
            return {
                ...state,
                isLoading:false
            }
        default:
            return state
    }
}