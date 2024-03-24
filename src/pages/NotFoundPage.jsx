import { FaBackward, FaQuestionCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
    const navigate = useNavigate()
    return (
        <div className="vh-100 w-100 d-flex flex-column align-items-center justify-content-center ">
            <FaQuestionCircle size={100} className="text-warning" />
            <h1>Access Denied</h1>
            <p>Oop!We could not in find the page that you are looking for.</p>
            <p>Okease check the address and try again</p>
            <button onClick={() => navigate(-1)} className="btn btn-outline-warning d-flex align-items-center">
                <FaBackward className="me-2" />
                Back to previous page
            </button>
        </div>
    )
}