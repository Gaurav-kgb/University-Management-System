import { useState } from "react";
import "../../styles/Examination.css";

function EnterMarks() {

  const initialData = {
    rollno: "",
    semester: "",
    marks1: "",
    marks2: "",
    marks3: "",
    marks4: "",
    marks5: "",
  };

  const [marks, setMarks] = useState(initialData);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ============================
  // HANDLE INPUT CHANGE
  // ============================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setMarks({
      ...marks,
      [name]: value,
    });

    setMessage("");
    setError("");
  };

  // ============================
  // SUBMIT MARKS
  // ============================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:8080/api/marks",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            rollno: marks.rollno,
            semester: marks.semester,
            marks1: marks.marks1,
            marks2: marks.marks2,
            marks3: marks.marks3,
            marks4: marks.marks4,
            marks5: marks.marks5,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {

        setMessage(
          data.message ||
          "Student marks added successfully."
        );

        setMarks(initialData);

      } else {

        setError(
          data.message ||
          "Unable to save student marks."
        );
      }

    } catch (error) {

      console.error(
        "Error saving marks:",
        error
      );

      setError(
        "Unable to connect to backend server."
      );

    } finally {

      setLoading(false);
    }
  };

  // ============================
  // RESET FORM
  // ============================

  const resetForm = () => {

    setMarks(initialData);
    setMessage("");
    setError("");
  };

  return (

    <div className="exam-page">

      <div className="exam-heading">

        <h1>Enter Student Marks</h1>

        <p>
          Add examination marks for university students
        </p>

      </div>

      <form
        className="exam-form-card"
        onSubmit={handleSubmit}
      >

        {/* ============================
            STUDENT INFORMATION
        ============================ */}

        <div className="exam-section-title">
          Student Information
        </div>

        <div className="exam-grid">

          {/* Roll Number */}

          <div className="exam-form-group">

            <label>
              Roll Number *
            </label>

            <input
              type="text"
              name="rollno"
              value={marks.rollno}
              onChange={handleChange}
              placeholder="Example: IT001"
              required
            />

          </div>


          {/* Semester */}

          <div className="exam-form-group">

            <label>
              Semester *
            </label>

            <select
              name="semester"
              value={marks.semester}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Semester
              </option>

              <option value="1">
                Semester 1
              </option>

              <option value="2">
                Semester 2
              </option>

              <option value="3">
                Semester 3
              </option>

              <option value="4">
                Semester 4
              </option>

              <option value="5">
                Semester 5
              </option>

              <option value="6">
                Semester 6
              </option>

              <option value="7">
                Semester 7
              </option>

              <option value="8">
                Semester 8
              </option>

            </select>

          </div>

        </div>


        {/* ============================
            MARKS INFORMATION
        ============================ */}

        <div className="exam-section-title second-section">
          Examination Marks
        </div>


        <div className="exam-grid">

          {/* Marks 1 */}

          <div className="exam-form-group">

            <label>
              Subject 1 Marks *
            </label>

            <input
              type="number"
              name="marks1"
              value={marks.marks1}
              onChange={handleChange}
              min="0"
              max="100"
              placeholder="Enter marks"
              required
            />

          </div>


          {/* Marks 2 */}

          <div className="exam-form-group">

            <label>
              Subject 2 Marks *
            </label>

            <input
              type="number"
              name="marks2"
              value={marks.marks2}
              onChange={handleChange}
              min="0"
              max="100"
              placeholder="Enter marks"
              required
            />

          </div>


          {/* Marks 3 */}

          <div className="exam-form-group">

            <label>
              Subject 3 Marks *
            </label>

            <input
              type="number"
              name="marks3"
              value={marks.marks3}
              onChange={handleChange}
              min="0"
              max="100"
              placeholder="Enter marks"
              required
            />

          </div>


          {/* Marks 4 */}

          <div className="exam-form-group">

            <label>
              Subject 4 Marks *
            </label>

            <input
              type="number"
              name="marks4"
              value={marks.marks4}
              onChange={handleChange}
              min="0"
              max="100"
              placeholder="Enter marks"
              required
            />

          </div>


          {/* Marks 5 */}

          <div className="exam-form-group">

            <label>
              Subject 5 Marks *
            </label>

            <input
              type="number"
              name="marks5"
              value={marks.marks5}
              onChange={handleChange}
              min="0"
              max="100"
              placeholder="Enter marks"
              required
            />

          </div>

        </div>


        {/* ============================
            MARKS PREVIEW
        ============================ */}

        {marks.marks1 !== "" &&
          marks.marks2 !== "" &&
          marks.marks3 !== "" &&
          marks.marks4 !== "" &&
          marks.marks5 !== "" && (

            <div className="marks-preview">

              <div>

                <span>Total</span>

                <strong>

                  {Number(marks.marks1) +
                    Number(marks.marks2) +
                    Number(marks.marks3) +
                    Number(marks.marks4) +
                    Number(marks.marks5)}
                  /500

                </strong>

              </div>


              <div>

                <span>Percentage</span>

                <strong>

                  {(
                    (
                      Number(marks.marks1) +
                      Number(marks.marks2) +
                      Number(marks.marks3) +
                      Number(marks.marks4) +
                      Number(marks.marks5)
                    ) / 5
                  ).toFixed(2)}
                  %

                </strong>

              </div>

            </div>

          )}


        {/* ============================
            SUCCESS MESSAGE
        ============================ */}

        {message && (

          <div className="exam-success">

            ✓ {message}

          </div>

        )}


        {/* ============================
            ERROR MESSAGE
        ============================ */}

        {error && (

          <div className="exam-error">

            {error}

          </div>

        )}


        {/* ============================
            BUTTONS
        ============================ */}

        <div className="exam-buttons">

          <button
            type="button"
            className="exam-reset"
            onClick={resetForm}
          >

            Reset

          </button>


          <button
            type="submit"
            className="exam-primary"
            disabled={loading}
          >

            {loading
              ? "Saving..."
              : "Save Marks"}

          </button>

        </div>

      </form>

    </div>
  );
}

export default EnterMarks;