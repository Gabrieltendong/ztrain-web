import styles from './style.module.scss'
import Image from 'next/image';
import { FaCartPlus } from "react-icons/fa";

const FavoriteItem = ({item, addProductCart, onShowDetail}) => {
    
    return(
        <div className={styles.card}>
            <div className={styles.card_body} onClick={() => onShowDetail(item)}>
                <Image 
                    src={`/api/imageproxy?url=${encodeURIComponent(item.image)}`}
                    height={250}
                    width={250}
                    className={styles.card_body_img}
                />
            </div>
            <div className={styles.card_footer}>
                <h5>{item.name}</h5>
                <p >$ {item.price}</p>
            </div>
        </div>
    )
}

export default FavoriteItem