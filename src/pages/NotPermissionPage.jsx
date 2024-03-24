import { FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NotPermission() {
    return (
        <div className="vh-100 w-100 d-flex flex-column align-items-center justify-content-center ">
            <FaTimesCircle size={100} className="text-danger" />
            <h1>Access Denied</h1>
            <p>You do not have permission to access this page</p>
            <p>Please <Link to={'/login'}>Signin</Link> and try again</p>
        </div>
    )
}