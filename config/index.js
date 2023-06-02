const { store } = require("../store/configureStore");

export const getToken = () => {
    return "Bearer " + store.getState().auth.login?.data?.token
}