import { useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

import { register } from "../../store/auth/actionAuth";
import styles from './style.module.css'


const Register = () => {
  
  const dispatch = useDispatch()
  const router = useRouter()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [adress, setAdress] = useState()
  const [age, setAge] = useState()
  const {isLoading, error} = useSelector(state => state.auth.register)

  const handleRegister = (e) => {
    e.preventDefault()
    dispatch(register({email, password, adress, age}, router))
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.col_1}>
            <img
                className={styles.carousel_img}
                src="/assets/2.jpg"
                alt="First slide"
            />
            <div id = {styles.content_header_title}>
              <h1 className={styles.header_title}>Bienvenue!!!</h1>
              <p className={styles.header_subTitle}>La façon la plus simple de faire le commerce en ligne, En quelque clic seulement faite vos achats et à des prix raisonnable ...</p>
            </div>
        </div>
        <div className={styles.col_2}>
          <h1 className={styles.header_title_form}>Inscription</h1> 
          <div>
            <form id = {styles.content_form} onSubmit={handleRegister}>
              <input
                id={styles.input_email}
                className={styles.input}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                id={styles.input_password}
                className={styles.input}
                placeholder="Mot de passe" 
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                id={styles.input_address}
                className={styles.input}
                placeholder="Adresse"
                onChange={(e) => setAdress(e.target.value)}
              />
              <input
                id={styles.input_birthday}
                className={styles.input}
                placeholder="Age" 
                onChange={(e) => setAge(e.target.value)}
              />
              {
                Array.isArray(error)?
                error.map((item, index) => (
                  <p className={styles.messageError}>* {item}</p>
                ))
                :error.length > 0?
                <p className={styles.messageError}>{error}</p>:null
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
                  'Inscription'
                }
              </button>
            </form>
            <div id = {styles.link_signup_wrapper}>
                <span>vous avez déja un compte? </span>
                <Link href={'/auth/login'} id={styles.link_signup}>Se connecter</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;