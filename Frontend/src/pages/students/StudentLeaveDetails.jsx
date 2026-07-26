import { useEffect, useState } from "react";
import "../../styles/StudentLeave.css";

function StudentLeaveDetails() {
  const [leaves, setLeaves] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL =
    "https://university-management-system-kx5w.onrender.com";

  // ==========================================
  // LOAD STUDENT LEAVES FROM BACKEND
  // ==========================================

  const loadLeaves = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/student-leaves`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch student leave records"
        );
      }

      const data = await response.json();

      setLeaves(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(
        "Error loading student leaves:",
        error
      );

      setError(
        "Unable to load student leave records."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD DATA WHEN PAGE OPENS
  // ==========================================

  useEffect(() => {
    loadLeaves();
  }, []);

  // ==========================================
  // UPDATE LEAVE STATUS
  // ==========================================

  const handleStatus = async (leave, status) => {
    try {
      setError("");

      /*
       * If your backend currently supports
       * PUT /api/student-leaves,
       * this sends the updated leave.
       */

      const response = await fetch(
        `${API_URL}/api/student-leaves`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            id: leave.id,
            rollno: leave.rollno,
            name: leave.name,
            course: leave.course,
            branch: leave.branch,
            leaveType: leave.leaveType,
            fromDate: leave.fromDate,
            toDate: leave.toDate,
            reason: leave.reason,
            status: status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update leave status"
        );
      }

      // Update frontend immediately
      setLeaves((previousLeaves) =>
        previousLeaves.map((item) =>
          item.id === leave.id
            ? {
                ...item,
                status: status,
              }
            : item
        )
      );
    } catch (error) {
      console.error(
        "Error updating leave status:",
        error
      );

      setError(
        error.message ||
          "Unable to update leave status."
      );
    }
  };

  // ==========================================
  // DELETE LEAVE
  // ==========================================

  const handleDelete = async (leave) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this leave record?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `${API_URL}/api/student-leaves?id=${leave.id}`,
        {
          method: "DELETE",
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        // Backend may return an empty response
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete leave record"
        );
      }

      setLeaves((previousLeaves) =>
        previousLeaves.filter(
          (item) => item.id !== leave.id
        )
      );
    } catch (error) {
      console.error(
        "Error deleting student leave:",
        error
      );

      setError(
        error.message ||
          "Unable to delete leave record."
      );
    }
  };

  // ==========================================
  // SEARCH
  // ==========================================

  const filteredLeaves = leaves.filter(
    (leave) => {
      const value = search
        .trim()
        .toLowerCase();

      return (
        leave.name
          ?.toLowerCase()
          .includes(value) ||
        leave.studentName
          ?.toLowerCase()
          .includes(value) ||
        leave.rollno
          ?.toLowerCase()
          .includes(value) ||
        leave.rollNo
          ?.toLowerCase()
          .includes(value) ||
        leave.leaveType
          ?.toLowerCase()
          .includes(value)
      );
    }
  );

  // ==========================================
  // COUNTS
  // ==========================================

  const pendingCount = leaves.filter(
    (leave) =>
      (leave.status || "Pending") === "Pending"
  ).length;

  const approvedCount = leaves.filter(
    (leave) =>
      leave.status === "Approved"
  ).length;

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="student-page">

      {/* PAGE HEADING */}

      <div className="student-heading">

        <h1>Student Leave Details</h1>

        <p>
          View and manage student leave applications
        </p>

      </div>

      {/* STATISTICS */}

      <div className="student-stats">

        <div className="student-stat-card">

          <span>Total Applications</span>

          <strong>
            {leaves.length}
          </strong>

        </div>

        <div className="student-stat-card">

          <span>Pending</span>

          <strong>
            {pendingCount}
          </strong>

        </div>

        <div className="student-stat-card">

          <span>Approved</span>

          <strong>
            {approvedCount}
          </strong>

        </div>

      </div>

      {/* ERROR MESSAGE */}

      {error && (
        <div className="student-error">
          {error}
        </div>
      )}

      {/* MAIN CARD */}

      <div className="student-card">

        <div className="student-toolbar">

          <div className="student-section-title">
            Leave Applications
          </div>

          <div className="student-search">

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search name or roll number..."
            />

          </div>

        </div>

        {/* TABLE */}

        <div className="student-table-container">

          <table className="student-table">

            <thead>

              <tr>
                <th>#</th>
                <th>Roll No.</th>
                <th>Student</th>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td
                    colSpan="9"
                    className="student-empty"
                  >
                    Loading leave applications...
                  </td>
                </tr>

              ) : filteredLeaves.length > 0 ? (

                filteredLeaves.map(
                  (leave, index) => (

                    <tr
                      key={
                        leave.id ??
                        `${leave.rollno}-${index}`
                      }
                    >

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        <strong>
                          {leave.rollno ||
                            leave.rollNo}
                        </strong>
                      </td>

                      <td>
                        {leave.name ||
                          leave.studentName ||
                          "-"}
                      </td>

                      <td>
                        {leave.leaveType || "-"}
                      </td>

                      <td>
                        {leave.fromDate ||
                          leave.date ||
                          "-"}
                      </td>

                      <td>
                        {leave.toDate || "-"}
                      </td>

                      <td>
                        {leave.reason || "-"}
                      </td>

                      <td>

                        <span
                          className={`student-status ${
                            leave.status ===
                            "Approved"
                              ? "student-status-approved"
                              : leave.status ===
                                "Rejected"
                              ? "student-status-rejected"
                              : "student-status-pending"
                          }`}
                        >
                          {leave.status ||
                            "Pending"}
                        </span>

                      </td>

                      <td>

                        <div className="student-action-buttons">

                          <button
                            type="button"
                            className="student-approve"
                            onClick={() =>
                              handleStatus(
                                leave,
                                "Approved"
                              )
                            }
                          >
                            Approve
                          </button>

                          <button
                            type="button"
                            className="student-reject"
                            onClick={() =>
                              handleStatus(
                                leave,
                                "Rejected"
                              )
                            }
                          >
                            Reject
                          </button>

                          <button
                            type="button"
                            className="student-delete"
                            onClick={() =>
                              handleDelete(leave)
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

                <tr>

                  <td
                    colSpan="9"
                    className="student-empty"
                  >
                    No leave applications found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default StudentLeaveDetails;