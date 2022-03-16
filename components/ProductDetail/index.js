import Image from 'next/image';
import { FiShoppingCart, FiPlus, FiMinus, FiX } from 'react-icons/fi';
import { useSelector } from 'react-redux';
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

    const {isLoading} = useSelector(state => state.product.add_product_cart)

    return(
        <div id={isVisible?styles.showDetail:styles.hideDetail}>
            <main id={styles.content_detail}>
                {isLoading && <Loading />}
                <button id={styles.btn_close} onClick={onClose}>
                    <FiX />
                </button>
                <div>
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
                    <p id={styles.price}>$ {product?.price}</p>

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