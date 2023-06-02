import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HashLoader from "react-spinners/HashLoader";
import useTranslation from 'next-translate/useTranslation'
import Slider from '@mui/material/Slider';

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
    const { t } = useTranslation()
    const [show, setShow] = useState(false)
    const [isFocusSearchBar, setIsFocusSearchBar]=useState(false)
    const [isShowCheckout, setIsShowCheckout] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [isInit, setIsInit] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const [code, setPromoCode] = useState("")
    const [price, setPrice] = useState([0, 1500]);
    const [productDetail, setProductDetail] = useState()
    const user_id = useSelector(state => state.auth?.login?.data?.user?._id)
    const { data, isLoading } = useSelector(state => state.product.list_product)
    const products_cart = useSelector(state => state.product.product_cart)
    const [listSearch, setListSearch]=useState([])
    const [searchTerm, setSearchTerm]=useState()
    const dataCommand = useSelector(state => state.cart.command.data)
    const clearCartData = useSelector(state => state.cart.clearCart.data)
    const promoCodeResp = useSelector(({promo_code}) => promo_code.promoCode)
    const router = useRouter()

    const onShowCart = () => {
        setShow(true)
    }

    const handleAddProductCart = (product) => {
        let data = {
                product,
                quantity: parseInt(quantity)
            }
        if(code){
            data['promo_code'] = code
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

    const handleChangePrice = (event, newValue) => {
        setPrice(newValue);
    };

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

        

        if(isInit){
            setIsInit(false)
            dispatch(getAllProduct())
        }
        dispatch(getAllProductCart(user_id))
    }, [dataCommand, clearCartData, isFocusSearchBar, listSearch, data])

    return(
        <div >
            <Cart 
                showCart={show}
                onClose = {() => setShow(false)}
                onShowCheckout = {() => setIsShowCheckout(true)}
            />
            {
                isVisible &&
                <ProductDetail
                    isVisible={isVisible}
                    product={productDetail}
                    onIncrement = {onIncrement}
                    onDecrement = {onDecrement}
                    onChangeQuantity={onChangeQuantity}
                    quantity = {quantity}
                    addProductCart={handleAddProductCart}
                    onClose = {onCloseDetail}
                    code={code}
                    setPromoCode={setPromoCode}
                />
            }
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
                    <h1>{t('home:title')}</h1>
                    <p>{t('home:subTitle')}</p>
                </div>
                <div className={styles.content_img}>
                    <div></div>
                </div>
                <div className={styles.form}></div>
            </header>
            <main id={styles.content_home} onMouseDown={onCloseMadal} >
                <aside id={styles.filter_wrapper}>
                    <h3>Flitrer par prix</h3>
                    <Slider
                        getAriaLabel={() => 'Minimum distance shift'}
                        value={price}
                        
                        onChange={handleChangePrice}
                        valueLabelDisplay="auto"
                        getAriaValueText={(value) => `${value}€`}
                        max={1500}    
                        step={0.01}
                    />
                </aside>
                <div id={styles.main_content}>
                    <h2 className={styles.section_title}>{t('home:product')}</h2>
                    {isLoading && <Loading />}
                    <div id = {styles.popular_product_wrapper}>
                        {
                            !searchTerm?
                            data.map((item, index) => (
                                isValidHttpUrl(item.image) && price[0] <= item.price && price[1] >= item.price?
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
                                isValidHttpUrl(item.image) && price[0] <= item.price && price[1] >= item.price?
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
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Home