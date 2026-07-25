import { useEffect, useState } from "react";
import "../../styles/Student.css";

function StudentDetails() {

  // ==========================================
  // STATE
  // ==========================================

  const [students, setStudents] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [message, setMessage] = useState("");


  // ==========================================
  // LOAD STUDENTS FROM BACKEND
  // GET /api/students
  // ==========================================

  const loadStudents = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:8080/api/students"
      );

      if (!response.ok) {

        throw new Error(
          `Server returned ${response.status}`
        );
      }

      const data = await response.json();

      console.log(
        "Students received:",
        data
      );

      if (Array.isArray(data)) {

        setStudents(data);

      } else {

        setStudents([]);

        setError(
          "Invalid student data received from server."
        );
      }

    } catch (err) {

      console.error(
        "Error loading students:",
        err
      );

      setError(
        "Unable to load student details."
      );

    } finally {

      setLoading(false);
    }
  };


  // ==========================================
  // LOAD WHEN PAGE OPENS
  // ==========================================

  useEffect(() => {

    loadStudents();

  }, []);


  // ==========================================
  // DELETE STUDENT
  // DELETE /api/students/{rollno}
  // ==========================================

  const handleDelete = async (rollno) => {

    const confirmed = window.confirm(
      `Are you sure you want to delete student ${rollno}?`
    );

    if (!confirmed) {
      return;
    }

    try {

      setError("");
      setMessage("");

      const response = await fetch(
        `http://localhost:8080/api/students/${encodeURIComponent(
          rollno
        )}`,
        {
          method: "DELETE",
        }
      );


      // Read response safely
      const text = await response.text();

      let data = {};

      if (text) {

        try {

          data = JSON.parse(text);

        } catch {

          console.log(
            "Delete response:",
            text
          );
        }
      }


      if (response.ok) {

        // Remove deleted student from UI
        setStudents((currentStudents) =>
          currentStudents.filter(
            (student) =>
              student.rollno !== rollno
          )
        );

        setMessage(
          `Student ${rollno} deleted successfully.`
        );

      } else {

        setError(
          data.message ||
          "Unable to delete student."
        );
      }

    } catch (err) {

      console.error(
        "Delete student error:",
        err
      );

      setError(
        "Unable to connect to backend server."
      );
    }
  };


  // ==========================================
  // SEARCH / FILTER
  // ==========================================

  const filteredStudents = students.filter(
    (student) => {

      const searchValue =
        search.toLowerCase().trim();

      if (!searchValue) {
        return true;
      }


      const rollno =
        String(student.rollno || "")
          .toLowerCase();

      const name =
        String(student.name || "")
          .toLowerCase();

      const course =
        String(student.course || "")
          .toLowerCase();

      const branch =
        String(student.branch || "")
          .toLowerCase();

      const email =
        String(student.email || "")
          .toLowerCase();


      return (
        rollno.includes(searchValue) ||
        name.includes(searchValue) ||
        course.includes(searchValue) ||
        branch.includes(searchValue) ||
        email.includes(searchValue)
      );
    }
  );


  // ==========================================
  // JSX
  // ==========================================

  return (

    <div className="student-page">


      {/* ======================================
          PAGE HEADING
      ====================================== */}

      <div className="student-heading">

        <h1>
          Student Details
        </h1>

        <p>
          View and manage registered university students
        </p>

      </div>


      {/* ======================================
          STATISTICS
      ====================================== */}

      <div className="student-stats">


        <div className="student-stat-card">

          <span>
            Total Students
          </span>

          <strong>
            {students.length}
          </strong>

        </div>


        <div className="student-stat-card">

          <span>
            Showing Records
          </span>

          <strong>
            {filteredStudents.length}
          </strong>

        </div>


      </div>


      {/* ======================================
          SUCCESS MESSAGE
      ====================================== */}

      {message && (

        <div className="student-success">

          ✓ {message}

        </div>

      )}


      {/* ======================================
          ERROR MESSAGE
      ====================================== */}

      {error && (

        <div className="student-error">

          {error}

        </div>

      )}


      {/* ======================================
          MAIN CARD
      ====================================== */}

      <div className="student-card">


        {/* ====================================
            CARD HEADER + SEARCH
        ==================================== */}

        <div className="student-toolbar">


          <div>

            <div className="student-section-title">

              Students

            </div>

          </div>


          <div className="student-search">

            <input
              type="text"
              value={search}
              onChange={(e) => {

                setSearch(
                  e.target.value
                );

                setMessage("");

              }}
              placeholder="Search name, roll number, course, branch..."
            />

          </div>


        </div>


        {/* ====================================
            LOADING
        ==================================== */}

        {loading && (

          <div className="student-info">

            Loading student records...

          </div>

        )}


        {/* ====================================
            TABLE
        ==================================== */}

        {!loading && (

          <div className="student-table-container">

            <table className="student-table">


              {/* ==============================
                  TABLE HEADER
              ============================== */}

              <thead>

                <tr>

                  <th>
                    #
                  </th>

                  <th>
                    Roll No.
                  </th>

                  <th>
                    Student Name
                  </th>

                  <th>
                    Course
                  </th>

                  <th>
                    Branch
                  </th>

                  <th>
                    Email
                  </th>

                  <th>
                    Phone
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              {/* ==============================
                  TABLE BODY
              ============================== */}

              <tbody>


                {filteredStudents.length > 0 ? (

                  filteredStudents.map(
                    (student, index) => (

                      <tr
                        key={
                          student.rollno ||
                          index
                        }
                      >


                        {/* SERIAL NUMBER */}

                        <td>

                          {index + 1}

                        </td>


                        {/* ROLL NUMBER */}

                        <td>

                          <strong>

                            {student.rollno || "-"}

                          </strong>

                        </td>


                        {/* STUDENT NAME */}

                        <td>

                          {student.name || "-"}

                        </td>


                        {/* COURSE */}

                        <td>

                          {student.course || "-"}

                        </td>


                        {/* BRANCH */}

                        <td>

                          {student.branch || "-"}

                        </td>


                        {/* EMAIL */}

                        <td>

                          {student.email || "-"}

                        </td>


                        {/* PHONE */}

                        <td>

                          {student.phone || "-"}

                        </td>


                        {/* ACTION */}

                        <td>

                          <div className="student-action-buttons">

                            <button
                              type="button"
                              className="student-delete"
                              onClick={() =>
                                handleDelete(
                                  student.rollno
                                )
                              }
                            >

                              Delete

                            </button>

                          </div>

                        </td>


                      </tr>

                    )
                  )

                ) : (

                  // ============================
                  // NO STUDENTS
                  // ============================

                  <tr>

                    <td
                      colSpan="8"
                      className="student-empty"
                    >

                      {search
                        ? "No students match your search."
                        : "No student records found."}

                    </td>

                  </tr>

                )}


              </tbody>


            </table>

          </div>

        )}


      </div>


    </div>
  );
}

export default StudentDetails;