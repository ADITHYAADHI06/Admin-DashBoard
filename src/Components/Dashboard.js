import { useEffect, useState } from "react";
import PageButton from "./PageButton";
import User from "./User"
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Shimmer from "./Shimmer";

const Dashboard = () => {

    // const [Mainusers, setMainUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [selectedUsers, setselectedUsers] = useState([]);
    const [isButtonDisabled, setButtonDisabled] = useState(true);


    const deleteUser = (id) => {
        // console.log(id);
        let newUsers = users.filter((user) => { return user.id !== id; })
        setUsers(newUsers);
    }



    const handleAllChange = () => {
        setIsAllChecked(!isAllChecked);

        if (!isAllChecked) {
            // If "Select All" is checked, set all users to selectedUsers
            let newState = users.map((user) => user.name)
            setselectedUsers(newState);
            setButtonDisabled(false);
        } else {
            // If "Select All" is unchecked, set selectedUsers to an empty array
            setselectedUsers([]);
        }
    };

    const deleteSelectedUsers = () => {
        let newState = users.filter((user) => { return !selectedUsers.includes(user.name) })
        // console.log(newState);
        console.log(newState);
        setIsAllChecked(false);
        setselectedUsers([]);
        setUsers(newState)

    }

    const handlePageChange = (selectedpage) => {
        if (selectedpage >= 1 && selectedpage <= Math.ceil(users.length / 10) && selectedpage !== page)
            setPage(selectedpage);
    }

    async function getUsers(api) {
        const res = await fetch(api);
        const data = await res.json();
        // console.log(data);
        setUsers(data);
        // setMainUsers(data);
    }

    useEffect(() => {
        if (selectedUsers.length > 1) {
            setButtonDisabled(false);
        }
    }, [selectedUsers]);

    useEffect(() => {
        getUsers("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
    }, []);
    return (

        <section className=" bg-blueGray-50">
            <div className="w-full xl:w-full xl:mb-0 px-4 mx-auto  mt-10">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <input type="text" className="border p-2 px-5 w-6/12" placeholder="Search ...." />
                            </div>
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                <button onClick={deleteSelectedUsers} disabled={isButtonDisabled} className={selectedUsers.length > 0 ? "bg-red-500 cursor-pointer text-white active:bg-indigo-600 text-xs font-bold uppercase px-2 py-2 rounded outline-none focus:outline-none mr-1 mb-1" : "cursor-not-allowed bg-red-300 text-white active:bg-indigo-600 text-xs font-bold uppercase px-2 py-2 rounded outline-none focus:outline-none mr-1 mb-1"} type="button"><MdDeleteOutline className="text-lg" /></button>
                            </div>
                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse ">
                            <thead>
                                <tr>
                                    <th className="text-3xl px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-4 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        <input onChange={handleAllChange} checked={isAllChecked} className="w-5 h-5" type="checkbox" id="vehicle1" name="vehicle1" value="all" />

                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-4 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Name
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-4 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Email
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-4 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Role
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-4 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {

                                    users.length === 0 ? <Shimmer /> :
                                        users.slice(page * 10 - 10, page * 10).map((user, i) => {
                                            return <User key={user.id} user={user} users={users} setUsers={setUsers} deleteUser={deleteUser} selectedUsers={selectedUsers} setselectedUsers={setselectedUsers} isAllChecked={isAllChecked} setIsAllChecked={setIsAllChecked} setButtonDisabled={setButtonDisabled} />
                                        })
                                }

                            </tbody>

                        </table>
                    </div>

                </div>

                {/* footer design */}
                <div className="rounded-t px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <p>{selectedUsers.length} of {users.length} row(s) selected.`</p>
                        </div>
                        <div className="relative w-full px-4 max-w-full flex gap-4 justify-end  flex-grow flex-1 text-right">
                            {/* // number Components */}

                            <div className="my-auto">Page {page} of {Math.ceil(users.length / 10) || 1}</div>
                            <div>
                                <nav>
                                    <ul className="flex gap-2 mr-10">
                                        <li>
                                            <button
                                                className="border flex h-8 w-8 items-center justify-center rounded-sm  p-0 text-sm"
                                                aria-label="Previous"
                                                onClick={() => { handlePageChange(page - 2) }}
                                            >
                                                <MdOutlineKeyboardDoubleArrowLeft />
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="border flex h-8 w-8 items-center justify-center rounded-sm  p-0 text-sm"
                                                aria-label="Previous"
                                                onClick={() => { handlePageChange(page - 1) }}
                                            >
                                                <MdOutlineKeyboardArrowLeft />
                                            </button>
                                        </li>

                                        {
                                            [...Array(Math.ceil(users.length / 10) || 1)].map((c, i) => {
                                                return <PageButton key={i + 1} page={page} value={i + 1} handlePageChange={handlePageChange} />
                                            })
                                        }


                                        <li>
                                            <button
                                                className="border flex h-8 w-8 items-center justify-center rounded-sm  p-0 text-sm"
                                                aria-label="Next"
                                                onClick={() => { handlePageChange(page + 1) }}
                                            >
                                                <MdOutlineKeyboardArrowRight />
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="border flex h-8 w-8 items-center justify-center rounded-sm  p-0 text-sm"
                                                aria-label="Next"
                                                onClick={() => { handlePageChange(page + 2) }}
                                            >
                                                <MdOutlineKeyboardDoubleArrowRight />
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section >
    )
}

export default Dashboard