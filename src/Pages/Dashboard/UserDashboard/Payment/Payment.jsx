import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./ÇheckoutForm";

const stripePromise = loadStripe(
  import.meta.env.VITE_PAYMENT_PUBLISHABLE_KEY_PK
);
const Payment = ({camp,onPaymentSuccess}) => {
    console.log('boss', camp);
  return (
    <div>
      <h2 className="text-xl font-bold text-center">Payment</h2>

      <Elements stripe={stripePromise}>
        <CheckoutForm camp={camp} onPaymentSuccess={onPaymentSuccess}  />
      </Elements>
    </div>
  );
};

export default Payment;
