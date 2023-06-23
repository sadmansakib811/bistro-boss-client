import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
// TODO: PROVIDE PUBLISHABLE KEY
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    return (
        <div>
           <SectionTitle subHeading="please process" heading="Payment">
            <h2>
                Process Payment
            </h2>
            </SectionTitle> 
           <Elements stripe={stripePromise}>
           <CheckoutForm></CheckoutForm>
           </Elements>
        </div>
    );
};

export default Payment;