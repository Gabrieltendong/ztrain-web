import React from 'react';
import styles from './style.module.scss'
import { useState, useRef } from "react";
import useTranslation from 'next-translate/useTranslation'
import { updateuser  } from "../../store/user/actionUser";
import { useDispatch, useSelector } from "react-redux"
import HashLoader from "react-spinners/HashLoader";

import { FilledInput, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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

    return ( 
        <body className={styles.body}>
            {/* <div className={styles.wrapper} style={{ backgroundImage: `url('./images/bg-registration-form-2.jpg')` }}>  */}
            <div className={styles.wrapper} > 
              <div className={styles.container2}>
                <form className={styles.form } onSubmit={handleUpdate}>
                    <div className={styles.formgroup1}>
                      <div className={styles.formwrapper1}> 
                          <TextField
                            id="lastName"
                            label={t('common:name')}
                            defaultValue={lastname}
                            variant="filled"
                          />
                      </div>
                      <div className={styles.formwrapper1}>
                          <TextField
                            id="firstName"
                            label={t('common:firstname')}
                            defaultValue={firstname}
                            variant="filled"
                          />
                      </div>
                    </div>
                    <div className={styles.formgroup1}>
                        <div className={styles.formwrapper1}>
                          <TextField
                            id="address"
                            label={t('common:address')}
                            defaultValue={adress}
                            variant="filled"
                          />
                        </div>
                        <div className={styles.formwrapper1}>
                              <TextField
                                id="phone"
                                type='number'
                                label={t('common:phone')}
                                defaultValue={phone}
                                variant="filled"
                              />
                          </div>
                    </div>
                    <div className={styles.formgroup1}>
                          <div className={styles.formwrapper1}>
                            <TextField
                              id="addressFacturation"
                              label={t('common:billing_address')}
                              defaultValue={addressFacturation}
                              variant="filled"
                              onChange={(e) => setaddressFacturation(e.target.value)}
                            />
                          </div>
                          <div className={styles.formwrapper1}>
                              <TextField
                                id="addressLivraison"
                                label={t('common:delivery_address')}
                                defaultValue={addressLivraison}
                                variant="filled"
                                onChange={(e) => setaddressLivraison(e.target.value)}
                            /> 
                          </div>
                    </div>
                    <div className={styles.formgroup1}>
                        <div className={styles.formwrapper1}>
                          <FormControl fullWidth>
                            <InputLabel id="civility_label">{t('common:Civility')}</InputLabel>
                            <Select
                              labelId="civility_label"
                              id="civility"
                              value={age}
                              label={t('common:Civility')}
                              onChange={(e) => setcivility(e.target.value)}
                            >
                              <MenuItem value={t('common:sir')}>Monsieur</MenuItem>
                              <MenuItem value={t('common:madam')}>Madame</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                    </div>
                    <div className={styles.formwrapper1}>
                      <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                        <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                        <FilledInput
                          id="filled-adornment-password"
                          type={isVisible ? 'text' : 'password'}
                          onChange={(e) => setPassword(e.target.value)}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setIsVisible(true)}
                                onMouseDown={() => setIsVisible(false)}
                                edge="end"
                              >
                                {isVisible ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
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
                      error && 
                        <div>
                            <p className={styles.popup_error_message}>
                              {/* <span>{t('common:updateform_error_msg')}</span> */}
                              <span>{error}</span> 
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