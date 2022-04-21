import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


import Cart from "../../components/Cart"
import CheckoutForm from "../../components/CheckoutForm"
import FavoriteItem from '../../components/FavoriteItem'
import Footer from '../../components/Footer'
import Navbar from "../../components/Navbar"
import ProductItem from '../../components/ProductItem'
import { get_all_favorites } from '../../store/favorite/actionFavorite'
import styles from './style.module.scss'


const Favorites = () => {

    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()
    const [isShowCheckout, setIsShowCheckout] = useState(false)
    const { user } = useSelector(state => state.auth?.user_infos)
    const { data } = useSelector(state => state.favorite.list_favorite)

    console.log("data", data)

    const onShowCart = () => {
        setShow(true)
    }

    const onCloseCheckout = () => {
        setIsShowCheckout(false)
    }

    useEffect(() => {
        if(!user){
            router.push('/auth/login')
        }
        dispatch(get_all_favorites())
    }, [user])

    return(
        <div>
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
                <h3>Mes Produits favoris</h3>
            </div>
            <main id={styles.container}>
                {
                    data.length > 0?
                    <div id = {styles.popular_product_wrapper}>
                    {
                        data.map((item, index) => (
                            <FavoriteItem
                                key={index} 
                                item={item.product} 
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