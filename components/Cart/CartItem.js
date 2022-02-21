import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct, updateQuantityProduct } from '../../store/cart/actionCart';
import styles from './style.module.scss'

const CartItem = ({item}) => {

    const dispatch = useDispatch()
    const [product, setProduct] = useState()
    const products_cart = useSelector(state => state.cart.products_cart.data)
    const user_id = useSelector(state => state.auth?.login.data?.user?._id)
    const [quantity, setQuantity] = useState(item?.quantity)

    const getProduct = async () => {
        const resp = await axios.get(process.env.baseUrl + `/product/${item.product_id}`)
        setProduct(resp.data)
        console.log('product', item.product_id)
    }

    const handleUpdateQuantity = (quantity) => {
        const data = {
             product_id: item.product_id,
             user_id,
             quantity
         }
         console.log('data', data)
         dispatch(updateQuantityProduct(data))
    }

    const handleRemoveProduct = () => {
        const data = {
            product_id: item.product_id,
            user_id
        }
        dispatch(removeProduct(data))
    }

    const handleIncrement = () => {
        const qt = quantity + 1
        setQuantity(qt)
        handleUpdateQuantity(qt)
    }

    const handleDecrement = () => {
        const qt = quantity - 1
        if(qt == 0){
            handleRemoveProduct()
        }
        setQuantity(qt)
        handleUpdateQuantity(qt)
    }

    useEffect(() => {
        getProduct()
    }, [item]);

    return(
        <div className={styles.card}>
            <div>
                {
                    product?.image &&
                    <Image
                        src={product?.image}
                        height={70}
                        width={70} 
                    />
                }
            </div>
            <div className={styles.card_body}>
                <p>{product?.name}</p>
                <p>${product?.price}</p>
            </div>
            <div className={styles.quantity_wrapper}>
                <span className={styles.quantity_dec} onClick={handleDecrement}>
                    <FiMinus />
                </span>
                <span className={styles.quantity}>{quantity}</span>
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