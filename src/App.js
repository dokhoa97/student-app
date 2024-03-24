import { Route, Routes } from "react-router-dom";
import DepartmentPage from "./pages/DepartmentPage";
import StudentPage from "./pages/StudentPage"
import StudentList from "./components/student/StudentList";
import CreateStudent from "./components/student/CreateStudent";
import StudentDetail from "./components/student/StudentDetail";
import LoginPage from "./pages/LoginPage";
import NotPermission from "./pages/NotPermissionPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/dashboard' element={<DepartmentPage />} />
        <Route path='/student' element={<StudentPage />} >
          <Route index element={<StudentList />} />
          <Route path="list" element={<StudentList />} />
          <Route path="create" element={<CreateStudent />} />
          <Route path=":studentId" element={<StudentDetail />} />
        </Route>
        <Route path="/not-permission" element={<NotPermission />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App;
