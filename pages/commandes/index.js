import { useDispatch, useSelector } from 'react-redux';
import { fetchCommandes } from '../../store/commandes/actionCommande';
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"

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
import HashLoader from "react-spinners/HashLoader";
import Layout from '../../components/Layout';
import { Table, TableCell, TableHead, TableRow } from '@mui/material';



const Commandes = () => {

    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()
    const [isShowCheckout, setIsShowCheckout] = useState(false)
    const { user } = useSelector(state => state.auth?.user_infos)
    const dataCommand = useSelector(state => state.cart.command.data)
    const clearCartData = useSelector(state => state.cart.clearCart.data)
    const { error, data , isLoading} = useSelector((state) => state.commandes?.fetch_commandes);
  
    useEffect(() => {
      dispatch(fetchCommandes(user._id)); // Appel de l'action pour récupérer les commandes de l'utilisateur connecté
    }, []);

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

    console.log("data", data);
    return(
       <Layout>
         <div>
            { 
                dataCommand.message?
                <Toast
                    text = {dataCommand.message} 
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
            
        </div>
       </Layout>
    )
}

export default Commandes


