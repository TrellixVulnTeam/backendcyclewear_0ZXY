import axios from "axios"

// Constantes
const dataInicial = {
    proveedores: []
}

// Headers API
export const customHeaders = {
    Accept: "Access-Control-Allow-Origin: *",
};


//Types
const OBTENER_PROVEEDORES_EXITO = 'OBTENER_PROVEEDORES_EXITO'
const SIGUIENTE_PROVEEDORES_EXITO = 'SIGUIENTE_PROVEEDORES_EXITO'

//Reducer
export default function proveedoresReducer(state = dataInicial, action) {
    switch (action.type) {
        case OBTENER_PROVEEDORES_EXITO:
            return { ...state, proveedores: action.payload }
        case SIGUIENTE_PROVEEDORES_EXITO:
            return { ...state, proveedores: action.payload }
        default:
            return state
    }
}

//Acciones
export const obtenerProveedoresAccion = () => async (dispatch, getState) => {
    //console.log("getState  : ", getState() )
    //const offset = getState().proveedores.offset
    try {
        
        const res = await axios({
            method: 'post', //you can set what request you want to be
            url: 'https://sitbusiness.co/cyclewear/api/111'
        })
        //console.log("RESPUESTA : ", res.data);

        dispatch({
            type: OBTENER_PROVEEDORES_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}
/*
export const siguienteUsuariosAccion = () => async (dispatch, getState) => {
    try {
        const params = {
            idmodelo: 1
        };
      
        const res = await axios({
            method: 'post', //you can set what request you want to be
            url: 'https://sitbusiness.co/mrp/api/15', params
        })
        console.log("RESPUESTA : ", res.data);

        dispatch({
            type: SIGUIENTE_USUARIOS_EXITO,
            payload: res.data
        })

    } catch (error) {
        console.log(error)
    }

}
*/