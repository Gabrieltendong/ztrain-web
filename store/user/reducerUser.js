import { UPDATE_USER, UPDATE_USER_PASSWORD } from "./type";

const initialState = {
    update_profil: {
        data: {},
        isLoading: false,
        error: ""
    },
    update_password: {
        data: {},
        isLoading: false,
        error: ""
    }
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                update_profil: {
                    ...state.update_profil,
                    isLoading: true
                }
            }
        case `${UPDATE_USER}_SUCCESS`:
            return {
                ...state,
                update_profil: {
                    ...state.update_profil,
                    isLoading: false,
                    data: action.payload,
                    error: ""
                }
            }
        case `${UPDATE_USER}_FAIL`:
            return {
                ...state,
                update_profil: {
                    ...state.update_profil,
                    isLoading: false,
                    data: {},
                    error: action.error
                }
            }

        case UPDATE_USER_PASSWORD:
            return {
                ...state,
                update_password: {
                    ...state.update_password,
                    isLoading: true
                }
            }
        case `${UPDATE_USER_PASSWORD}_SUCCESS`:
            return {
                ...state,
                update_password: {
                    ...state.update_password,
                    isLoading: false,
                    data: action.payload,
                    error: ""
                }
            }
        case `${UPDATE_USER_PASSWORD}_FAIL`:
            return {
                ...state,
                update_password: {
                    ...state.update_password,
                    isLoading: false,
                    data: {},
                    error: action.error
                }
            }
        default:
            return state;
    }
}

export default userReducer;