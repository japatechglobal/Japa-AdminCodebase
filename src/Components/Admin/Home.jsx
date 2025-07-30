import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import { MdLockOutline, MdAddBox } from "react-icons/md";
import { AiOutlineArrowDown } from "react-icons/ai";
import {
  FaRegClipboard,
  FaUser,
  FaUserPlus,
  FaShoppingBag,
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { SiAirplayaudio } from "react-icons/si";

import { fetchStats, fetchUsers } from "../../api calls/api";
import { FaUsers } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { MdPeople } from "react-icons/md";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TablePagination from "@mui/material/TablePagination";
import { useState } from "react";
import { Skeleton, Table, TableCell } from "@mui/material";
import TableRowsLoader from "../ReUsableTable";

const Home = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("");
  const [limit, setLimit] = useState("");
  const [rowsperPage, setRowsPerPage] = useState(10);

  const { data, isLoading, error } = useQuery({
    queryKey: ["getUsers", { limit, page, search }],
    queryFn: fetchUsers,
    staleTime: 10000 * 60 * 60 * 24,
    // refetchOnWindowFocus: false
  });

  const {
    data: stats,
    isLoading: isLoadingStats,
    error: errorStats,
  } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
    staleTime: 10000 * 60 * 60 * 24,
    // refetchOnWindowFocus: false
  });
  console.log(data);

  return (
    <>
      <div className=" mx-20 mr-5   mt-5 bg-white h-full">
        <div className="flex flex-row p-10 space-x-3 justify-center">
          <div className="h-40 rounded-md w-[400px] border-2 space-x-5  border-purple-500 p-5 flex flex-row">
            <div className="h-20 w-20 bg-purple-900 flex items-center  justify-center rounded-full">
              <MdPeople size="50" color="#FFFFFF" />
            </div>
            <div className="">
              <h1 className="">Total users</h1>
              <p className="font-extrabold text-5xl">{stats?.data}</p>
            </div>
          </div>
          <div className="h-40 rounded-md w-[400px] border-2 space-x-5   border-purple-500 p-5 flex flex-row">
            <div className="h-20 w-20 bg-purple-900 flex items-center justify-center rounded-full">
              <SiAirplayaudio size="50" color="#FFFFFF" />
            </div>
            <div className="">
              <h1 className="">Jobs</h1>
              <p className="font-extrabold text-5xl">{stats?.jobs}</p>
            </div>
          </div>
          <div className="h-40 rounded-md w-[400px] border-2 space-x-5   border-purple-500 p-5 flex flex-row">
            <div className="h-20 w-20 bg-purple-900 rounded-full flex items-center justify-center">
              <FaRegClipboard size="52" color="#FFFFFF" />
            </div>
            <div className="">
              <h1 className="">Courses</h1>
              <p className="font-extrabold text-5xl">{stats?.courses}</p>
            </div>
          </div>
        </div>

        {/* {data.users?.map((x) => (
                    <p>Hello</p>
                ))} */}
        <div className="flex flex-col mx-5 p-10">
          <div className="flex flex-row space-x-2">
            <input
              type="text"
              className="p-2 border-2 h-10 w-[200px] rounded-md"
              placeholder="name"
            />
            <input
              type="text"
              className="border-2 p-2 h-10 w-[200px] rounded-md"
              placeholder="email"
            />
          </div>

          <table className="table my-6   w-full  bg-white rounded-md text-sm text-left">
            <thead className="text-xs text-white uppercase bg-purple-900">
              <tr>
                <th scope="col" class="px-6 py-4">
                  First Name
                </th>
                <th scope="col" class="px-6 py-4">
                  Email
                </th>
                <th scope="col" class="px-6 py-4">
                  Date Registered
                </th>
                <th scope="col" class="px-6 py-4">
                  Phone
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200-300 border-t border-gray-100">
              {isLoading ? <TableRowsLoader rowsNum={10} /> : ""}
              {data?.users?.map((x) => (
                <tr className="font-light text-sm" key={x._id}>
                  <td className="px-5 py-4 ">
                    <div className="flex items-center space-x-3 flex-row">
                      <div className="h-10 w-10 justify-center bg-purple-500 flex items-center rounded-full">
                        <MdVerifiedUser size="30" color="#FFFFFF" />
                      </div>
                      <div>{x.first_name}</div>
                    </div>
                  </td>
                  <td className="px-5 py-4">{x.email}</td>
                  <td className="px-5 py-4">
                    {x.registration_date?.split("T")[0]}
                  </td>
                  <td className="px-5 py-4">{x.phone_number}</td>
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
  );
};

export default Home;
