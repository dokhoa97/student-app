import { MdDashboard } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { NavLink } from "react-router-dom";
export default function Sidebar() {
    return (
        <aside className="me-2" style={{ minWidth: '200px', height: '500px' }}>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <NavLink to={'/dashboard'} className="nav-link">
                        <MdDashboard className="me-2" size={20} />
                        Dashboard
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={'/student'} className="nav-link">
                        <PiStudent className="me-2" size={20} />
                        Student
                    </NavLink>
                </li>
            </ul>
        </aside>
    )
}