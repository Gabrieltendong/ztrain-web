import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './style.module.scss'
import Cart from '../../components/Cart';
import { addProductCart, getAllProduct } from '../../store/product/actionProduct';
import ProductItem from '../../components/ProductItem';
import { getAllProductCart } from '../../store/cart/actionCart';
import ProductDetail from '../../components/ProductDetail';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Toast from '../../components/Toast';
import { ADD_PRODUCT_CART } from '../../store/product/type';
import CheckoutForm from '../../components/CheckoutForm';
import Stripecontainer from '../../stripe/StripeContainer';

const Home = () => {

    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [isShowCheckout, setIsShowCheckout] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [productDetail, setProductDetail] = useState()
    const { message } = useSelector(state => state.product.add_product_cart)
    const { user } = useSelector(state => state.auth?.user_infos)
    const user_id = useSelector(state => state.auth?.login.data?.user?._id)
    const { data } = useSelector(state => state.product.list_product)
    const router = useRouter()

    const onShowCart = () => {
        setShow(true)
    }

    console.log('userId', user_id)

    const handleAddProductCart = (product) => {
       const data = {
            product,user_id,
            quantity
        }
        dispatch(addProductCart(data))
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

    const isValidHttpUrl = (string) => {
        let url;
        
        try {
          url = new URL(string);
        } catch (_) {
          return false;  
        }
      
        return url.protocol === "http:" || url.protocol === "https:";
    }

    useEffect(() => {
        if(message) {
            setTimeout(() => {
                dispatch({
                    type: `${ADD_PRODUCT_CART}_SUCCESS`,
                    payload: ''
                })
            }, 2000);
        }
        console.log('user', user)
        if(!user){
            router.push('/auth/login')
        }
        dispatch(getAllProduct())
        dispatch(getAllProductCart(user_id))
    }, [message, user])

    return(
        <div>
           { 
                message && 
                <Toast
                    text = {'Votre panier a ete mis à jour'} 
                />
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
                onClose={() => setIsShowCheckout(false)}
            />
            <Navbar
                onShowCart = {onShowCart}
            />
            <header id={styles.header_home}>
                <div className={styles.content_text_header}>
                    <h1>{" Flat up to 50% off for men's "}</h1>
                </div>
                <div className={styles.content_img}>
                    <div></div>
                </div>
                <div className={styles.form}></div>
            </header>
            <main id={styles.content_home}>
                <h2 className={styles.section_title}>Popular product</h2>
                <div id = {styles.popular_product_wrapper}>
                    {
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
                    }
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Home