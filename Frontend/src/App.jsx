import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import AddStudent from "./pages/students/AddStudent";
import StudentDetails from "./pages/students/StudentDetails";
import UpdateStudent from "./pages/students/UpdateStudent";
import StudentLeave from "./pages/students/StudentLeave";
import StudentLeaveDetails from "./pages/students/StudentLeaveDetails";

import AddTeacher from "./pages/teachers/AddTeacher";
import TeacherDetails from "./pages/teachers/TeacherDetails";
import TeacherLeave from "./pages/teachers/TeacherLeave";
import TeacherLeaveDetails from "./pages/teachers/TeacherLeaveDetails";

import EnterMarks from "./pages/examination/EnterMarks";
import ExaminationDetails from "./pages/examination/ExaminationDetails";

import FeeStructure from "./pages/fees/FeeStructure";
import StudentFeeForm from "./pages/fees/StudentFeeForm";

import About from "./pages/About";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/students/add" element={<AddStudent />} />
          <Route path="/students/details" element={<StudentDetails />} />
          <Route path="/students/update" element={<UpdateStudent />} />
          <Route path="/students/leave" element={<StudentLeave />} />
          <Route
            path="/students/leave-details"
            element={<StudentLeaveDetails />}
          />

          <Route path="/teachers/add" element={<AddTeacher />} />
          <Route path="/teachers/details" element={<TeacherDetails />} />
          <Route path="/teachers/leave" element={<TeacherLeave />} />
          <Route
            path="/teachers/leave-details"
            element={<TeacherLeaveDetails />}
          />

          <Route path="/examination/marks" element={<EnterMarks />} />
          <Route
            path="/examination/details"
            element={<ExaminationDetails />}
          />

          <Route path="/fees/structure" element={<FeeStructure />} />
          <Route path="/fees/student" element={<StudentFeeForm />} />

          <Route path="/about" element={<About />} />

        </Route>
      </Route>

      {/* First page = Login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Invalid URL */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}

export default App;