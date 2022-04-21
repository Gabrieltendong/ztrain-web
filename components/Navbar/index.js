import styles from './style.module.scss'
import { FaSearch } from 'react-icons/fa';
import { FiShoppingCart, FiUser, FiChevronDown } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import Dropdown from '../Dropdown';
import { useState } from 'react';

const Navbar = ({onShowCart}) => {

    const [isShown, setIsShown] = useState(false);
    const products_cart = useSelector(state => state.cart.products_cart.data)

    return(
        <nav id={styles.header_navBar}>
            <div id={styles.content_logo}>
                <h1>Z-Train</h1>
            </div>
            <div id={styles.content_input_wrapper}>
                {/* <select name="pets" id={styles.select_cat}>
                    <option value="">Toutes les categories</option>
                    <option value="Maison">Maison</option>
                    <option value="Accéssoires">Accéssoires</option>
                    <option value="Chaussures">Chaussures</option>
                </select> */}
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
                <span> {products_cart.length}</span>
            </div>
            <div 
                id={styles.avatar_wrapper}
                onMouseEnter={() => setIsShown(true)}
            >
                <FiUser />
                <span>Compte</span>
                <FiChevronDown />
            </div>
            <Dropdown
             isVisible={isShown}
             onMouseLeave={() => setIsShown(false)}
            />
        </nav>
    )
}

export default Navbar