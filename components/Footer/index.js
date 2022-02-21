import styles from './style.module.scss'

const Footer = () => {
    return(
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
    )
}

export default Footer