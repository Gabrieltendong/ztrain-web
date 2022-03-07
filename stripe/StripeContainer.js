import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe('pk_test_51IXWRdEwEvnp4vKjxmqVjh9BDJ2D6Q1CkIqZ9k867Pf0qtNogX2oobbRs0VyhP7EebhTQulY3tvDbQN15ECHFEm300daCvEjOj');

const Stripecontainer = ({isVisible, onClose}) => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm 
                isVisible={isVisible}
                onClose = {onClose}
            />
        </Elements>
    );
}

export default Stripecontainer;
