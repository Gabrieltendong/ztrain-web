import { GOOGLE_AUTH, LOGIN, REGISTER, RESET_PASSWORD, SET_USER } from "./type";

const initialState = {
    login: {
        data: {},
        isLoading: false,
        error: ""
    },
    google_login: {
        data: {},
        isLoading: false,
        error: ""
    },
    register: {
        data: {},
        isLoading: false,
        error: []
    },
    reset_password: {
        message: '',
        isLoading: false,
        error: ""
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
        case GOOGLE_AUTH:
            return {
                ...state,
                google_login: {
                    ...state.google_login,
                    isLoading: true
                }
            }
        case `${GOOGLE_AUTH}_SUCCESS`:
            return {
                ...state,
                google_login: {
                    ...state.google_login,
                    isLoading: false,
                    data: action.payload,
                    error: ""
                }
            }
        case `${GOOGLE_AUTH}_FAIL`:
            return {
                ...state,
                google_login: {
                    ...state.google_login,
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
        case RESET_PASSWORD:
            return {
                ...state,
                reset_password: {
                    ...state.reset_password,
                    isLoading: true
                }
            }
        case `${RESET_PASSWORD}_SUCCESS`:
            return {
                ...state,
                reset_password: {
                    ...state.reset_password,
                    isLoading: false,
                    message: action.payload,
                    error: ""
                }
            }
        case `${RESET_PASSWORD}_FAIL`:
            return {
                ...state,
                reset_password: {
                    ...state.reset_password,
                    isLoading: false,
                    message: '',
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