import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FiShoppingCart, FiPlus, FiMinus, FiX, FiHeart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Dot, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { toggle_favorite } from '../../store/favorite/actionFavorite';
import Loading from '../Loading';
import styles from './style.module.scss';
import { getPromoCode } from '../../store/promo_code/actionPromoCode';
import { GET_PROMO_CODE } from '../../store/promo_code/type';

const ProductDetail = ({
    isVisible, 
    product, 
    onClose,
    onIncrement,
    onDecrement,
    onUpdate,
    onChangeQuantity,
    quantity,
    addProductCart,
    setPromoCode,
    code
}) => {

    const dispatch = useDispatch()
    const {isLoading} = useSelector(state => state.product.add_product_cart)
    const isLoadinglistFavoris = useSelector(state => state.favorite.list_favorite.isLoading)
    const isLoadingaddFavoris = useSelector(state => state.favorite.toggle_Favorite.isLoading)
    const [isPromoCode, setIsPromoCode]=useState(false)
    const [colorSelected, setColorSelected]=useState()
    const [heightSelected, setHeightSelected]=useState()
    const user_id = useSelector(state => state.auth.login.data?.user?._id)
    const { data } = useSelector(state => state.favorite.list_favorite)
    const promoCodeResp = useSelector(({promo_code}) => promo_code.promoCode)
    const initfavoriteState = data.filter(item => item.product._id == product?._id).length>0

    const onFavorite = () => {
        dispatch(toggle_favorite({
            user: user_id,
            product: product._id
        }))
    }

    const handlePromoCode = () => {
        dispatch(getPromoCode(code))
    }

    useEffect(() => {

        return ()=> {
            setIsPromoCode(false)
            setPromoCode("")
            dispatch({
                type: `${GET_PROMO_CODE}_FAIL`,
                error: ""
            })
        }
    }, [colorSelected])
    

    return(
        <div id={isVisible?styles.showDetail:styles.hideDetail}>
            <main id={styles.content_detail}>
                {isLoading || isLoadinglistFavoris || isLoadingaddFavoris ? <Loading />:null}
                <button id={styles.btn_close} onClick={onClose}>
                    <FiX />
                </button>
                <div id={styles.wrapper_image}>
                    <button id={styles.btn_heart} onClick={onFavorite}>
                        <FiHeart 
                            size={20}
                            color={initfavoriteState?"#FF7643": "#000"} 
                        />
                    </button>
                    <CarouselProvider
                        className={styles.carousel_container}
                        naturalSlideWidth={100}
                        naturalSlideHeight={125}
                        totalSlides={product?.image.length}
                    >
                        <div className={styles.container_dot}>
                            {
                                product?.image.map((img, index) => (
                                    <Dot key={index} slide={index}>
                                        <Image
                                            src={`/api/imageproxy?url=${encodeURIComponent(img)}`}
                                            height={60}
                                            width={60}
                                            id={styles.img}
                                        />
                                    </Dot>
                                ))
                            }
                        </div>
                        <Slider className={styles.container_slider}>
                            {
                                product?.image.map((img, index) => (
                                    <Slide key={index}>
                                        <Image
                                            src={`/api/imageproxy?url=${encodeURIComponent(img)}`}
                                            height={500}
                                            width={400}
                                            className={styles.img_large}
                                        />
                                    </Slide>
                                ))
                            }
                        </Slider>
                    </CarouselProvider>
                </div>
                <div id = {styles.detail_wrapper}>
                    <h3>{product?.name}</h3>
                    <p id={styles.price}>
                        {
                            product?.promotion?
                            <span>{(product?.price - ((product?.promotion?.reduction/100) * product?.price)).toFixed(2)} € </span>
                            :
                            promoCodeResp.data?
                            <div className={styles.row}>
                                <span>{(product?.price - ((promoCodeResp.data?.reduction/100) * product?.price)).toFixed(2)} € </span>
                                <p id={styles.initial_price}>{product?.price} €</p>
                            </div>
                            :
                            <span>{product?.price} € </span>
                        }
                        {
                            product?.promotion && Object.keys(product?.promotion).length != 0?
                            <p id={styles.initial_price}>{product?.price} €</p>:null
                        }
                    </p>

                    <div id={styles.quantity_wrapper}>
                        <button 
                            className={styles.btn_quantity}
                            onClick={onDecrement}
                        >
                            <FiMinus />
                        </button>
                        <form onSubmit={onUpdate}>
                            <input 
                                value={quantity}
                                className={styles.input_quantity}
                                onChange={(e) => onChangeQuantity(e, product._id)}
                            />
                        </form>
                        <button 
                            className={styles.btn_quantity}
                            onClick={onIncrement}
                        >
                            <FiPlus />
                        </button>
                    </div>
                    <div id={styles.description_wrapper}>
                        <h6>Description</h6>
                        <p>{product?.description}</p>
                    </div>
                    {
                        product?.attributs && product?.attributs?.colors.length != 0?
                        <div>
                            
                            <div className={styles.attribut_wrapper}>
                                <h6>Couleurs</h6>
                                {
                                    product?.attributs?.colors.map((color, index) => (
                                        <div 
                                            key={index} style={{backgroundColor: color}}
                                            onClick={() => setColorSelected(color)}
                                            className={`${styles.colorStyle} ${color==colorSelected?styles.attributSelected:null}`}
                                        >

                                        </div>
                                    ))
                                }
                            </div>
                        </div>:null
                    }
                    {
                        product?.attributs && product?.attributs?.height.length != 0?
                        <div>
                            <div className={styles.attribut_wrapper}>
                                <h6>Taille</h6>
                                {
                                    product?.attributs?.height.map((item, index) => (
                                        <div 
                                            key={index}
                                            onClick={() => setHeightSelected(item)}
                                            className={`${styles.heightStyle} ${item==heightSelected?styles.attributSelected:null}`}
                                        >
                                            <span>{item}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>:null
                    }
                    {
                        !product?.promotion &&
                        <div id={styles.promo_code_wrapper}>
                            {
                                isPromoCode && 
                                <input
                                    placeholder='Code promo' 
                                    id={styles.input_promo_code}
                                    onChange = {(e) => setPromoCode(e.target.value)}
                                />
                            }
                            {
                                !isPromoCode?
                                <button 
                                    id={styles.btn_promo_code}
                                    onClick={() => setIsPromoCode(true)}
                                >
                                    J'ai un code promo
                                </button>
                                :
                                <button 
                                    id={styles.btn_promo_code}
                                    onClick={handlePromoCode}
                                >
                                    Appliquer
                                </button>
                            }
                        </div>
                    }
                    {
                        promoCodeResp.error &&
                        <span id={styles.messageError}>{promoCodeResp.error}</span>
                    }
                    <button 
                        id={styles.btn_add_cart}
                        onClick={() => addProductCart(product._id)}
                    >
                        <FiShoppingCart className={styles.iconShop} />
                        Ajouter au panier
                    </button>
                </div>
            </main>
        </div>
    )
}

export default ProductDetail