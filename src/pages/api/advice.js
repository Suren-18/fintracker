// pages/api/advice.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { transactions, balance } = req.body;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You're a financial advisor. Based on user's balance and transactions, give one short, practical financial tip.",
          },
          {
            role: "user",
            content: `My balance is ₹${balance}. My transactions are: ${JSON.stringify(transactions)}. Give me a financial tip.`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json({ advice: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Advice API Error:", error.message);
    res.status(500).json({ advice: "Could not fetch advice." });
  }
}
