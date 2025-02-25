import { useQuery, useMutation, QueryClient, useQueryClient } from "@tanstack/react-query";
import { fetchCourses, postCourse, deleteCourse } from "../../api calls/api";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Rating from "@mui/material/Rating";
import TablePagination from '@mui/material/TablePagination';
import { useState } from "react"
import { Skeleton, Table, TableCell } from "@mui/material";
import { ArrowLeft3, Trash, InfoCircle } from "iconsax-react";
import { toast } from "react-toastify";
import { FourSquare } from "react-loading-indicators";
import TableRowsLoader from "../ReUsableTable";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

// const BasicModal = ({ open, setOpen, handleOpen, handleClose }) => {


//     return (
//         <div>
//             <Button onClick={handleOpen}>Open modal</Button>
//             <Modal
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
//                 <Box sx={style}>
//                     <div className="flex items-center justify-center">
//                         <InfoCircle size="32" color="#FF8A65" />
//                     </div>

//                     <h1 className="text-center">Are you sure you want to delete item?</h1>
//                     <div className="flex  mt-5">
//                         <div className="h-10 flex bg-red-500 items-center justify-center rounded-md w-full">
//                             <p className="text-white hover:cursor-pointer ">YES</p>
//                         </div>
//                     </div>
//                 </Box>
//             </Modal>
//         </div>
//     );
// }

const CourseTable = ({ data, isLoading, error, manipulateState, remove }) => {
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (

        <>
            <div className="flex flex-row justify-between p-5 mx-5">
                <h1 className="">Courses</h1>
                <div className="bg-purple-900 h-10 w-40 flex items-center justify-center rounded-3xl " onClick={() => manipulateState(2)}>
                    <p className="text-white text-sm">Post New Course</p>
                </div>
            </div>
            {/* <BasicModal open={open} handleClose={handleClose} handleOpen={handleOpen} /> */}

            <div className="flex flex-col mx-5 p-5">
                <div className="flex flex-row space-x-2">
                    <input type="text" className="p-2 border-2 h-10 w-[200px] rounded-md" placeholder="title" />
                    {/* <input type="text" className="border-2 p-2 h-10 w-[200px] rounded-md" placeholder="email" /> */}
                </div>

                <table className="table my-6  w-full  bg-white rounded-md text-sm text-left">
                    <thead className="text-xs text-white uppercase bg-purple-900">
                        <tr>
                            <th scope="col" class="px-6 py-4">Title</th>
                            <th scope="col" class="px-6 py-4">Level</th>
                            <th scope="col" class="px-6 py-4">Date Registered</th>
                            <th scope="col" class="px-6 py-4">Schedule</th>
                            <th scope="col" class="px-6 py-4">Actions</th>

                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {isLoading ? <TableRowsLoader rowsNum={10} /> : ""}
                        {data?.courses.map((x) => (
                            <tr className="font-light text-sm" key={x._id}>
                                <td className="px-5 py-4 ">{x.title}</td>
                                <td className="px-5 py-4 ">{x.about.level}</td>
                                <td className="px-5 py-4">{x.date_posted?.split("T")[0]}</td>
                                <td className="px-5 py-4">{x.about.schedule}</td>
                                <td>
                                    <div className="flex flex-row cusor-pointer">
                                        <div>
                                            <Trash onClick={() => remove(x._id)} size="22" color="#FF8A65" />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>
                <TablePagination
                    component="div"
                    count={Number(data?.total_pages)}
                    page={Number(data?.current_page)}
                    // onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                // onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </>
    )
}
const Review = ({ manipulateState, title,
    details,
    ratings,
    level,
    schedule,
    courseOutline,
    whocan,
    how,
    lessoncount,
    platform,
    link,
    post,
    isPending,
    requirement, }) => {
    return (
        <>
            <div className="mx-5 p-5">
                <div className="flex items-center  space-x-5 flex-row">
                    <ArrowLeft3 onClick={() => manipulateState(2)} size="32" color="#000000" />
                    <h1>Preview Course Posting</h1>
                </div>
                <div className="my-10 mx-5">
                    <h1 className="font-extrabold text-[27px]">{title}</h1>
                    <p className="text-sm font-light leading-6 max-w-[770px]">{details}</p>

                    <div className="flex p-2 items-center justify-between text-sm font-light flex-row h-20 w-[770px] mt-10 shadow-md">
                        <div className="flex items-center mt-2"><Rating
                            name="simple-controlled"
                            value={ratings}

                        /></div>
                        <div><p>{level}</p></div>
                        <div><p>{schedule}</p></div>
                    </div>
                    <h1 className="mt-10">Requirements:</h1>
                    {requirement.split(".").map((x, index) => (
                        <p className="text-sm font-light leading-6" key={index}>{x}</p>
                    ))}
                    <h1 className="mt-10 ">Course Outline:</h1>
                    {courseOutline.split(".").map((x, index) => (
                        <p className="text-sm font-light max-w-[770px] leading-6" key={index}>{x}</p>
                    ))}

                </div>
                <div onClick={post} className="h-10 p-2  flex-row mx-2 flex cursor-pointer items-center text-white justify-center rounded-3xl w-40 bg-purple-800">
                    <p>submit</p>
                    {isPending ? <FourSquare color="#ffffff" size="small" text="" textColor="" /> : ""}
                </div>
            </div></>
    )
}

const Forms = ({
    manipulateState, setTitle,
    setDetails,
    setRatings,
    setLevel,
    setSchedule,
    setCourseOutline,
    setWhoCan,
    setHow,
    setLessonCount,
    setPlatform,
    setLink,
    setRequirement,
    title,
    details,
    ratings,
    level,
    schedule,
    courseOutline,
    whocan,
    how,
    lessoncount,
    platform,
    link,
    requirement, }) => {
    return (
        <>
            <div className="mx-5 p-5">
                <div className="flex items-center  space-x-5 flex-row">
                    <ArrowLeft3 onClick={() => manipulateState(1)} size="32" color="#000000" />
                    <h1>Post A New Course</h1>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Course Title</label>
                        <input value={title} type="text" onChange={(e) => setTitle(e.target.value)} className="h-[50px] rounded-md border-2 mt-5 w-[478px] p-2" placeholder=" Title" />
                    </div>
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Picture: feature coming soon</label>
                        <input type="text" disabled className="h-[50px] rounded-md border-2 mt-5 w-[478px] p-2" placeholder="picture" />   </div>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Ratings</label>
                        <input type="text" value={ratings} onChange={(e) => setRatings(e.target.value)} className="h-[50px] rounded-md border-2 mt-5 w-[478px] p-2" placeholder="4.5" />
                    </div>
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Level</label>
                        <input type="text" value={level} onChange={(e) => setLevel(e.target.value)} className="h-[50px] rounded-md border-2 mt-5 w-[478px] p-2" placeholder="Beginer" />  </div>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Who can take this course</label>
                        <input type="text" value={whocan} onChange={(e) => setWhoCan(e.target.value)} className="h-[50px] rounded-md border-2 mt-5 w-[478px] p-2" placeholder="Anyone that likes data" />
                    </div>
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Delievery method (How)</label>
                        <input type="text" value={how} onChange={(e) => setHow(e.target.value)} className="h-[50px] rounded-md border-2 mt-5 w-[478px] p-2" placeholder="Online lectures, assignments, and quizzes" />  </div>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Lesson count</label>
                        <input value={lessoncount} onChange={(e) => setLessonCount(e.target.value)} type="number" className="h-[50px] rounded-md border-2 mt-5 w-[478px] p-2" placeholder="15" />
                    </div>
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Platform</label>
                        <input type="text" value={platform} onChange={(e) => setPlatform(e.target.value)} className="h-[50px] rounded-md border-2 mt-5 w-[478px] p-2" placeholder="Zoom, udemy" />  </div>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Course Description</label>
                        <textarea value={details} onChange={(e) => setDetails(e.target.value)} rows="5" cols="50" className="h-[100px] rounded-md border-2 mt-5  w-[478px] p-2" placeholder="Course Description" />
                    </div>

                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Requirements: <span className="text-red-500">Please enter "." after every requirement</span></label>
                        <textarea rows="5" value={requirement} cols="50" onChange={(e) => setRequirement(e.target.value)} className="h-[100px] rounded-md border-2 mt-5  w-[478px] p-2" placeholder="Requirements" />
                    </div>
                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Course Outline: <span className="text-red-500">Please enter "." after every point</span></label>
                        <textarea rows="5" value={courseOutline} onChange={(e) => setCourseOutline(e.target.value)} cols="50" className="h-[100px] rounded-md border-2 mt-5  w-[478px] p-2" placeholder="Outline" />
                    </div>
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Link</label>
                        <input value={link} onChange={(e) => setLink(e.target.value)} type="text" className="h-[50px] rounded-md border-2 mt-5  w-[478px] p-2" placeholder="https://www.link.com" />
                    </div>


                </div>
                <div className="flex flex-row space-x-5">
                    <div className="flex flex-col mt-10">
                        <label htmlFor="" className="text-sm" >Schedule</label>
                        <input value={schedule} onChange={(e) => setSchedule(e.target.value)} className="h-[50px] rounded-md border-2 mt-5  w-[478px] p-2" placeholder="Self-paced" />
                    </div>



                </div>
                {title !== "" && ratings !== "" && lessoncount !== "" ?
                    <div onClick={() => manipulateState(3)} className="h-10  mt-5 cursor-pointer w-[20%] flex items-center justify-center bg-purple-900 rounded-md">
                        <p className="text-white">Review</p>
                    </div> : <p className="mt-2 text-red-500">please fill in course details!</p>}

            </div>




        </>
    )
}



const Courses = () => {
    const [limit, setLimit] = useState()
    const [actionState, setActionState] = useState(1)
    const [page, setPage] = useState()
    const [title, setTitle] = useState("")
    const [detais, setDetails] = useState("")
    const [rating, setRatings] = useState("")
    const [level, setLevel] = useState("")
    const [schedule, setSchedule] = useState("")
    const [course_outline, setCourseOutline] = useState("")
    const [whocan, setWhoCan] = useState("")
    const [how, setHow] = useState("")
    const [lesson_count, setLessonCount] = useState("")
    const [certification, setCertification] = useState("")
    const [platform, setPlatform] = useState("")
    const [link, setLink] = useState("")
    const [requirement, setRequirement] = useState("")
    const queryClient = useQueryClient()
    const { data, isLoading, error } = useQuery({
        queryKey: ['courses', { limit, page, title }],
        queryFn: fetchCourses,
        // staleTime: 10000 * 60 * 60 * 24,
        refetchOnWindowFocus: true
    })

    const { mutateAsync: addCourse, isPending } = useMutation({
        mutationFn: postCourse,
        onSuccess: () => {
            queryClient.invalidateQueries(['courses', 'stats'])
            toast.success("Course saved")

        }
    })
    const { mutateAsync: removeCourse, isPending: delPending } = useMutation({
        mutationFn: deleteCourse,
        onSuccess: () => {
            queryClient.invalidateQueries(['courses', 'stats'])
            toast.success("deleted")

        }
    })



    const manipulateState = (num) => {
        setActionState(num)
    }
    // console.log("yee", actionState)

    const sendData = async () => {
        console.log("no shit")
        const data = {
            title,
            about: {
                detais,
                ratings: rating,
                level,
                schedule
            },
            course_outline,
            over_view: {
                whocan,
                how,
                lesson_count,
                certification: "Completion Certificate",
                platform
            },
            link,
            requirements: requirement
        }
        try {
            await addCourse(data)
        } catch (ex) {
            console.log(error)
        }

    }

    const deleteData = async (_id) => {
        try {
            await removeCourse({ _id: _id })
        } catch (ex) {
            console.log(error)
        }
    }





    const ShowItem = () => {
        if (actionState === 1) {
            return (
                <CourseTable
                    isLoading={isLoading} data={data}
                    remove={deleteData}
                    error={error} manipulateState={manipulateState} />
            )
        }
        if (actionState === 2) {
            return (
                <Forms actionState={actionState}
                    manipulateState={manipulateState}
                    setTitle={setTitle}
                    setDetails={setDetails}
                    setRatings={setRatings}
                    setLevel={setLevel}
                    setSchedule={setSchedule}
                    setCourseOutline={setCourseOutline}
                    setWhoCan={setWhoCan}
                    setHow={setHow}
                    setLessonCount={setLessonCount}
                    setCertification={setCertification}
                    setPlatform={setPlatform}
                    setLink={setLink}
                    setRequirement={setRequirement}
                    title={title}
                    details={detais}
                    ratings={rating}
                    level={level}
                    schedule={schedule}
                    courseOutline={course_outline}
                    whocan={whocan}
                    how={how}
                    lessoncount={lesson_count}
                    platform={platform}
                    link={link}
                    requirement={requirement}

                />
            )
        }
        if (actionState === 3) {
            return (
                <Review manipulateState={manipulateState}
                    title={title}
                    details={detais}
                    ratings={rating}
                    level={level}
                    schedule={schedule}
                    courseOutline={course_outline}
                    whocan={whocan}
                    how={how}
                    lessoncount={lesson_count}
                    platform={platform}
                    link={link}
                    requirement={requirement}
                    post={sendData}
                    isPending={isPending}
                />
            )
        }



    }


    return (
        <>
            <div className="mx-20 mr-5   mt-5 bg-white ">
                {ShowItem()}
            </div>
        </>
    );
}

export default Courses;