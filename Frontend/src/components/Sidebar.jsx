import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-brand">
        <span>🎓</span>
        <h2>UMS</h2>
      </div>

      <nav>

        <NavLink to="/dashboard">
          🏠 Dashboard
        </NavLink>

        <p className="menu-title">STUDENTS</p>

        <NavLink to="/students/add">
          ➕ Add Student
        </NavLink>

        <NavLink to="/students/details">
          👨‍🎓 Student Details
        </NavLink>

        <NavLink to="/students/update">
          ✏️ Update Student
        </NavLink>

        <NavLink to="/students/leave">
          📅 Apply Leave
        </NavLink>

        <NavLink to="/students/leave-details">
          📋 Leave Details
        </NavLink>

        <p className="menu-title">TEACHERS</p>

        <NavLink to="/teachers/add">
          ➕ Add Teacher
        </NavLink>

        <NavLink to="/teachers/details">
          👨‍🏫 Teacher Details
        </NavLink>

        <NavLink to="/teachers/leave">
          📅 Teacher Leave
        </NavLink>

        <NavLink to="/teachers/leave-details">
          📋 Leave Details
        </NavLink>

        <p className="menu-title">ACADEMIC</p>

        <NavLink to="/examination/marks">
          📝 Enter Marks
        </NavLink>

        <NavLink to="/examination/details">
          📊 Examination Details
        </NavLink>

        <p className="menu-title">FEES</p>

        <NavLink to="/fees/structure">
          💳 Fee Structure
        </NavLink>

        <NavLink to="/fees/student">
          💰 Student Fee
        </NavLink>

        <NavLink to="/about">
          ℹ️ About
        </NavLink>

      </nav>

    </aside>
  );
}

export default Sidebar;
