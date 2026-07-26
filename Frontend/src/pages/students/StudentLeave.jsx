import { useState } from "react";
import "../../styles/Student.css";

function StudentLeave() {

  const initialLeave = {
    rollno: "",
    name: "",
    course: "",
    branch: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
  };

  const [leave, setLeave] = useState(initialLeave);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);


  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setLeave((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };


  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {

    setLeave(initialLeave);
    setMessage("");
    setError("");
  };


  // ==========================================
  // SUBMIT LEAVE
  // POST /api/student-leaves
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");


    // Validate dates
    if (
      leave.fromDate &&
      leave.toDate &&
      leave.toDate < leave.fromDate
    ) {

      setError(
        "To Date cannot be before From Date."
      );

      return;
    }


    try {

      setSubmitting(true);

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


      // Read backend response safely
      const text = await response.text();

      let data = {};

      if (text) {

        try {

          data = JSON.parse(text);

        } catch {

          console.log(
            "Backend response:",
            text
          );
        }
      }


      if (!response.ok) {

        throw new Error(
          data.message ||
          `Server returned ${response.status}`
        );
      }


      setMessage(
        data.message ||
        "Student leave application submitted successfully."
      );

      setLeave(initialLeave);

    } catch (err) {

      console.error(
        "Student leave submit error:",
        err
      );

      setError(
        err.message ||
        "Unable to submit student leave."
      );

    } finally {

      setSubmitting(false);
    }
  };


  // ==========================================
  // JSX
  // ==========================================

  return (

    <div className="student-page">


      {/* PAGE HEADING */}

      <div className="student-heading">

        <h1>Student Leave</h1>

        <p>
          Submit a leave application for a university student
        </p>

      </div>


      {/* FORM CARD */}

      <form
        className="student-card"
        onSubmit={handleSubmit}
      >


        <div className="student-section-title">
          Student Information
        </div>


        <div className="student-grid">


          {/* ROLL NUMBER */}

          <div className="student-form-group">

            <label>
              Roll Number *
            </label>

            <input
              type="text"
              name="rollno"
              value={leave.rollno}
              onChange={handleChange}
              placeholder="Example: IT001"
              required
            />

          </div>


          {/* STUDENT NAME */}

          <div className="student-form-group">

            <label>
              Student Name *
            </label>

            <input
              type="text"
              name="name"
              value={leave.name}
              onChange={handleChange}
              placeholder="Enter student name"
              required
            />

          </div>


          {/* COURSE */}

          <div className="student-form-group">

            <label>
              Course *
            </label>

            <select
              name="course"
              value={leave.course}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Course
              </option>

              <option value="B.E.">
                B.E.
              </option>

              <option value="B.Tech">
                B.Tech
              </option>

              <option value="BCA">
                BCA
              </option>

              <option value="MCA">
                MCA
              </option>

            </select>

          </div>


          {/* BRANCH */}

          <div className="student-form-group">

            <label>
              Branch *
            </label>

            <select
              name="branch"
              value={leave.branch}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Branch
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


        </div>


        {/* SECOND SECTION */}

        <div
          className="student-section-title"
          style={{ marginTop: "32px" }}
        >
          Leave Information
        </div>


        <div className="student-grid">


          {/* LEAVE TYPE */}

          <div className="student-form-group">

            <label>
              Leave Type *
            </label>

            <select
              name="leaveType"
              value={leave.leaveType}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Leave Type
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

              <option value="Family Function">
                Family Function
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>


          {/* FROM DATE */}

          <div className="student-form-group">

            <label>
              From Date *
            </label>

            <input
              type="date"
              name="fromDate"
              value={leave.fromDate}
              onChange={handleChange}
              required
            />

          </div>


          {/* TO DATE */}

          <div className="student-form-group">

            <label>
              To Date *
            </label>

            <input
              type="date"
              name="toDate"
              value={leave.toDate}
              onChange={handleChange}
              min={leave.fromDate}
              required
            />

          </div>


          {/* REASON */}

          <div
            className="
              student-form-group
              student-full-width
            "
          >

            <label>
              Reason *
            </label>

            <textarea
              name="reason"
              value={leave.reason}
              onChange={handleChange}
              placeholder="Enter the reason for leave..."
              required
            />

          </div>


        </div>


        {/* SUCCESS MESSAGE */}

        {message && (

          <div className="student-success">

            ✓ {message}

          </div>

        )}


        {/* ERROR MESSAGE */}

        {error && (

          <div className="student-error">

            {error}

          </div>

        )}


        {/* BUTTONS */}

        <div className="student-buttons">

          <button
            type="button"
            className="student-secondary"
            onClick={resetForm}
            disabled={submitting}
          >
            Reset
          </button>


          <button
            type="submit"
            className="student-primary"
            disabled={submitting}
          >

            {submitting
              ? "Submitting..."
              : "Submit Leave"}

          </button>

        </div>


      </form>

    </div>
  );
}

export default StudentLeave;