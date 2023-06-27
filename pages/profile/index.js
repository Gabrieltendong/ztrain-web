import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"




import RegistrationForm from "../../components/RegistrationForm"
import Cart from "../../components/Cart"
import CheckoutForm from "../../components/CheckoutForm"
import Footer from '../../components/Footer'
import Navbar from "../../components/Navbar"
import Toast from '../../components/Toast'
import { CREATE_COMMANDE, REMOVE__ALL_PRODUCT_CART } from '../../store/cart/type'
import { get_all_favorites } from '../../store/favorite/actionFavorite'
import { ADD_PRODUCT_CART } from '../../store/product/type'
import styles from './style.module.scss'
import Layout from '../../components/Layout'
import { Box, FilledInput, FormControl, Grid, IconButton, InputAdornment, InputLabel, Typography } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import HashLoader from "react-spinners/HashLoader";
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import { updateuserPassword } from '../../store/user/actionUser'


const Profile = () => {

    const { t, lang } = useTranslation();
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()
    const [isShowCheckout, setIsShowCheckout] = useState(false)
    const { user } = useSelector(state => state.auth?.user_infos)
    const dataCommand = useSelector(state => state.cart.command.data)
    const clearCartData = useSelector(state => state.cart.clearCart.data)
    const [isVisible, setIsVisible] = useState(false)
    const {isLoading} = useSelector(state => state.user?.update_password)
    const [lastPassword, setlastPassword] = useState()
    const [newPassword, setnewPassword] = useState()
    const [isVisibleNewPassword, setIsVisibleNewPassword] = useState(false)

    const onCloseCheckout = () => {
        setIsShowCheckout(false)
    }

    const onClearCart = () => {
        setShow(false)
        dispatch({type: `${REMOVE__ALL_PRODUCT_CART}_SUCCESS`, payload: {}})
    }

    const handleChangePassword = (e) => {
        e.preventDefault()
        dispatch(updateuserPassword({lastPassword, newPassword}, user._id))
    }

    useEffect(() => {
        if(Object.keys(dataCommand).length != 0){
            onCloseCheckout()
            setShow(false)
        }
        if(Object.keys(clearCartData).length != 0){
            onClearCart()
        }
        if(Object.keys(dataCommand).length != 0) {
            setTimeout(() => {
                dispatch({
                    type: `${ADD_PRODUCT_CART}_SUCCESS`,
                    payload: ''
                })
                dispatch({
                    type: `${CREATE_COMMANDE}_SUCCESS`,
                    payload: ''
                })
            }, 2000);
        }
        if(!user){
            router.push('/home')
        }
        dispatch(get_all_favorites())
    }, [user, dataCommand, clearCartData])

    return(
        <Layout>
            <div>
                { 
                    dataCommand.message?
                    <Toast
                        text = {dataCommand.message} 
                    />:null
                }
                <Cart
                    showCart={show}
                    onClose = {() => setShow(false)}
                    onShowCheckout = {() => setIsShowCheckout(true)}
                />
                <CheckoutForm
                    isVisible={isShowCheckout}
                    onClose={onCloseCheckout}
                />
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <div>
                            <Typography mb={3} variant='h6'>Mes informations personnelles</Typography>
                            <RegistrationForm/> 
                            <Typography mb={3} variant='h6'>Changer de mot de passe</Typography>
                            <form onSubmit={handleChangePassword}>
                                <div className={styles.formwrapper1}>
                                    <FormControl sx={{ width: '100%' }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-password">Mot de passe actuel</InputLabel>
                                        <FilledInput
                                        id="filled-adornment-password"
                                        type={isVisible ? 'text' : 'password'}
                                        onChange={(e) => setlastPassword(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setIsVisible(true)}
                                                onMouseDown={() => setIsVisible(false)}
                                                edge="end"
                                            >
                                                {isVisible ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                            </InputAdornment>
                                        }
                                        />
                                    </FormControl>
                                </div>
                                <div className={styles.formwrapper1}>
                                    <FormControl sx={{  width: '100%' }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-password">Nouveau mot de passe</InputLabel>
                                        <FilledInput
                                        id="filled-adornment-password"
                                        type={isVisibleNewPassword ? 'text' : 'password'}
                                        onChange={(e) => setnewPassword(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setIsVisibleNewPassword(true)}
                                                onMouseDown={() => setIsVisibleNewPassword(false)}
                                                edge="end"
                                            >
                                                {isVisibleNewPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                            </InputAdornment>
                                        }
                                        />
                                    </FormControl>
                                </div>
                                <button className={styles.btn2} type='submit' >
                                    { isLoading?
                                        <HashLoader 
                                            color={'#fff'} 
                                            loading={true}
                                            css={styles.override}
                                            size={30} 
                                        />
                                        :
                                        t('Update')  
                                    }
                                </button>
                            </form>
                        </div>
                    </Grid>
                    <Grid item sx={{display: {xs: 'none', md: 'block'}}}>
                        <Box sx={{position: 'relative', height: 400, width: 300}}>
                            <Image objectFit='contain' layout='fill' src={'/assets/Personal-settings-pana.png'} />
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </Layout>
    )
}

export default Profile