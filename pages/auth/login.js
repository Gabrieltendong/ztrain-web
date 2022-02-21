import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "../../store/auth/actionAuth";
import styles from './style.module.scss'
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";


const Login = () => {
  
  const dispatch = useDispatch()
  const router = useRouter()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [isVisible, setIsVisible]= useState()
  const {isLoading, error} = useSelector(state => state.auth.login)

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(auth({email, password}, router))
  }

  const onVisiblePass = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.col_1}>
            <Image
                className={styles.carousel_img}
                height={1000}
                width={1000}
                src="/assets/1.jpg"
                alt="First slide"
            />
            <div id = {styles.content_header_title}>
              <h1 className={styles.header_title}>Bienvenue!!!</h1>
              <p className={styles.header_subTitle}>La façon la plus simple de faire le commerce en ligne, En quelques clics seulement faites vos achats et à des prix raisonnable ...</p>
            </div>
        </div>
        <div className={styles.col_2}>
          <h1 className={styles.header_title_form}>Connexion</h1> 
          <div>
            <form id = {styles.content_form} onSubmit={handleLogin}>
              <input
                id="email"
                className={styles.input}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div id={styles.container_input_password}>
                <input
                  id={styles.input_password}
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
              {
                error &&
                <p className={styles.messageError}>{error}</p>
              }
              <button 
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
            <div id = {styles.link_signup_wrapper}>
                <span>{" vous n'avez pas encore de compte? "} </span>
                <Link href={'/auth/register'}>
                  <a className={styles.link}>{" S'inscrire "}</a>
                </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;