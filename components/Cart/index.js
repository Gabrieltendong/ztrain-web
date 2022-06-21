import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { add_favorite_cart, removeAllProduct } from '../../store/cart/actionCart';
import Loading from '../Loading';
import CartItem from './CartItem';
import styles from './style.module.scss'

const Cart = ({showCart, onClose, onShowCheckout}) => {

    const dispatch = useDispatch()
    const products_cart = useSelector(state => state.cart.products_cart.data)
    const {isLoading} = useSelector(state => state.cart.removeProduct)
    const loadingClearCart = useSelector(state => state.cart.clearCart.isLoading)
    const loadingfavoriteCart = useSelector(state => state.cart.favorite_to_cart.isLoading)
    const user_id = useSelector(state => state.auth?.login.data?.user?._id)
    const list_favorite = useSelector(state => state.favorite.list_favorite.data)

    const onDeleteCart = () => {
        dispatch(removeAllProduct(user_id))
    }

    const getTotalPrice = (products_cart) => {
        return products_cart.reduce(
            (previousValue, currentValue) => previousValue + (currentValue.quantity*currentValue.price),
            0
        );
    }

    const handleAddFavoriteCart = () => {
        dispatch(add_favorite_cart())
    }

    return(
        <div 
            className={styles.container_cart} 
            id={showCart?styles.container_show_cart:styles.container_hide_cart}
        >
            {isLoading || loadingClearCart || loadingfavoriteCart? <Loading />: null}
            <div id={styles.content_cart_header}>
                <div onClick={onClose}>
                    <FiArrowRight />
                </div>
                <h3>Mon panier</h3>
            </div>
            <div id={styles.card_wrapper}>
                {
                    products_cart.length == 0?
                    <div id={styles.empty_cart_wrapper}>
                        <Image
                            height={200}
                            width={200}
                            src="/assets/shopping_app_flsj.svg"
                        />
                        <p>Votre panier est vide</p>
                    </div>
                    :
                    products_cart.map((item, index) =>(
                        <CartItem
                            key={index}
                            item = {item}
                        />
                    ))
                }
            </div>
            {
                products_cart.length != 0 &&
                <div id={styles.cart_footer}>
                    {
                        list_favorite.length != 0 &&
                        <button onClick={handleAddFavoriteCart} id={styles.btn_favoris}>Ajouter vos produits favoris au panier</button>
                    }
                    <div id={styles.totalPrice}>
                        <h5>Total</h5>
                        <h5>{getTotalPrice(products_cart).toFixed(2)} €</h5>
                    </div>
                    <div id={styles.btn_wrapper}>
                        <button id={styles.btn_trash_cart} onClick = {onDeleteCart}>Vider le panier</button>
                        <button id={styles.btn_cart} onClick={onShowCheckout}>Commander</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Cart