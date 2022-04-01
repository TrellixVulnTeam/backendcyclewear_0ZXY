import axios from "axios"

// Constantes
const dataInicial = {
    datosentorno: []
}

// Headers API
export const customHeaders = {
    Accept: "Access-Control-Allow-Origin: *",
};


//Types
const OBTENER_DATOSENTORNO_EXITO   = 'OBTENER_DATOSENTORNO_EXITO'
const SIGUIENTE_DATOSENTORNO_EXITO = 'SIGUIENTE_DATOSENTORNO_EXITO'

//Reducer
export default function datosEntornoReducer(state = dataInicial, action) {
    switch (action.type) {
        case OBTENER_DATOSENTORNO_EXITO:
            return { ...state, datosentorno: action.payload }
        case SIGUIENTE_DATOSENTORNO_EXITO:
            return { ...state, datosentorno: action.payload }
        default:
            return state
    }
}

//Acciones
export const obtenerDatosEntornoAccion = () => async (dispatch, getState) => {
    //console.log("getState  : ", getState() )
    //const offset = getState().condicionproducto.offset
    try {
        
        const res = await axios({
            method: 'post', //you can set what request you want to be
            url: 'https://sitbusiness.co/cyclewear/api/999'
        })
        //console.log("RESPUESTA : ", res.data);

        dispatch({
            type: OBTENER_DATOSENTORNO_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}
