import styles from './style.module.css'
import Image from 'next/image';
import { FaCartPlus } from "react-icons/fa";

const ProductItem = ({item, addProductCart}) => {

    return(
        <div className={styles.card}>
            <div className={styles.card_body}>
                <Image 
                    src={item.image} 
                    height={250}
                    width={250} 
                    className={styles.card_body_img}
                />
            </div>
            <div className={styles.card_footer}>
                <h5>{item.name}</h5>
                <p>$ {item.price}</p>
                <button onClick={() => addProductCart(item._id)} className={styles.btn_add_cart}>
                    <FaCartPlus />
                </button>
            </div>
        </div>
    )
}

export default ProductItem