import React from 'react';

const QuoteCard = ({ quote, onRefresh, isLoading }) => {
  return (
    <div className="quote-card">
      {/* <h2 className="card-subtitle">Daily Wisdom</h2> */}

      <div className="quote-body">
        <p className="quote-text">"{quote.content}"</p>
        <p className="quote-author">— {quote.author}</p>
      </div>

    </div>
  );
};

export default QuoteCard;