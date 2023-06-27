import styles from './style.module.scss'
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { FiShoppingCart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { get_all_category, get_products_category } from '../../store/category/actionCategory';
import { getAllProduct } from '../../store/product/actionProduct';
import Dropdown from '../Dropdown';
import {  Avatar, Badge } from 'antd';
import { Popover, Typography } from '@mui/material';
import { UserOutlined } from '@ant-design/icons';
import AuthScreen from '../../pages/auth';

const Navbar = ({
    onShowCart,
    onSearch,
    onBlur,
    onFocus,
}) => {

    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const product_cart = useSelector(state => state.product.product_cart)
    const user_infos = useSelector(state => state.auth?.user_infos)
    const {data} = useSelector(state => state.category.list_category)
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

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
                    <option value="all">{t('navbar:label_category')}</option>
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
                    placeholder={t('navbar:search_placeholder')}
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
                <span> {product_cart.length}</span>
            </div>
           <div id={styles.avatar_wrapper} onClick={user_infos?.user?handleClick:handleToggleModal}>
                <Badge dot={user_infos?.user} color='green' style={{right: 10, top: 5, height: 8, width: 8}}>
                    <Avatar  icon={<UserOutlined />} />
                </Badge>
                {user_infos?.user && <Typography>{user_infos?.user.email}</Typography>}
            </div>
            
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Dropdown onClose={handleClose} /> 
            </Popover>
            <AuthScreen open={isModalOpen} onCancel={handleToggleModal} />
        </nav>
    )
}

export default Navbar