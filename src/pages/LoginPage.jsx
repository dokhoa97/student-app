import { FaUserShield } from "react-icons/fa";
import AccountLayout from "../Layouts/AccountLayout";
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import Spinner from "../components/spinner/Spinner";
const schema = yup.object({
    email: yup.string().required('Vui lòng nhập trường này'),
    password: yup.string().required('Vui lòng nhập trường này'),

})
export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: "eve.holt@reqres.in",
            password: 'cityslicka'
        }
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleLogin = async (values) => {
        try {
            setLoading(true)
            let res = await fetch('https://reqres.in/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            let data = await res.json()
            if (data?.token) {
                let date = new Date()
                let expires = date.setMinutes(date.getMinutes() + 5)
                document.cookie = `token=${data?.token};expires=${new Date(expires).toUTCString()}`
                navigate('/student', { replace: true })
            }
            if (data?.error) {
                toast.error('User not found')
            }
            setLoading(false)
        } catch (error) {

        }
    }
    return (
        <AccountLayout>
            {
                loading ? <Spinner /> : (
                    <div className="login-page d-flex flex-column align-items-center justify-content-center">
                        <h6 className="mb-4">
                            <FaUserShield className="me-2" size={40} />
                            Student App
                        </h6>
                        <form onSubmit={handleSubmit(handleLogin)} className="w-100">
                            <div className="form-group mb-4">
                                <label htmlFor="" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className={`${errors.email?.message ? 'is-invalid' : ''} form-control`}
                                    {...register('email')}
                                />
                                <span className="invalid-feedback">{errors.email?.message}</span>
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className={`${errors.password?.message ? 'is-invalid' : ''} form-control`}
                                    {...register('password')}
                                />
                                <span className="invalid-feedback">{errors.password?.message}</span>
                            </div>
                            <div className="form-group mb-4 d-flex">
                                <input type="submit" className="btn btn-primary flex-grow-1" />
                            </div>
                            <div className="form-group mb-4 d-flex justify-content-center">
                                <Link to={'/'}>Forgot Password</Link>
                            </div>
                        </form>
                    </div>
                )
            }
        </AccountLayout>
    )
}