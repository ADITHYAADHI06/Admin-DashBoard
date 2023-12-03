import React, { useState } from 'react'
import { MdDeleteOutline } from 'react-icons/md';

const Header = ({ handleSearch, deleteSelectedUsers, isButtonDisabled, selectedUsers }) => {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <>
            <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex w-full flex-wrap items-center">
                    <div className="w-8/12 px-0 sm:px-4 flex ">
                        <input onChange={(e) => { setSearchTerm(e.target.value) }} value={searchTerm} type="text" className="border p-1 px-2 sm:p-2 sm:px-5 w-full min-[900px]:w-6/12" placeholder="Search ...." />
                        <button onClick={() => { handleSearch(searchTerm.toLowerCase()) }} className="bg-blue-500 text-white px-2 py-1 sm:px-2 sm:py-2 text-sm sm:text-md lg:text-base">Search</button>
                    </div>
                    <div className="w-4/12 px-0 md:px-4 flex-grow flex-1 text-right">
                        <button onClick={deleteSelectedUsers} disabled={isButtonDisabled} className={selectedUsers.length > 0 ? "search-icon bg-red-500 cursor-pointer text-white active:bg-indigo-600 text-xs font-bold uppercase px-2 py-2 rounded outline-none focus:outline-none mr-1 mb-1" : "search-icon cursor-not-allowed bg-red-300 text-white active:bg-indigo-600 text-xs font-bold uppercase px-2 py-2 rounded outline-none focus:outline-none mr-1 mb-1"} type="button"><MdDeleteOutline className="text-lg" /></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header