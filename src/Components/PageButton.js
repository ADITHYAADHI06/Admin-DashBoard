import React from 'react'

const PageButton = ({ value, handlePageChange, page }) => {
    return (
        <>
            <li>
                <button
                    className={page === value ? "border flex  h-4 w-4 sm:h-5 sm:w-5  md:h-6 md:w-6 lg:h-8  lg:w-8 bg-blue-300 items-center justify-center rounded-sm  p-0 text-sm" : "border flex h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8  lg:w-8 items-center justify-center rounded-sm  p-0 text-sm"}
                    onClick={() => handlePageChange(value)}
                >
                    {value}
                </button>
            </li></>
    )
}

export default PageButton