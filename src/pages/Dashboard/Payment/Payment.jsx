import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../../hooks/useCart";
// TODO: PROVIDE PUBLISHABLE KEY
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    const [cart] = useCart();
    const total = cart.reduce((sum,item)=> sum + item.price,0);
    const price = parseFloat(total.toFixed(2))
    return (
        <div>
           <SectionTitle subHeading="please process" heading="Payment">
            <h2>
                Process Payment
            </h2>
            </SectionTitle> 
           <Elements stripe={stripePromise}>
           <CheckoutForm price={price}></CheckoutForm>
           </Elements>
        </div>
    );
};

export default Payment;