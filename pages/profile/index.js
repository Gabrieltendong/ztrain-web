import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"




import RegistrationForm from "../../components/RegistrationForm"
import Cart from "../../components/Cart"
import CheckoutForm from "../../components/CheckoutForm"
import Footer from '../../components/Footer'
import Navbar from "../../components/Navbar"
import Toast from '../../components/Toast'
import { CREATE_COMMANDE, REMOVE__ALL_PRODUCT_CART } from '../../store/cart/type'
import { get_all_favorites } from '../../store/favorite/actionFavorite'
import { ADD_PRODUCT_CART } from '../../store/product/type'
import styles from './style.module.scss'


const Profile = () => {

    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()
    const [isShowCheckout, setIsShowCheckout] = useState(false)
    const { user } = useSelector(state => state.auth?.user_infos)
    const { message } = useSelector(state => state.product.add_product_cart)
    const dataCommand = useSelector(state => state.cart.command.data)
    const clearCartData = useSelector(state => state.cart.clearCart.data)

    const onShowCart = () => {
        setShow(true)
    }

    const onCloseCheckout = () => {
        setIsShowCheckout(false)
    }

    const onClearCart = () => {
        setShow(false)
        dispatch({type: `${REMOVE__ALL_PRODUCT_CART}_SUCCESS`, payload: {}})
    }

    useEffect(() => {
        if(Object.keys(dataCommand).length != 0){
            onCloseCheckout()
            setShow(false)
        }
        if(Object.keys(clearCartData).length != 0){
            onClearCart()
        }
        if(message || Object.keys(dataCommand).length != 0) {
            setTimeout(() => {
                dispatch({
                    type: `${ADD_PRODUCT_CART}_SUCCESS`,
                    payload: ''
                })
                dispatch({
                    type: `${CREATE_COMMANDE}_SUCCESS`,
                    payload: ''
                })
            }, 2000);
        }
        if(!user){
            router.push('/auth/login')
        }
        dispatch(get_all_favorites())
    }, [user, dataCommand, clearCartData, message])

    return(
        <div>
            { 
                dataCommand.message || message?
                <Toast
                    text = {dataCommand.message?dataCommand.message: message} 
                />:null
           }
            <Cart
                showCart={show}
                onClose = {() => setShow(false)}
                onShowCheckout = {() => setIsShowCheckout(true)}
            />
            <CheckoutForm
                isVisible={isShowCheckout}
                onClose={onCloseCheckout}
            />
            <Navbar
                onShowCart = {onShowCart}
            />
            
            <div id={styles.header}>
                <h1>Update Profile</h1>
            </div>
            <div>
            <RegistrationForm/> 
            </div>
           

            <Footer />
            
        </div>
    )
}

export default Profile