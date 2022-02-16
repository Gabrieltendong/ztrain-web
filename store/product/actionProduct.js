import { GET_PRODUCT } from "./type";

export const getAllProduct = () => {
    return {
        type: GET_PRODUCT,
        payload: {
            request:{
                url:'/product/',
            },
        }
    }
}