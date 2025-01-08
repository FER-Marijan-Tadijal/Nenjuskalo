import {useState} from 'react';
import {useStripe, useElements} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        try {
            const {data: {sessionId}} = await fetch(`/api/createCheckoutSession`, {
                method: "POST",
                body: JSON.stringify({priceId: 'your_product_price_id'}), // TODO: Replace with your actual price ID
            });

            const result = await stripe.redirectToCheckout({
                sessionId,
            });

            if (result.error) {
                console.error(result.error.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Pay Now'}
            </button>
        </form>
    );
};

export default CheckoutForm;