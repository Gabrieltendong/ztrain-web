


import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import { useGoogleLogout } from 'react-google-login'

import { SET_USER } from '../../store/auth/type'
import styles from './style.module.scss'
import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import {  Menu, Avatar, Layout } from 'antd';
import { WomanOutlined, UserOutlined, ShoppingCartOutlined, HeartOutlined , LogoutOutlined } from '@ant-design/icons';
import { setUser } from '../../store/auth/actionAuth';
import { Typography } from '@mui/material';

const { Header } = Layout;


const Dropdown = ({onClose}) => {

    const { signOut, loaded } = useGoogleLogout({clientId: process.env.google_client_id})
    const user_infos = useSelector(state => state.auth?.user_infos)

    const dispatch = useDispatch()

    const logOut = () => {
        console.log("object")
        dispatch(setUser({}))
        onClose()
    }

   


    return (
        // <Popover
        //     id={id}
        //     open={open}
        //     anchorEl={anchorEl}
        //     onClose={handleClose}
        //     anchorOrigin={{
        //         vertical: 'bottom',
        //         horizontal: 'left',
        //     }}
        // >
           <Menu className={styles.ant_dropdown_menu }>
                <Menu.Item className={styles.ant_menu_item }  >
                    <span >{user_infos?.user?.email?user_infos?.user?.email:'inconnu'}</span>  
                </Menu.Item>
                <Menu.Divider />
                    <Menu.Item className={styles.ant_menu_item } key="1" icon={<UserOutlined />}><Link  className={styles.Link  } href="/profile">Mon compte</Link ></Menu.Item>

                    <Menu.Item className={styles.ant_menu_item } key="2" icon={<ShoppingCartOutlined />}><Link  className={styles.Link  } href="/commandes">Mes commandes</Link ></Menu.Item>

                    <Menu.Item  className={styles.ant_menu_item } key="3" icon={<HeartOutlined />}><Link  className={styles.Link  } href="/myfavorite">Mes favoris</Link ></Menu.Item>
                <Menu.Divider />
                <Menu.Item className={styles.ant_menu_item } onClick={logOut}  key="4" icon={<LogoutOutlined /> }><Link  className={styles.Link }  href="" id='logout' onClick={logOut}>Se déconnecter</Link ></Menu.Item> 
            </Menu> 
        //     <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
        // </Popover>
   )

}

export default Dropdown