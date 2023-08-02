import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect } from 'react';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';


const CheckoutForm = ({ price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const{user} = useAuth();
    const[axiosSecure] = useAxiosSecure();
    const [cardError, setCardError]= useState('');
    const [clientSecret, setClientSecret]=useState('');
    useEffect(()=>{
      axiosSecure.post('/create-payment-intent',{price})
      .then(res=>{
        console.log(res.data.clientSecret)
        setClientSecret(res.data.clientSecret);
      })
    },[price, axiosSecure])
    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js has not loaded yet. Make sure to disable
          // form submission until Stripe.js has loaded.
          return;
        }
        const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const {error,paymentMethod}= await stripe.createPaymentMethod({
      type:'card',
      card
    })
    if(error){
      console.log('error',error)
      setCardError(error.message)
    }
    else{
      setCardError('')
      console.log('paymentMethod:', paymentMethod)
      
    }
    const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method:{
          card: card,
          billing_details:{
            email: user?.email||'anonymous',
            name: user?.displayName || 'Anonymous'
          },
        },
      },
    );
    if(confirmError){
      console.log(confirmError);
    }
    console.log(paymentIntent);
    }
    return (
        <>
        <form className=' w-2/3 m-8' onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className='btn btn-primary btn-sm mt-4' type="submit" 
      disabled={!stripe || !clientSecret}>
        Pay
      </button>
    </form>
    {
      cardError && <p className='text-red-600 ml-8'>{cardError}</p>
    }
        </>

    );
};

export default CheckoutForm;