import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import logger from 'redux-logger'
const reducers = combineReducers({
    user : userReducer
})

export default createStore(reducers, applyMiddleware(thunk,logger));