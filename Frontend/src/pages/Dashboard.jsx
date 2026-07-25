import "../styles/Pages.css";

function Dashboard() {
  return (
    <div>

      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome to University Management System</p>
      </div>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <span>🎓</span>
          <div>
            <h2>1,250</h2>
            <p>Total Students</p>
          </div>
        </div>

        <div className="dashboard-card">
          <span>👨‍🏫</span>
          <div>
            <h2>85</h2>
            <p>Total Teachers</p>
          </div>
        </div>

        <div className="dashboard-card">
          <span>📚</span>
          <div>
            <h2>32</h2>
            <p>Courses</p>
          </div>
        </div>

        <div className="dashboard-card">
          <span>📝</span>
          <div>
            <h2>12</h2>
            <p>Examinations</p>
          </div>
        </div>

      </div>

      <div className="welcome-box">

        <h2>Welcome, Admin 👋</h2>

        <p>
          Manage students, teachers, examinations,
          leaves and university fees from this dashboard.
        </p>

      </div>

    </div>
  );
}

export default Dashboard;