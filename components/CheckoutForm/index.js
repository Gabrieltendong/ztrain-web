import { FiX } from 'react-icons/fi';
import CreditCardInput from 'react-credit-card-input';
import styles from './style.module.scss'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCommand } from '../../store/cart/actionCart';

const CheckoutForm = ({isVisible, onClose}) => {

    const dispatch = useDispatch()
    const user_id = useSelector(state => state.auth?.login.data?.user?._id)
    const [cardNumber, setCardNumber]=useState()
    const [expiry, setExpiry]=useState('')
    const [cvc, setCVC]=useState()
    const [address, setAddress]=useState()


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            user_id,
            address,
            card: {
                number: 42424242424242,
                exp_month: 2,
                exp_year: 2023,
                cvc
            }
        }
        dispatch(createCommand(JSON.stringify(data)))
        console.log('data', data)
    };

    return (
        <div id={isVisible?styles.showcheckout:styles.hidecheckout}>
            <main  id={styles.checkout_wrapper}>
                <button id={styles.btn_close} onClick={onClose}>
                    <FiX />
                </button>
                <h1>Valider votre commande</h1>
                <form onSubmit={handleSubmit} id={styles.form_wrapper} >
                    <CreditCardInput
                        cardNumberInputProps={{ value: cardNumber, onChange: (e) => setCardNumber(e.target.value) }}
                        cardExpiryInputProps={{ value: expiry, onChange: (e) => setExpiry(e.target.value) }}
                        cardCVCInputProps={{ value: cvc, onChange: (e) => setCVC(e.target.value) }}
                        fieldClassName="input"
                    />
                    <input 
                        type="text" 
                        id={styles.input_address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder='Votre adresse de llivraison'
                    />
                    <button id={styles.btnSubmit}>Valider</button>
                </form>
            </main>
        </div>
    );
}

export default CheckoutForm;
