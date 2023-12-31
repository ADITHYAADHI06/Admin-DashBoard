import React, { useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiSaveDown2 } from "react-icons/ci";

const User = ({ user, deleteUser, selectedUsers, setselectedUsers, isAllChecked, setIsAllChecked, setButtonDisabled, users, setUsers, mainusers, setMainUsers }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [currentEditUser, setcurrentEditUser] = useState({
        id: user.id,
        name: "",
        email: "",
        role: ""
    });

    const handleEditUser = (user) => {
        setIsEdit(true);
        setcurrentEditUser({ id: user.id, name: user.name, email: user.email, role: user.role })
    }

    const handleEditUserSave = (id) => {
        console.log(id);
        const newUsers = users.map(user => {
            if (user.id === id) {
                return currentEditUser;
            }
            return user;
        });
        const newMainUsers = mainusers.map(user => {
            if (user.id === id) {
                return currentEditUser;
            }
            return user;
        });
        setUsers(newUsers);
        setMainUsers(newMainUsers)
        setIsEdit(false);
        // console.log(newState);
    }

    const handleSingleChange = (name) => {
        setselectedUsers((prevSelectedUsers) => {
            if (prevSelectedUsers.includes(name)) {
                // If the user is already selected, remove them
                setIsAllChecked(false)
                return prevSelectedUsers.filter((cname) => cname !== name);
            } else {
                // If the user is not selected, add them
                return [...prevSelectedUsers, name];
            }
        });
        setButtonDisabled(false);
    };

    return (
        <>
            <tr className={isAllChecked || selectedUsers.includes(user.name) ? "bg-gray-200" : ""}>
                <td className="border border-l-0 border-r-0 px-2 py-1 sm:px-4 sm:py-2   md:px-4 md:py-3  align-middle text-xs sm:text-sm md:text-base lg:text-[19px] whitespace-nowrap  text-left text-blueGray-700 ">
                    <input onChange={() => { handleSingleChange(user.name) }} checked={isAllChecked || selectedUsers.includes(user.name)} value={user.name} className='w-[1rem] h-[1rem] sm:w-[1.25rem] sm:h-[1.25rem]' type="checkbox" id="vehicle1" name="vehicle1" />
                </td>
                <td className="border border-l-0 border-r-0 px-2 py-1 sm:px-4 sm:py-2   md:px-4 md:py-3  align-middle text-xs sm:text-sm md:text-base lg:text-[19px] whitespace-nowrap  text-left text-blueGray-700 ">
                    {isEdit ? <input type='text' className='border' onChange={(e) => { setcurrentEditUser({ ...currentEditUser, name: e.target.value }) }} value={currentEditUser.name} name='name' /> : user.name}
                </td>
                <td className="border border-l-0 border-r-0 px-2 py-1 sm:px-4 sm:py-2   md:px-4 md:py-3  align-middle text-xs sm:text-sm md:text-base lg:text-[19px] whitespace-nowrap  ">
                    {isEdit ? <input type='email' className='border' onChange={(e) => { setcurrentEditUser({ ...currentEditUser, email: e.target.value }) }} value={currentEditUser.email} name='name' /> : user.email}
                </td>
                <td className="border border-l-0 border-r-0 px-2 py-1 sm:px-4 sm:py-2   md:px-4 md:py-3  align-center text-xs sm:text-sm md:text-base lg:text-[19px] whitespace-nowrap ">
                    {isEdit ? <input type='text' className='border' onChange={(e) => { setcurrentEditUser({ ...currentEditUser, role: e.target.value }) }} value={currentEditUser.role} name='name' /> : user.role}
                </td>
                <td className="border border-l-0 border-r-0 px-2 py-1 sm:px-4 sm:py-2   md:px-4 md:py-3  align-middle text-xs sm:text-sm md:text-base lg:text-[19px] whitespace-nowrap ">
                    <div className='flex gap-3'>
                        {
                            isEdit ? <CiSaveDown2 onClick={() => { handleEditUserSave(user.id); }} className='edit text-xl text-green-400 border border-w-1 w-8 h-8 p-2' /> : <FaEdit onClick={() => { handleEditUser(user); }} className='save text-xl border border-w-1 w-8 h-8 p-2' />
                        }
                        <MdDeleteOutline onClick={() => { deleteUser(user.id, currentEditUser) }} className='delete text-red-500 text-xl border border-w-1 h-8 w-8 p-2' />
                    </div>
                </td>
            </tr>
        </>
    )
}

export default User