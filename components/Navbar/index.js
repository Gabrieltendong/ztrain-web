import styles from './style.module.scss'
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link'
import { FiShoppingCart, FiUser, FiChevronDown } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from '../Dropdown';
import { useEffect, useState } from 'react';
import { get_all_category, get_products_category } from '../../store/category/actionCategory';
import { getAllProduct } from '../../store/product/actionProduct';

const Navbar = ({
    onShowCart,
    onSearch,
    onBlur,
    onFocus
}) => {

    const dispatch = useDispatch()
    const [isShown, setIsShown] = useState(false);
    const products_cart = useSelector(state => state.cart.products_cart.data)
    const { user } = useSelector(state => state.auth?.user_infos)
    const {data} = useSelector(state => state.category.list_category)

    const findProductByCategory = (value) => {
        window.scrollTo({
            top: 500,
            behavior: "smooth"
        })
        if(value != "all"){
            dispatch(get_products_category(value))
        }else{
            dispatch(getAllProduct())
        }
    }

    useEffect(() => {
        dispatch(get_all_category())
    }, [])

    return(
        <nav id={styles.header_navBar}>
            <div id={styles.content_logo}>
                <Link href={"/home"}>
                    <h1>Z-Train</h1>
                </Link>
            </div>
            <div id={styles.content_input_wrapper}>
                <select 
                    name="category" 
                    id={styles.select_cat}
                    onChange={(e) => findProductByCategory(e.target.value)}
                >
                    <option value="all">Toutes les categories</option>
                    {
                        data.length >0 &&
                        data.map((item, index) => {
                            return(
                                <option key={index} value={`${item._id}`}>{item.name}</option>
                            )
                        })
                    }
                </select>
                <input 
                    type="text"
                    id={styles.input_navbar_search}
                    placeholder='Rechercher un produit'
                    onChange={(e) => onSearch(e.target.value)}
                    onFocus={onFocus}
                    onBlur={onBlur}
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
                <FiUser
                    color={user?"#27ae60": "#000"}
                />
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