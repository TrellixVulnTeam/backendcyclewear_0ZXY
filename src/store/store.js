import {createStore, combineReducers, applyMiddleware} from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';

import usuariosReducer from "./Usuarios/UsuariosDucks";
import proveedoresReducer from "./Interlocutores/Proveedores";
import condicionProductoReducer from "./CondicionProducto/CondicionProducto";
import datosEntornoReducer from "./DatosEnterno/DatosEnterno";

const rootReducer = combineReducers({
    usuarios : usuariosReducer,
    proveedores : proveedoresReducer,
    condicionproducto : condicionProductoReducer,
    datosentorno : datosEntornoReducer
});

export default function generateStore() {
    const store = createStore( rootReducer, composeWithDevTools( applyMiddleware(thunk) ) )
    return store;
}