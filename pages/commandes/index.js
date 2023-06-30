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



const Commandes = () => {

    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()
    const [isShowCheckout, setIsShowCheckout] = useState(false)
    const { user } = useSelector(state => state.auth?.user_infos)
    const { message } = useSelector(state => state.product.add_product_cart)
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
                <h1>Mes Commandes </h1>
            </div>
            <div className={styles.commande_page}>
      {/* {isLoading && 
      <p>Chargement ... <HashLoader 
                                color={'#fff'} 
                                loading={true}
                                className={styles.override}
                                size={20} 
                              /> </p>}
      */}
      {isLoading && 
      <p>Chargement...</p>}
     
      {error && <p className={styles.error_message}>Une erreur est survenue : {error}</p>}
      {data.length > 0 && (
        <div className={styles.commande_page} >
        {data.map((d) => (
          <div key={d._id} className={styles.commande_list}>
            <h3 className={styles.commande_item_h3} >Commande_id({d._id})</h3>
            <ul >
              {d.products.map((product) => (
                <li key={product._id} className={styles.commande_item}>
                  {/* {product.product.name} = {product.quantity} x {product.price} € */}
                  product_id({product._id}) = {product.quantity} x {product.price} €
                </li>
              ))}
            </ul>
            <p>Adresse: {d.address}</p>
            <p>Carte: ****{d.card.number % 10000}</p>
            <p>Date de la commande: {new Date(d.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
  
      )}
    </div>
           

            <Footer />
            
        </div>
    )
}

export default Commandes


