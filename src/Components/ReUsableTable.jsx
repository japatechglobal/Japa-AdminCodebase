import { Skeleton } from "@mui/material";
const TableRowsLoader = ({ rowsNum }) => {
    return [...Array(rowsNum)].map((row, index) => (
        <table key={index}>
            <tr >
                <td className="px-5 w-52 py-4 ">   <Skeleton animation="wave" variant="text" /></td>
                <td className="px-5 w-52 py-4">   <Skeleton animation="wave" variant="text" /></td>
                <td className="px-5 w-52 py-4">   <Skeleton animation="wave" variant="text" /></td>
                <td className="px-5 w-52 py-4">   <Skeleton animation="wave" variant="text" /></td>
                <td className="px-5 w-52 py-4">   <Skeleton animation="wave" variant="text" /></td>
            </tr>

        </table>
    ));
};

export default TableRowsLoader