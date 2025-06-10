import { useState, useEffect } from 'react';
import Link from 'next/link';

// Component 1: Hero Section with Animation
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate hero section on mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`text-center py-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <h1 className="text-5xl font-bold text-gray-800 mb-6">
        Frack Your Finances — Hands-Free!
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Introducing voice-powered finance tracking. Just speak and your transactions are recorded!
      </p>
      <Link href="/login">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-300">
          Get Started
        </button>
      </Link>
    </div>
  );
};

// Component 2: Features Section with Interactive Cards
const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    // Load features data
    const featuresData = [
      {
        id: 1,
        icon: '🎙',
        title: 'Voice Command Logging',
        description: 'Add income or expenses just by speaking. Fast, easy, and hands-free!',
        details: 'Our advanced voice recognition technology understands natural language commands.'
      },
      {
        id: 2,
        icon: '📊',
        title: 'Real-Time Dashboard',
        description: 'Track your spending habits and get visual insights instantly.',
        details: 'Beautiful charts and graphs update in real-time as you add transactions.'
      },
      {
        id: 3,
        icon: '🔒',
        title: 'Secure and Simple',
        description: 'Your data is safe and easy to manage in your own personal dashboard.',
        details: 'Bank-level encryption ensures your financial data remains private and secure.'
      }
    ];

    setFeatures(featuresData);
  }, []);

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Choose FinTrack?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`bg-white p-6 rounded-lg shadow-md cursor-pointer transition-all duration-300 ${
                activeFeature === feature.id ? 'scale-105 shadow-lg' : 'hover:shadow-lg'
              }`}
              onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              {activeFeature === feature.id && (
                <div className="mt-4 p-4 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-800">{feature.details}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Component 3: How It Works Section with Step Counter
const HowItWorksSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    // Initialize steps data
    const stepsData = [
      {
        id: 1,
        title: 'Create Account',
        description: 'Secure login with email/password',
        icon: '👤'
      },
      {
        id: 2,
        title: 'Speak or Type',
        description: 'Say "Add ₹500 for groceries" or use the form',
        icon: '🎤'
      },
      {
        id: 3,
        title: 'Get Reports',
        description: 'Visualize your finances instantly',
        icon: '📈'
      }
    ];

    setSteps(stepsData);
  }, []);

  useEffect(() => {
    // Auto-advance steps every 3 seconds
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex flex-col items-center text-center p-6 rounded-lg transition-all duration-500 ${
                currentStep === index 
                  ? 'bg-blue-100 shadow-lg scale-110' 
                  : 'bg-white shadow-md'
              }`}
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <div className="text-lg font-semibold mb-2 text-gray-800">
                {step.id}. {step.title}
              </div>
              <p className="text-gray-600 max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8 space-x-2">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentStep === index ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Homepage Component
export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Page load animation
    setIsLoaded(true);
    
    // Set page title
    document.title = 'FinTrack - Voice-Powered Finance Tracking';
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">FinTrack</div>
            <Link href="/login">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300">
                Login
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Voice Feature CTA */}
      <div className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">🎙 Voice Feature is Here!</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Use your voice to add transactions while you're driving, cooking, or on the move.
        </p>
        <Link href="/login">
          <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-300">
            Try Voice Logging Now
          </button>
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 FinTrack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}