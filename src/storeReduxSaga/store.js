import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import reduxSaga from "redux-saga";
import rootSaga from "./sagas";

function reducers() {
    return {
        testing : "PRUEBA"
    };
}

const sagaMiddleware = reduxSaga();

export default () => {
    return {
        ...createStore(reducers, applyMiddleware(sagaMiddleware)),
        runSaga: sagaMiddleware.run(rootSaga)
    };
};
