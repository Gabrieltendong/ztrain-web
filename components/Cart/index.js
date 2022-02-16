import Image from 'next/image';
import { FiArrowRight, FiTrash2, FiPlus, FiMinus, FiX } from 'react-icons/fi';
import styles from './style.module.css'

const Cart = ({showCart, onClose}) => {
    return(
        <div className={styles.container_cart} id={showCart?styles.container_show_cart:styles.container_hide_cart}>
            <div onClick={onClose}>
                <FiArrowRight />
            </div>
            <h3>Mon panier</h3>
            <div id={styles.card_wrapper}>
                <div className={styles.card}>
                    <div>
                        <Image
                            src="https://static2.chaussminimaxi.fr/13471-catalog_medium/homme-presse-daim-cognac-paire-fils.jpg" 
                            height={70}
                            width={70} 
                        />
                    </div>
                    <div className={styles.card_body}>
                        <p>Basket with Handle</p>
                        <p>$1000</p>
                    </div>
                    <div className={styles.quantity_wrapper}>
                        <span className={styles.quantity_dec}>
                            <FiMinus />
                        </span>
                        <span className={styles.quantity}>5</span>
                        <span className={styles.quantity_in}>
                            <FiPlus />
                        </span>
                    </div>
                    <div className={styles.trash_product_cart}>
                        <FiTrash2 />
                    </div>
                </div>
                <div className={styles.card}>
                    <div>
                        <Image
                            src="https://static2.chaussminimaxi.fr/12306-large_default/boots-chelsea.jpg" 
                            height={70}
                            width={70} 
                        />
                    </div>
                    <div className={styles.card_body}>
                        <p>Basket with Handle</p>
                        <p>$1000</p>
                    </div>
                    <div className={styles.quantity_wrapper}>
                        <span className={styles.quantity_dec}>
                            <FiMinus />
                        </span>
                        <span className={styles.quantity}>5</span>
                        <span className={styles.quantity_in}>
                            <FiPlus />
                        </span>
                    </div>
                    <div className={styles.trash_product_cart}>
                        <FiTrash2 />
                    </div>
                </div>
            </div>
            <div id={styles.cart_footer}>
                <div id={styles.totalPrice}>
                    <h5>Total</h5>
                    <h5>$2500</h5>
                </div>
                <button id={styles.btn_cart}>Commander</button>
            </div>
        </div>
    )
}

export default Cart