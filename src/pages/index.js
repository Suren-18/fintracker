// pages/index.js
import Head from 'next/head';
import Layout from '@/components/layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>FinTrack - Voice Powered Finance Tracker</title>
        <meta name="description" content="Track income and expenses using voice commands. Simple, powerful finance tracking." />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white text-center py-20 px-6">
        <h1 className="text-5xl font-bold mb-4">Frack Your Finances — Hands-Free!</h1>
        <p className="text-xl mb-6 max-w-2xl mx-auto">
          Introducing <strong className="underline text-yellow-300">voice-powered finance tracking</strong>.
          Just speak and your transactions are recorded!
        </p>
        <a href="/login" className="bg-white text-blue-700 font-semibold py-3 px-6 rounded-full shadow hover:bg-gray-100 transition">
          Get Started
        </a>
      </section>

      {/* Features Section */}
      <section className="bg-white text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-10">Why Choose FinTrack?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 border rounded-lg shadow hover:shadow-xl bg-yellow-50">
            <h3 className="text-xl font-bold text-yellow-600 mb-2">🎙 Voice Command Logging</h3>
            <p className="text-gray-700">Add income or expenses just by speaking. Fast, easy, and hands-free!</p>
          </div>
          <div className="p-6 border rounded-lg shadow hover:shadow-xl">
            <h3 className="text-xl font-bold mb-2">📊 Real-Time Dashboard</h3>
            <p className="text-gray-700">Track your spending habits and get visual insights instantly.</p>
          </div>
          <div className="p-6 border rounded-lg shadow hover:shadow-xl">
            <h3 className="text-xl font-bold mb-2">🔒 Secure and Simple</h3>
            <p className="text-gray-700">Your data is safe and easy to manage in your own personal dashboard.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div>
            <h3 className="font-bold text-xl mb-2">1. Create Account</h3>
            <p>Secure login with email/password</p>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-2">2. Speak or Type</h3>
            <p>Say "Add ₹500 for groceries" or use the form</p>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-2">3. Get Reports</h3>
            <p>Visualize your finances instantly</p>
          </div>
        </div>
      </section>

      {/* Voice Feature Shoutout */}
      <section className="bg-black text-yellow-300 text-center py-16 px-6">
        <h2 className="text-4xl font-bold mb-4">🎙 Voice Feature is Here!</h2>
        <p className="text-xl max-w-2xl mx-auto mb-6">Use your voice to add transactions while you're driving, cooking, or on the move.</p>
        <a href="/login" className="bg-yellow-300 text-black font-bold py-3 px-6 rounded-full hover:bg-yellow-400 transition">
          Try Voice Logging Now
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6">
        <p className="mb-1">&copy; 2025 FinTrack — Built with ❤️ using Next.js</p>
        <p className="text-sm">Track smarter. Speak smarter.</p>
      </footer>
    </Layout>
  );
}