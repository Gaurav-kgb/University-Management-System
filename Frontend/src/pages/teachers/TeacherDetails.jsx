import { useEffect, useState } from "react";
import "../../styles/Teacher.css";

function TeacherDetails() {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTeachers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://university-management-system-kx5w.onrender.com/api/teachers"
      );

      if (!response.ok) {
        throw new Error(
          "Unable to load teachers"
        );
      }

      const data = await response.json();

      setTeachers(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load teacher details."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  const handleDelete = async (empId) => {
    const confirmed = window.confirm(
      `Delete teacher ${empId}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `https://university-management-system-kx5w.onrender.com/api/teachers/${encodeURIComponent(
          empId
        )}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setTeachers((oldTeachers) =>
          oldTeachers.filter(
            (teacher) =>
              teacher.empId !== empId
          )
        );
      } else {
        alert(
          data.message ||
            "Unable to delete teacher."
        );
      }
    } catch (err) {
      console.error(err);

      alert(
        "Unable to connect to backend."
      );
    }
  };

  const filteredTeachers =
    teachers.filter((teacher) => {
      const value =
        search.toLowerCase().trim();

      if (!value) {
        return true;
      }

      return (
        (teacher.name || "")
          .toLowerCase()
          .includes(value) ||
        (teacher.empId || "")
          .toLowerCase()
          .includes(value) ||
        (teacher.department || "")
          .toLowerCase()
          .includes(value) ||
        (teacher.email || "")
          .toLowerCase()
          .includes(value)
      );
    });

  return (
    <div className="teacher-page">
      <div className="teacher-heading">
        <h1>Teacher Details</h1>

        <p>
          View university faculty records
        </p>
      </div>

      <div className="teacher-form-card">
        <div className="teacher-form-group">
          <label>Search Teacher</label>

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search by name, employee ID, department or email"
          />
        </div>
      </div>

      {loading && (
        <div className="teacher-form-card">
          Loading teachers...
        </div>
      )}

      {error && (
        <div className="teacher-error">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div
          className="teacher-form-card"
          style={{ overflowX: "auto" }}
        >
          <table className="teacher-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Father Name</th>
                <th>DOB</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Class X</th>
                <th>Class XII</th>
                <th>Aadhar</th>
                <th>Education</th>
                <th>Department</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map(
                  (teacher) => (
                    <tr key={teacher.empId}>
                      <td>{teacher.empId}</td>
                      <td>{teacher.name}</td>
                      <td>{teacher.fname}</td>
                      <td>{teacher.dob}</td>
                      <td>{teacher.phone}</td>
                      <td>{teacher.email}</td>
                      <td>{teacher.class_x}</td>
                      <td>{teacher.class_xii}</td>
                      <td>{teacher.aadhar}</td>
                      <td>
                        {teacher.education}
                      </td>
                      <td>
                        {teacher.department}
                      </td>
                      <td>{teacher.address}</td>

                      <td>
                        <button
                          type="button"
                          className="teacher-delete"
                          onClick={() =>
                            handleDelete(
                              teacher.empId
                            )
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan="13">
                    No teachers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TeacherDetails;