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

    const [mainusers, setMainUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [selectedUsers, setselectedUsers] = useState([]);
    const [isButtonDisabled, setButtonDisabled] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const deleteUser = (id) => {
        // console.log(id);
        let newUsers = users.filter((user) => { return user.id !== id; });
        let newmainUsers = mainusers.filter((user) => { return user.id !== id; });
        setUsers(newUsers);
        setMainUsers(newmainUsers);
    }
    const deleteSelectedUsers = () => {
        let newState = users.filter((user) => { return !selectedUsers.includes(user.name) })
        let newmainState = mainusers.filter((user) => { return !selectedUsers.includes(user.name) })
        // console.log(newState);
        console.log(newState);
        setIsAllChecked(false);
        setselectedUsers([]);
        setUsers(newState);
        setMainUsers(newmainState);

    }

    const handleAllCheck = () => {
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

    const handlePageChange = (selectedpage) => {
        if (selectedpage >= 1 && selectedpage <= Math.ceil(users.length / 10) && selectedpage !== page)
            setPage(selectedpage);
    }

    const handleSearch = () => {
        let users = mainusers.filter((user) => {
            return Object.values(user).some((value) => { return value.toLowerCase().includes(searchTerm); })
        })
        setUsers(users);
    }

    async function getUsers(api) {
        const res = await fetch(api);
        const data = await res.json();
        // console.log(data);
        setUsers(data);
        setMainUsers(data);
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
            <div className="w-full xl:w-full xl:mb-0 px-4 mx-auto m-4">
                <div className="relative flex flex-col break-words bg-white w-full shadow-lg rounded ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex w-full flex-wrap items-center">
                            <div className="relative w-8/12 px-0 sm:px-4 flex ">
                                <input onChange={(e) => { setSearchTerm(e.target.value.toLowerCase()) }} value={searchTerm} type="text" className="border p-1 px-2 sm:p-2 sm:px-5 w-full min-[900px]:w-6/12" placeholder="Search ...." />
                                <button onClick={handleSearch} className="bg-blue-500 text-white px-2 py-1 sm:px-2 sm:py-2 text-sm sm:text-md lg:text-base">Search</button>
                            </div>
                            <div className="relative w-4/12 px-0 md:px-4 flex-grow flex-1 text-right">
                                <button onClick={deleteSelectedUsers} disabled={isButtonDisabled} className={selectedUsers.length > 0 ? "bg-red-500 cursor-pointer text-white active:bg-indigo-600 text-xs font-bold uppercase px-2 py-2 rounded outline-none focus:outline-none mr-1 mb-1" : "cursor-not-allowed bg-red-300 text-white active:bg-indigo-600 text-xs font-bold uppercase px-2 py-2 rounded outline-none focus:outline-none mr-1 mb-1"} type="button"><MdDeleteOutline className="text-lg" /></button>
                            </div>
                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse ">
                            <thead>
                                <tr>
                                    <th className="text-sm  sm:text-3xl  bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 px-2 py-1 sm:px-4 sm:py-2  md:px-6 md:py-4  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        <input onChange={handleAllCheck} checked={isAllChecked} className="w-[1rem] h-[1rem] sm:w-[1.25rem] sm:h-[1.25rem]" type="checkbox" id="vehicle1" name="vehicle1" value="all" />

                                    </th>
                                    <th className=" bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 px-2 py-1  sm:px-4 sm:py-2  md:px-6 md:py-4 text-[13px] sm:text-lg md:text-xl lg:text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Name
                                    </th>
                                    <th className=" bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 px-2 py-1 sm:px-4 sm:py-2  md:px-6 md:py-4 text-[13px] sm:text-lg md:text-xl lg:text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Email
                                    </th>
                                    <th className=" bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 px-2 py-1 sm:px-4 sm:py-2  md:px-6 md:py-4 text-[13px] sm:text-lg md:text-xl lg:text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Role
                                    </th>
                                    <th className=" bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 px-2 py-1 sm:px-4 sm:py-2  md:px-6 md:py-4 text-[13px] sm:text-lg md:text-xl lg:text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
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
                <div className="rounded-t px-0 py-3 my-4 mt-6 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-0 sm:px-2 md:px-3 max-w-full flex-grow flex-1 ">
                            <p className="text-xs sm:text-sm min-[768px]:text-[12px] lg:text-base">{selectedUsers.length} of {users.length} row(s) selected.`</p>
                        </div>
                        <div className="relative w-full px-0 sm:px-1 md:px-1 lg:px-4 max-w-full flex flex-col md:flex-row gap-4  justify-end  flex-grow flex-1 text-right">
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
                                                aria-label="Previous"
                                                onClick={() => { handlePageChange(page - 2) }}
                                            >
                                                <MdOutlineKeyboardDoubleArrowLeft />
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="border flex h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8  lg:w-8 items-center justify-center rounded-sm  p-0 text-sm"
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
                                                className="border flex h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8  lg:w-8 items-center justify-center rounded-sm  p-0 text-sm"
                                                aria-label="Next"
                                                onClick={() => { handlePageChange(page + 1) }}
                                            >
                                                <MdOutlineKeyboardArrowRight />
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="border flex h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8  lg:w-8 items-center justify-center rounded-sm  p-0 text-sm"
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