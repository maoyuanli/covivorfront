import React from 'react';

// @ts-ignore
function Pagination({itemsPerPage, totalItems, paginate, onClickNext, onClickPrev}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div style={{textAlign: 'center'}}>
            <nav style={{display: 'inline-block'}}>
                <ul className="pagination">
                    <li className="page-item">
                        <a onClick={onClickPrev} className="page-link" href="#a" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </a>
                    </li>
                    {pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <a onClick={() => paginate(number)} href="#a" className="page-link">{number}</a>
                        </li>
                    ))}
                    <li className="page-item">
                        <a onClick={onClickNext} className="page-link" href="#a" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;
