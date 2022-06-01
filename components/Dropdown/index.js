import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { useGoogleLogout } from 'react-google-login'

import { SET_USER } from '../../store/auth/type'
import styles from './style.module.scss'

const Dropdown = ({isVisible, onMouseLeave}) => {

    const { signOut, loaded } = useGoogleLogout({clientId: process.env.google_client_id})

    const dispatch = useDispatch()

    const logOut = () => {
        dispatch({
            type: SET_USER,
            payload: {}
        })
    }

    return(
        <div
            onMouseLeave = {onMouseLeave}
            id={isVisible?styles.showDropdown: styles.hideDropdown}
        >
            {/* <Link href="">
                <a href="">Mes commandes</a>
            </Link> */}
            <Link href="/myfavorite">
                <a href="">Mes favoris</a>
            </Link>
            <Link href="">
                <a href="" id='logout' onClick={logOut}>Se déconnecter</a>
            </Link>
        </div>
    )
}

export default Dropdown