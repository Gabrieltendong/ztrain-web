import { FiX } from 'react-icons/fi';
import CreditCardInput from 'react-credit-card-input';
import styles from './style.module.scss'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HashLoader from "react-spinners/HashLoader";
import { createCommand } from '../../store/cart/actionCart';
import { CREATE_COMMANDE } from '../../store/cart/type';

const messageCardError = 'Numéro de carte invalide'

const CheckoutForm = ({isVisible, onClose}) => {

    const dispatch = useDispatch()
    const user_id = useSelector(state => state.auth?.login.data?.user?._id)
    const {isLoading, error} = useSelector(state => state.cart.command)
    const [cardNumber, setCardNumber]=useState()
    const [expiry, setExpiry]=useState('')
    const [cvc, setCVC]=useState()
    const [address, setAddress]=useState()
    const [cardError, setCardError] = useState('')
    const [addressError, setAddressError]= useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!cardNumber || cardNumber && cardNumber.replace(/ /g, "").length != 16){
            setCardError(messageCardError)
        }
        if(!address){
            setAddressError("Veuillez spécifier l'adresse de livraison")
        }
        if(address && cardNumber.replace(/ /g, "").length == 16 && expiry && cvc){
            const data = {
                user_id,
                address,
                card: {
                    number: parseInt(cardNumber.replace(/ /g, "")),
                    exp_month: parseInt(expiry.split('/')[0].trim()),
                    exp_year: parseInt(expiry.split('/')[1].trim()),
                    cvc
                }
            }
            
            dispatch(createCommand(JSON.stringify(data)))
        }
        
        // console.log('expiry', data)
    };

    const onBlurCardNumer = (e) => {
        console.log("onBlur", cardNumber.replace(/ /g, "").length)
        if(cardNumber.replace(/ /g, "").length == 15){
            setCardError('')
        }
    }

    useEffect(() => {

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
                    <div id={styles.card_input_wrapper}>
                        <CreditCardInput
                            onError = {(err) => console.log(err)}
                            cardNumberInputProps={{ 
                                value: cardNumber,
                                onBlur: onBlurCardNumer,
                                onChange: (e) => setCardNumber(e.target.value),
                                onError: (err) => setCardError(messageCardError)
                            }}
                            cardExpiryInputProps={{ value: expiry, onChange: (e) => setExpiry(e.target.value) }}
                            cardCVCInputProps={{ value: cvc, onChange: (e) => setCVC(e.target.value) }}
                            fieldClassName="input"
                        />
                    </div>
                    {/* {cardError && <p className={styles.errorMessage}>* {cardError}</p>} */}
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
