import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaSearch, FaShoppingBasket } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import styles from './style.module.css'
import Image from 'next/image';
import Cart from '../../components/Cart';
import { getAllProduct } from '../../store/product/actionProduct';
import ProductItem from '../../components/ProductItem';

const Home = () => {

    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const { user } = useSelector(state => state.auth?.user_infos)
    const { data, isLoading } = useSelector(state => state.product.list_product)
    const router = useRouter()

    console.log(data)

    const onShowCart = () => {
        setShow(true)
    }

    useEffect(() => {
        if(!user){
            router.push('/auth/login')
        }
        dispatch(getAllProduct())
    }, [])

    return(
        <div>
            <Cart 
                showCart={show}
                onClose = {() => setShow(false)}
            />
            <nav id={styles.header_navBar}>
                <div id={styles.content_lolo}>
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
                    <span> 0 produit</span>
                </div>
            </nav>
            <header id={styles.header_home}>
                <div className={styles.content_text_header}>
                    <h1>{" Flat up to 50% off for men's "}</h1>
                </div>
            </header>
            <main id={styles.content_home}>
                <h2 className={styles.section_title}>Popular product</h2>
                <div id = {styles.popular_product_wrapper}>
                    {
                        data.map((item) => <ProductItem item={item} />)
                    }
                </div>
            </main>
            <footer id={styles.footer_home}>
                <div id={styles.content_footer}>
                    <div id={styles.section_logo}>
                        <h1>ZTrain</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting</p>
                    </div>
                    <div id={styles.section_our_society}>
                        <h5>Our society</h5>
                        <div id={styles.content_item_our_socitety}>
                            <div className={styles.content_menu_item}>
                                <a className={styles.item_menu} href="#">About</a>
                                <a className={styles.item_menu} href="#">Contact</a>
                                <a className={styles.item_menu} href="#">our Product</a>
                                <a className={styles.item_menu} href="#">Join us</a>
                            </div>
                            <div className={styles.content_menu_item}>
                                <a className={styles.item_menu} href="#">FAQ</a>
                                <a className={styles.item_menu} href="#">CGV</a>
                                <a className={styles.item_menu} href="#">Terms of services</a>
                                <a className={styles.item_menu} href="#">Privacy policy</a>
                            </div>
                        </div>
                    </div>
                    <div id={styles.section_contact_us}>
                        <h5>Contact us</h5>
                        <div className={styles.content_menu_item}>
                            <a className={styles.item_menu} href="#">contact@ztrain.com</a>
                            <a className={styles.item_menu} href="#">Moulin de la Vierge (Rue du)</a>
                            <a className={styles.item_menu} href="#">+ 33 656 78 78 41</a>
                        </div>
                    </div>
                    <div id={styles.section_follow_us}>
                        <h5>Follow us</h5>
                        <div className={styles.content_menu_item}>
                            <a className={styles.item_menu} href="#">Facebook</a>
                            <a className={styles.item_menu} href="#">Twitter</a>
                            <a className={styles.item_menu} href="#">Instagram</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home