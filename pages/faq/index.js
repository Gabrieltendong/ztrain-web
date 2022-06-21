import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import FaqComponent from "react-faq-component";


import Cart from "../../components/Cart"
import CheckoutForm from "../../components/CheckoutForm"
import Footer from '../../components/Footer'
import Navbar from "../../components/Navbar"
import Toast from '../../components/Toast'
import { CREATE_COMMANDE, REMOVE__ALL_PRODUCT_CART } from '../../store/cart/type'
import { get_all_favorites } from '../../store/favorite/actionFavorite'
import { ADD_PRODUCT_CART } from '../../store/product/type'
import styles from './style.module.scss'


const Faq = () => {

    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()
    const [isShowCheckout, setIsShowCheckout] = useState(false)
    const { user } = useSelector(state => state.auth?.user_infos)
    const { message } = useSelector(state => state.product.add_product_cart)
    const dataCommand = useSelector(state => state.cart.command.data)
    const clearCartData = useSelector(state => state.cart.clearCart.data)

    const data = {
        title: "FAQ (Comment ça marche)",
        rows: [
            {
                title: "Pourquoi acheter sur z-train ?",
                content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
                  ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
                  In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
                  Fusce sed commodo purus, at tempus turpis.`,
            },
            {
                title: "Comment passer une commande sur z-train ?",
                content:
                    "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
            },
            {
                title: "Comment réinitialiser son mot de passe ?",
                content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
                Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
                Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
                Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
            },
            {
                title: "What is the package version",
                content: <p>current version is 1.2.1</p>,
            },
        ],
    };

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
            <Navbar
                onShowCart = {onShowCart}
            />
            <div id={styles.header}>
                <h1>FAQ</h1>
            </div>
            <main className={styles.container}>
                <FaqComponent
                    data={data}
                />
            </main>
            <Footer />
        </div>
    )
}

export default Faq