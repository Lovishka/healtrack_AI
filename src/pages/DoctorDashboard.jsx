import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';

// Main component, all other components and logic are inside this single file.
const App = () => {
  const [message, setMessage] = useState('Yahan se shuru karen!');

  // Handle a click event
  const handleClick = () => {
    setMessage('Button par click kiya gaya!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Namaste, duniya!</h1>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          Click Karen
        </button>
      </div>
    </div>
  );
};

// This is the correct way to render the app using React 18's createRoot API.
// This is the part that usually causes the "Cannot read properties of undefined" error if done incorrectly.
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found in the document.');
}

export default App;
