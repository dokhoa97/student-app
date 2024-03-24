import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { FaSave, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import Spinner from "../spinner/Spinner";
const schema = yup.object({
    fullname: yup.string().required('Vui lòng nhập trường này'),
    dob: yup.date().required().typeError('Vui lòng nhập trường này'),
    mobile: yup.string().required('Vui lòng nhập trường này'),
    email: yup.string().email().required('Vui lòng nhập trường này'),
    department: yup.string().required('Vui lòng nhập trường này'),
    avatarUrl: yup.string().required('Vui lòng nhập trường này'),
    gender: yup.bool().required()
})
export default function ModifyStudent({ show, setShow, studentId, setStudentId }) {
    const [currentStudent, setCurrentStudent] = useState([])
    const [loading, setLoading] = useState(false)
    const [departmentList, setDepartmentList] = useState([])
    const [newAvatarUrl, setNewAvatarUrl] = useState(null)
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    useEffect(() => {
        setLoading(true)
        async function getCurrentStudent() {
            let res = await fetch(`http://localhost:8000/student/${studentId}`, {
                method: 'GET'
            })
            let data = await res.json()
            setValue('fullname', data?.fullname)
            setValue('mobile', data?.mobile)
            setValue('email', data?.email)
            setValue('avatarUrl', data?.avatarUrl)
            setValue('gender', Boolean(data?.gender))
            setValue('department', JSON.stringify(data?.department))
            setValue('dob', dayjs(data?.dob).format('YYYY-MM-DD'))
            setCurrentStudent(data)
            setLoading(false)
        }
        getCurrentStudent()
    }, [studentId])
    useEffect(() => {
        async function getData() {
            let res = await fetch('https://65a7e5e694c2c5762da7dbb8.mockapi.io/department')
            let data = await res.json()
            setDepartmentList(data)
        }
        getData()
    }, [])
    const handleCloseModal = () => {
        setShow(false)
        setNewAvatarUrl(null)
    }
    const handleUpdateStudent = async (values) => {
        values = {
            ...values,
            department: JSON.parse(values.department)
        }
        try {
            let res = await fetch(`http://localhost:8000/student/${studentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            let result = await res.json()
            if (Object.keys(result).length) {
                toast.success('Student updated succeed')
                handleCloseModal(false)
                setNewAvatarUrl(null)
                setStudentId(null)
            }
        } catch (error) {
            toast.error(' Can not update student , please try again')
        }

    }
    return (
        <Modal
            show={show}
            onHide={setShow}
            backdrop="static"
            keyboard={false}
            size="xl"
        >
            <Modal.Header closeButton>
                <Modal.Title> {currentStudent?.fullname}</Modal.Title>
            </Modal.Header>
            <form action="" onSubmit={handleSubmit(handleUpdateStudent)}>
                <Modal.Body>
                    {
                        loading ? <Spinner /> : (
                            <div className="row">
                                <div className="col-md-5 col-lg-5 col-sm-12 ">
                                    <div className="form-group mb-2">
                                        <label htmlFor="" className="form-label">Fullname</label>
                                        <input
                                            type="text"
                                            className={`${errors.fullname?.message ? 'is-invalid' : ''} form-control form-control-sm`}
                                            placeholder="fullname..."
                                            {...register('fullname')}
                                        />
                                        <span className="invalid-feedback">{errors.fullname?.message}</span>
                                    </div>
                                    <div className="form-group mb-2">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">Date of birth</label>
                                                <input
                                                    type="date"
                                                    className={`${errors.dob?.message ? 'is-invalid' : ''} form-control form-control-sm`}
                                                    {...register('dob')}
                                                />
                                                <span className="invalid-feedback">{errors.dob?.message}</span>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="" className="form-label">Gender</label>
                                                <div>
                                                    {
                                                        currentStudent?.gender ? (
                                                            <>
                                                                <div className="form-check form-check-inline">
                                                                    <input
                                                                        checked
                                                                        value={true}
                                                                        type="radio"
                                                                        className="form-check-input"
                                                                        {...register('gender')}
                                                                    />
                                                                    <label htmlFor="" className="form-check-label">Male</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input
                                                                        value={false}
                                                                        type="radio"
                                                                        className="form-check-input"
                                                                        {...register('gender')}
                                                                    />
                                                                    <label htmlFor="" className="form-check-label">Female</label>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="form-check form-check-inline">
                                                                    <input
                                                                        value={true}
                                                                        type="radio"
                                                                        className="form-check-input"
                                                                        {...register('gender')}
                                                                    />
                                                                    <label htmlFor="" className="form-check-label">Male</label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <input
                                                                        checked
                                                                        value={false}
                                                                        type="radio"
                                                                        className="form-check-input"
                                                                        {...register('gender')}
                                                                    />
                                                                    <label htmlFor="" className="form-check-label">Female</label>
                                                                </div>

                                                            </>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="" className="form-label">Mobile</label>
                                        <input
                                            type="tel"
                                            className={`${errors.mobile?.message ? 'is-invalid' : ''} form-control form-control-sm`}
                                            placeholder="0123-456-789"
                                            {...register('mobile')}
                                        />
                                    </div>
                                    <span className="invalid-feedback">{errors.mobile?.message}</span>
                                </div>
                                <div className="col-md-4  col-sm-12 ">
                                    <div className="form-group mb-2">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className={`${errors.email?.message ? 'is-invalid' : ''} form-control form-control-sm`}
                                            placeholder="abc@gmail.com"
                                            {...register('email')}
                                        />
                                        <span className="invalid-feedback">{errors.email?.message}</span>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="" className="form-label">Department</label>
                                        <select name="" id="" className={`${errors.department?.message ? 'is-invalid' : ''} form-select`}
                                            {...register('department')}
                                        >
                                            {
                                                departmentList?.map((depart) => (
                                                    <option value={JSON.stringify(depart)} key={depart.id}>{depart.name}</option>
                                                ))
                                            }
                                        </select>
                                        <span className="invalid-feedback">{errors.department?.message}</span>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="" className="form-label">Avatar Url</label>
                                        <input
                                            type="url"
                                            className={`${errors.avatarUrl?.message ? 'is-invalid' : ''} form-control form-control-sm`}
                                            {...register('avatarUrl')}
                                            onChange={(e) => setNewAvatarUrl(e.target.value)}
                                        />
                                        <span className="invalid-feedback">{errors.avatarUrl?.message}</span>
                                    </div>
                                </div>
                                <div className="col-md-3  col-sm-12">
                                    <img src={newAvatarUrl || currentStudent?.avatarUrl} alt="" className="w-100 rounded" />
                                </div>
                            </div>
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                        <FaTimes className="me-2" size={20} />
                        Close
                    </button>
                    <button className="btn btn-primary" type="submit">
                        <FaSave size={20} className="me-2" />
                        Save
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}