import React, { useState, useEffect } from 'react';
import QuoteCard from './components/QuoteCard';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage';
import './App.css';

function App() {
  const [quote, setQuote] = useState({ content: '', author: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://dummyjson.com/quotes/random');
      if (!response.ok) throw new Error(`Status: ${response.status}`);
      
      const data = await response.json();
      if (data && data.quote) {
        setQuote({ content: data.quote, author: data.author });
      }
    } catch (err) {
      setError("Failed to catch a quote. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="container">
      <header className="app-header">
        <h1>Quote of the Moment</h1>
      </header>

      <main className="content-area">
        {loading && <Loader />}

        {error && !loading && (
          <div className="error-wrapper">
            <ErrorMessage message={error} />
            <button className="refresh-btn" onClick={fetchQuote}>Try Again</button>
          </div>
        )}

        {!loading && !error && (
          <div className="quote-wrapper">
            <QuoteCard quote={quote} />
            
            <button 
              className="refresh-btn" 
              onClick={fetchQuote} 
              disabled={loading}
            >
              {loading ? 'Fetching...' : 'New Quote'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;