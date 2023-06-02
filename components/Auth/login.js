import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useState, useRef } from "react";
import HashLoader from "react-spinners/HashLoader";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from 'react-google-login';
import useTranslation from 'next-translate/useTranslation'

import { auth, google_login } from "../../store/auth/actionAuth";
import styles from './style.module.scss'
import { useRouter } from "next/router";
import Link from "next/link";
import ReactFlagsSelect from "react-flags-select";
import { IsEmail } from '../../utils/isEmail';
import { Modal } from 'antd';


const Login = ({onClose}) => {
  
  const dispatch = useDispatch()

  const router = useRouter()
  const inputRef = useRef()
  const { t, lang } = useTranslation();
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [isVisible, setIsVisible]= useState()
  const {isLoading, error} = useSelector(state => state.auth.login)
  const [invalidEmail, setInvalEmail]=useState("")

  const handleLogin = async (event) => {
    event.preventDefault()
    if(!IsEmail(email)){
      setInvalEmail("Le format de l'email est invalid")
    }else{
      dispatch(auth({email, password}, onClose))
    }
  }

  const onVisiblePass = () => {
    setIsVisible(!isVisible)
  }

  const onFocusPassword = () => {
    if(!IsEmail(email)){
      setInvalEmail("Le format de l'email est invalid")
    }
  }

  const responseGoogle = (response) => {
    console.log(response);
    if(response.profileObj){
      dispatch(google_login({
        email: response.profileObj.email,
        isGoogle: true
      }, onClose))
    }
  }

  return (
    <div style={{height: 200}}>
      <div>
        <form id = {styles.content_form} onSubmit={handleLogin}>
          <input
            id="email_login"
            className={styles.input}
            placeholder={t('common:email')}
          //  defaultValue={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if(IsEmail(e.target.value))
                setInvalEmail("")
            }}
          />
          {
            invalidEmail &&
            <p className={styles.messageError}>{invalidEmail}</p>
          }
          <div id={styles.container_input_password}>
            <input
              id='password_login'
              onFocus={onFocusPassword}
              value={password}
              className={styles.input_password}
              placeholder={t('common:password')}
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
          <Link href={'/auth/resetPassword'}>
            <a className={styles.forgotpass}>{t('common:forgot_pass')}</a>
          </Link>
          {
            error &&
            <p className={styles.messageError}>{error}</p>
          }
          <button
            id="btn_login"
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
              'Connexion'
            }
          </button>
        </form>
        <GoogleLogin
          clientId={process.env.google_client_id}
          buttonText={'Connexion par google'}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          className={styles.btn_google}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </div>
  );
}

export default Login;