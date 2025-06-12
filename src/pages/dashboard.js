import Head from 'next/head';
import Layout from '@/components/layout';
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { getAdvice } from '@/utils/getAdvice';

const Dashboard = () => {
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [incomeAmount, setIncomeAmount] = useState('');
  const [incomeCategory, setIncomeCategory] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [categoryColor, setCategoryColor] = useState('#8884d8');
  const [balance, setBalance] = useState(0);
  const [advice, setAdvice] = useState('');
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const totalIncome = incomeList.reduce((sum, item) => sum + parseFloat(item.amount), 0);
    const totalExpenses = expenseList.reduce((sum, item) => sum + parseFloat(item.amount), 0);
    setBalance(totalIncome - totalExpenses);

    // Fetch advice
    getAdvice({ income: totalIncome, expenses: totalExpenses, balance: totalIncome - totalExpenses })
      .then((res) => setAdvice(res))
      .catch(() => setAdvice('Unable to fetch advice right now.'));
  }, [incomeList, expenseList]);

  const handleAddIncome = () => {
    if (incomeAmount && incomeCategory) {
      setIncomeList([...incomeList, { amount: incomeAmount, category: incomeCategory }]);
      setIncomeAmount('');
      setIncomeCategory('');
    }
  };

  const handleAddExpense = () => {
    if (expenseAmount && expenseCategory && categoryColor) {
      setExpenseList([
        ...expenseList,
        { amount: expenseAmount, category: expenseCategory, color: categoryColor },
      ]);
      setExpenseAmount('');
      setExpenseCategory('');
      setCategoryColor('#8884d8');
    }
  };

  const handleDeleteIncome = (index) => {
    const updated = [...incomeList];
    updated.splice(index, 1);
    setIncomeList(updated);
  };

  const handleDeleteExpense = (index) => {
    const updated = [...expenseList];
    updated.splice(index, 1);
    setExpenseList(updated);
  };

  return (
    <Layout>
      <Head>
        <title>Dashboard - FinTrack</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-6 text-white">
        <h1 className="text-3xl font-bold mb-4">👋 Welcome to Your Dashboard</h1>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-6">
          {['home', 'income', 'expense'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSection(tab)}
              className={`px-4 py-2 rounded font-medium ${
                activeSection === tab ? 'bg-white text-black' : 'bg-black bg-opacity-20'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Summary Cards */}
        {activeSection === 'home' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white text-black p-6 rounded-2xl shadow-lg">
                <h2 className="text-lg font-semibold">Total Income</h2>
                <p className="text-2xl font-bold text-green-600 mt-2">
                  ₹{incomeList.reduce((sum, item) => sum + parseFloat(item.amount), 0)}
                </p>
              </div>
              <div className="bg-white text-black p-6 rounded-2xl shadow-lg">
                <h2 className="text-lg font-semibold">Total Expenses</h2>
                <p className="text-2xl font-bold text-red-500 mt-2">
                  ₹{expenseList.reduce((sum, item) => sum + parseFloat(item.amount), 0)}
                </p>
              </div>
              <div className="bg-white text-black p-6 rounded-2xl shadow-lg">
                <h2 className="text-lg font-semibold">Balance</h2>
                <p className="text-2xl font-bold text-blue-600 mt-2">₹{balance}</p>
              </div>
            </div>

            {/* Advice Section */}
            <div className="bg-white text-black p-6 rounded-2xl shadow-lg mb-6">
              <h2 className="text-xl font-semibold mb-2">📘 Financial Advice</h2>
              <p>{advice}</p>
            </div>
          </>
        )}

        {/* Income Section */}
        {activeSection === 'income' && (
          <div className="bg-white text-black p-6 rounded-2xl shadow-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">➕ Add Income</h2>
            <div className="flex gap-4 mb-4">
              <input
                type="number"
                placeholder="Amount"
                className="p-2 border rounded w-1/3"
                value={incomeAmount}
                onChange={(e) => setIncomeAmount(e.target.value)}
              />
              <input
                type="text"
                placeholder="Category"
                className="p-2 border rounded w-1/3"
                value={incomeCategory}
                onChange={(e) => setIncomeCategory(e.target.value)}
              />
              <button onClick={handleAddIncome} className="bg-blue-600 text-white px-4 py-2 rounded">
                Add
              </button>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-2">Amount</th>
                  <th className="border-b p-2">Category</th>
                  <th className="border-b p-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {incomeList.map((item, i) => (
                  <tr key={i}>
                    <td className="border-b p-2">₹{item.amount}</td>
                    <td className="border-b p-2">{item.category}</td>
                    <td className="border-b p-2">
                      <button onClick={() => handleDeleteIncome(i)} className="text-red-500">
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Expense Section */}
        {activeSection === 'expense' && (
          <div className="bg-white text-black p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">➖ Add Expense</h2>
            <div className="flex gap-4 mb-4">
              <input
                type="number"
                placeholder="Amount"
                className="p-2 border rounded w-1/4"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
              />
              <input
                type="text"
                placeholder="Category"
                className="p-2 border rounded w-1/4"
                value={expenseCategory}
                onChange={(e) => setExpenseCategory(e.target.value)}
              />
              <input
                type="color"
                value={categoryColor}
                onChange={(e) => setCategoryColor(e.target.value)}
                className="w-12 h-12 p-1"
              />
              <button onClick={handleAddExpense} className="bg-red-500 text-white px-4 py-2 rounded">
                Add
              </button>
            </div>
            <table className="w-full text-left border-collapse mb-6">
              <thead>
                <tr>
                  <th className="border-b p-2">Amount</th>
                  <th className="border-b p-2">Category</th>
                  <th className="border-b p-2">Color</th>
                  <th className="border-b p-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {expenseList.map((item, i) => (
                  <tr key={i}>
                    <td className="border-b p-2">₹{item.amount}</td>
                    <td className="border-b p-2">{item.category}</td>
                    <td className="border-b p-2">
                      <div style={{ backgroundColor: item.color, width: 20, height: 20 }}></div>
                    </td>
                    <td className="border-b p-2">
                      <button onClick={() => handleDeleteExpense(i)} className="text-red-500">
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pie Chart */}
            <h3 className="text-lg font-semibold mb-2">📊 Spending by Category</h3>
            <PieChart width={350} height={250}>
              <Pie
                data={expenseList.map((e) => ({
                  name: e.category,
                  value: parseFloat(e.amount),
                  fill: e.color,
                }))}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={72} // Reduced size
                label
              >
                {expenseList.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
