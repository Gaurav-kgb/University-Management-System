import { useEffect, useState } from "react";
import "../../styles/Fee.css";

function StudentFee() {

  const initialData = {
    rollno: "",
    course: "",
    semester: "",
  };

  const [formData, setFormData] =
    useState(initialData);

  const [feeStructure, setFeeStructure] =
    useState([]);

  const [selectedFee, setSelectedFee] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // ====================================
  // FETCH FEE STRUCTURE
  // ====================================

  useEffect(() => {

    const fetchFees = async () => {

      try {

        const response = await fetch(
          "http://localhost:8080/api/fees"
        );

        if (!response.ok) {

          throw new Error(
            "Unable to fetch fees"
          );
        }

        const data =
          await response.json();

        setFeeStructure(data);

      } catch (error) {

        console.error(error);

        setError(
          "Unable to load fee information."
        );

      } finally {

        setLoading(false);
      }
    };

    fetchFees();

  }, []);


  // ====================================
  // HANDLE CHANGE
  // ====================================

  const handleChange = (e) => {

    const { name, value } =
      e.target;

    const updated = {
      ...formData,
      [name]: value,
    };

    setFormData(updated);

    setError("");

    calculateFee(updated);
  };


  // ====================================
  // FIND SELECTED FEE
  // ====================================

  const calculateFee = (data) => {

    if (
      !data.course ||
      !data.semester
    ) {

      setSelectedFee("");
      return;
    }

    const courseFee =
      feeStructure.find(
        (fee) =>
          fee.course === data.course
      );

    if (!courseFee) {

      setSelectedFee("");
      return;
    }

    const semesterKey =
      `semester${data.semester}`;

    setSelectedFee(
      courseFee[semesterKey] || ""
    );
  };


  // ====================================
  // RESET
  // ====================================

  const resetForm = () => {

    setFormData(initialData);

    setSelectedFee("");

    setError("");
  };


  return (

    <div className="fee-page">

      <div className="fee-heading">

        <h1>Student Fee</h1>

        <p>
          Check student semester fee
        </p>

      </div>


      <div className="fee-card">

        {loading ? (

          <p>
            Loading fee information...
          </p>

        ) : (

          <div className="fee-grid">


            {/* ROLL NUMBER */}

            <div className="fee-form-group">

              <label>
                Roll Number *
              </label>

              <input
                type="text"
                name="rollno"
                value={formData.rollno}
                onChange={handleChange}
                placeholder="Example: IT001"
                required
              />

            </div>


            {/* COURSE */}

            <div className="fee-form-group">

              <label>
                Course *
              </label>

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
              >

                <option value="">
                  Select Course
                </option>

                {feeStructure.map(
                  (fee, index) => (

                    <option
                      key={index}
                      value={fee.course}
                    >
                      {fee.course}
                    </option>

                  )
                )}

              </select>

            </div>


            {/* SEMESTER */}

            <div className="fee-form-group">

              <label>
                Semester *
              </label>

              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
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

        )}


        {/* FEE RESULT */}

        {selectedFee && (

          <div className="fee-result">

            <span>
              Semester Fee
            </span>

            <strong>

              ₹
              {Number(
                selectedFee
              ).toLocaleString(
                "en-IN"
              )}

            </strong>

          </div>

        )}


        {error && (

          <div className="fee-error">
            {error}
          </div>

        )}


        <div className="fee-buttons">

          <button
            type="button"
            onClick={resetForm}
          >
            Reset
          </button>

        </div>

      </div>

    </div>
  );
}

export default StudentFee;