import { useState } from "react";
import "../../styles/Student.css";

function UpdateStudent() {
  const [rollNo, setRollNo] = useState("");

  const [student, setStudent] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const searchStudent = () => {
    setMessage("");
    setError("");

    if (!rollNo.trim()) {
      setError("Please enter a roll number.");
      return;
    }

    const students =
      JSON.parse(localStorage.getItem("students")) || [];

    const foundStudent = students.find(
      (item) =>
        item.rollNo.toLowerCase() ===
        rollNo.trim().toLowerCase()
    );

    if (foundStudent) {
      setStudent(foundStudent);
    } else {
      setStudent(null);
      setError("Student not found.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStudent({
      ...student,
      [name]: value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const students =
      JSON.parse(localStorage.getItem("students")) || [];

    const updatedStudents = students.map((item) =>
      item.id === student.id
        ? student
        : item
    );

    


    localStorage.setItem(
      "students",
      JSON.stringify(updatedStudents)
    );

    setMessage(
      "Student information updated successfully!"
    );
  };

  return (
    <div className="student-page">

      <div className="page-heading">

        <h1>Update Student</h1>

        <p>
          Search student by roll number and
          update information
        </p>

      </div>

      <div className="student-search-card">

        <h2>Search Student</h2>

        <div className="update-search">

          <input
            type="text"
            placeholder="Enter student roll number"
            value={rollNo}
            onChange={(e) =>
              setRollNo(e.target.value)
            }
          />

          <button
            type="button"
            className="primary-button"
            onClick={searchStudent}
          >
            Search
          </button>

        </div>

        {error && (
          <div className="student-error">
            ⚠ {error}
          </div>
        )}

      </div>

      {student && (

        <form
          className="student-form-card"
          onSubmit={handleUpdate}
        >

          <div className="form-section-title">
            Student Information
          </div>

          <div className="student-form-grid">

            <div className="student-form-group">

              <label>Roll Number</label>

              <input
                value={student.rollNo}
                disabled
              />

            </div>

            <div className="student-form-group">

              <label>Student Name</label>

              <input
                name="name"
                value={student.name}
                onChange={handleChange}
                required
              />

            </div>

            <div className="student-form-group">

              <label>Father's Name</label>

              <input
                name="fatherName"
                value={student.fatherName || ""}
                onChange={handleChange}
              />

            </div>

            <div className="student-form-group">

              <label>Email</label>

              <input
                type="email"
                name="email"
                value={student.email}
                onChange={handleChange}
                required
              />

            </div>

            <div className="student-form-group">

              <label>Phone Number</label>

              <input
                name="phone"
                value={student.phone}
                onChange={handleChange}
                required
              />

            </div>

            <div className="student-form-group">

              <label>Date of Birth</label>

              <input
                type="date"
                name="dob"
                value={student.dob || ""}
                onChange={handleChange}
              />

            </div>

            <div className="student-form-group">

              <label>Course</label>

              <select
                name="course"
                value={student.course}
                onChange={handleChange}
              >
                <option value="B.E.">B.E.</option>
                <option value="B.Tech">B.Tech</option>
                <option value="BCA">BCA</option>
                <option value="B.Sc">B.Sc</option>
                <option value="MCA">MCA</option>
                <option value="M.Tech">M.Tech</option>
              </select>

            </div>

            <div className="student-form-group">

              <label>Branch</label>

              <select
                name="branch"
                value={student.branch}
                onChange={handleChange}
              >
                <option value="Information Technology">
                  Information Technology
                </option>

                <option value="Computer Engineering">
                  Computer Engineering
                </option>

                <option value="Electronics">
                  Electronics
                </option>

                <option value="Mechanical">
                  Mechanical
                </option>

                <option value="Civil">
                  Civil
                </option>
              </select>

            </div>

            <div className="student-form-group full-width">

              <label>Address</label>

              <textarea
                name="address"
                value={student.address || ""}
                onChange={handleChange}
              />

            </div>

          </div>

          {message && (
            <div className="student-success">
              ✓ {message}
            </div>
          )}

          <div className="form-action-buttons">

            <button
              type="submit"
              className="primary-button"
            >
              Update Student
            </button>

          </div>

        </form>

      )}

    </div>
  );
}

export default UpdateStudent;