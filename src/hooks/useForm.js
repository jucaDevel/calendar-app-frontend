import { useState } from 'react'

/*
Custom hook que me servirá para manipular datos de elementos form
*/
export const useForm = ( initialState = {} ) => {
    /** Recibe un objeto que debe tener los name de todos los campos que quiero manipular*/
    const [values, setValues] = useState(initialState);
    /**Metodo para limpiar los campos que lleguen como parametros */
    const reset = ( newState = initialState) =>{
        setValues( newState )
    }

    /** Funcion que recibe los valores previos y reemplaza el valor del objeto en donde se dispara el evento*/
    const handdleInputChange = ( { target }) => {
        setValues({
            ...values,
            [target.name] : target.value
        });
    }

    /**Retorna un array los valores y la funcion del evento */
    return [ values, handdleInputChange, reset ];
}
