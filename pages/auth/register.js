import { useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { register } from "../../store/auth/actionAuth";
import styles from './style.module.scss'
import Image from "next/image";

const errorMessage = 'Les deux mots de passe ne sont pas identiques'

const Register = () => {
  
  const dispatch = useDispatch()
  const router = useRouter()
  const [isVisible, setIsVisible]= useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [passwordConfirm, setPasswordConfirm] = useState()
  const [isVisibleConfirm, setIsVisibleConfirm] = useState()
  const {isLoading, error} = useSelector(state => state.auth.register)
  const [errorPassword, setErrorPassword]=useState()

  const handleRegister = (e) => {
    e.preventDefault()
    if(password != passwordConfirm){
      setErrorPassword(errorMessage)
    }
    else 
      dispatch(register({email, password}, router))
  }

  const onVisiblePass = () => {
    setIsVisible(!isVisible)
  }

  const handleChange = (e) => {
    const value = e.target.value
    setPasswordConfirm(value)
    if(password != value){
      setErrorPassword(errorMessage)
    }
    else{
      setErrorPassword('')
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.col_1}>
            <div id = {styles.content_header_title}>
              <h1 className={styles.header_title}>Bienvenue!!!</h1>
              <p className={styles.header_subTitle}>Vos courses au quotidien, en quelques clics...</p>
            </div>
        </div>
        <div className={styles.col_2}>
          <h1 className={styles.header_title_form}>Inscription</h1> 
          <div>
            <form id = {styles.content_form} onSubmit={handleRegister}>
              <input
                id='email_register'
                className={styles.input}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div id={styles.container_input_password}>
                <input
                  id="password_register"
                  className={styles.input_password}
                  placeholder="Mot de passe"
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
              {/* <span className={styles.smallText}>* Le mot de passe doit avoir au moins 8 caractères</span> */}
              <div id={styles.container_input_password}>
                <input
                  id="confirm_password_register"
                  className={styles.input_password}
                  placeholder="Confirmer votre mot de passe"
                  type={isVisibleConfirm?'text':'password'}
                  onChange={handleChange}
                />
                <div onClick={() => setIsVisibleConfirm(!isVisibleConfirm)}>
                  {
                    isVisibleConfirm?
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
              {
                errorPassword && 
                <p className={styles.messageError}>{errorPassword}</p>
              }
              <button 
                id="btn_register"
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
                  'Inscription'
                }
              </button>
            </form>
            <div id = {styles.link_signup_wrapper}>
                <span>{" Vous avez déja un compte? "} </span>
                <Link href={'/auth/login'}>
                  <a className={styles.link}>Se connecter</a>
                </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;