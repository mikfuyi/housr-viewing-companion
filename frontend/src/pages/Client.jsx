import { useState } from 'react';
import { Home, Lock } from 'lucide-react';

function Client() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    if (value.length <= 6) {
      setCode(value);
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (code.length !== 6) {
      setError('Please enter a complete 6-digit code');
      return;
    }

    // Redirect to audio page with the code
    window.location.href = `/audio?code=${code}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
          <Home className="text-indigo-600" size={28} />
          <h1 className="text-2xl font-bold text-gray-800">Housr Viewing Companion</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mx-auto">
              <Lock className="text-indigo-600" size={40} />
            </div>
            
            {/* Title and Description */}
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-gray-800">
                Enter Property Code
              </h2>
              <p className="text-gray-600">
                Please enter the 6-digit code provided at the property to begin your personalized audio-guided tour
              </p>
            </div>

            {/* Code Input Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={code}
                  onChange={handleCodeChange}
                  placeholder="000000"
                  className="w-full text-center text-4xl font-bold tracking-widest py-4 px-6 border-2 border-gray-300 rounded-xl focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
                  autoFocus
                />
                <p className="text-sm text-gray-500 text-center mt-2">
                  {code.length}/6 digits
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={code.length !== 6}
                className={`w-full font-semibold py-4 px-8 rounded-xl transition-all duration-200 text-lg shadow-lg ${
                  code.length === 6
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Start Viewing Tour
              </button>
            </form>

            {/* Features */}
            <div className="border-t border-gray-200 pt-6 space-y-3">
              <p className="text-sm font-semibold text-gray-700 text-center">What you'll get:</p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-indigo-50 rounded-lg p-3 text-center">
                  <div className="font-semibold text-indigo-900 mb-1">📊 Property Info</div>
                  <div className="text-indigo-700">Bills & ratings</div>
                </div>
                <div className="bg-indigo-50 rounded-lg p-3 text-center">
                  <div className="font-semibold text-indigo-900 mb-1">🏘️ Area Insights</div>
                  <div className="text-indigo-700">Safety & amenities</div>
                </div>
                <div className="bg-indigo-50 rounded-lg p-3 text-center">
                  <div className="font-semibold text-indigo-900 mb-1">🎯 Personalized</div>
                  <div className="text-indigo-700">Tailored to you</div>
                </div>
                <div className="bg-indigo-50 rounded-lg p-3 text-center">
                  <div className="font-semibold text-indigo-900 mb-1">🎙️ Audio Guide</div>
                  <div className="text-indigo-700">Ask questions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 py-4">
        <p className="text-center text-gray-600 text-sm">
          Make informed decisions with Housr's AI-powered viewing companion
        </p>
      </div>
    </div>
  );
}

export default Client;