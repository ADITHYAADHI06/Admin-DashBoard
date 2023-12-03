import { useEffect, useState } from "react";
import User from "./User"
import Shimmer from "./Shimmer";
import Pagination from "./Pagination";
import Header from "./Header";

const Dashboard = () => {

    const [mainusers, setMainUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [selectedUsers, setselectedUsers] = useState([]);
    const [isButtonDisabled, setButtonDisabled] = useState(true);


    const deleteUser = (id) => {
        // console.log(id);
        let newUsers = users.filter((user) => { return user.id !== id; });
        let newMainUsers = mainusers.filter((user) => { return user.id !== id; });
        setUsers(newUsers);
        setMainUsers(newMainUsers);
    }
    const deleteSelectedUsers = () => {
        let newUsers = users.filter((user) => { return !selectedUsers.includes(user.name) })
        let newMainUsers = mainusers.filter((user) => { return !selectedUsers.includes(user.name) })
        // console.log(newState);
        setIsAllChecked(false);
        setselectedUsers([]);
        setUsers(newUsers);
        setMainUsers(newMainUsers);
    }

    const handleSearch = (searchTerm) => {
        let newUsers = mainusers.filter((user) => {
            return Object.values(user).some((value) => { return value.toLowerCase().includes(searchTerm); })
        })
        setUsers(newUsers);
    }

    const handleAllCheck = () => {
        setIsAllChecked(!isAllChecked);

        if (!isAllChecked) {
            // set all users to selectedUsers
            let selectedusers = users.slice(page * 10 - 10, page * 10).map((user) => user.name)
            setselectedUsers(selectedusers);
            setButtonDisabled(false);
        } else {
            // set selectedUsers to an empty array
            setselectedUsers([]);
        }
    };

    const handlePageChange = (selectedpage) => {
        if (
            selectedpage >= 1 &&
            selectedpage <= Math.ceil(users.length / 10) &&
            selectedpage !== page
        )
            setPage(selectedpage);
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

        <section className="bg-blueGray-50">
            <div className="w-full px-4 mx-auto m-4">
                <div className="flex flex-col break-words bg-white w-full shadow-lg rounded">

                    <Header handleSearch={handleSearch} deleteSelectedUsers={deleteSelectedUsers} isButtonDisabled={isButtonDisabled} selectedUsers={selectedUsers} />

                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full  border-collapse ">
                            <thead>
                                <tr>
                                    <th className="text-sm  sm:text-3xl  bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 px-2 py-1 sm:px-4 sm:py-2  md:px-4 md:py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        <input onChange={handleAllCheck} checked={isAllChecked} className="w-[1rem] h-[1rem] sm:w-[1.25rem] sm:h-[1.25rem]" type="checkbox" id="vehicle1" name="vehicle1" value="all" />

                                    </th>
                                    <th className=" bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 px-2 py-1  sm:px-4 sm:py-2  md:px-4 md:py-3  text-[13px] sm:text-[1rem] md:text-[17px] lg:text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Name
                                    </th>
                                    <th className=" bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 px-2 py-1 sm:px-4 sm:py-2  md:px-4 md:py-3  text-[13px] sm:text-[1rem] md:text-[17px] lg:text-lg  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Email
                                    </th>
                                    <th className=" bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 px-2 py-1 sm:px-4 sm:py-2  md:px-4 md:py-3  text-[13px] sm:text-[1rem] md:text-[17px] lg:text-lg  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Role
                                    </th>
                                    <th className=" bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 px-2 py-1 sm:px-4 sm:py-2  md:px-4 md:py-3  text-[13px] sm:text-[1rem] md:text-[17px] lg:text-lg  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="">
                                {

                                    users.length === 0 ? <Shimmer /> :
                                        users.slice(page * 10 - 10, page * 10).map((user, i) => {
                                            return <User key={user.id} user={user} users={users} setUsers={setUsers} deleteUser={deleteUser} selectedUsers={selectedUsers} setselectedUsers={setselectedUsers} isAllChecked={isAllChecked} setIsAllChecked={setIsAllChecked} setButtonDisabled={setButtonDisabled} mainusers={mainusers} setMainUsers={setMainUsers} />
                                        })
                                }
                            </tbody>

                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <Pagination page={page} handlePageChange={handlePageChange} selectedUsers={selectedUsers} users={users} />
            </div>

        </section >
    )
}

export default Dashboard