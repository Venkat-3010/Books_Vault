import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const BookTable = ({books}) => {
    return(
        <table className="w-full border-separate border-spacing-2">
            <thead>
                <tr>
                    <th className="border border-slate-600 rounded-md">NO</th>
                    <th className="border border-slate-600 rounded-md">Title</th>
                    <th className="border border-slate-600 rounded-md max-md:hidden">
                        Author
                    </th>
                    <th className="border border-slate-600 rounded-md max-md:hidden">
                        Published Year
                    </th>
                    <th className="border border-slate-600 rounded-md">
                        Operations
                    </th>
                </tr>
            </thead>
            <tbody>
                {books.map((items, index) => (
                    <tr key={items._id} className="h-8">
                        <td className="border border-slate-700 rounded-md text-center">
                            {index+1}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center">
                            {items.title}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                            {items.author}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                            {items.publishedYear}
                        </td>
                        <td className="border border-slate-700 rounded-md text-center">
                            <div className="flex justify-center gap-x-4">
                                <Link to={`/books/details/$book._id`}>
                                    <BsInfoCircle className="text-2x1 text-green-800" />
                                </Link>
                                <Link to={`/books/edit/$book._id`}>
                                    <AiOutlineEdit className="text-2x1 text-yellow-600" />
                                </Link>
                                <Link to={`/books/delete/$book._id`}>
                                    <MdOutlineDelete className="text-2x1 text-red-600" />
                                </Link>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default BookTable