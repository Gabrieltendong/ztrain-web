import axios from 'axios';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct, updateQuantityProduct } from '../../store/cart/actionCart';
import { UPDATE_PRICE } from '../../store/cart/type';
import styles from './style.module.scss'

const CartItem = ({item}) => {

    const dispatch = useDispatch()
    const qtRef = useRef()
    const [product, setProduct] = useState()
    const {totalPrice} = useSelector(state => state.cart)
    const user_id = useSelector(state => state.auth?.login.data?.user?._id)
    const [quantity, setQuantity] = useState(item?.quantity)

    const handleUpdateQuantity = (quantity) => {
        const data = {
             product: item.product._id,
             user_id,
             quantity
         }
         dispatch(updateQuantityProduct(data))
    }

    const setTotalPrice = (price) => {
        dispatch({
            type: UPDATE_PRICE,
            payload: totalPrice + (quantity*price)
        })
    }

    const handleRemoveProduct = () => {
        const data = {
            product: item.product._id,
            user_id
        }
        dispatch(removeProduct(data))
    }

    const handleIncrement = () => {
        const qt = parseInt(item?.quantity) + 1
        setQuantity(qt)
        handleUpdateQuantity(qt)
    }

    const handleDecrement = () => {
        console.log('decrement', item?.quantity)
        const qt = parseInt(item?.quantity) - 1
        if(qt == 0){
            handleRemoveProduct()
        }
        setQuantity(qt)
        handleUpdateQuantity(qt)
    }

    const handleChangeQuantity = (e) => {
        e.preventDefault()
        setQuantity(e.target.value)
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        qtRef.current.blur()
        if(quantity == 0) handleRemoveProduct()
        else handleUpdateQuantity(quantity)
        
    }

    useEffect(() => {
        // getProduct()
    }, [item]);

    return(
        <div className={styles.card}>
            <div>
                {
                    item?.product?.image &&
                    <Image
                        src={`/api/imageproxy?url=${encodeURIComponent(item?.product?.image)}`}
                        height={70}
                        width={70} 
                    />
                }
            </div>
            <div className={styles.card_body}>
                <p className={styles.productName}>{item?.product?.name.substring(0, 15)}{item?.product?.name.length >15?'...':''}</p>
                <p>${item?.product?.price}</p>
            </div>
            <div className={styles.quantity_wrapper}>
                <span className={styles.quantity_dec} onClick={handleDecrement}>
                    <FiMinus />
                </span>
                <form onSubmit={handleUpdate}>
                    <input
                        ref={qtRef}
                        value={item.quantity}
                        defaultValue={quantity}
                        className={styles.quantity}
                        onChange={handleChangeQuantity}
                        type='number'
                    />
                </form>
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