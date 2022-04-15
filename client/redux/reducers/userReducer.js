import { USER_ACTIONS } from "../actionTypes";

const initalState = {
    isLoggedIn : false,
    data : null
}

export default function userReducer (state=initalState,action) {
    switch(action.type) {
        case USER_ACTIONS.LOGIN_USER:
            return {...state, isLoggedIn : true, user : action.payload}
        case USER_ACTIONS.UPDATE_AUTH:
            return {...state, ...action.payload}
        case USER_ACTIONS.LOGOUT_USER:
            return initalState;
        default :
         return state;
        
    }
}