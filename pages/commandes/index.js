import { useDispatch, useSelector } from 'react-redux';
import { fetchCommandes } from '../../store/commandes/actionCommande';
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from "react"
import Cart from "../../components/Cart"
import CheckoutForm from "../../components/CheckoutForm"
import Toast from '../../components/Toast'
import styles from './style.module.scss'
import HashLoader from "react-spinners/HashLoader";
import Layout from '../../components/Layout';
import { Box, Chip, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import moment from 'moment';
import Image from 'next/image';
import { Popover } from 'antd';

const ProductDetail = (product) => (<Box sx={{width: 150}}>
    <Box sx={{width: 150, height: 100, position: 'relative'}}>
        <Image 
            src={product.product.image[0]}
            layout='fill'
            alt='product detail'
            className={styles.card_body_img}
        />
    </Box>
    <Typography>{product.product.name.substring(0,20)}</Typography>
    <Typography color='orange'>{product.product.price} €</Typography>
</Box>)

const Commandes = () => {

    const [show, setShow] = useState(false)
    const [showArrow, setShowArrow] = useState(true);
    const [arrowAtCenter, setArrowAtCenter] = useState(false);
    const dispatch = useDispatch()
    const [isShowCheckout, setIsShowCheckout] = useState(false)
    const { user } = useSelector(state => state.auth?.user_infos)
    const dataCommand = useSelector(state => state.cart.command.data)
    const { error, data , isLoading} = useSelector((state) => state.commandes?.fetch_commandes);
  
    useEffect(() => {
      dispatch(fetchCommandes(user._id)); // Appel de l'action pour récupérer les commandes de l'utilisateur connecté
    }, []);

    const mergedArrow = useMemo(() => {
        if (arrowAtCenter) return { pointAtCenter: true };
        return showArrow;
      }, [showArrow, arrowAtCenter]);

    const onCloseCheckout = () => {
        setIsShowCheckout(false)
    }

    console.log("data", data);
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
            <Typography mb={3} variant='h6'>Mes commandes</Typography>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow sx={{borderWidth: 1, borderColor: '#000', marginBottom: 2}}>
                            <TableCell>No</TableCell>
                            <TableCell align="left">Adresse</TableCell>
                            <TableCell align="left">Date</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">Methode de livraison</TableCell>
                            <TableCell align="left">Quantité de produit</TableCell>
                            <TableCell align="left">Produits</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.length > 0? data.map((command, index) => (
                                <TableRow key={command._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{command.address}</TableCell>
                                    <TableCell>{moment(command.createdAt).format('DD MMM YYYY')}</TableCell>
                                    <TableCell><Chip sx={{color: 'black', backgroundColor: 'yellow'}} label={command.status} /></TableCell>
                                    <TableCell>{command.shipping_method.designation}</TableCell>
                                    <TableCell>{command.products.reduce((result, product) => result + product.quantity, 0)}</TableCell>
                                    <TableCell>
                                        <Grid container>
                                            {
                                                command.products.map((product, i) => (
                                                    <Grid item key={i}>
                                                        <Box sx={{position: 'relative', height: 40, width: 40, borderRadius: 20, backgroundColor: '#eee', padding: 2, margin: 1}}>
                                                            <Popover placement="bottom" content={() => ProductDetail(product)} arrow={mergedArrow}>
                                                                <Image 
                                                                    src={product.product.image[0]}
                                                                    layout='fill'
                                                                    alt='product image'
                                                                    className={styles.card_body_img}
                                                                />
                                                            </Popover>
                                                        </Box>
                                                    </Grid>
                                                ))
                                            }
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            ))
                            :
                            <Typography>Aucune n'avez aucune commande</Typography>
                        }
                    </TableBody>
                </Table>
            </Paper>
        </div>
       </Layout>
    )
}

export default Commandes


