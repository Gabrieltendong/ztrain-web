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
import Layout from '../../components/Layout'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'


const Favorites = () => {

    const [show, setShow] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [productDetail, setProductDetail] = useState()
    const dispatch = useDispatch()
    const router = useRouter()
    const [isShowCheckout, setIsShowCheckout] = useState(false)
    const { user } = useSelector(state => state.auth?.user_infos)
    const user_id = useSelector(state => state.auth?.login?.data?.user?._id)
    const { data } = useSelector(state => state.favorite.list_favorite)
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
        if(Object.keys(dataCommand).length != 0) {
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
    }, [user, dataCommand, clearCartData])

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
                <main id={styles.container}>
                    <Typography variant='h6'>Mes produits favoris</Typography>
                    
                    {
                        data.length > 0?
                        <div id = {styles.popular_product_wrapper}>
                        {
                            data.map((item, index) => (
                                <FavoriteItem
                                    key={index} 
                                    item={item.product}
                                    onShowDetail={onShowDetail}
                                    addProductCart={handleAddProductCart}
                                />
                            ))
                        }
                        </div>
                        :
                        <Box sx={{width: '70vw'}} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                            <Box sx={{height: 250, width: 250, position: 'relative'}}>
                                <Image src={'/assets/favorite.png'} width={250} height={250} />
                            </Box>
                            <Typography variant='h5'>Oups!! Aucun produit dans vos favoris </Typography>
                            <Typography variant='caption'>Rendez-vous dans le catalogue des produits pour ajouter un produit à vos favoris</Typography>
                            <Button onClick={() => router.push('/home')}  sx={{borderRadius: 25, backgroundColor: '#FF7643', color: '#fff', textTransform: 'initial', mt: 5}} variant='contained'>Catalogue de produit</Button>
                        </Box>
                    }
                </main>
            </div>
        </Layout>
    )
}

export default Favorites