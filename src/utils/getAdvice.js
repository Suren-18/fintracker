// utils/getAdvice.js
import axios from 'axios';

export async function getAdvice(transactions, balance) {
  try {
    const res = await axios.post('/api/advice', { transactions, balance });
    return res.data.advice;
  } catch {
    return "Could not fetch advice.";
  }
}
