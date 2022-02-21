import styles from './style.module.scss'
import { FaSearch } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const Navbar = ({onShowCart}) => {

    const products_cart = useSelector(state => state.cart.products_cart.data)

    return(
        <nav id={styles.header_navBar}>
            <div id={styles.content_logo}>
                <h1>ZTrain</h1>
            </div>
            <div id={styles.content_input_wrapper}>
                <select name="pets" id={styles.select_cat}>
                    <option value="">Toutes les categories</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="hamster">Hamster</option>
                    <option value="parrot">Parrot</option>
                    <option value="spider">Spider</option>
                    <option value="goldfish">Goldfish</option>
                </select>
                <input 
                    type="text"
                    id={styles.input_navbar_search}
                    placeholder='Rechercher un produit ou une categorie'
                />
                <div>
                    <FaSearch />
                </div>
            </div>
            <div id={styles.content_cart_wrapper} onClick={onShowCart}>
                <FiShoppingCart />
                <span> {products_cart.length} produit{products_cart.length>1?'s':null}</span>
            </div>
        </nav>
    )
}

export default Navbar