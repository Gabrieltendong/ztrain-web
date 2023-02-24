import React from 'react';
import styles from './style.module.scss'
import { useState, useRef } from "react";
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { updateuser  } from "../../store/user/actionUser";
import { useDispatch, useSelector } from "react-redux"
import { IsEmail } from '../../utils/isEmail';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import HashLoader from "react-spinners/HashLoader";
//----------------------------------------------------------
import Select from 'react-select';
import axios from 'axios';



function handleInputChange(event){
  const input = event.target;
  if (input.value.length <= 10) {
    input.classList.add('valid');
    input.classList.remove('invalid');
  } else {
    input.classList.add('invalid');
    input.classList.remove('valid');
  }

}
const RegistrationForm = () => {

  
  const { t, lang } = useTranslation();
  const { user } = useSelector(state => state.auth?.user_infos)
  const dispatch = useDispatch()
  //const [email, setEmail] = useState()
 // const [email, setEmail] = useState(user.email)
//  const [password, setPassword] = useState(user.password)
  const [password, setPassword] = useState(user?.password)
  const [ phone, setphone] = useState(user?.phone)
  const [ age, setage] = useState(user?.phone)
  const [civility, setcivility] = useState(user?.civility)
  const [lastname, setlastName] = useState(user?.lastname)
  const [firstname, setfirstName] = useState(user?.firstname)
  const [adress, setaddress] = useState(user?.adress)
  const [addressFacturation, setaddressFacturation] = useState(user?.addressFacturation)
  const [addressLivraison, setaddressLivraison] = useState(user?.addressLivraison)
  const [isVisible, setIsVisible]= useState()
  const {isLoading, error, data} = useSelector(state => state.user?.update_profil)

//--------------------------------------------------------------------------------------------
  const CountriesDropdown = () => {

    const [countries, setCountries] = React.useState([]);
  
                React.useEffect(() => {
                  axios.get('https://unstats.un.org/SDGAPI/v1/sdg/Series/List')
                    .then(res => {
                      const countriesList = res.data.map(country => ({ value: country.name, label: country.name }));
              
                      // trier le tableau par ordre alphabétique avant de le passer à React-Select 
                      countriesList.sort((a, b) => (a.label > b.label) ? 1 : -1);
              
                      setCountries(countriesList);
                    })
                    .catch(err => console.log(err));
              
                }, []); }
    //--------------------------------------------------------------------------------------------


              const onVisiblePass = () => {
                setIsVisible(!isVisible)
              }

              const handleUpdate = (e) => {
                  e.preventDefault()
                dispatch(updateuser(
                  {
                    password , 
                    lastname ,
                    firstname,
                    civility ,
                    phone ,
                    adress,
                    addressFacturation,
                    addressLivraison


                }, user._id))
                  
              }

 



               console.log("user",user?._id);

return ( 

            <body className={styles.body}>
                {/* <div className={styles.wrapper} style={{ backgroundImage: `url('./images/bg-registration-form-2.jpg')` }}>  */}
                <div className={styles.wrapper} style={{ backgroundImage: `url('./images/istockphoto-1292443598-170667a.jpg)` }}> 
                  <div className={styles.container2}>
                    <form className={styles.form } onSubmit={handleUpdate}>
                        
                        <div className={styles.formgroup1}>
                          <div className={styles.formwrapper1}> 
                              <label htmlFor="lastName" > {t('common:name')} </label> 
                              <input 
                              type="text" 
                              className={styles.formcontrol}  
                              id="lastName" 
                              name="lastName"
                              defaultValue={lastname}
                              onChange={(e) => {
                                setlastName(e.target.value)
                              }} />
                          </div>

                          

                          <div className={styles.formwrapper1}>
                              <label htmlFor="firstName"  >{t('common:firstname')}</label>
                              <input 
                              type="text"
                                className={styles.formcontrol}   
                                id="firstName" 
                                name="firstName" 
                                defaultValue={firstname}
                                onChange={(e) => {
                                  setfirstName(e.target.value)
                                }} />
                          </div>

                        </div>
              
                        <div className={styles.formgroup1}>
                        

                            <div className={styles.formwrapper1}>
                                  <label htmlFor="address"  >{t('common:address')}</label> 
                                  < input 
                                  type = " text " 
                                  className={styles.formcontrol} 
                                  id = "address" 
                                  name="address"
                                  // placeholder={t('Address')}
                                  defaultValue={adress}
                                  onChange={(e) => setaddress(e.target.value)}
                                  />  

                              </div>
{/* 
                            <div className={styles.formwrapper1}>
                              <label htmlFor="address"  >{t('common:address')}</label> 
                              <Select 
                              className={styles.select} 
                              options={countries}
                              onChange={(e) => setaddress(e.target.value)}
                              /> 
                              
                            </div> */}


                            <div className={styles.formwrapper1}>
                                <label htmlFor="phone" >{t('common:phone')}</label>
                                  <input 
                                      type="tel" 
                                      className={styles.formcontrol} 
                                      id="phone" 
                                      name="phone" 
                                      //maxlength="10" 
                                      onInput={handleInputChange}
                                      defaultValue={phone}
                                              onChange={(e) => {
                                                setphone(e.target.value)
                                              }}
                                  />
                              </div>

                        </div>
                      
                            
                      <div className={styles.formgroup1}>
                            <div className={styles.formwrapper1}>
                              <label htmlFor="addressFacturation" >{t('common:billing_address')}</label>
                              <input 
                              type="text" 
                              className={styles.formcontrol} 
                              id="addressFacturation" 
                              name="addressFacturation"
                              defaultValue={addressFacturation}
                              onChange={(e) => setaddressFacturation(e.target.value)}
                              />
                            </div>

                            <div className={styles.formwrapper1}>
                                <label htmlFor="addressLivraison" >{t('common:delivery_address')}</label>
                                < input 
                                  type = " text "  
                                  className={styles.formcontrol} 
                                  id = "addressLivraison" 
                                  name="addressLivraison"
                                  defaultValue={addressLivraison}
                                onChange={(e) => setaddressLivraison(e.target.value)}/>  
                            </div>
                      </div>
                        

                      <div className={styles.formgroup1}>
                            
                    
                            <div className={styles.formwrapper1}>
                                    <label htmlFor="civility1" >{t('common:Civility')}</label>
                                    <select className={styles.select}
                                    onChange={(e) => setcivility(e.target.value)}
                                    >
                                      <option value={t('common:sir')}>Monsieur</option>
                                      <option value={t('common:madam')}>Madame</option>
                                    </select>
                            </div>


                        </div>

                              
                              <div className={styles.formwrapper1}>
                                <label htmlFor="password"  >{t('common:password')}</label> 
                                <input 
                                type={isVisible?'text':'password'}
                                className={styles.formcontrolpassword}   
                                id="password" 
                                name="password" 
                                // placeholder={t('password')}
                                // defaultValue={password}
                                // Value={password}

                                
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
                          
                
                
                  <button className={styles.btn2} type='submit'>
                          { isLoading?
                              <HashLoader 
                                color={'#fff'} 
                                loading={true}
                                css={styles.override}
                                size={30} 
                              />
                              :
                              t('Update')
                            
                              
                            }
                  </button> 
                  {
                    error? <div>
                                  <p className={styles.popup_error_message}>
                                    {/* <span>{t('common:updateform_error_msg')}</span> */}
                                    <span>{error}</span> 
                                </p>
                              </div>
                    : <div ><p className={styles.popup_success_message }> <span>{t('common:updateform_success_msg')}.</span>
                                    {/* <span>ok.</span> */}
                                </p>
                              </div>
                  }
                 
                </form>                                             
            
                </div> 

                </div>
                </body>


    )
}


export default RegistrationForm 