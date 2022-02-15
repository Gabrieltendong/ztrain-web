import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaSearch, FaShoppingBasket } from 'react-icons/fa';
import styles from './style.module.css'
import Image from 'next/image';

const Home = () => {

    const { user } = useSelector(state => state.auth?.user_infos)
    const router = useRouter()

    useEffect(() => {
        if(!user){
            router.push('/auth/login')
        }
    }, [])

    return(
        <div>
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
                <div id={styles.content_cart_wrapper}>
                    <FaShoppingBasket />
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
                    <div className={styles.card}>
                        <div className={styles.card_body}>
                            <Image 
                                src="https://static2.chaussminimaxi.fr/13471-catalog_medium/homme-presse-daim-cognac-paire-fils.jpg" 
                                height={250}
                                width={250} 
                                className={styles.card_body_img}
                            />
                        </div>
                        <div className={styles.card_footer}>
                            <h5>Basket with Handle</h5>
                            <p>$1000</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.card_body}>
                            <Image 
                                src="https://static2.chaussminimaxi.fr/12306-large_default/boots-chelsea.jpg" 
                                height={250}
                                width={250} 
                                className={styles.card_body_img}
                            />
                        </div>
                        <div className={styles.card_footer}>
                            <h5>Basket with Handle</h5>
                            <p>$1000</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.card_body}>
                            <Image 
                                src="https://media.achat-ville.com/uploads/mulhouse/Produit/cb/imp_photo_25629_1634310102.png" 
                                height={250}
                                width={250} 
                                className={styles.card_body_img}
                            />
                        </div>
                        <div className={styles.card_footer}>
                            <h5>Basket with Handle</h5>
                            <p>$1000</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.card_body}>
                            <Image 
                                src="https://lookhomme.com/wp-content/uploads/2018/11/Chaussure-homme-tendance-7.jpg" 
                                height={250}
                                width={250} 
                                className={styles.card_body_img}
                            />
                        </div>
                        <div className={styles.card_footer}>
                            <h5>Basket with Handle</h5>
                            <p>$1000</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.card_body}>
                            <Image 
                                src="https://i.pinimg.com/originals/00/6b/0f/006b0f4879428f8123d351d62acfc3cb.jpg" 
                                height={250}
                                width={250} 
                                className={styles.card_body_img}
                            />
                        </div>
                        <div className={styles.card_footer}>
                            <h5>Basket with Handle</h5>
                            <p>$1000</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.card_body}>
                            <Image 
                                src="https://i.pinimg.com/550x/2a/cc/4b/2acc4b6837a30e6d78fa17d315404c19.jpg" 
                                height={250}
                                width={250} 
                                className={styles.card_body_img}
                            />
                        </div>
                        <div className={styles.card_footer}>
                            <h5>Basket with Handle</h5>
                            <p>$1000</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.card_body}>
                            <Image 
                                src="https://s-media-cache-ak0.pinimg.com/736x/16/c2/e7/16c2e7b058de566cf045daa2c7eb48ce--leather-chelsea-boots-ted-baker.jpg" 
                                height={250}
                                width={250} 
                                className={styles.card_body_img}
                            />
                        </div>
                        <div className={styles.card_footer}>
                            <h5>Basket with Handle</h5>
                            <p>$1000</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.card_body}>
                            <Image 
                                src="https://sneakers123.s3.amazonaws.com/release/331496/conversions/timberland-cambridge-square-chelsea-a2gsp-thumb.jpg" 
                                height={250}
                                width={250} 
                                className={styles.card_body_img}
                            />
                        </div>
                        <div className={styles.card_footer}>
                            <h5>Basket with Handle</h5>
                            <p>$1000</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.card_body}>
                            <Image 
                                src="https://uploads-ssl.webflow.com/5fb638ef16441f801761b4e1/5fc52e3900500fa6e70505fa_Edward-Green-Malvern-Selection-PG1.jpeg" 
                                height={250}
                                width={250} 
                                className={styles.card_body_img}
                            />
                        </div>
                        <div className={styles.card_footer}>
                            <h5>Basket with Handle</h5>
                            <p>$1000</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.card_body}>
                            <Image 
                                src="https://shop.manfield.fr/publicmedia/formatted/110/891/676/fr/1CH-15-17-56_V1.png;h=2400,w=2400.png" 
                                height={250}
                                width={250} 
                                className={styles.card_body_img}
                            />
                        </div>
                        <div className={styles.card_footer}>
                            <h5>Basket with Handle</h5>
                            <p>$1000</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.card_body}>
                            <Image 
                                src="https://shop.manfield.fr/publicmedia/formatted/133/202/191/fr/1CH-15-84-45_V1.jpg;h=2400,w=2400.jpg" 
                                height={250}
                                width={250} 
                                className={styles.card_body_img}
                            />
                        </div>
                        <div className={styles.card_footer}>
                            <h5>Basket with Handle</h5>
                            <p>$1000</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.card_body}>
                            <Image 
                                src="https://static.monbottier.fr/49328-large_default/chaussures-churchs-richelieu-carla-noir.jpg" 
                                height={250}
                                width={250} 
                                className={styles.card_body_img}
                            />
                        </div>
                        <div className={styles.card_footer}>
                            <h5>Basket with Handle</h5>
                            <p>$1000</p>
                        </div>
                    </div>
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