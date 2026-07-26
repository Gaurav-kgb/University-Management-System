import { useState } from "react";
import "../../styles/Student.css";

function AddStudent() {
  const initialData = {
    name: "",
    fatherName: "",
    rollNo: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
    class10: "",
    class12: "",
    aadhaar: "",
    course: "",
    branch: "",
  };

  const [student, setStudent] = useState(initialData);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setStudent((previousStudent) => ({
      ...previousStudent,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  // Reset form
  const handleReset = () => {
    setStudent(initialData);
    setMessage("");
    setError("");
  };

  // Submit student to Java backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://university-management-system-kx5w.onrender.com/api/students",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          // Convert React field names to Java API field names
          body: JSON.stringify({
            name: student.name,
            fname: student.fatherName,
            rollno: student.rollNo,
            dob: student.dob,
            address: student.address,
            phone: student.phone,
            email: student.email,
            x: student.class10,
            xii: student.class12,
            aadhar: student.aadhaar,
            course: student.course,
            branch: student.branch,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage("Student added successfully");

        // Clear form after successful insertion
        setStudent(initialData);
      } else {
        setError(
          data.message || "Failed to add student"
        );
      }
    } catch (error) {
      console.error("Add student error:", error);

      setError(
        "Unable to connect to the backend server"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-page">

      <div className="page-heading">
        <h1>Add New Student</h1>
        <p>Register a new student in the university</p>
      </div>

      <form
        className="student-form-card"
        onSubmit={handleSubmit}
      >

        {/* PERSONAL INFORMATION */}

        <div className="form-section-title">
          Personal Information
        </div>

        <div className="student-form-grid">

          <div className="student-form-group">
            <label>Student Name *</label>

            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              placeholder="Enter student name"
              required
            />
          </div>

          <div className="student-form-group">
            <label>Father's Name *</label>

            <input
              type="text"
              name="fatherName"
              value={student.fatherName}
              onChange={handleChange}
              placeholder="Enter father's name"
              required
            />
          </div>

          <div className="student-form-group">
            <label>Roll Number *</label>

            <input
              type="text"
              name="rollNo"
              value={student.rollNo}
              onChange={handleChange}
              placeholder="Example: IT001"
              required
            />
          </div>

          <div className="student-form-group">
            <label>Date of Birth *</label>

            <input
              type="date"
              name="dob"
              value={student.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="student-form-group">
            <label>Email Address *</label>

            <input
              type="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              placeholder="student@gmail.com"
              required
            />
          </div>

          <div className="student-form-group">
            <label>Phone Number *</label>

            <input
              type="tel"
              name="phone"
              value={student.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              maxLength="10"
              required
            />
          </div>

          <div className="student-form-group full-width">
            <label>Address *</label>

            <textarea
              name="address"
              value={student.address}
              onChange={handleChange}
              placeholder="Enter complete address"
              required
            />
          </div>

        </div>

        {/* ACADEMIC INFORMATION */}

        <div className="form-section-title">
          Academic Information
        </div>

        <div className="student-form-grid">

          <div className="student-form-group">
            <label>Class 10 Percentage</label>

            <input
              type="number"
              name="class10"
              value={student.class10}
              onChange={handleChange}
              placeholder="Example: 85"
              min="0"
              max="100"
            />
          </div>

          <div className="student-form-group">
            <label>Class 12 Percentage</label>

            <input
              type="number"
              name="class12"
              value={student.class12}
              onChange={handleChange}
              placeholder="Example: 80"
              min="0"
              max="100"
            />
          </div>

          <div className="student-form-group">
            <label>Aadhaar Number</label>

            <input
              type="text"
              name="aadhaar"
              value={student.aadhaar}
              onChange={handleChange}
              placeholder="Enter Aadhaar number"
              maxLength="12"
            />
          </div>

          <div className="student-form-group">
            <label>Course *</label>

            <select
              name="course"
              value={student.course}
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

              <option value="B.Sc">
                B.Sc
              </option>

              <option value="MCA">
                MCA
              </option>

              <option value="M.Tech">
                M.Tech
              </option>
            </select>
          </div>

          <div className="student-form-group">
            <label>Branch *</label>

            <select
              name="branch"
              value={student.branch}
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

        <div className="form-action-buttons">

          <button
            type="button"
            className="reset-button"
            onClick={handleReset}
            disabled={loading}
          >
            Reset
          </button>

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            {loading
              ? "Adding Student..."
              : "Add Student"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default AddStudent;