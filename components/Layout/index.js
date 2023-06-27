import { HeartOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Box, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { useRouter } from 'next/router'
import Link from 'next/link'

function Layout({children}) {
    const [show, setShow] = useState(false)
    const router = useRouter()

    const onShowCart = () => {
        setShow(true)
    }

    return (
        <Box sx={{backgroundColor: '#eee'}}>
            <Navbar
                onShowCart = {onShowCart}
            />
            <Box pt={20} pl={{xs: 0, md:10}} mb={7}>
                <Grid container gap={3} >
                    <Grid md={2} item sx={{bgcolor: '#fff', height: 400, borderRadius: 5, paddingY: 3, display: {xs: 'none', md: 'block'}}}>
                        <Typography variant='h5' pl={3}>Paramètres</Typography>
                        <Link href={'/profile'}>
                            <Grid container pl={3} mt={5} alignItems={'center'} height={40} sx={{borderRightColor: router.pathname!='/profile'?'#fff':'#FF7643', borderRightWidth: 2, borderRightStyle: 'solid', cursor: 'pointer'}}>
                                <Grid item>
                                    <UserOutlined />
                                </Grid>
                                <Grid item ml={2}>
                                    <Typography>Mon compte</Typography>
                                </Grid>
                            </Grid>
                        </Link>
                        <Link href={'/commandes'}>
                            <Grid container pl={3} mt={3} alignItems={'center'} height={40} sx={{borderRightColor: router.pathname!='/commandes'?'#fff':'#FF7643', borderRightWidth: 2, borderRightStyle: 'solid', cursor: 'pointer'}}>
                                <Grid item>
                                    <ShoppingCartOutlined />
                                </Grid>
                                <Grid item ml={2}>
                                    <Typography>Mes commande</Typography>
                                </Grid>
                            </Grid>
                        </Link>
                        <Link href={'/myfavorite'}>
                            <Grid container pl={3} mt={3} alignItems={'center'} height={40} sx={{borderRightColor: router.pathname!='/myfavorite'?'#fff':'#FF7643', borderRightWidth: 2, borderRightStyle: 'solid', cursor: 'pointer'}}>
                                <Grid item>
                                    <HeartOutlined />
                                </Grid>
                                <Grid item ml={2}>
                                    <Typography>Mes favoris</Typography>
                                </Grid>
                            </Grid>
                        </Link>
                    </Grid>
                    <Grid 
                        md={9}
                        xs={12}
                        item 
                        container 
                        sx={{ borderRadius: 5, mr: {xs: 0, md: 4}, bgcolor: '#fff'}} 
                        p={4}
                    >
                        {children}
                    </Grid>
                </Grid>
            </Box>
            <Footer />
        </Box>
    )
}

export default Layout
