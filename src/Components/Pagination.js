import React from 'react'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import PageButton from './PageButton'

const Pagination = ({ page, handlePageChange, selectedUsers, users }) => {
    return (
        <div className="rounded-t px-0 py-3 my-4 mt-6 border-0">
            <div className="flex flex-wrap items-center">
                <div className="w-full px-0 sm:px-2 md:px-3 max-w-full flex-grow flex-1 ">
                    <p className="text-xs sm:text-sm min-[768px]:text-[12px] lg:text-base">{selectedUsers.length} of {users.length} row(s) selected.`</p>
                </div>
                <div className="w-full px-0 sm:px-1 md:px-1 lg:px-4 max-w-full flex flex-col md:flex-row gap-4  justify-end  flex-grow flex-1 text-right">
                    {/* // number Components */}

                    <div className="my-auto">
                        <p className="text-xs text-center  sm:text-sm md:text-sm min-[768px]:text-[12px]  lg:text-base">
                            Page {page} of {Math.ceil(users.length / 10) || 1}
                        </p>
                    </div>
                    <div>
                        <nav>
                            <ul className="flex justify-center gap-1 min[800px]:gap-2 sm:mr-0 md:mr-4 lg:mr-10">
                                <li>
                                    <button
                                        className="border flex h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8  lg:w-8 items-center justify-center rounded-sm  p-0 text-sm"
                                        onClick={() => { handlePageChange(1) }}
                                    >1</button>
                                </li>

                                <li>
                                    <button
                                        className="previous-page border flex h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8  lg:w-8 items-center justify-center rounded-sm  p-0 text-sm"
                                        onClick={() => { handlePageChange(page - 1) }}
                                    ><MdOutlineKeyboardArrowLeft /></button>
                                </li>
                                {
                                    [...Array(Math.ceil(users.length / 10) || 1)].map((c, i) => {
                                        return <PageButton key={i + 1} page={page} value={i + 1} handlePageChange={handlePageChange} />
                                    })
                                }
                                <li>
                                    <button
                                        className="next-page border flex h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8  lg:w-8 items-center justify-center rounded-sm  p-0 text-sm"
                                        aria-label="Next"
                                        onClick={() => { handlePageChange(page + 1) }}
                                    ><MdOutlineKeyboardArrowRight /> </button>
                                </li>
                                <li>
                                    <button
                                        className="border flex h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8  lg:w-8 items-center justify-center rounded-sm  p-0 text-sm"
                                        aria-label="Next"
                                        onClick={() => { handlePageChange(Math.ceil(users.length / 10) || 1) }}
                                    >{Math.ceil(users.length / 10) || 1}</button>
                                </li>
                            </ul>
                        </nav>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Pagination