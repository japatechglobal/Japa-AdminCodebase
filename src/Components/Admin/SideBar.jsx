import { useState } from "react";
import japaLogo from "../../assets/JAPALOGO.png";
import { NavLink } from "react-router-dom";
import { Strongbox, ArrowDown2, AddSquare, User, UserCirlceAdd, Setting2 } from "iconsax-react";
const SideBar = () => {
    const [jobmenu, setjobMenu] = useState(false)
    const [coursemenu, setCourseMenu] = useState(false)
    return (
        <>
            <div className="w-[300px] bg-white border-r-2 h-[100vh] fixed">
                <div className="p-5">
                    <NavLink to={"/admin/home"}>
                        <img src={japaLogo} className="h-[38px]" alt="" /></NavLink>

                    <div className="h-[0.9px] bg-gray-300 mt-5"></div>

                    {/* Menu */}
                    <div className=" mt-10">
                        <div className="">
                            <div className="flex flex-row justify-between ">
                                <div className="flex flex-row space-x-2 text-md">
                                    <Strongbox size="28" color="#313033" variant="Bold" />
                                    <NavLink to={"/admin/postjob"} >Job Posting</NavLink>
                                </div>
                                {/* <ArrowDown2 onClick={() => setjobMenu(!jobmenu)} size="22" color="#313033" /> */}
                            </div>
                            {/* {jobmenu ? <div className="ml-2" >

                                {[{ id: 1, value: "Post New Job", img: <AddSquare size="18" color="#FF8A65" />, goTo: "/admin/postjob" },
                                ]
                                    .map((x) => (
                                        <NavLink to={x.goTo} key={x.id} className="flex space-x-2 flex-row mt-6">
                                            <Strongbox size="28" color="#313033" variant="Bold" />
                                            <p className="text-sm">{x.value}</p>
                                        </NavLink>
                                    ))
                                }

                            </div> : ""} */}
                        </div>
                    </div>
                    {/* 2 */}
                    <div className=" mt-10">
                        <div className="">
                            <div className="flex flex-row justify-between ">
                                <div className="flex flex-row space-x-2 text-md">
                                    <Strongbox size="28" color="#313033" variant="Bold" />
                                    <NavLink to={"/admin/courses"}>Courses</NavLink>
                                </div>
                                {/* <ArrowDown2 onClick={() => setCourseMenu(!coursemenu)} size="22" color="#313033" /> */}
                            </div>
                            {/* {coursemenu ? <div className="ml-2" >

                                {[{ id: 1, value: "Post New Course", img: <AddSquare size="18" color="#FF8A65" /> },
                                ]
                                    .map((x) => (
                                        <div key={x.id} className="flex space-x-2 flex-row mt-6">
                                            <Strongbox size="28" color="#313033" variant="Bold" />
                                            <p className="text-sm">{x.value}</p>
                                        </div>
                                    ))
                                }

                            </div> : ""} */}
                        </div>
                    </div>
                    {/* 3 */}
                    <div className=" mt-10">
                        <div className="">
                            <div className="flex flex-row justify-between ">
                                <div className="flex flex-row space-x-2 text-md">
                                    <UserCirlceAdd size="28" color="#313033" variant="Bold" />

                                    <NavLink to={"/admin/home"}>Users</NavLink>
                                </div>
                                {/* <ArrowDown2 onClick={() => setCourseMenu(!coursemenu)} size="22" color="#313033" /> */}
                            </div>

                        </div>
                    </div>
                    {/* 4 */}
                    <div className=" mt-10">
                        <div className="">
                            <div className="flex flex-row justify-between ">
                                <div className="flex flex-row space-x-2 text-md">
                                    <Strongbox size="28" color="#313033" variant="Bold" />
                                    <NavLink to={"/admin/talents"} >Coaching</NavLink>
                                </div>
                                {/* <ArrowDown2 onClick={() => setCourseMenu(!coursemenu)} size="22" color="#313033" /> */}
                            </div>

                        </div>
                    </div>
                    {/* 5 */}
                    <div className=" mt-10">
                        <div className="">
                            <div className="flex flex-row justify-between ">
                                <div className="flex flex-row space-x-2 text-md">
                                    <Strongbox size="28" color="#313033" variant="Bold" />
                                    <p>Admin</p>
                                </div>
                                {/* <ArrowDown2 onClick={() => setCourseMenu(!coursemenu)} size="22" color="#313033" /> */}
                            </div>

                        </div>
                    </div>

                    <div className=" mt-60">
                        <div className="">
                            <div className="flex flex-row justify-between ">
                                <div className="flex flex-row space-x-2 text-md">
                                    <Setting2 size="28" color="#313033" variant="Bold" />
                                    <p>Settings</p>
                                </div>
                                {/* <ArrowDown2 onClick={() => setCourseMenu(!coursemenu)} size="22" color="#313033" /> */}
                            </div>

                        </div>
                    </div>
                    <div className=" mt-10">
                        <div className="">
                            <div className="flex flex-row justify-between ">
                                <div className="flex flex-row space-x-2 text-md">
                                    <Strongbox size="28" color="#313033" variant="Bold" />
                                    <p>Help</p>
                                </div>
                                {/* <ArrowDown2 onClick={() => setCourseMenu(!coursemenu)} size="22" color="#313033" /> */}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default SideBar;