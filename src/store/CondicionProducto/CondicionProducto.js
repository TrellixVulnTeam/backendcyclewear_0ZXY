import axios from "axios"

// Constantes
const dataInicial = {
    condicionproducto: []
}

// Headers API
export const customHeaders = {
    Accept: "Access-Control-Allow-Origin: *",
};


//Types
const OBTENER_CONDICIONPRODUCTO_EXITO   = 'OBTENER_CONDICIONPRODUCTO_EXITO'
const SIGUIENTE_CONDICIONPRODUCTO_EXITO = 'SIGUIENTE_CONDICIONPRODUCTO_EXITO'

//Reducer
export default function condicionProductoReducer(state = dataInicial, action) {
    switch (action.type) {
        case OBTENER_CONDICIONPRODUCTO_EXITO:
            return { ...state, condicionproducto: action.payload }
        case SIGUIENTE_CONDICIONPRODUCTO_EXITO:
            return { ...state, condicionproducto: action.payload }
        default:
            return state
    }
}

//Acciones
export const obtenerCondicionProductoAccion = () => async (dispatch, getState) => {
    //console.log("getState  : ", getState() )
    //const offset = getState().condicionproducto.offset
    try {
        
        const res = await axios({
            method: 'post', //you can set what request you want to be
            url: 'https://sitbusiness.co/cyclewear/api/8'
        })
        //console.log("RESPUESTA : ", res.data);

        dispatch({
            type: OBTENER_CONDICIONPRODUCTO_EXITO,
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