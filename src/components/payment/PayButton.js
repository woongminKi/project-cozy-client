import axios from 'axios';
import { useSelector } from 'react-redux';
import { url } from '../slices/api';

export default function PayButton() {
  function handleCheckout() {}

  return (
    <>
      <button onClick={() => handleCheckout}>Check Out</button>
    </>
  );
}
