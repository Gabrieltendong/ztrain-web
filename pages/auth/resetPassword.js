import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import styles from './style.module.scss'
import { resetPassword } from '../../store/auth/actionAuth';
import Toast from '../../components/Toast';
import { RESET_PASSWORD } from '../../store/auth/type';

const ResetPassword = () => {

    const dispatch = useDispatch()
    const router = useRouter()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [isVisible, setIsVisible]= useState()
    const {isLoading, error, message} = useSelector(state => state.auth.reset_password)

    const handleResetPassword = (e) => {
        e.preventDefault()
        const data = {
            email,
            newPassword: password
        }
        dispatch(resetPassword(data, router))
    }

    const onVisiblePass = () => {
        setIsVisible(!isVisible)
    }

    useEffect(() => {
        if(message) {
            setTimeout(() => {
                dispatch({
                    type: `${RESET_PASSWORD}_SUCCESS`,
                    payload: ''
                })
            }, 2000);
        }
    }, [message])

    return(
        <div id={styles.container_forgot_pass}>
            <header>

            </header>
            { 
                message && 
                <Toast
                    text = {'Votre mot de passe à été réinitialisé'} 
                />
            }
            <div id={styles.card}>
                <h1>Réinitialiser votre mot de passe</h1>
                <form  onSubmit={handleResetPassword}>
                    <input
                        id="email_reset_pass"
                        className={styles.input}
                        placeholder="Votre email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div id={styles.container_input_password}>
                        <input
                            id = "reset_password"
                            className={styles.input_password}
                            placeholder="Nouveau mot de passe"
                            type={isVisible?'text':'password'}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div onClick={onVisiblePass}>
                        {
                            isVisible?
                            <FiEye />
                            :
                            <FiEyeOff />
                        }
                        </div>
                    </div>
                    {
                        Array.isArray(error)?
                        error.map((item, index) => (
                        <p key={index} className={styles.messageError}>{" * "} {item}</p>
                        ))
                        :error.length > 0?
                        <p className={styles.messageError}>{error}</p>:null
                    }
                    <button 
                        id='btn_reset_password'
                        className = {styles.btn}
                        type="submit"
                    >
                        {
                        isLoading?
                        <HashLoader 
                            color={'#fff'} 
                            loading={true}
                            css={styles.override}
                            size={30} 
                        />
                        :
                        'Réinitialiser'
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword