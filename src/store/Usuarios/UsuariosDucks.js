import axios from "axios"

// Constantes
const dataInicial = {
    array: []
}

// Headers API
export const customHeaders = {
    Accept: "Access-Control-Allow-Origin: *",
};


//Types
const OBTENER_USUARIOS_EXITO = 'OBTENER_POKEMONES_EXITO'
const SIGUIENTE_USUARIOS_EXITO = 'SIGUIENTE_POKEMONES_EXITO'

//Reducer
export default function usuariosReducer(state = dataInicial, action) {
    switch (action.type) {
        case OBTENER_USUARIOS_EXITO:
            return { ...state, array: action.payload }
        case SIGUIENTE_USUARIOS_EXITO:
            return { ...state, array: action.payload }
        default:
            return state
    }
}


//Acciones
export const obtenerUsuariosAccion = () => async (dispatch, getState) => {
    //console.log("getState  : ", getState() )
    const offset = getState().usuarios.offset
    try {
        const params = {
            uid: 1640056982381
        };
        //const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
        /*
        const res = await axios.post("https://sitbusiness.co/mrp/api/13", params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            responseType: 'blob'
        })
*/
        const res = await axios({
            method: 'post', //you can set what request you want to be
            url: 'https://sitbusiness.co/mrp/api/13', params
        })
        console.log("RESPUESTA : ", res.data);

        dispatch({
            type: OBTENER_USUARIOS_EXITO,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const siguienteUsuariosAccion = () => async (dispatch, getState) => {
    try {
        const params = {
            idmodelo: 1
        };
        //const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
        /*
        const res = await axios.post("https://sitbusiness.co/mrp/api/13", params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            responseType: 'blob'
        })
*/
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