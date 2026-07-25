import { useEffect, useState } from "react";
import "../../styles/Teacher.css";
import "../../styles/TeacherLeave.css";

function TeacherLeaveDetails() {
  const [leaves, setLeaves] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadLeaves = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:8080/api/teacher-leaves"
      );

      if (!response.ok) {
        throw new Error(
          "Unable to load leave details"
        );
      }

      const data =
        await response.json();

      setLeaves(
        Array.isArray(data) ? data : []
      );
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load teacher leave details."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  const filteredLeaves =
    leaves.filter((leave) => {
      const value =
        search.toLowerCase().trim();

      if (!value) {
        return true;
      }

      return (
        (leave.employeeId || "")
          .toLowerCase()
          .includes(value) ||
        (leave.teacherName || "")
          .toLowerCase()
          .includes(value) ||
        (leave.department || "")
          .toLowerCase()
          .includes(value) ||
        (leave.leaveType || "")
          .toLowerCase()
          .includes(value)
      );
    });

  return (
    <div className="teacher-page">
      <div className="teacher-heading">
        <h1>Teacher Leave Details</h1>

        <p>
          View faculty leave applications
        </p>
      </div>

      <div className="teacher-form-card">
        <div className="teacher-form-group">
          <label>
            Search Leave Record
          </label>

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search employee ID, teacher name, department..."
          />
        </div>
      </div>

      {loading && (
        <div className="teacher-form-card">
          Loading leave records...
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
                <th>Teacher Name</th>
                <th>Department</th>
                <th>Leave Type</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Reason</th>
              </tr>
            </thead>

            <tbody>
              {filteredLeaves.length > 0 ? (
                filteredLeaves.map(
                  (leave, index) => (
                    <tr
                      key={`${leave.employeeId}-${leave.fromDate}-${index}`}
                    >
                      <td>
                        {leave.employeeId}
                      </td>

                      <td>
                        {leave.teacherName}
                      </td>

                      <td>
                        {leave.department}
                      </td>

                      <td>
                        {leave.leaveType}
                      </td>

                      <td>
                        {leave.fromDate}
                      </td>

                      <td>
                        {leave.toDate}
                      </td>

                      <td>
                        {leave.reason}
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan="7">
                    No teacher leave records found.
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

export default TeacherLeaveDetails;