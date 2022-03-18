import { FiX } from 'react-icons/fi';
import CreditCardInput from 'react-credit-card-input';
import styles from './style.module.scss'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HashLoader from "react-spinners/HashLoader";
import { createCommand } from '../../store/cart/actionCart';
import { CREATE_COMMANDE } from '../../store/cart/type';

const CheckoutForm = ({isVisible, onClose}) => {

    const dispatch = useDispatch()
    const user_id = useSelector(state => state.auth?.login.data?.user?._id)
    const {isLoading, error} = useSelector(state => state.cart.command)
    const [cardNumber, setCardNumber]=useState()
    const [expiry, setExpiry]=useState('')
    const [cvc, setCVC]=useState()
    const [address, setAddress]=useState()
    const [err, setError] = useState({
        address: '',
        card: ''
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(!cardNumber || cardNumber && cardNumber.replace(/ /g, "").length != 16){
            setError({
                ...err,
                card: 'Numéro de carte invalide',
                address: ''
            })
        }
        if(!address){
            setError({
                ...err,
                address: "Veuillez spécifier l'adresse de livraison",
                card: ''
            })
        }
        if(address && cardNumber && expiry && cvc){
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

    useEffect(() => {

        return() => {
            dispatch({
                type: `${CREATE_COMMANDE}_FAIL`,
                error: ''
            })
        }
    }, [error, address])

    return (
        <div id={isVisible?styles.showcheckout:styles.hidecheckout}>
            <main  id={styles.checkout_wrapper}>
                <button id={styles.btn_close} onClick={onClose}>
                    <FiX />
                </button>
                <h1>Valider votre commande</h1>
                <form onSubmit={handleSubmit} id={styles.form_wrapper} >
                    <CreditCardInput
                        onError = {(err) => console.log(err)}
                        cardNumberInputProps={{ value: cardNumber, onChange: (e) => setCardNumber(e.target.value) }}
                        cardExpiryInputProps={{ value: expiry, onChange: (e) => setExpiry(e.target.value) }}
                        cardCVCInputProps={{ value: cvc, onChange: (e) => setCVC(e.target.value) }}
                        fieldClassName="input"
                    />
                    <input 
                        type="text" 
                        id={styles.input_address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='Votre adresse de livraison'
                    />
                    {err.address && <p className={styles.errorMessage}>* {err.address}</p>}
                    {err.card && <p className={styles.errorMessage}>* {err.card}</p>}
                    {error && <p className={styles.errorMessage}>* {error}</p>}
                    <button
                        id={styles.btnSubmit}
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
