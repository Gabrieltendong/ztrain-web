import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HashLoader from "react-spinners/HashLoader";

import styles from './style.module.scss'
import Cart from '../../components/Cart';
import { addProductCart, getAllProduct } from '../../store/product/actionProduct';
import ProductItem from '../../components/ProductItem';
import { getAllProductCart } from '../../store/cart/actionCart';
import ProductDetail from '../../components/ProductDetail';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Toast from '../../components/Toast';
import { ADD_PRODUCT_CART, GET_PRODUCT } from '../../store/product/type';
import CheckoutForm from '../../components/CheckoutForm';
import Stripecontainer from '../../stripe/StripeContainer';
import { CREATE_COMMANDE, REMOVE__ALL_PRODUCT_CART } from '../../store/cart/type';
import Loading from '../../components/Loading';

const Home = () => {

    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [isFocusSearchBar, setIsFocusSearchBar]=useState(false)
    const [isShowCheckout, setIsShowCheckout] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [isInit, setIsInit] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const [productDetail, setProductDetail] = useState()
    const { message } = useSelector(state => state.product.add_product_cart)
    const { user } = useSelector(state => state.auth?.user_infos)
    const user_id = useSelector(state => state.auth?.login.data?.user?._id)
    const { data, isLoading } = useSelector(state => state.product.list_product)
    const [listSearch, setListSearch]=useState([])
    const [searchTerm, setSearchTerm]=useState()
    const dataCommand = useSelector(state => state.cart.command.data)
    const clearCartData = useSelector(state => state.cart.clearCart.data)
    const router = useRouter()

    const onShowCart = () => {
        setShow(true)
    }

    const handleAddProductCart = (product) => {
        if(product?.promotion && Object.keys(product?.promotion).length != 0){
            product['price'] = (product?.price - ((product?.promotion?.reduction/100) * product?.price)).toFixed(2)
        }
        const data = {
                product,user_id,
                quantity: parseInt(quantity)
            }
            dispatch(addProductCart(data))
            onCloseDetail()
    }

    const onShowDetail = (item) => {
        setProductDetail(item)
        setIsVisible(true)
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

    const onCloseDetail = () => {
        setIsVisible(false)
        setQuantity(1)
    }

    const onCloseCheckout = () => {
        setIsShowCheckout(false)
    }

    const onCloseMadal = () => {
        setShow(false)
    }

    const isValidHttpUrl = (string) => {
        let url;
        
        try {
          url = new URL(string);
        } catch (_) {
          return false;  
        }
      
        return url.protocol === "http:" || url.protocol === "https:";
    }

    const onClearCart = () => {
        setShow(false)
        dispatch({type: `${REMOVE__ALL_PRODUCT_CART}_SUCCESS`, payload: {}})
    }

    const onSearch = (searchTerm) => {
        const newData = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setListSearch(newData)
        setSearchTerm(searchTerm)
    }

    useEffect(() => {

        if(isFocusSearchBar){
            window.scrollTo({
                top: 500,
                behavior: "smooth"
            })
        }

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

        if(isInit){
            setIsInit(false)
            dispatch(getAllProduct())
        }
        dispatch(getAllProductCart(user_id))
    }, [message, user, dataCommand, clearCartData, isFocusSearchBar, listSearch, data])

    return(
        <div >
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
            <CheckoutForm
                isVisible={isShowCheckout}
                onClose={onCloseCheckout}
            />
            <Navbar
                onShowCart = {onShowCart}
                onSearch={onSearch}
                onBlur={() => setIsFocusSearchBar(false)}
                onFocus={() => setIsFocusSearchBar(true)}
            />
            <header id={styles.header_home} onMouseDown={onCloseMadal}>
                <div className={styles.content_text_header}>
                    <h1>Normal d'être impatient.</h1>
                    <p>{"Achetez en ligne et faites-vous livrer en moins de 2H gratuitement en magasin"}</p>
                </div>
                <div className={styles.content_img}>
                    <div></div>
                </div>
                <div className={styles.form}></div>
            </header>
            <main id={styles.content_home} onMouseDown={onCloseMadal} >
                <h2 className={styles.section_title}>Les produits</h2>
                {isLoading && <Loading />}
                <div id = {styles.popular_product_wrapper}>
                    {
                        !searchTerm?
                        data.map((item, index) => (
                            isValidHttpUrl(item.image)?
                            <ProductItem 
                                key={index} 
                                item={item}
                                onShowDetail={onShowDetail}
                                addProductCart={handleAddProductCart}  
                            />
                            :null
                        ))
                        :listSearch.length !=0?
                        listSearch.map((item, index) => (
                            isValidHttpUrl(item.image)?
                            <ProductItem 
                                key={index} 
                                item={item}
                                onShowDetail={onShowDetail}
                                addProductCart={handleAddProductCart}  
                            />
                            :null
                        ))
                        :
                        <p id={styles.empty_result}>Aucun produit trouvé</p>
                    }
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Home