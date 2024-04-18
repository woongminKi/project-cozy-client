// import React, { useEffect, useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import CheckoutForm from './CheckoutForm';

// export default function Checkout() {
//   const stripePromise = loadStripe(
//     process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
//   );

//   // const options = {
//   //   mode: 'payment',
//   //   amount: 1200,
//   //   currency: 'krw',
//   //   // Fully customizable with appearance API.
//   //   appearance: {
//   //     /*...*/
//   //   },
//   // };
//   // return (
//   //   <div className='flex container mt-8'>
//   //     <Elements stripe={stripePromise}>
//   //       <CheckoutForm />
//   //     </Elements>
//   //   </div>
//   // );

//   const [quantity, setQuantity] = useState(1);
//   const [amount, setAmount] = useState(0);
//   const [currency, setCurrency] = useState('USD');

//   const formatPrice = ({ amount, currency, quantity }) => {
//     const numberFormat = new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency,
//       currencyDisplay: 'symbol',
//     });
//     const parts = numberFormat.formatToParts(amount);
//     let zeroDecimalCurrency = true;
//     for (let part of parts) {
//       if (part.type === 'decimal') {
//         zeroDecimalCurrency = false;
//       }
//     }
//     amount = zeroDecimalCurrency ? amount : amount / 100;
//     const total = (quantity * amount).toFixed(2);
//     return numberFormat.format(total);
//   };

//   useEffect(() => {
//     async function fetchConfig() {
//       // Fetch config from our backend.
//       const { unitAmount, currency } = await fetch(
//         `${process.env.REACT_APP_SERVER_URL}/config`
//       ).then((r) => r.json());
//       console.log('test???', unitAmount, currency);
//       setAmount(unitAmount);
//       setCurrency(currency);
//     }
//     fetchConfig();
//   }, []);

//   return (
//     <div className='sr-root' style={{ marginTop: '80px' }}>
//       <div className='sr-main'>
//         <section className='container'>
//           <div>
//             <h1>후원해주신 그 마음으로 열심히 성장하는 개발자가 되겠습니다.</h1>
//             <h4>고맙습니다.</h4>
//           </div>
//           <form action='/create-checkout-session' method='POST'>
//             <button role='link' id='submit' type='submit'>
//               Buy {formatPrice({ amount, currency, quantity })}
//             </button>
//           </form>
//         </section>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export default function Checkout({ supportItem }) {
  const location = useLocation();
  const [clientSecret, setClientSecret] = useState('');
  console.log(location.state);

  // useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   fetch(`${process.env.REACT_APP_SERVER_URL}/create-payment-intent`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.clientSecret));
  // }, []);

  // const appearance = {
  //   theme: 'stripe',
  // };
  // const options = {
  //   clientSecret,
  //   appearance,
  // };

  // return (
  //   <div className='App' style={{ marginTop: '80px' }}>
  //     {clientSecret && (
  //       <Elements options={options} stripe={stripePromise}>
  //         <CheckoutForm />
  //       </Elements>
  //     )}
  //   </div>
  // );
}
