import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { FaBirthdayCake, FaFastBackward, FaPhone, FaTransgender, FaUser } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { FcDepartment } from "react-icons/fc";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import NotFoundPage from "../../pages/NotFoundPage";
export default function StudentDetail() {
    const { studentId } = useParams()
    const [student, setStudent] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        async function getStudentDetail() {
            let res = await fetch(`http://localhost:8000/student/${studentId}`, {
                method: 'GET'
            })
            let data = await res.json()
            setStudent(data)
        }
        getStudentDetail()
        setLoading(false)
    }, [studentId])
    if (student === 'Not found') {
        return <NotFoundPage />
    } else {

        return (
            <>
                {
                    loading ? <Spinner /> : (
                        <>
                            <div className="d-flex align-items-center">
                                <img className="avatar-lg me-4" src={student?.avatarUrl} alt="" />
                                <div className="flex-grow-1 d-flex flex-column">
                                    <div className="border-dashed d-flex align-items-center py-2">
                                        <FaUser size={20} className="me-2 text-primary" />
                                        <span>{student?.fullname}</span>
                                    </div>
                                    <div className="border-dashed d-flex align-items-center py-2">
                                        <MdEmail size={20} className="me-2 text-primary" />
                                        <span>{student?.email}</span>
                                    </div>
                                    <div className="border-dashed d-flex align-items-center py-2">
                                        <FaBirthdayCake size={20} className="me-2 text-primary" />
                                        <span>{dayjs(student?.dob).format('MMM DD YYYY')}</span>
                                    </div>
                                    <div className="border-dashed d-flex align-items-center py-2">
                                        <FaTransgender size={20} className="me-2 text-primary" />
                                        <span>{student?.gender ? 'Male' : 'Female'}</span>
                                    </div>
                                    <div className="border-dashed d-flex align-items-center py-2">
                                        <FaPhone size={20} className="me-2 text-primary" />
                                        <span>{student?.mobile}</span>
                                    </div>
                                    <div className="border-dashed d-flex align-items-center py-2">
                                        <FcDepartment size={20} className="me-2 text-primary" />
                                        <span>{student?.department?.name}</span>
                                    </div>
                                </div>
                            </div>
                            <Link to={'/student/list'}>
                                <FaFastBackward size={20} className="me-2 text-primary" />
                                Back to list
                            </Link>
                        </>
                    )
                }
            </>
        )
    }
}