import { privateFetch, publicFetch } from "../helpers/fetch"
import { types } from "../types/types"
import Swal from 'sweetalert2'


export const startLogin = (email, password) => {
    return async (dispatch) => {
        dispatch(startLoading());
        try {
            const resp = await publicFetch({
                endpoint: 'auth/login', 
                data: { email, password }, 
                method: 'POST'
            })
            const body = await resp.json()
            if( body.ok ){
                localStorage.setItem('token', body.token);
                localStorage.setItem('token-init-date', new Date().getTime() );
                const { id:uid, name} = body.data;
                dispatch( login({
                    uid,
                    name
                }) )
            }
            else{
                Swal.fire({
                    icon:'error',
                    title:body.msg,
                    showConfirmButton:false,
                    timer:1500
                });
            }

            dispatch(loadingFinish());
        } catch (error) {
            console.log(error);
            dispatch(loadingFinish());
        }
    }
}

export const startSignInGoogle = (authCode, password = '', isRegister = false) => {
    return async (dispatch) => {
        dispatch(startLoading());
        try {
            const resp = await publicFetch({
                endpoint: 'auth/googleSignIn', 
                data: { authCode, password, isRegister }, 
                method: 'POST'
            })

            const body = await resp.json()
            if( body.ok ){
                localStorage.setItem('token', body.token);
                localStorage.setItem('token-init-date', new Date().getTime() );
                const { id:uid, name} = body.data;
                dispatch( login({
                    uid,
                    name
                }) )
            }
            else{
                Swal.fire({
                    icon:'error',
                    title:body.msg,
                    showConfirmButton:false,
                    timer:1500
                });
            }

            dispatch(loadingFinish());
        } catch (error) {
            console.log(error);
            dispatch(loadingFinish());
        }
    }
}

export const startRegister = (user) => {
    return async (dispatch) => {
        dispatch(startLoading());
        try {
            const resp = await publicFetch({
                endpoint: 'auth/create', 
                data: user, 
                method: 'POST'
            })
            const body = await resp.json()
            if( body.ok ){
                localStorage.setItem('token', body.token);
                localStorage.setItem('token-init-date', new Date().getTime() );
                const { id:uid, name} = body.data;
                dispatch( login({
                    uid,
                    name
                }) )
            }
            else{
                Swal.fire({
                    icon:'error',
                    title:body.msg,
                    showConfirmButton:false,
                    timer:1500
                });
            }

            dispatch( loadingFinish() );
        } catch (error) {
            console.log(error);
            Swal.fire('Error', 'Error', 'error')
            dispatch( loadingFinish() );
        }
    }
}

export const startChecking = () => {
    return async (dispatch) => {
        try {
            const resp = await privateFetch({
                endpoint: 'auth/revalidate'
            });
            const body = await resp.json();
            if( body.ok ){
                localStorage.setItem('token', body.token);
                localStorage.setItem('token-init-date', new Date().getTime() );
                const { uid, name} = body.data;
                dispatch( login({
                    uid,
                    name
                }));
                dispatch( loadingFinish() ); 
            }
            else{
                dispatch( checkingFinish() ); 
                dispatch( loadingFinish() ); 
                Swal.fire({
                    icon:'info',
                    iconColor:'rgb(83, 28, 184, 0.6)',
                    title:body.msg,
                    showConfirmButton:false,
                    timer:1000
                  });
            }
        } catch (error) {
            console.log(error);
            dispatch( loadingFinish() ); 
        }
    }
}

const checkingFinish = () => {
    return {
        type: types.authChekingFinish
    }
}


export const startLoading = () => {
    return {
        type: types.uiSetLoading
    }
}

export const loadingFinish = () => {
    return {
        type: types.uiFinishLoading
    }
}

const login = ( user ) => {
    return {
        type: types.authLogin,
        payload: user
    }
}

export const startLogout = () => {
    return ( dispatch ) => {
        localStorage.clear();
        dispatch( logout() );
    }
}

const logout = () => {
    return {
        type: types.authLogout
    }
}