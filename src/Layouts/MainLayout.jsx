import { useEffect } from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

export default function MainLayout({ children }) {
    const navigate = useNavigate()
    const getToken = () => {
        const obj = {}
        const [key, value] = document.cookie.split('=')
        obj[key] = value
        return obj
    }
    getToken()
    let token = getToken()
    useEffect(() => {
        if (!token || !token.token) {
            navigate('/not-permission')
        }
    }, [token])
    return (
        <div className="container">
            <Header />
            <div className="container d-flex">
                <Sidebar />
                <div className="flex-grow-1">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    )
}