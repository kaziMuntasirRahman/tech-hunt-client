import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useGetStatus from "../../../hooks/useGetStatus";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const stripe = useStripe()
  const elements = useElements()
  const axiosSecure = useAxiosSecure()
  const { userInfo } = useGetStatus()
  const navigate = useNavigate()

  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
    const paymentIntent = async () => {
      const response = await axiosSecure.post('create-payment-intent', { price: 399 })
      console.log(response.data.clientSecret)
      setClientSecret(response.data.clientSecret)
    }
    paymentIntent()
  }, [axiosSecure])

  const handleCheckOut = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // stripe.js has not loaded yet. make sure to disable
      // form submission until stripe.js has loaded
      return
    }

    const card = elements.getElement(CardElement)
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card', card
    })

    if (error) {
      console.log(error)
    } else {
      console.log("Payment Method: ", paymentMethod)
    }

    // confirm payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: userInfo.name || 'Anonymous',
          email: userInfo.email || 'Anonymous'
        }
      }
    })

    if (confirmError) {
      console.log("Confirm error: ", confirmError)
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: "Payment Operation Failed",
        showConfirmButton: true,
        footer: "Please try again later.",
        timer: 2000
      })
    } else {
      console.log("Payment Intent:", paymentIntent)
      if (paymentIntent.status === 'succeeded') {
        const paymentInfo = { email: userInfo.email, amount: paymentIntent.amount, payment_id: paymentIntent.id }
        const response = await axiosSecure.post('/payments', paymentInfo)
        console.log(response.data)
        const audio = new Audio('/assets/sound/success-1.mp3')
        audio.play()
        navigate('/dashboard')
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Payment Successful",
          showConfirmButton: true,
          footer: "Wait until authority verify the subscription.",
          timer: 2000
        })
      }
    }

  }


  return (
    <form onSubmit={handleCheckOut} className="flex flex-col min-w-3xl ">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: 'black'
              },
            },
            invalid: {
              color: '#9e2146'
            }
          }
        }}
      >

      </CardElement>
      <button className="btn btn-primary btn-wide mx-auto mt-16" type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
};

export default CheckOut;