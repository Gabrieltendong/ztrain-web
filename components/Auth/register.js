import { useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import useTranslation from 'next-translate/useTranslation'

import { register } from "../../store/auth/actionAuth";
import styles from './style.module.scss'
import Image from "next/image";
import { IsEmail } from "../../utils/isEmail";

const errorMessage = 'Les deux mots de passe ne sont pas identiques'

const Register = ({onClose}) => {
  
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const router = useRouter()
  const [isVisible, setIsVisible]= useState()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [isVisibleConfirm, setIsVisibleConfirm] = useState()
  const {isLoading, error} = useSelector(state => state.auth.register)
  const [formError, setFormError]=useState({
    email: '',
    password: ''
  })
  const [errorPassword, setErrorPassword]=useState()

  const handleRegister = (e) => {
    e.preventDefault()
    if(password != passwordConfirm){
      setErrorPassword(errorMessage)
    }

    if(!IsEmail(email)){
      setFormError({
        email: "Le format de l'email est invalid"
      })
    }

    if(password.length < 8){
      setFormError({
        password: "Le mot de passe doit avoir au moins 8 caractères"
      })
    }

    if(
        password.length >= 8 && 
        password == passwordConfirm && 
        IsEmail(email)
      ){
        dispatch(register({email, password}, onClose))
      }
  }

  const onVisiblePass = () => {
    setIsVisible(!isVisible)
  }

  const handleChange = (e, label) => {
    const value = e.target.value
    if(label == "email"){
      setEmail(value)
      if(IsEmail(value)){
        setFormError({
          email: ""
        })
      }
    }

    if(label == "password"){
        setPassword(value)
    }

    if(label == "confirmpassword"){
      setPasswordConfirm(value)
      if(password != value){
        setErrorPassword(errorMessage)
      }
      else{
        setErrorPassword('')
      }
    }
  }

  return (
    <div style={{height: 200}} >
          <div>
            <form id = {styles.content_form} onSubmit={handleRegister}>
              <input
                id='email_register'
                className={styles.input}
                placeholder={t('common:email')}
                onChange={(e) => handleChange(e, "email")}
              />
              <div id={styles.container_input_password}>
                <input
                  id="password_register"
                  className={styles.input_password}
                  placeholder={t('common:password')}
                  type={isVisible?'text':'password'}
                  onChange={(e) => handleChange(e, "password")}
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
                errorPassword && 
                <p className={styles.messageError}>{errorPassword}</p>
              }
              <div id={styles.container_input_password}>
                <input
                  id="confirm_password_register"
                  className={styles.input_password}
                  placeholder="Confirmer votre mot de passe"
                  type={isVisibleConfirm?'text':'password'}
                  onChange={(e) => handleChange(e, "confirmpassword")}
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
              {formError.email && <p className={styles.messageError}>{formError.email}</p>}
              {formError.password && <p className={styles.messageError}>{formError.password}</p>}
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
          </div>
        </div>
  );
}

export default Register;