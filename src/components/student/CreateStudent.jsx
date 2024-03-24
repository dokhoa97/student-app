import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserPlus, FaTimes } from "react-icons/fa";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const schema = yup.object({
    fullname: yup.string().required('Vui lòng nhập trường này'),
    dob: yup.date().required().typeError('Vui lòng nhập trường này'),
    mobile: yup.string().required('Vui lòng nhập trường này'),
    email: yup.string().email().required('Vui lòng nhập trường này'),
    department: yup.string().required('Vui lòng nhập trường này'),
    avatarUrl: yup.string().required('Vui lòng nhập trường này'),
    gender: yup.bool().required()
})
export default function CreateStudent() {
    const [departmentList, setDepartmentList] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        async function getData() {
            let res = await fetch('http://localhost:8000/department')
            let data = await res.json()
            setDepartmentList(data)
        }
        getData()
    }, [])

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })
    const [isCreating, setIsCreating] = useState(false)
    const hanleCreate = async (data) => {
        data = {
            ...data,
            department: data.department && JSON.parse(data.department)
        }
        try {
            setIsCreating(true)
            let res = await fetch('http://localhost:8000/student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            let result = await res.json()
            if (result) {
                reset()
                toast.success('Student create successed')
                navigate('/student/list')
            }
            setIsCreating(false)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form className="border rounded p-2" onSubmit={handleSubmit(hanleCreate)}>
            <div className="row">
                <div className="col-md-6 col-lg-6 col-sm-12">
                    <div className="form-group mb-2">
                        <label className="form-label">Fullname</label>
                        <input
                            type="text"
                            className={`${errors.fullname?.message ? 'is-invalid' : ''} form-control`}
                            placeholder="fullname...."
                            {...register('fullname')}
                        />
                        <span className="invalid-feedback">{errors.fullname?.message}</span>
                    </div>
                    <div className="form-group mb-2">
                        <div className="row">
                            <div className="col-md-6">
                                <label className="form-label">Date of birth</label>
                                <input
                                    type="date"
                                    className={`${errors.fullname?.message ? 'is-invalid' : ''} form-control`}
                                    {...register('dob')}
                                />
                                <span className="invalid-feedback">{errors.dob?.message}</span>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Gender</label>
                                <div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            value={true}
                                            type="radio"
                                            className={`${errors.gender?.message ? 'is-invalid' : ''} form-check-input`}
                                            {...register('gender')}
                                        />
                                        <label htmlFor="" className="form-check-label">Male</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            value={false}
                                            type="radio"
                                            className={`${errors.gender?.message ? 'is-invalid' : ''} form-check-input`}
                                            {...register('gender')}
                                        />
                                        <label htmlFor="" className="form-check-label">Female</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group mb-2">
                        <label className="form-label">Mobile</label>
                        <input
                            type="tel"
                            className={`${errors.mobile?.message ? 'is-invalid' : ''} form-control`}
                            placeholder="01234..."
                            {...register('mobile')}
                        />
                        <span className="invalid-feedback">{errors.mobile?.message}</span>
                    </div>
                </div>
                <div className="col-md-6 col-lg-6 col-sm-12">
                    <div className="form-group mb-2">
                        <label className="form-label">Email</label>
                        <input
                            type="text"
                            className={`${errors.email?.message ? 'is-invalid' : ''} form-control`}
                            placeholder="abc@gmail.com"
                            {...register('email')}
                        />
                        <span className="invalid-feedback">{errors.email?.message}</span>
                    </div>
                    <div className="form-group mb-2">
                        <label className="form-label">Department</label>
                        <select className={`${errors.department?.message ? 'is-invalid' : ''} form-select`} defaultValue=""
                            {...register('department')}
                        >
                            <option value="" disabled>Please select a department</option>
                            {
                                departmentList?.map((depart) => (
                                    <option value={JSON.stringify(depart)} key={depart.id}>{depart.name}</option>
                                ))
                            }
                        </select>
                        <span className="invalid-feedback">{errors.department?.message}</span>
                    </div>
                    <div className="form-group mb-2">
                        <label className="form-label">Avatar URL</label>
                        <input
                            type="text"
                            className={`${errors.avatarUrl?.message ? 'is-invalid' : ''} form-control`}
                            placeholder="avatarURL..."
                            {...register('avatarUrl')}
                        />
                        <span className="invalid-feedback">{errors.avatarUrl?.message}</span>
                    </div>
                    <div className="form-group mb-2">
                        <label className="form-label"></label>
                        <div className="d-flex">
                            {
                                isCreating ? (<>
                                    <button className="btn btn-sm btn-success d-flex align-items-center justify-content-center flex-grow-1 me-2" disabled>
                                        <FaUserPlus className="me-2" />
                                        Creating
                                    </button>
                                </>) : (
                                    <button type="submit" className="btn btn-sm btn-success d-flex align-items-center justify-content-center flex-grow-1 me-2">
                                        <FaUserPlus className="me-2" />
                                        Create
                                    </button>
                                )
                            }
                            <button type="button" className="btn btn-sm btn-dark d-flex align-items-center justify-content-center flex-grow-1"
                                onClick={() => reset()}
                            >
                                <FaTimes className="me-2" />
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}