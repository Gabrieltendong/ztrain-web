import styles from './style.module.scss'
import Image from 'next/image';
import { FaCartPlus } from "react-icons/fa";
import { Rating } from 'react-simple-star-rating'

const FavoriteItem = ({item, addProductCart, onShowDetail}) => {
    
    const totalRating = item.rating.reduce((s, elt) => s + (elt.note*100)/5, 0)/item.rating.length

    return(
        <div className={styles.card}>
            {
                item?.promotion && Object.keys(item?.promotion).length != 0 &&
                <span className={styles.promotion_wrapper}>-{item?.promotion.reduction}%</span>
            }
            <div className={styles.card_body} onClick={() => onShowDetail(item)}>
                <Image 
                    src={`/api/imageproxy?url=${encodeURIComponent(item.image[0])}`}
                    layout='fill'
                    className={styles.card_body_img}
                />
            </div>
            <div className={styles.card_footer}>
                <h5>{item.name}</h5>
                <div id={styles.rating_wrapper}>
                    <Rating size={20} ratingValue={totalRating} />
                </div>
                <p id={styles.price}>
                    {
                        item?.promotion?
                        <span>{(item?.price - ((item?.promotion?.reduction/100) * item?.price)).toFixed(2)} € </span>
                        :
                        <span>{item?.price} € </span>
                    } 
                    {
                        item?.promotion && Object.keys(item?.promotion).length != 0?
                        <p id={styles.initial_price}>{item?.price} €</p>:null
                    }
                </p>
                <button onClick={() => addProductCart(item)} className={styles.btn_add_cart}>
                    <FaCartPlus />
                </button>
            </div>
        </div>
    )
}

export default FavoriteItem