import { types } from "../types/types"


export const handleModal = (isOpen) => {
    return {
        type: types.uiHandleModal,
        payload: isOpen
    }
}