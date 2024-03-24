import { PiStudent } from "react-icons/pi";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
export default function Header() {
    const navigate = useNavigate()
    const handleSignout = () => {
        navigate('/login', { replace: true })
    }
    return (
        <nav className="navbar navbar-exoand-lg">
            <div className="container border-bottom">
                <Link to={'/'} className="navbar-brand d-flex align-items-center">
                    <PiStudent size={40} className="me-4" />
                    Student App
                </Link>
                <button onClick={handleSignout} className="btn btn-signout d-flex align-items-center">
                    <FaSignOutAlt className="me-2" size={20} />
                    Sign Out
                </button>
            </div>
        </nav>
    )
} 