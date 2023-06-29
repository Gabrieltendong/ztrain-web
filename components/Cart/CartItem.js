import axios from 'axios';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct, updateQuantityProduct } from '../../store/cart/actionCart';
import { UPDATE_PRICE } from '../../store/cart/type';
import styles from './style.module.scss'
import { decrementProductCart, deleteProductCart, incrementProductCart } from '../../store/product/actionProduct';

const CartItem = ({item}) => {

    const dispatch = useDispatch()
    const qtRef = useRef()
    const [product, setProduct] = useState()
    const products_cart = useSelector(state => state.product.product_cart)
    const {totalPrice} = useSelector(state => state.cart)
    const user_id = useSelector(state => state.auth?.login?.data?.user?._id)
    const [quantity, setQuantity] = useState(item?.quantity)

    const handleRemoveProduct = () => {
        dispatch(deleteProductCart(item.product._id))
    }

    const handleIncrement = () => {
        dispatch(incrementProductCart(item.product._id))
    }

    const handleDecrement = () => {
        dispatch(decrementProductCart(item.product._id))
    }

    useEffect(() => {}, [products_cart])

    return(
        <div className={styles.card}>
            <div>
                {
                    item?.product?.image &&
                    <Image
                        src={item?.product?.image[0]}
                        height={70}
                        width={70} 
                    />
                }
            </div>
            <div className={styles.card_body}>
                <p className={styles.productName}>{item?.product?.name.substring(0, 15)}{item?.product?.name.length >15?'...':''}</p>
                <p>{(item?.product?.price*item.quantity).toFixed(2)} €</p>
            </div>
            <div className={styles.quantity_wrapper}>
                <span className={styles.quantity_dec} onClick={handleDecrement}>
                    <FiMinus />
                </span>
                <span className={styles.quantity}>{item.quantity}</span>
                <span className={styles.quantity_in} onClick={handleIncrement}>
                    <FiPlus />
                </span>
            </div>
            <div className={styles.trash_product_cart} onClick={handleRemoveProduct}>
                <FiTrash2 />
            </div>
        </div>
    )
}

export default CartItem