// product-list-frontend/app/components/Pagination.js

import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Function to generate pagination buttons with page numbers
  const generatePageButtons = (currentPage, totalPages) => {
    const newButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === currentPage) {
        newButtons.push(
          <button key={i} className='btn btn-secondary' onClick={() => onPageChange(i)}>{i}</button>
        );
      } else {
        newButtons.push(
          <button key={i} className='btn btn-primary' onClick={() => onPageChange(i)}>{i}</button>
        );
      }
    }
    return newButtons;
  };

  // Render pagination buttons with page numbers
  return (
    <nav className="pagination-container">
      <div className="current-page-info">
        Page {currentPage} of {totalPages}
      </div>
      <ul className="pagination">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`btn btn-secondary pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
        >
          Prev
        </button>

        {/* Page buttons with numbers */}
        {generatePageButtons(currentPage, totalPages)}

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`btn btn-secondary pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
        >
          Next
        </button>
      </ul>
    </nav>
  );
};

export default Pagination;

