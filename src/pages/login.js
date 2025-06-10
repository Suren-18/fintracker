import { useState, useEffect } from 'react';
import Link from 'next/link';

// Component 1: Login Form with Validation
const LoginForm = ({ onLogin, isLoading }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Clear errors when user starts typing
    if (formData.email || formData.password) {
      setErrors({});
    }
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    onLogin(formData);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter your email"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors duration-300 ${
          isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
};

// Component 2: Welcome Message with Animation
const WelcomeMessage = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const messages = [
    "Welcome back to FinTrack! 👋",
    "Ready to track your finances? 💰",
    "Your voice-powered dashboard awaits! 🎙️"
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Cycle through welcome messages
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`text-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        {messages[currentMessage]}
      </h1>
      <p className="text-gray-600">
        Sign in to access your personal finance dashboard
      </p>
    </div>
  );
};

// Component 3: Login Stats/Features Sidebar
const LoginFeatures = () => {
  const [stats, setStats] = useState({
    users: 0,
    transactions: 0,
    saved: 0
  });
  const [featuresVisible, setFeaturesVisible] = useState(false);

  useEffect(() => {
    // Animate stats counter
    setFeaturesVisible(true);
    
    const finalStats = { users: 1250, transactions: 15000, saved: 50000 };
    const duration = 2000; // 2 seconds
    const steps = 50;
    const stepDuration = duration / steps;

    const counters = Object.keys(finalStats).map(key => {
      const increment = finalStats[key] / steps;
      let currentValue = 0;
      
      return setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalStats[key]) {
          currentValue = finalStats[key];
          clearInterval(counters.find(c => c === counters[Object.keys(finalStats).indexOf(key)]));
        }
        setStats(prev => ({
          ...prev,
          [key]: Math.floor(currentValue)
        }));
      }, stepDuration);
    });

    return () => counters.forEach(clearInterval);
  }, []);

  const features = [
    { icon: '🎤', text: 'Voice-powered logging' },
    { icon: '📱', text: 'Mobile-friendly design' },
    { icon: '🔐', text: 'Secure & encrypted' },
    { icon: '📊', text: 'Real-time analytics' }
  ];

  return (
    <div className={`transition-all duration-1000 ${featuresVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
      {/* Stats */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-4">Join Our Community</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Active Users:</span>
            <span className="font-bold">{stats.users.toLocaleString()}+</span>
          </div>
          <div className="flex justify-between">
            <span>Transactions Logged:</span>
            <span className="font-bold">{stats.transactions.toLocaleString()}+</span>
          </div>
          <div className="flex justify-between">
            <span>Money Saved:</span>
            <span className="font-bold">₹{stats.saved.toLocaleString()}+</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Why Choose FinTrack?</h3>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <span className="text-2xl">{feature.icon}</span>
              <span className="text-gray-700">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Login Component
export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    // Page load animation
    setPageLoaded(true);
    document.title = 'Login - FinTrack';
  }, []);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful login
      setLoginSuccess(true);
      
      // Redirect to dashboard after success message
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
      
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loginSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-green-800 mb-2">Login Successful!</h1>
          <p className="text-green-600">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 transition-opacity duration-1000 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <button className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                FinTrack
              </button>
            </Link>
            <Link href="/">
              <button className="text-gray-600 hover:text-gray-800 transition-colors">
                ← Back to Home
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Login Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <WelcomeMessage />
              <LoginForm onLogin={handleLogin} isLoading={isLoading} />
              
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <button className="text-blue-500 hover:text-blue-600 font-semibold">
                    Sign up here
                  </button>
                </p>
              </div>
            </div>

            {/* Right Column - Features */}
            <div className="hidden md:block">
              <LoginFeatures />
            </div>
          </div>
        </div>
      </div>

      {/* Demo Credentials */}
      <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 rounded-lg p-4 max-w-sm">
        <h4 className="font-semibold text-yellow-800 mb-2">Demo Credentials:</h4>
        <p className="text-sm text-yellow-700">
          Email: demo@fintrack.com<br />
          Password: demo123
        </p>
      </div>
    </div>
  );
}