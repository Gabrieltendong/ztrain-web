import { GET_PROMO_CODE} from "./type";

const initialState = {
    promoCode: {
        data: null,
        isLoading: false,
        error: ""
    }
}

const promoCodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROMO_CODE:
            return {
                ...state,
                promoCode: {
                    ...state.promoCode,
                    isLoading: true
                }
            }
        case `${GET_PROMO_CODE}_SUCCESS`:
            return {
                ...state,
                promoCode: {
                    ...state.promoCode,
                    isLoading: false,
                    data: action.payload,
                    error: ""
                }
            }
        case `${GET_PROMO_CODE}_FAIL`:
            return {
                ...state,
                promoCode: {
                    ...state.promoCode,
                    isLoading: false,
                    data: null,
                    error: action.error
                }
            }
        default:
            return state;
    }
}

export default promoCodeReducer;