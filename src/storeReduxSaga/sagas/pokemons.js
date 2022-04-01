import {put, call, takeLatest} from "redux-saga/effects";
import { START_GET_POKEMONS, SUCCESS_GET_POKEMONS } from "../actions/pokemons";
import apiCall  from "../api";

function* getPokemons({payload}) {
    try{
        const results = yield call(apiCall, 'get', 'https://pokeapi.co/api/v2/pokemon');
        console.log("RESULTS : ", results)
        yield put({ SUCCESS_GET_POKEMONS, results });
    }catch (err) {

    }
}

// Whatchers
export default function* pokemons(){
    yield takeLatest(START_GET_POKEMONS, getPokemons);
}