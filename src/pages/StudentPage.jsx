import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import { CiViewList } from "react-icons/ci";
import { MdCreateNewFolder } from "react-icons/md";
import { BiSolidUserDetail } from "react-icons/bi";
export default function StudentPage() {
    const location = useLocation()
    const pathName = location.pathname.split('/').pop()
    const isActive = pathName === 'student' || pathName === 'list'
    const { studentId } = useParams()
    return (
        <MainLayout>
            <ul className="nav nav-tabs mb-2">
                <li className="nav-item">
                    <NavLink to={'/student/list'} className={`nav-link d-flex align-items-center + ${isActive ? 'active' : ''}`}>
                        <CiViewList className="me-2" size={15} />
                        Student List
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={'/student/create'} className="nav-link d-flex align-items-center">
                        <MdCreateNewFolder className="me-2" size={15} />
                        Create Student
                    </NavLink>
                </li>
                {
                    studentId && (
                        <li className="nav-item">
                            <NavLink to={`/student/${studentId}`} className="nav-link d-flex align-items-center">
                                <BiSolidUserDetail className="me-2" size={15} />
                                Student Detail
                            </NavLink>
                        </li>

                    )
                }
            </ul>
            <Outlet />
        </MainLayout>
    )
}