import React from 'react'

const PageButton = ({ value, handlePageChange, page }) => {
    return (
        <>
            <li>
                <button
                    className={page === value ? "border flex h-8 w-8 bg-blue-300 items-center justify-center rounded-sm  p-0 text-sm" : "border flex h-8 w-8 items-center justify-center rounded-sm  p-0 text-sm"}
                    onClick={() => handlePageChange(value)}
                >
                    {value}
                </button>
            </li></>
    )
}

export default PageButton