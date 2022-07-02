import axios from "axios"

// Constantes
const dataInicial = {
    listarproductos: []
}

// Headers API
export const customHeaders = {
    Accept: "Access-Control-Allow-Origin: *",
};


//Types
const OBTENER_LISTARPRODUCTOS_EXITO   = 'OBTENER_LISTARPRODUCTOS_EXITO'
const SIGUIENTE_LISTARPRODUCTOS_EXITO = 'SIGUIENTE_LISTARPRODUCTOS_EXITO'

//Reducer
export default function listarproductosReducer(state = dataInicial, action) {
    switch (action.type) {
        case OBTENER_LISTARPRODUCTOS_EXITO:
            return { ...state, listarproductos: action.payload }
        case SIGUIENTE_LISTARPRODUCTOS_EXITO:
            return { ...state, listarproductos: action.payload }
        default:
            return state
    }
}

//Acciones
export const obtenerListarProductosAccion = () => async (dispatch, getState) => {
    //console.log("getState  : ", getState() )
    //const offset = getState().condicionproducto.offset
    try {
        
        const res = await axios({
            method: 'post', //you can set what request you want to be
            url: 'https://sitbusiness.co/cyclewear/api/23'
        })
        //console.log("RESPUESTA : ", res.data);

        dispatch({
            type: OBTENER_LISTARPRODUCTOS_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}
