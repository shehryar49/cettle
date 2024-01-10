import { MdDelete } from "react-icons/md";
import { BsTrash3 } from "react-icons/bs";
import { BsFillTrash3Fill } from "react-icons/bs";
import { IoTrashBin } from "react-icons/io5"
import Input from "../components/Input";
import CourseTable from "../components/courseTable";

export default function Courses() {
    return (
        <div className="grid lg:grid-cols-3 gap-4 mt-20">
            <div className="flex justify-center overflow-y-auto col-span-2" style={{height:'70vh'}} >
                <CourseTable />
            </div>
            <div className="flex justify-center items-center ol-span-1 ">
                <div className="w-3/4 h-3/4 rounded-md border-1  border-blue-500 flex flex-col gap-6 items-center">
                        <Input text="Course ID"/>
                        <Input text="Course Name"/>
                        <button style={{backgroundColor:'#2596be'}} className='p-4 text-white w-3/4 rounded-lg'>Add Course</button>
                </div>
            </div>
        </div>

    )
}