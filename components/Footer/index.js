import Link from 'next/link'

import styles from './style.module.scss'
import { Grid } from '@mui/material'
import { Facebook, LinkedIn, Twitter, YouTube } from '@mui/icons-material'


const Footer = () => {
    return(
        <footer id={styles.footer_home}>
            <div id={styles.content_footer}>
                <div id={styles.section_logo}>
                    <Link href={"/home"}>
                        <h1>Z-Train</h1>
                    </Link>
                    <p>Pour les courses ou le shopping, un vaste choix de produits à petit prix livrés à domicile, en magasin, en consigne ou en point relais.</p>
                </div>
                <div id={styles.section_our_society}>
                    <h5>Our society</h5>
                    <div id={styles.content_item_our_socitety}>
                        <div className={styles.content_menu_item}>
                            <a className={styles.item_menu}>About</a>
                            <a className={styles.item_menu}>Contact</a>
                            <a className={styles.item_menu}>our Product</a>
                            <a className={styles.item_menu}>Join us</a>
                        </div>
                        <div className={styles.content_menu_item}>
                            <Link href="/faq" className={styles.item_menu}>
                                FAQ
                            </Link>
                            <a className={styles.item_menu}>CGV</a>
                            <a className={styles.item_menu}>Terms of services</a>
                            <Link href={'/privacy-policy'} className={styles.item_menu}>
                                Privacy policy
                            </Link>
                        </div>
                    </div>
                </div>
                <div id={styles.section_contact_us}>
                    <h5>Contact us</h5>
                    <div className={styles.content_menu_item}>
                        <a className={styles.item_menu}>contact@ztrain.com</a>
                        <a className={styles.item_menu}>Moulin de la Vierge (Rue du)</a>
                        <a className={styles.item_menu}>+ 33 656 78 78 41</a>
                    </div>
                </div>
                <div id={styles.section_follow_us}>
                    <h5>Follow us</h5>
                    <Grid container gap={1} display={'flex'} justifyContent={'center'}>
                        <Grid item>
                            <Facebook sx={{color: 'white'}} />
                        </Grid>
                        <Grid item>
                            <Twitter sx={{color: 'white'}} />
                        </Grid>
                        <Grid item>
                            <LinkedIn sx={{color: 'white'}} />
                        </Grid>
                        <Grid item>
                            <YouTube sx={{color: 'white'}} />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </footer>
    )
}

export default Footer