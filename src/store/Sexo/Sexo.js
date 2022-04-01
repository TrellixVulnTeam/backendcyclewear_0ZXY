import axios from "axios"

// Constantes
const dataInicial = {
    sexo: []
}

// Headers API
export const customHeaders = {
    Accept: "Access-Control-Allow-Origin: *",
};


//Types
const OBTENER_SEXO_EXITO   = 'OBTENER_SEXO_EXITO'
const SIGUIENTE_SEXO_EXITO = 'SIGUIENTE_SEXO_EXITO'

//Reducer
export default function sexoReducer(state = dataInicial, action) {
    switch (action.type) {
        case OBTENER_SEXO_EXITO:
            return { ...state, sexo: action.payload }
        case SIGUIENTE_SEXO_EXITO:
            return { ...state, sexo: action.payload }
        default:
            return state
    }
}

//Acciones
export const obtenerSexoAccion = () => async (dispatch, getState) => {
    //console.log("getState  : ", getState() )
    //const offset = getState().condicionproducto.offset
    try {
        
        const res = await axios({
            method: 'post', //you can set what request you want to be
            url: 'https://sitbusiness.co/cyclewear/api/8'
        })
        //console.log("RESPUESTA : ", res.data);

        dispatch({
            type: OBTENER_SEXO_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}
