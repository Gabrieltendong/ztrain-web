import { FiX } from 'react-icons/fi';
import CreditCardInput from 'react-credit-card-input';
import styles from './style.module.scss'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HashLoader from "react-spinners/HashLoader";
import { createCommand, get_shipping_method_list } from '../../store/cart/actionCart';
import { CREATE_COMMANDE } from '../../store/cart/type';

const messageCardError = 'Numéro de carte invalide'

const CheckoutForm = ({isVisible, onClose}) => {

    const dispatch = useDispatch()
    const user_id = useSelector(state => state.auth?.login.data?.user?._id)
    const {isLoading, error} = useSelector(state => state.cart.command)
    const list_shipping_method = useSelector(({cart}) => cart.list_shipping_method.data)
    const [cardNumber, setCardNumber]=useState()
    const [expiry, setExpiry]=useState('')
    const [cvc, setCVC]=useState()
    const [address, setAddress]=useState()
    const [cardError, setCardError] = useState('')
    const [addressError, setAddressError]= useState('')
    const [shipping_method, setShipping_method]= useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!cardNumber || cardNumber && cardNumber.replace(/ /g, "").length != 16){
            setCardError(messageCardError)
        }
        if(!address){
            setAddressError("Veuillez spécifier l'adresse de livraison")
        }
        if(!shipping_method){
            setAddressError("Veuillez spécifier la methode de livraison")
        }
        if(address && cardNumber.replace(/ /g, "").length == 16 && expiry && cvc){
            const data = {
                user_id,
                address,
                shipping_method,
                card: {
                    number: parseInt(cardNumber.replace(/ /g, "")),
                    exp_month: parseInt(expiry.split('/')[0].trim()),
                    exp_year: parseInt(expiry.split('/')[1].trim()),
                    cvc
                }
            }
            console.log("data", data)
            dispatch(createCommand(JSON.stringify(data)))
        }
    };

    const onBlurCardNumer = (e) => {
        if(cardNumber.replace(/ /g, "").length == 15){
            setCardError('')
        }
    }

    useEffect(() => {
        dispatch(get_shipping_method_list())
        return() => {
            dispatch({
                type: `${CREATE_COMMANDE}_FAIL`,
                error: ''
            })
        }
    }, [])

    return (
        <div id={isVisible?styles.showcheckout:styles.hidecheckout}>
            <main  id={styles.checkout_wrapper}>
                <button id={styles.btn_close} onClick={onClose}>
                    <FiX />
                </button>
                <h1>Valider votre commande</h1>
                <form onSubmit={handleSubmit} id={styles.form_wrapper} >
                    <div id={styles.shipping_method_wrapper}>
                        <h4>Choisir une methode de livraison</h4>
                        {
                            list_shipping_method.length != 0 &&
                            list_shipping_method.map((item, index) => (
                                <div key={index} className={styles.radio_button_group}>
                                    <input 
                                        type="radio" 
                                        value={item._id} 
                                        name="shipping_method"
                                        onChange={(e) => setShipping_method(e.target.value)} 
                                    />
                                    <span>{item.designation}</span>
                                </div>
                            ))
                        }
                    </div>
                    <div id={styles.card_input_wrapper}>
                        <h4>Vos informations bancaire</h4>
                        <CreditCardInput
                            customTextLabels={{
                                invalidCardNumber: " "
                            }}
                            cardNumberInputProps={{ 
                                value: cardNumber,
                                onBlur: onBlurCardNumer,
                                onChange: (e) => setCardNumber(e.target.value),
                                // onError: (err) => setCardError(messageCardError)
                            }}
                            cardExpiryInputProps={{ value: expiry, onChange: (e) => setExpiry(e.target.value) }}
                            cardCVCInputProps={{ value: cvc, onChange: (e) => setCVC(e.target.value) }}
                            fieldClassName="input"
                        />
                    </div>
                    {cardError && <p className={styles.errorMessage}>* {cardError}</p>}
                    <input 
                        type="text" 
                        id={styles.input_address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='Votre adresse de livraison'
                    />
                    {addressError && <p className={styles.errorMessage}>* {addressError}</p>}
                    {error && <p className={styles.errorMessage}>* {error}</p>}
                    <button
                        id={styles.btnSubmit}
                        disabled={cardError?true:false}
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
                            'Valider'
                        }
                    </button>
                </form>
            </main>
        </div>
    );
}

export default CheckoutForm;
