import { FETCH_COMMANDES_REQUEST } from "./type";

// import * as types from './types';

// ----------------------------------------
// const initialState = {
//   commandes: [],
//   loading: false,
//   error: null,
// };
// --------------------------------------

const initialState = {
    fetch_commandes: {
        data: [],
        isLoading: false,
        error: ""
    },
}

const commandeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COMMANDES_REQUEST:
            return {
                ...state,
                fetch_commandes: {
                    ...state.fetch_commandes,
                    isLoading: true
                }
            }
        case `${FETCH_COMMANDES_REQUEST}_SUCCESS`:
            return {
                ...state,
                fetch_commandes: {
                    ...state.fetch_commandes,
                    isLoading: false,
                    data: action.payload,
                    error: ""
                }
            }
        case `${FETCH_COMMANDES_REQUEST}_FAIL`:
            return {
                ...state,
                fetch_commandes: {
                    ...state.fetch_commandes,
                    isLoading: false,
                    data: [],
                    error: action.error
                }
            }
        default:
            return state;
    }
}

export default commandeReducer;






 