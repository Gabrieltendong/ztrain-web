


import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import { useGoogleLogout } from 'react-google-login'

import { SET_USER } from '../../store/auth/type'
import styles from './style.module.scss'
import React, { useState } from 'react';
// import { Dropdown, Menu, Avatar, Layout } from '~antd/dist/antd.css';
import {  Menu, Avatar, Layout } from 'antd';
import { WomanOutlined, UserOutlined, ShoppingCartOutlined, HeartOutlined , LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;


const DropdownComponent = ({isVisible, onMouseLeave}) => {

    const { signOut, loaded } = useGoogleLogout({clientId: process.env.google_client_id})
    const { user } = useSelector(state => state.auth?.user_infos)

    const dispatch = useDispatch()

    const logOut = () => {
        dispatch({
            type: SET_USER,
            payload: {}
        })
    }

   


    return (
        <div onMouseLeave = {onMouseLeave}  id={isVisible?styles.showDropdown: styles.hideDropdown}>
        <Menu className={styles.ant_dropdown_menu }>
  
            <Menu.Item className={styles.ant_menu_item }  >
                <span >{user?.email?user?.email:'inconnu'}</span>  
            </Menu.Item>
           
            <Menu.Divider />

                    <Menu.Item className={styles.ant_menu_item } key="1" icon={<UserOutlined />}><a className={styles.a } href="/profile">Mon compte</a></Menu.Item>

                    <Menu.Item className={styles.ant_menu_item } key="2" icon={<ShoppingCartOutlined />}><a className={styles.a } href="/commandes">Mes commandes</a></Menu.Item>

                    <Menu.Item  className={styles.ant_menu_item } key="3" icon={<HeartOutlined />}><a className={styles.a } href="/myfavorite">Mes favoris</a></Menu.Item>

            <Menu.Divider />

         {/* <Menu.Item className={styles.ant_menu_item }  key="4" ><a className={styles.a}  href="" id='logout' onClick={logOut}>Se déconnecter</a></Menu.Item>   */}
            <Menu.Item className={styles.ant_menu_item }  key="4" icon={<LogoutOutlined /> }><a className={styles.a}  href="" id='logout' onClick={logOut}>Se déconnecter</a></Menu.Item> 
            
            
        </Menu> 
        
    </div>
   
   )

}

export default DropdownComponent