import { useState } from "react";
import "../../styles/Teacher.css";

function AddTeacher() {
  const initialTeacher = {
    name: "",
    fname: "",
    empId: "",
    dob: "",
    address: "",
    phone: "",
    email: "",
    class_x: "",
    class_xii: "",
    aadhar: "",
    education: "",
    department: "",
  };

  const [teacher, setTeacher] = useState(initialTeacher);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTeacher({
      ...teacher,
      [name]: value,
    });

    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");
      setError("");

      const response = await fetch(
        "http://localhost:8080/api/teachers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(teacher),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage("Teacher added successfully.");
        setTeacher(initialTeacher);
      } else {
        setError(
          data.message || "Unable to add teacher."
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
    setTeacher(initialTeacher);
    setMessage("");
    setError("");
  };

  return (
    <div className="teacher-page">
      <div className="teacher-heading">
        <h1>Add Teacher</h1>
        <p>
          Add faculty information to the university
        </p>
      </div>

      <form
        className="teacher-form-card"
        onSubmit={handleSubmit}
      >
        <div className="teacher-section-title">
          Personal Information
        </div>

        <div className="teacher-grid">
          <div className="teacher-form-group">
            <label>Teacher Name *</label>

            <input
              type="text"
              name="name"
              value={teacher.name}
              onChange={handleChange}
              placeholder="Enter teacher name"
              required
            />
          </div>

          <div className="teacher-form-group">
            <label>Father's Name</label>

            <input
              type="text"
              name="fname"
              value={teacher.fname}
              onChange={handleChange}
              placeholder="Enter father's name"
            />
          </div>

          <div className="teacher-form-group">
            <label>Employee ID *</label>

            <input
              type="text"
              name="empId"
              value={teacher.empId}
              onChange={handleChange}
              placeholder="Example: T101"
              required
            />
          </div>

          <div className="teacher-form-group">
            <label>Date of Birth</label>

            <input
              type="date"
              name="dob"
              value={teacher.dob}
              onChange={handleChange}
            />
          </div>

          <div className="teacher-form-group">
            <label>Phone Number</label>

            <input
              type="tel"
              name="phone"
              value={teacher.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              maxLength="10"
            />
          </div>

          <div className="teacher-form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={teacher.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div className="teacher-form-group teacher-full-width">
            <label>Address</label>

            <textarea
              name="address"
              value={teacher.address}
              onChange={handleChange}
              placeholder="Enter address"
            />
          </div>
        </div>

        <div className="teacher-section-title second-section">
          Education Information
        </div>

        <div className="teacher-grid">
          <div className="teacher-form-group">
            <label>Class X (%)</label>

            <input
              type="text"
              name="class_x"
              value={teacher.class_x}
              onChange={handleChange}
              placeholder="Example: 85"
            />
          </div>

          <div className="teacher-form-group">
            <label>Class XII (%)</label>

            <input
              type="text"
              name="class_xii"
              value={teacher.class_xii}
              onChange={handleChange}
              placeholder="Example: 82"
            />
          </div>

          <div className="teacher-form-group">
            <label>Aadhar Number</label>

            <input
              type="text"
              name="aadhar"
              value={teacher.aadhar}
              onChange={handleChange}
              placeholder="12 digit Aadhar number"
              maxLength="12"
            />
          </div>

          <div className="teacher-form-group">
            <label>Education</label>

            <input
              type="text"
              name="education"
              value={teacher.education}
              onChange={handleChange}
              placeholder="Example: M.Tech"
            />
          </div>

          <div className="teacher-form-group">
            <label>Department</label>

            <select
              name="department"
              value={teacher.department}
              onChange={handleChange}
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
            {loading ? "Saving..." : "Add Teacher"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTeacher;