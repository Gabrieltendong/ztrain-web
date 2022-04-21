import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FiShoppingCart, FiPlus, FiMinus, FiX, FiHeart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { toggle_favorite } from '../../store/favorite/actionFavorite';
import Loading from '../Loading';
import styles from './style.module.scss';

const ProductDetail = ({
    isVisible, 
    product, 
    onClose,
    onIncrement,
    onDecrement,
    onUpdate,
    onChangeQuantity,
    quantity,
    addProductCart
}) => {

    const dispatch = useDispatch()
    const {isLoading} = useSelector(state => state.product.add_product_cart)
    const isLoadinglistFavoris = useSelector(state => state.favorite.list_favorite.isLoading)
    const isLoadingaddFavoris = useSelector(state => state.favorite.toggle_Favorite.isLoading)
    const user_id = useSelector(state => state.auth.login.data?.user?._id)
    const { data } = useSelector(state => state.favorite.list_favorite)
    const initfavoriteState = data.filter(item => item.product._id == product?._id).length>0

    const onFavorite = () => {
        dispatch(toggle_favorite({
            user: user_id,
            product: product._id
        }))
    }
    

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
                    {
                        product?.image &&
                        <Image
                            src={`/api/imageproxy?url=${encodeURIComponent(product?.image)}`}
                            height={500}
                            width={500}
                            id={styles.img}
                        />
                    }
                </div>
                <div id = {styles.detail_wrapper}>
                    <h3>{product?.name}</h3>
                    <p id={styles.price}>{product?.price} €</p>

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