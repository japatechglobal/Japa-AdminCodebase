import { Strongbox, ArrowDown2, Notepad2, AddSquare, User, UserCirlceAdd, Setting2, Bag2, Airdrop } from "iconsax-react";
import { fetchStats, fetchTalents, fetchUsers } from "../../api calls/api";
import { People } from "iconsax-react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TablePagination from '@mui/material/TablePagination';
import { useState } from "react"
import { Skeleton, Table, TableCell } from "@mui/material";
import TableRowsLoader from "../ReUsableTable";
import { useQuery } from "@tanstack/react-query";


const Talents = () => {
    const [page, setPage] = useState("")
    const [limit, setLimit] = useState("")
    const [rowsperPage, setRowsPerPage] = useState(10)
    const { data, isLoading, error } = useQuery({
        queryKey: ['talents'],
        queryFn: fetchTalents,
        staleTime: 10000 * 60 * 60 * 24,
        // refetchOnWindowFocus: false
    })

    return (
        <>
            <div className=" mx-20 mr-5   mt-5 bg-white  overflow-hidden ">
                <div className="flex flex-col mx-5 p-10">
                    <div className="flex flex-row space-x-2">
                        <input type="text" className="p-2 border-2 h-10 w-[200px] rounded-md" placeholder="name" />
                        {/* <input type="text" className="border-2 p-2 h-10 w-[200px] rounded-md" placeholder="email" /> */}
                    </div>

                    <table className="table my-6  w-full  bg-white rounded-md text-sm text-left">
                        <thead className="text-xs text-white uppercase bg-purple-900">
                            <tr>
                                <th scope="col" class="px-6 py-4">First Name</th>
                                <th scope="col" class="px-6 py-4">Current Skills</th>
                                <th scope="col" class="px-6 py-4">Course of choice</th>
                                {/* <th scope="col" class="px-6 py-4">resume link</th> */}

                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                            {isLoading ? <TableRowsLoader rowsNum={10} /> : ""}
                            {data?.talents?.map((x) => (
                                <tr className="font-light text-sm" key={x._id}>
                                    <td className="px-5 py-4 ">{x.full_name}</td>
                                    <td className="px-5 py-4">{x.current_skills}</td>
                                    <td className="px-5 py-4">{x.course_of_choice}</td>
                                    {/* <td className="px-5 py-4">{x.registration_date?.split("T")[0]}</td> */}

                                </tr>
                            ))}

                        </tbody>

                    </table>
                    <TablePagination
                        component="div"
                        count={data?.total_pages}
                        page={data?.current_page}
                        // onPageChange={handleChangePage}
                        rowsPerPage={rowsperPage}
                    // onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>
        </>
    )

}
export default Talents