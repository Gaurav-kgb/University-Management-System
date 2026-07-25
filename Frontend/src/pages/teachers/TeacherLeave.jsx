import { useState } from "react";
import "../../styles/Teacher.css";
import "../../styles/TeacherLeave.css";

function TeacherLeave() {
  const initialLeave = {
    employeeId: "",
    teacherName: "",
    department: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
  };

  const [leave, setLeave] =
    useState(initialLeave);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLeave({
      ...leave,
      [name]: value,
    });

    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      leave.toDate &&
      leave.fromDate &&
      leave.toDate < leave.fromDate
    ) {
      setError(
        "To Date cannot be before From Date."
      );

      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setError("");

      const response = await fetch(
        "http://localhost:8080/api/teacher-leaves",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(leave),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage(
          data.message ||
            "Teacher leave application submitted successfully."
        );

        setLeave(initialLeave);
      } else {
        setError(
          data.message ||
            "Unable to submit leave."
        );
      }
    } catch (err) {
      console.error(err);

      setError(
        "Unable to connect to backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setLeave(initialLeave);
    setMessage("");
    setError("");
  };

  return (
    <div className="teacher-page">
      <div className="teacher-heading">
        <h1>Teacher Leave</h1>

        <p>
          Submit leave application for faculty
          members
        </p>
      </div>

      <form
        className="teacher-form-card"
        onSubmit={handleSubmit}
      >
        <div className="teacher-section-title">
          Faculty Information
        </div>

        <div className="teacher-grid">
          <div className="teacher-form-group">
            <label>Employee ID *</label>

            <input
              name="employeeId"
              value={leave.employeeId}
              onChange={handleChange}
              placeholder="Example: T101"
              required
            />
          </div>

          <div className="teacher-form-group">
            <label>Teacher Name *</label>

            <input
              name="teacherName"
              value={leave.teacherName}
              onChange={handleChange}
              placeholder="Enter teacher name"
              required
            />
          </div>

          <div className="teacher-form-group">
            <label>Department *</label>

            <select
              name="department"
              value={leave.department}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Department
              </option>

              <option value="Information Technology">
                Information Technology
              </option>

              <option value="Computer Engineering">
                Computer Engineering
              </option>

              <option value="Mechanical">
                Mechanical
              </option>

              <option value="Civil">
                Civil
              </option>

              <option value="Electronics">
                Electronics
              </option>
            </select>
          </div>

          <div className="teacher-form-group">
            <label>Leave Type *</label>

            <select
              name="leaveType"
              value={leave.leaveType}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Leave Type
              </option>

              <option value="Casual Leave">
                Casual Leave
              </option>

              <option value="Medical Leave">
                Medical Leave
              </option>

              <option value="Personal Leave">
                Personal Leave
              </option>

              <option value="Emergency Leave">
                Emergency Leave
              </option>
            </select>
          </div>

          <div className="teacher-form-group">
            <label>From Date *</label>

            <input
              type="date"
              name="fromDate"
              value={leave.fromDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="teacher-form-group">
            <label>To Date *</label>

            <input
              type="date"
              name="toDate"
              value={leave.toDate}
              onChange={handleChange}
              min={leave.fromDate}
              required
            />
          </div>

          <div className="teacher-form-group teacher-full-width">
            <label>Reason *</label>

            <textarea
              name="reason"
              value={leave.reason}
              onChange={handleChange}
              placeholder="Enter reason for leave..."
              required
            />
          </div>
        </div>

        {message && (
          <div className="teacher-success">
            ✓ {message}
          </div>
        )}

        {error && (
          <div className="teacher-error">
            {error}
          </div>
        )}

        <div className="teacher-buttons">
          <button
            type="button"
            className="teacher-reset"
            onClick={resetForm}
          >
            Reset
          </button>

          <button
            type="submit"
            className="teacher-primary"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Submit Leave"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TeacherLeave;