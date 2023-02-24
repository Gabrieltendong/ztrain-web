import { UPDATE_USER } from "./type";

const initialState = {
    update_profil: {
        data: {},
        isLoading: false,
        error: ""
    },
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
        default:
            return state;
    }
}

export default userReducer;