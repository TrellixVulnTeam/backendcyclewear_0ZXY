import React from 'react';
// hooks react redux
import {useDispatch, useSelector} from 'react-redux'
import { obtenerUsuariosAccion } from "../../store/Usuarios/UsuariosDucks";
import { siguienteUsuariosAccion } from "../../store/Usuarios/UsuariosDucks";

function Usuarios(props) {
    const dispatch = useDispatch();

    const usuarios = useSelector(store => store.usuarios.array)
    //console.log("USUARIOS : ", usuarios[0].name)

    return (
        <div>
         <button onClick={ () => dispatch( obtenerUsuariosAccion())}>
                Leer Usuarios
            </button>
            <button onClick={ () => dispatch( siguienteUsuariosAccion())}>
                Siguiente Usuarios
            </button>
        </div>
    );
}

export default Usuarios;