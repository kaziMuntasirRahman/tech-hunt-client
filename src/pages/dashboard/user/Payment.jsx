import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOut from "./CheckOut";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
const Payment = () => {
  const loading = false;
  return (
    <div className="relative flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      {loading && (
        <div className="absolute inset-0 bg-slate-700/30 flex items-center justify-center z-50">
          <span className="loader scale-200"></span>
        </div>
      )}
      <h1 className="text-center text-2xl mb-10">Payment</h1>
      <h1 className="text-center text-lg mb-16">Pay 399 USD to Subscribe</h1>

      <Elements stripe={stripePromise}>
        <CheckOut />
      </Elements>
    </div>
  );
};

export default Payment;