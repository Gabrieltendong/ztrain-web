import { TextField } from "@mui/material";
import { useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "../../store/auth/actionAuth";
import styles from './style.module.css'
import { useRouter } from "next/router";
import Link from "next/link";


const Login = () => {
  
  const dispatch = useDispatch()
  const router = useRouter()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const {isLoading, error} = useSelector(state => state.auth.login)

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(auth({email, password}, router))
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.col_1}>
            <img
                className={styles.carousel_img}
                src="/assets/1.jpg"
                alt="First slide"
            />
            <div id = {styles.content_header_title}>
              <h1 className={styles.header_title}>Bienvenue!!!</h1>
              <p className={styles.header_subTitle}>La façon la plus simple de faire le commerce en ligne, En quelque clic seulement faite vos achats et des à prix raisonnable ...</p>
            </div>
        </div>
        <div className={styles.col_2}>
          <h1 className={styles.header_title_form}>Connexion</h1> 
          <div>
            <form id = {styles.content_form} onSubmit={handleLogin}>
              <input
                id="standard-basic"
                className={styles.input}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                id="standard-basic" 
                placeholder="Mot de passe" 
                className={styles.input}
                onChange={(e) => setPassword(e.target.value)}
              />
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
                <span>vous n'avez pas encore de compte? </span>
                <Link href={'/auth/register'} id={styles.link_signup}>S'inscrire</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;