import { useState } from "react";
import Select from "react-select"
import { useQuery, useMutation, QueryClient, useQueryClient } from "@tanstack/react-query";
import { deleteJobs, fetchCourses, fetchjobs, postCourse, postJobs } from "../../api calls/api";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Rating from "@mui/material/Rating";
import TablePagination from '@mui/material/TablePagination';
import TableRowsLoader from "../ReUsableTable";
import { Skeleton, Table, TableCell } from "@mui/material";
import { ArrowLeft3, Trash } from "iconsax-react";
import { FourSquare } from "react-loading-indicators";



const JobsTable = ({ data, deleteData, isLoading, error, mutateState }) => {
    const [rowsPerPage, setRowsPerPage] = useState(10)
    return (
        <>
            <div className="flex flex-row justify-between p-5 mx-5">
                <h1 className="">Jobs</h1>
                <div className="bg-purple-900 h-10 w-40 flex items-center justify-center rounded-3xl " onClick={() => mutateState(2)}>
                    <p className="text-white text-sm">Post New Job</p>
                </div>
            </div>
            <div className="flex flex-col mx-5 p-5">
                <div className="flex flex-row space-x-2">
                    <input type="text" className="p-2 border-2 h-10 w-[200px] rounded-md" placeholder="title" />
                    {/* <input type="text" className="border-2 p-2 h-10 w-[200px] rounded-md" placeholder="email" /> */}
                </div>
                <table className="table my-6  w-full  bg-white rounded-md text-sm text-left">
                    <thead className="text-xs text-white uppercase bg-purple-900">
                        <tr>
                            <th scope="col" class="px-6 py-4">Title</th>
                            <th scope="col" class="px-6 py-4">Company</th>
                            <th scope="col" class="px-6 py-4">Category</th>
                            <th scope="col" class="px-6 py-4">Date published</th>
                            <th scope="col" class="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {isLoading ? <TableRowsLoader rowsNum={10} /> : ""}
                        {data?.jobs.map((x) => (
                            <tr className="font-light text-sm" key={x._id}>
                                <td className="px-5 py-4 ">{x.job_title}</td>
                                <td className="px-5 py-4 ">{x.company_name}</td>
                                <td className="px-5 py-4 ">{x.location}</td>
                                <td className="px-5 py-4">{x.date_posted?.split("T")[0]}</td>
                                {/* <td className="px-5 py-4">{x.about.schedule}</td> */}
                                <td>
                                    <div className="flex flex-row cusor-pointer">
                                        <div>
                                            <Trash onClick={() => deleteData(x._id)} size="22" color="#FF8A65" />
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

const JobForm = ({ mutateState, setJobTitle,
    job_title,
    city,
    setCity,

    location,
    setLocation,
    job_type,
    setJobType,
    company_name,
    setCompanyName,
    technology,
    payment_type, setPaymentType,
    setTechnology,
    min_salary,
    setMinSalary,
    max_salary,
    setMaxSalary,
    experience,
    setExperience,
    about,
    setAbout,
    what_you_will_be_doing,
    setWhatYouWillBeDoing,
    what_we_are_lookin_for,
    setWhatWeAreLookingFor,
    nice_to_have,
    setNiceToHave,
    category,
    setCategory,
    ideal_candidate,
    setIdealCandidate,
    link,
    setLink,
    skills,
    setSkills, }) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    console.log("holle", job_type, job_title, category)
    return (
        <>
            <div className="flex items-center  space-x-5 flex-row">
                <ArrowLeft3 onClick={() => mutateState(1)} size="32" color="#000000" />
                <h1>Post New Job</h1>
            </div>

            <div className="flex flex-row space-x-10  mt-5">
                <div>
                    <label className="font-light">Job title</label> <br />
                    <input type="text" value={job_title} onChange={(e) => setJobTitle(e.target.value)} className="h-[50px] p-2 rounded-md w-[478px] border-2" />
                </div>
                <div>
                    <label className="font-light">Job category</label> <br />
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="h-[50px] p-2 rounded-md w-[478px] border-2" />
                    {/* <Select isMulti options={options}
                        className="h-[53px] w-[478px] " /> */}
                </div>
            </div>
            <div className="flex flex-row space-x-10  mt-5">
                <div>
                    <label className="font-light">Job type</label> <br />
                    {[{ id: 1, type: "remote" },
                    { id: 2, type: "Full Time" },
                    { id: 3, type: "Part Time" },
                    { id: 4, type: "Intern" },
                    { id: 5, type: "Volunteer" },
                    { id: 6, type: "others" }].map((x) => (
                        <div className="flex space-x-2 w-[478px]">
                            <input onChange={(e) => setJobType(e.target.value)} checked={job_type == x.type} className="w-6 border-purple-950  text-purple-500 focus:ring-purple-500 mt-5 h-6"
                                type="radio" value={x.type} name="job" />
                            <label className="mt-5">{x.type}</label><br /></div>
                    ))}
                </div>
                <div className="flex flex-col">
                    <label className="font-light"></label> <br />
                    <input onChange={(e) => setCompanyName(e.target.value)} value={company_name} type="text" className="h-[50px] rounded-md w-[478px] p-2 border-2" placeholder="company name" />
                    <input onChange={(e) => setTechnology(e.target.value)} value={technology} type="text" className="h-[50px] mt-5 rounded-md w-[478px] p-2 border-2" placeholder="Technology (please use '.' after a point)" />
                    <input type="text" onChange={(e) => setLocation(e.target.value)} value={location} className="h-[50px] mt-7 rounded-md w-[478px] p-2 border-2" placeholder="Location" />
                    <input type="text" onChange={(e) => setCity(e.target.value)} value={city} className="h-[50px] mt-7 rounded-md w-[478px] p-2 border-2" placeholder="city" />
                </div>
            </div>
            <div className="flex space-x-10 flex-row mt-5">
                <div>
                    <label className="font-light">Payment Type</label> <br />
                    <input onChange={(e) => setPaymentType(e.target.value)} value={payment_type} type="text" className="h-[50px] mt-5 rounded-md w-[478px] p-2 border-2" placeholder="Payment Type" />
                </div>
                <div>
                    <label className="font-light">Experience</label> <br />
                    <input onChange={(e) => setExperience(e.target.value)} value={experience} type="text" className="h-[50px] mt-5 rounded-md w-[478px] p-2 border-2 " placeholder="1-2 years" />
                </div>
            </div>
            <div className="flex space-x-10 flex-row mt-5">
                <div>
                    <label className="font-light">Minimum</label> <br />
                    <input type="text" onChange={(e) => setMinSalary(e.target.value)} value={min_salary} className="h-[50px] mt-5 rounded-md w-[478px] p-2 border-2" placeholder="Minimum" />
                </div>
                <div>
                    <label className="font-light">Maximun</label> <br />
                    <input onChange={(e) => setMaxSalary(e.target.value)} value={max_salary} type="text" className="h-[50px] mt-5 rounded-md w-[478px] p-2 border-2" placeholder="Maximum" />
                </div>
            </div>
            <div className="flex space-x-10 flex-row mt-5">
                <div>
                    <label className="font-light">What you will be doing</label>
                    <p className="text-xs text-gray-500 font-light"></p>
                    <br />
                    <textarea type="text" onChange={(e) => setWhatYouWillBeDoing(e.target.value)} value={what_you_will_be_doing} className="h-[100px]  mt-3 rounded-md w-[478px] p-2 border-2" placeholder="What you will be doing" />
                </div>
                <div>
                    <label className="font-light">Nice To Have</label>
                    <p className="text-xs text-gray-500 font-light"> <br />
                        seeking in a candidate. <span className="text-red-400"> use "." after a point</span> </p>
                    <br />
                    <textarea type="text" onChange={(e) => setNiceToHave(e.target.value)} value={nice_to_have} className="h-[100px]   rounded-md w-[478px] p-2 border-2" placeholder="Nice to have" />
                </div>
            </div>
            <div className="flex space-x-10 flex-row mt-5">
                <div>
                    <label className="font-light">About job</label>
                    <p className="text-xs text-gray-500 font-light">Provide a brief summary of the job responsibilities and requirements</p>
                    <br />
                    <textarea type="text" onChange={(e) => setAbout(e.target.value)} value={about} className="h-[100px]  mt-3 rounded-md w-[478px] p-2 border-2" placeholder="About" />
                </div>
                <div>
                    <label className="font-light">What we are looking for</label>
                    <p className="text-xs text-gray-500 font-light">Indicate key qualities, knowldge and expertise that you are <br />
                        seeking in a candidate. <span className="text-red-400"> use "." after a point</span> </p>
                    <br />
                    <textarea type="text" onChange={(e) => setWhatWeAreLookingFor(e.target.value)} value={what_we_are_lookin_for} className="h-[100px]   rounded-md w-[478px] p-2 border-2" placeholder="What we are looking for" />
                </div>
            </div>
            <div className="flex space-x-10 flex-row mt-5">
                <div>
                    <label className="font-light">Preferred candidate data</label>
                    <p className="text-xs text-gray-500 font-light">List any preferred qualifications, skills, or experience that would be <br /> beneficial for the candidate to have<span className="text-red-400"> use "." after a point</span> </p>
                    <br />
                    <textarea onChange={(e) => setIdealCandidate(e.target.value)} value={ideal_candidate} type="text" className="h-[100px]  mt-3 rounded-md w-[478px] p-2 border-2" placeholder="Prefared candidate data" />
                </div>
                <div>
                    <label className="font-light">Skills</label>
                    <p className="text-xs text-gray-500 font-light">List the technical skills, software knowledge, and other abilities <br />required for this role.<span className="text-red-400"> use "." after a point</span>
                    </p>
                    <br />
                    <textarea onChange={(e) => setSkills(e.target.value)} value={skills} type="text" className="h-[100px]   rounded-md w-[478px] p-2 border-2" placeholder="Skills" />
                </div>
            </div >
            <div>
                <label className="font-light mt-5">Link</label> <br />
                <input onChange={(e) => setLink(e.target.value)} value={link} type="text" className="h-[50px] mt-5 rounded-md w-[478px] p-2 border-2" placeholder="Link" />
            </div>

            <div onClick={() => mutateState(3)} className="h-10 w-40 mt-5 flex justify-center items-center   bg-purple-800">
                <p className="text-white">Review now</p>
            </div>
        </>
    )
}

const Review = ({ mutateState,
    city,
    payment_type,
    job_title,
    location,
    job_type,
    company_name,
    technology,
    min_salary,
    max_salary,
    experience,
    about,
    what_you_will_be_doing,
    what_we_are_lookin_for,
    nice_to_have,
    category,
    ideal_candidate,
    link,
    skills,
    sendData,
    jobPending
}) => {
    return (
        <>
            <div className="mx-5 p-5">
                <div className="flex items-center  space-x-5 flex-row">
                    <ArrowLeft3 onClick={() => mutateState(2)} size="32" color="#000000" />
                    <h1>Preview job Posting</h1>
                </div>

                <div className="h-[252px] w-[997px] flex items-center bg-purple-200 mt-5">
                    <div className="px-10">
                        <h1 className="text-2xl font-extrabold ">{job_title}</h1>
                        <p>{location + "," + city}</p>
                    </div>
                </div>
                <div className="  mt-5 w-[790px]">
                    <h1 className="font-extrabold">About job</h1>
                    <p className="text-sm font-light">{about}</p>

                </div>
                <div className="  mt-5 w-[790px]">
                    <h1 className="font-extrabold">What you will be doing</h1>
                    {what_you_will_be_doing.split(".").map((x, index) => (
                        <p className="text-sm font-light leading-6" key={index}>{x}</p>
                    ))}


                </div>
                <div className="  mt-5 w-[790px]">
                    <h1 className="font-extrabold">What we are looing for</h1>
                    {what_we_are_lookin_for.split(".").map((x, index) => (
                        <p className="text-sm font-light leading-6" key={index}>{x}</p>
                    ))}
                </div>
                <div className="  mt-5 w-[790px]">
                    <h1 className="font-extrabold">Nice to have</h1>
                    {nice_to_have.split(".").map((x, index) => (
                        <p className="text-sm font-light leading-6" key={index}>{x}</p>
                    ))}


                </div>
                <div className="  mt-5 w-[790px]">
                    <h1 className="font-extrabold">Prefared candidate data</h1>
                    {ideal_candidate.split(".").map((x, index) => (
                        <p className="text-sm font-light leading-6" key={index}>{x}</p>
                    ))}
                </div>
                <div className="  mt-5 w-[790px]">
                    <h1 className="font-extrabold">Skills</h1>
                    {skills.split(".").map((x, index) => (
                        <p className="text-sm font-light leading-6" key={index}>{x}</p>
                    ))}
                </div>

                <div onClick={sendData} className="h-10 p-2  flex-row mx-2 flex cursor-pointer items-center text-white justify-center rounded-3xl w-40 bg-purple-800">
                    <p>submit</p>
                    {jobPending ? <FourSquare color="#ffffff" size="small" text="" textColor="" /> : ""}
                </div>
            </div></>
    )
}


const PostJobs = () => {
    const [showState, setShowState] = useState(1)
    const [page, setPage] = useState("")
    const [search, setSearch] = useState("")
    const [limit, setLimit] = useState("")
    const [city, setCity] = useState("")

    const [job_title, setJobTitle] = useState("")
    const [location, setLocation] = useState("")
    const [job_type, setJobType] = useState("")
    const [company_name, setCompanyName] = useState("")
    const [technology, setTechnology] = useState("")
    const [min_salary, setMinSalary] = useState("")
    const [max_salary, setMaxSalary] = useState("")
    const [experience, setExperience] = useState("")
    const [about, setAbout] = useState("")
    const [what_you_will_be_doing, setWhatYouWillBeDoing] = useState("")
    const [what_we_are_lookin_for, setWhatWeAreLookingFor] = useState("")
    const [nice_to_have, setNiceToHave] = useState("")
    const [category, setCategory] = useState("")
    const [ideal_candidate, setIdealCandidate] = useState("")
    const [link, setLink] = useState("")
    const [skills, setSkills] = useState("")
    const [payment_type, setPaymentType] = useState("")
    const queryClient = useQueryClient()

    const [rowsperPage, setRowsPerPage] = useState(10)
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    const { data, isLoading, error } = useQuery({
        queryKey: ['jobs', { limit, page, search }],
        queryFn: fetchjobs,
        staleTime: 10000 * 60 * 60 * 24,
        // refetchOnWindowFocus: false
    })

    const mutateState = (num) => {
        setShowState(num)
    }

    const { mutateAsync: renoveJob, isPending: delPending } = useMutation({
        mutationFn: deleteJobs,
        onSuccess: () => {
            queryClient.invalidateQueries(['jobs', 'stats'])
            toast.success("deleted")


        }
    })
    const { mutateAsync: postjob, isPending: jobPending } = useMutation({
        mutationFn: postJobs,
        onSuccess: () => {
            queryClient.invalidateQueries(['jobs', 'stats'])
            toast.success("saved")
            mutateState(1)
        }
    })
    const tech = technology.split(".")
    const techArray = tech.map(str => str.trim()).filter(str => str.length > 0);


    const sendData = async () => {

        const data = {
            job_title,
            location: location + "," + city,
            job_type,
            company_name,
            min_salary,
            max_salary,
            experience,
            technology: techArray,
            nice_to_have,
            what_we_are_lookin_for,
            what_you_will_be_doing,
            category,
            ideal_candidate,
            limit,
            payment_type,
            skills,
            about,
            link
        }
        try {
            await postjob(data)
        } catch (ex) {
            console.log(error)
        }

    }

    const deleteData = async (_id) => {
        // console.log(_id)
        try {
            await renoveJob({ _id: _id })
        } catch (ex) {
            console.log(error)
        }
    }


    const ShowThis = () => {
        if (showState === 1) {
            return (<JobsTable deleteData={deleteData} mutateState={mutateState} data={data} />)
        }
        if (showState === 2) {
            return (<JobForm
                city={city}
                payment_type={payment_type} setPaymentType={setPaymentType}
                setCity={setCity}
                setJobTitle={setJobTitle}
                job_title={job_title}
                location={location}
                setLocation={setLocation}
                job_type={job_type}
                setJobType={setJobType}
                company_name={company_name}
                setCompanyName={setCompanyName}
                technology={technology}
                setTechnology={setTechnology}
                min_salary={min_salary}
                setMinSalary={setMinSalary}
                max_salary={max_salary}
                setMaxSalary={setMaxSalary}
                experience={experience}
                setExperience={setExperience}
                about={about}
                setAbout={setAbout}
                what_you_will_be_doing={what_you_will_be_doing}
                setWhatYouWillBeDoing={setWhatYouWillBeDoing}
                what_we_are_lookin_for={what_we_are_lookin_for}
                setWhatWeAreLookingFor={setWhatWeAreLookingFor}
                nice_to_have={nice_to_have}
                setNiceToHave={setNiceToHave}
                category={category}
                setCategory={setCategory}
                ideal_candidate={ideal_candidate}
                setIdealCandidate={setIdealCandidate}
                link={link}
                setLink={setLink}
                skills={skills}
                setSkills={setSkills}
                mutateState={mutateState} />)
        }
        if (showState === 3) {
            return (<Review
                mutateState={mutateState}
                city={city}
                payment_type={payment_type}
                job_title={job_title}
                location={location}
                job_type={job_type}
                company_name={company_name}
                technology={technology}
                min_salary={min_salary}
                max_salary={max_salary}
                experience={experience}
                about={about}
                what_you_will_be_doing={what_you_will_be_doing}
                what_we_are_lookin_for={what_we_are_lookin_for}
                nice_to_have={nice_to_have}
                category={category}
                ideal_candidate={ideal_candidate}
                link={link}
                skills={skills}
                sendData={sendData}
                jobPending={jobPending}
            />)
        }
    }

    return (
        <>
            <div className="mx-20 mr-5 mt-5 p-5 bg-white">
                {ShowThis()}
            </div>
        </>
    );
}

export default PostJobs;