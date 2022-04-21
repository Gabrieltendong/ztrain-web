import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


import Cart from "../../components/Cart"
import CheckoutForm from "../../components/CheckoutForm"
import FavoriteItem from '../../components/FavoriteItem'
import Footer from '../../components/Footer'
import Navbar from "../../components/Navbar"
import ProductDetail from '../../components/ProductDetail'
import ProductItem from '../../components/ProductItem'
import Toast from '../../components/Toast'
import { CREATE_COMMANDE, REMOVE__ALL_PRODUCT_CART } from '../../store/cart/type'
import { get_all_favorites } from '../../store/favorite/actionFavorite'
import { addProductCart } from '../../store/product/actionProduct'
import { ADD_PRODUCT_CART } from '../../store/product/type'
import styles from './style.module.scss'


const Favorites = () => {

    const [show, setShow] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [productDetail, setProductDetail] = useState()
    const dispatch = useDispatch()
    const router = useRouter()
    const [isShowCheckout, setIsShowCheckout] = useState(false)
    const { user } = useSelector(state => state.auth?.user_infos)
    const user_id = useSelector(state => state.auth?.login.data?.user?._id)
    const { data } = useSelector(state => state.favorite.list_favorite)
    const { message } = useSelector(state => state.product.add_product_cart)
    const dataCommand = useSelector(state => state.cart.command.data)
    const clearCartData = useSelector(state => state.cart.clearCart.data)

    const onShowDetail = (item) => {
        setProductDetail(item)
        setIsVisible(true)
    }

    const onCloseDetail = () => {
        setIsVisible(false)
        setQuantity(1)
    }

    const onShowCart = () => {
        setShow(true)
    }

    const onCloseCheckout = () => {
        setIsShowCheckout(false)
    }

    const onIncrement = () => {
        setQuantity(quantity + 1)
    }

    const onDecrement = () => {
        if(quantity != 1){
            setQuantity(quantity - 1)
        }
    }

    const onChangeQuantity = (e) => {
        e.preventDefault()
        setQuantity(e.target.value)
    }

    const handleAddProductCart = (product) => {
        const data = {
             product,user_id,
             quantity: parseInt(quantity)
         }
         dispatch(addProductCart(data))
         onCloseDetail()
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
            <ProductDetail
                isVisible={isVisible}
                product={productDetail}
                onIncrement = {onIncrement}
                onDecrement = {onDecrement}
                onChangeQuantity={onChangeQuantity}
                quantity = {quantity}
                addProductCart={handleAddProductCart}
                onClose = {onCloseDetail}
            />
            <Navbar
                onShowCart = {onShowCart}
            />
            <div id={styles.header}>
                <h3>Mes Produits favoris</h3>
            </div>
            <main id={styles.container}>
                {
                    data.length > 0?
                    <div id = {styles.popular_product_wrapper}>
                    {
                        data.map((item, index) => (
                            <ProductItem
                                key={index} 
                                item={item.product}
                                onShowDetail={onShowDetail}
                                addProductCart={handleAddProductCart}
                            />
                        ))
                    }
                    </div>
                    :
                    <div id={styles.empty_favorite_wrapper}>
                        <p>Aucun produit dans vos favoris</p>
                    </div>
                }
            </main>
            <Footer />
        </div>
    )
}

export default Favorites