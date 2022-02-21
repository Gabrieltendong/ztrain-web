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
import Navbar from '../../components/NavBar';
import Toast from '../../components/Toast';
import { ADD_PRODUCT_CART } from '../../store/product/type';

const Home = () => {

    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
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

    const handleAddProductCart = (product_id) => {
       const data = {
            product_id,user_id,
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

    const onCloseDetail = () => {
        setIsVisible(false)
        setQuantity(1)
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
        if(!user){
            router.push('/auth/login')
        }
        dispatch(getAllProductCart(user_id))
        dispatch(getAllProduct())
    }, [message])

    return(
        <div>
           { 
                message && 
                <Toast
                    showToast = {!message} 
                />
           }
            <Cart 
                showCart={show}
                onClose = {() => setShow(false)}
            />
            <ProductDetail
                isVisible={isVisible}
                product={productDetail}
                onIncrement = {onIncrement}
                onDecrement = {onDecrement}
                quantity = {quantity}
                addProductCart={handleAddProductCart}
                onClose = {onCloseDetail}
            />
            <Navbar
                onShowCart = {onShowCart}
            />
            <header id={styles.header_home}>
                <div className={styles.content_text_header}>
                    <h1>{" Flat up to 50% off for men's "}</h1>
                </div>
            </header>
            <main id={styles.content_home}>
                <h2 className={styles.section_title}>Popular product</h2>
                <div id = {styles.popular_product_wrapper}>
                    {
                        data.map((item, index) => (
                            <ProductItem 
                                key={index} 
                                item={item}
                                onShowDetail={onShowDetail}
                                addProductCart={handleAddProductCart}  
                            />
                        ))
                    }
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Home