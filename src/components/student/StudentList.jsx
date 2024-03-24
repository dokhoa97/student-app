import { useEffect, useState } from "react"
import dayjs from "dayjs"
import { TbGenderMale, TbGenderFemme } from "react-icons/tb";
import { FaSearch, FaUserCog, FaUserPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import ModifyStudent from "./ModifyStudent";
import Spinner from "../spinner/Spinner";
export default function StudentList() {
    const [studentList, setStudentList] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState(null)
    const [show, setShow] = useState(false)
    const [studentId, setStudentId] = useState(null)
    const [filters, setFilters] = useState({
        searchText: '',
        sort: 'fullname',
        order: 'asc',
        page: 1,
        limit: 5,
        direction: 'next'
    })
    useEffect(() => {
        setLoading(true)
        async function getStudentList() {
            let res = await fetch(`http://localhost:8000/student?_page=${filters?.page}&_limit=${filters?.limit}&?_sort=${filters.sort}`)
            let data = await res.json()
            setStudentList(data)
            setLoading(false)
        }
        getStudentList()
    }, [selectedStudent, studentId, filters?.page, filters.limit, filters.sort])
    const handleRemove = (student) => {
        Swal.fire({
            title: "Are you sure to delete this student?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                let res = await fetch(`https://65a7e5e694c2c5762da7dbb8.mockapi.io/student/${student.id}`, {
                    method: 'DELETE'
                })
                let data = await res.json()
                if (data) {
                    setSelectedStudent(data)
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            }
        });
    }
    const handleModify = (student) => {
        setShow(true)
        setStudentId(student?.id)
    }
    const handleNextPage = () => {
        setFilters({
            ...filters,
            page: Number(filters.page) + 1,
            direction: 'next'
        })
    }
    const handlePreviousPage = () => {
        if (Number(filters.page) > 1) {
            setFilters({
                ...filters,
                page: Number(filters.page) - 1,
                direction: 'pre'
            })
        }
    }
    const handleChangePageSize = (e) => {
        setFilters({
            ...filters,
            limit: Number(e.target.value)
        })
    }
    const handleChangeField = (e) => {
        setFilters({
            ...filters,
            sort: e.target.value
        })
        console.log(e.target.value);
    }
    return (
        <>
            <div className="d-flex align-items-center justify-content-between my-2">
                <form className="d-flex align-items-center w-50">
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="search..."
                    />
                    <FaSearch size={20} className="text-secondary" style={{ marginLeft: '-23px' }} />
                </form>
                <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center me-2">
                        <span className="me-2">Field</span>
                        <select className="form-select form-select-sm"
                            defaultValue={'fullname'}
                            onChange={e => handleChangeField(e)}
                        >
                            <option value="fullname">Fullname</option>
                            <option value="email">Email</option>
                        </select>
                    </div>
                    <div className="d-flex align-items-center">
                        <span className="me-2">Sort</span>
                        <select className="form-select form-select-sm">
                            <option value="asc">Asc</option>
                            <option value="desc">Desc</option>
                        </select>
                    </div>
                </div>
            </div>
            {
                loading ? <Spinner /> : (
                    <table className="table table-striped table-hover table-bordered rounded-3 overflow-hidden">
                        <thead className="table-secondary ">
                            <tr>
                                <th className="text-center">#ID</th>
                                <th className="text-center">Fullname</th>
                                <th className="text-center">Date of Birth</th>
                                <th className="text-center">Email</th>
                                <th className="text-center">Mobile</th>
                                <th className="text-center">Department</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                studentList?.map((student) => (
                                    <tr key={student.id}>
                                        <td className="align-middle">{student.id}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <img className="avatar-sm me-2" src={student.avatarUrl} alt="" />
                                                <div className="d-flex flex-column">
                                                    <Link to={`/student/${student.id}`}>{student.fullname}</Link>
                                                    {Boolean(student.gender) ? <TbGenderMale className="text-primary" /> : <TbGenderFemme className="text-warning" />}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-end align-middle">{dayjs(student.dob).format('MMM DD YYYY')}</td>
                                        <td className="text-end align-middle">{student.email}</td>
                                        <td className="text-end align-middle">{student.mobile}</td>
                                        <td className="text-end align-middle">{student.department.name}</td>
                                        <td>
                                            <div>
                                                <FaUserPlus size={20} className="text-danger" role="button" title="Remove"
                                                    onClick={() => handleRemove(student)}
                                                />
                                                <FaUserCog size={20} className="text-primary" role="button" title="Modify student"
                                                    onClick={() => handleModify(student)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }
            <div className="d-flex align-items-center justify-content-between">
                <ul className="pagination">
                    <li className={`page-item ${filters.direction === 'pre' ? 'active' : ''} ${filters.page < -1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={handlePreviousPage}>Previous</button>
                    </li>
                    <li className={`page-item ${filters.direction === 'next' ? 'active' : ''}`}>
                        <button className="page-link" onClick={handleNextPage}>Next</button>
                    </li>
                </ul>
                <div className="d-flex align-items-center">
                    <span style={{ width: '150px' }}>Items per page</span>
                    <select className="form-select form-select-sm"
                        style={{ width: '60px' }}
                        defaultValue={5}
                        onChange={e => handleChangePageSize(e)}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                    </select>
                </div>
            </div>
            <ModifyStudent show={show} setShow={setShow} studentId={studentId} setStudentId={setStudentId} />
        </>
    )
} 