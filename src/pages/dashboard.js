// pages/dashboard.js
import Head from 'next/head';
import Layout from '@/components/layout';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Simulate data fetching (you can replace this with real API logic)
    const fetchData = () => {
      const fetchedIncome = 25000;
      const fetchedExpenses = 15500;
      setIncome(fetchedIncome);
      setExpenses(fetchedExpenses);
      setBalance(fetchedIncome - fetchedExpenses);
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Dashboard - FinTrack</title>
      </Head>

      {/* Page Background */}
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-6 text-white">
        <h1 className="text-3xl font-bold mb-6">👋 Welcome to Your Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white text-black p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg font-semibold">Total Income</h2>
            <p className="text-2xl font-bold text-green-600 mt-2">₹{income.toLocaleString()}</p>
          </div>
          <div className="bg-white text-black p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg font-semibold">Total Expenses</h2>
            <p className="text-2xl font-bold text-red-500 mt-2">₹{expenses.toLocaleString()}</p>
          </div>
          <div className="bg-white text-black p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg font-semibold">Balance</h2>
            <p className="text-2xl font-bold text-blue-600 mt-2">₹{balance.toLocaleString()}</p>
          </div>
        </div>

        {/* Chart/Graph Section */}
        <div className="bg-white text-black p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">📊 Monthly Overview</h2>
          <div className="h-64 flex items-center justify-center border border-dashed border-gray-300 rounded">
            {/* Replace this with real Chart.js or Recharts component later */}
            <p className="text-gray-500">[Graph will appear here]</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
