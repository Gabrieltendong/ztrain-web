import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { SET_USER } from '../../store/auth/type'
import styles from './style.module.scss'

const Dropdown = ({isVisible, onMouseLeave}) => {

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
            <Link href="">
                <a href="">Mes commandes</a>
            </Link>
            <Link href="/myfavorite">
                <a href="">Mes favoris</a>
            </Link>
            <Link href="">
                <a href="">Mes consultation</a>
            </Link>
            <Link href="">
                <a href="" onClick={logOut}>Se déconnecter</a>
            </Link>
        </div>
    )
}

export default Dropdown