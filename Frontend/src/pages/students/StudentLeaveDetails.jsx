import { useEffect, useState } from "react";
import "../../styles/StudentLeave.css";

function StudentLeaveDetails() {
  const [leaves, setLeaves] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = () => {
    const storedLeaves =
      JSON.parse(localStorage.getItem("studentLeaves")) || [];

    setLeaves(storedLeaves);
  };

  const updateStatus = (id, status) => {
    const updatedLeaves = leaves.map((leave) =>
      leave.id === id
        ? { ...leave, status }
        : leave
    );

    const response = await fetch(
        "https://university-management-system-kx5w.onrender.com/api/student-leaves",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(leave),
        }
      );


    setLeaves(updatedLeaves);

    localStorage.setItem(
      "studentLeaves",
      JSON.stringify(updatedLeaves)
    );
  };

  const deleteLeave = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this leave record?"
    );

    if (!confirmDelete) return;

    const updatedLeaves = leaves.filter(
      (leave) => leave.id !== id
    );

    setLeaves(updatedLeaves);

    localStorage.setItem(
      "studentLeaves",
      JSON.stringify(updatedLeaves)
    );
  };

  const filteredLeaves = leaves.filter((leave) => {
    const value = search.toLowerCase();

    return (
      leave.studentName
        ?.toLowerCase()
        .includes(value) ||
      leave.rollNo
        ?.toLowerCase()
        .includes(value) ||
      leave.leaveType
        ?.toLowerCase()
        .includes(value)
    );
  });
 return (
  <div className="student-page">

    <div className="student-heading">

      <h1>Student Leave Details</h1>

      <p>
        View and manage student leave applications
      </p>

    </div>


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
          {
            leaves.filter(
              (leave) =>
                leave.status === "Pending"
            ).length
          }
        </strong>

      </div>


      <div className="student-stat-card">

        <span>Approved</span>

        <strong>
          {
            leaves.filter(
              (leave) =>
                leave.status === "Approved"
            ).length
          }
        </strong>

      </div>

    </div>


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

            {filteredLeaves.length > 0 ? (

              filteredLeaves.map(
                (leave, index) => (

                  <tr key={leave.id || index}>

                    <td>{index + 1}</td>

                    <td>
                      <strong>
                        {leave.rollno}
                      </strong>
                    </td>

                    <td>{leave.name}</td>

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


                    <td>

                      <span
                        className={`student-status ${
                          leave.status === "Approved"
                            ? "student-status-approved"
                            : leave.status === "Rejected"
                            ? "student-status-rejected"
                            : "student-status-pending"
                        }`}
                      >

                        {leave.status || "Pending"}

                      </span>

                    </td>


                    <td>

                      <div className="student-action-buttons">

                        <button
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