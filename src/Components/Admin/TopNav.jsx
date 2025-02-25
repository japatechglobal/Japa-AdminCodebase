const my_data = JSON.parse(sessionStorage.getItem("details"))
// console.log(my_data)
const TopNav = () => {
    return (
        <>
            <div className="h-20  border-b-2 w-full bg-white  flex justify-end">
                <div className="flex flex-row items-center mx-30 p-5 space-x-3">
                    <div className="h-14 w-14 bg-purple-500 rounded-full "></div>
                    <div>
                        <h1>{my_data?.last_name}</h1>
                        <p className="text-xs">{my_data?.email}</p>
                    </div>

                </div>
            </div>
        </>
    );
}

export default TopNav;