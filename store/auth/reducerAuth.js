import { LOGIN, REGISTER, SET_USER } from "./type";

const initialState = {
    login: {
        data: {},
        isLoading: false,
        error: ""
    },
    register: {
        data: {},
        isLoading: false,
        error: []
    },
    user_infos: {}
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                login: {
                    ...state.login,
                    isLoading: true
                }
            }
        case `${LOGIN}_SUCCESS`:
            return {
                ...state,
                login: {
                    ...state.login,
                    isLoading: false,
                    data: action.payload,
                    error: ""
                }
            }
        case `${LOGIN}_FAIL`:
            return {
                ...state,
                login: {
                    ...state.login,
                    isLoading: false,
                    data: {},
                    error: "Email ou mot de passe incorrect"
                }
            }
        case REGISTER:
            return {
                ...state,
                register: {
                    ...state.register,
                    isLoading: true
                }
            }
        case `${REGISTER}_SUCCESS`:
            return {
                ...state,
                register: {
                    ...state.register,
                    isLoading: false,
                    data: action.payload,
                    error: []
                }
            }
        case `${REGISTER}_FAIL`:
            return {
                ...state,
                register: {
                    ...state.register,
                    isLoading: false,
                    data: {},
                    error: action.error
                }
            }
        case SET_USER:
            return {
                ...state,
                user_infos: action.payload
            }
        default:
            return state;
    }
}

export default authReducer;