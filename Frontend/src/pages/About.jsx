import "../styles/About.css";

function About() {
  return (
    <div className="about-page">

      <div className="about-heading">

        <h1>About</h1>

        <p>
          University Management System information
        </p>

      </div>

      <div className="about-hero">

        <div className="about-logo">
          🎓
        </div>

        <h1>
          University Management System
        </h1>

        <p>
          A modern web-based application designed
          to manage university academic and
          administrative activities efficiently.
        </p>

      </div>

      <div className="about-grid">

        <div className="about-card">
          <span>👨‍🎓</span>
          <h3>Student Management</h3>
          <p>
            Add, view and update student records,
            personal details and academic information.
          </p>
        </div>

        <div className="about-card">
          <span>👨‍🏫</span>
          <h3>Teacher Management</h3>
          <p>
            Manage faculty information,
            departments, qualifications and leave
            applications.
          </p>
        </div>

        <div className="about-card">
          <span>📝</span>
          <h3>Examination</h3>
          <p>
            Enter student marks and manage
            examination results.
          </p>
        </div>

        <div className="about-card">
          <span>📅</span>
          <h3>Leave Management</h3>
          <p>
            Manage student and teacher leave
            applications.
          </p>
        </div>

        <div className="about-card">
          <span>💳</span>
          <h3>Fee Management</h3>
          <p>
            View fee structures and record
            student fee payments.
          </p>
        </div>

        <div className="about-card">
          <span>🔐</span>
          <h3>Secure Access</h3>
          <p>
            Protected dashboard pages ensure
            authenticated users can securely access
            the system.
          </p>
        </div>

      </div>

      {/* Technologies */}

      <div className="technology-card">

        <h2>Technologies Used</h2>

        <div className="technology-list">

          <span>Java</span>

          <span>Core Java</span>

          <span>React.js</span>

          <span>JavaScript</span>

          <span>HTML5</span>

          <span>CSS3</span>

          <span>MySQL</span>

          <span>JDBC</span>

          <span>REST API</span>

          <span>Apache Ant</span>

        </div>

      </div>

      {/* Project Architecture */}

      <div className="about-project">

        <h2>Project Architecture</h2>

        <div className="architecture">

          {/* React */}

          <div className="architecture-card">

            <span className="architecture-icon">
              ⚛️
            </span>

            <strong>React.js</strong>

            <small>Frontend</small>

          </div>

          <span className="architecture-arrow">
            →
          </span>

          {/* Core Java */}

          <div className="architecture-card backend-card">

            <span className="architecture-icon">
              ☕
            </span>

            <strong>Core Java</strong>

            <small>REST API (HttpServer)</small>

          </div>

          <span className="architecture-arrow">
            →
          </span>

          {/* DAO */}

          <div className="architecture-card">

            <span className="architecture-icon">
              🧩
            </span>

            <strong>DAO + JDBC</strong>

            <small>Database Layer</small>

          </div>

          <span className="architecture-arrow">
            →
          </span>

          {/* MySQL */}

          <div className="architecture-card">

            <span className="architecture-icon">
              🗄️
            </span>

            <strong>MySQL</strong>

            <small>Database</small>

          </div>

        </div>

      </div>

    </div>
  );
}

export default About;