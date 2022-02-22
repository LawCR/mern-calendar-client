import { types } from "../types/types";

const initialState = {
    checking: true, // Es como un loading hasta saber si el usuario esta autenticado o no
    // uid: null,
    // name: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking: false
            }
        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }
        case types.authLogout:
            return {
                checking: false
            }
        default:
            return state;
    }
}