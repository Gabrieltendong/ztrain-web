import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useState, useRef } from "react";
import HashLoader from "react-spinners/HashLoader";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from 'react-google-login';
import useTranslation from 'next-translate/useTranslation'
import { appWithTranslation } from "next-i18next";

import { auth, google_login } from "../../store/auth/actionAuth";
import styles from './style.module.scss'
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import ReactFlagsSelect from "react-flags-select";
import { IsEmail } from '../../utils/isEmail';


const Login = () => {
  
  const dispatch = useDispatch()

  const router = useRouter()
  const inputRef = useRef()
  const { t, lang } = useTranslation();
  const [email, setEmail] = useState()
  //const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState()
  const [isVisible, setIsVisible]= useState()
  const {isLoading, error} = useSelector(state => state.auth.login)
  const [invalidEmail, setInvalEmail]=useState("")
  

  const handleLogin = (event) => {
    event.preventDefault()
    if(!IsEmail(email)){
      setInvalEmail("Le format de l'email est invalid")
    }else{
      dispatch(auth({email, password}, router))
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
      }, router))
    }
  }

  const handleLocaleChange = (event) => {
    // const value = event.target.value;
    const value = event == "US"?"en":"fr" 

    router.push(router.route, router.asPath, {
      locale: value,
    });
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={[styles.col_1]}>
            <div id = {styles.content_header_title}>
              <h1 className={styles.header_title}>{t('common:welcome')}!!!</h1>
              <p className={styles.header_subTitle}>{t('common:slogan')}...</p>
            </div>
        </div>
        <div className={styles.col_2}>
          <ReactFlagsSelect
            id={styles.local}
            countries={["US","FR"]}
            customLabels={{ US: "En",FR: "Fr"}}
            fullWidth={false}
            alignOptionsToRight
            selected={router.locale=="en"?"US":"FR"}
            onSelect={handleLocaleChange}
          />
          <h1 className={styles.header_title_form}>{t('login:login')}</h1> 
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
                  t('login:login')
                }
              </button>
            </form>
            <GoogleLogin
              clientId={process.env.google_client_id}
              buttonText={t('login:google_login')}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              className={styles.btn_google}
              cookiePolicy={'single_host_origin'}
            />
            <div id = {styles.link_signup_wrapper}>
                <span>{t('login:your_register')} </span>
                <Link href={'/auth/register'}>
                  <a className={styles.link}>{t('login:register')}</a>
                </Link>
            </div>
          </div>
        </div>
      </main> 
    </div>
  );
}

export default Login;