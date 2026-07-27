import { useEffect, useState } from "react";
import "../../styles/Fee.css";

function StudentFee() {

  const initialData = {
    rollno: "",
    studentName: "",
    course: "",
    semester: "",
    paymentMode: "",
    paymentDate: "",
    transactionId: "",
  };

  const [formData, setFormData] =
    useState(initialData);

  const [feeStructure, setFeeStructure] =
    useState([]);

  const [amount, setAmount] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  // =====================================
  // LOAD FEE STRUCTURE
  // =====================================

  useEffect(() => {

    fetch(
      "https://university-management-system-kx5w.onrender.com/api/fees"
    )
      .then((response) => {

        if (!response.ok) {
          throw new Error(
            "Unable to fetch fee structure"
          );
        }

        return response.json();
      })

      .then((data) => {
        setFeeStructure(data);
      })

      .catch((error) => {

        console.error(error);

        setError(
          "Unable to load fee structure."
        );
      });

  }, []);


  // =====================================
  // INPUT CHANGE
  // =====================================

  const handleChange = (e) => {

    const { name, value } =
      e.target;

    const updated = {
      ...formData,
      [name]: value,
    };

    setFormData(updated);

    setMessage("");
    setError("");

    if (
      name === "course" ||
      name === "semester"
    ) {

      calculateFee(updated);
    }
  };


  // =====================================
  // CALCULATE FEE
  // =====================================

  const calculateFee = (data) => {

    if (
      !data.course ||
      !data.semester
    ) {

      setAmount("");
      return;
    }

    const courseFee =
      feeStructure.find(
        (fee) =>
          fee.course === data.course
      );

    if (!courseFee) {

      setAmount("");
      return;
    }

    const semesterKey =
      `semester${data.semester}`;

    setAmount(
      courseFee[semesterKey] || ""
    );
  };


  // =====================================
  // SUBMIT PAYMENT
  // =====================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!amount) {

      setError(
        "Fee amount not found."
      );

      return;
    }

    try {

      setLoading(true);
      setError("");
      setMessage("");

      const response = await fetch(
        "https://university-management-system-kx5w.onrender.com/api/student-fees",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            ...formData,

            amount: String(amount),

          }),
        }
      );

      const data =
        await response.json();

      if (
        response.ok &&
        data.success
      ) {

        setMessage(
          data.message
        );

        setFormData(
          initialData
        );

        setAmount("");

      } else {

        setError(
          data.message ||
          "Payment failed."
        );
      }

    } catch (error) {

      console.error(error);

      setError(
        "Unable to connect to server."
      );

    } finally {

      setLoading(false);
    }
  };


  return (

    <div className="fee-page">

      <div className="fee-heading">

        <h1>
          Student Fee Payment
        </h1>

        <p>
          Record student semester fee payment
        </p>

      </div>


      <form
        className="fee-card"
        onSubmit={handleSubmit}
      >

        <div className="fee-grid">


          <div className="fee-form-group">

            <label>
              Roll Number *
            </label>

            <input
              name="rollno"
              value={formData.rollno}
              onChange={handleChange}
              placeholder="IT001"
              required
            />

          </div>


          <div className="fee-form-group">

            <label>
              Student Name *
            </label>

            <input
              name="studentName"
              value={
                formData.studentName
              }
              onChange={handleChange}
              placeholder="Student name"
              required
            />

          </div>


          <div className="fee-form-group">

            <label>
              Course *
            </label>

            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
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


          <div className="fee-form-group">

            <label>
              Semester *
            </label>

            <select
              name="semester"
              value={
                formData.semester
              }
              onChange={handleChange}
              required
            >

              <option value="">
                Select Semester
              </option>

              {[1,2,3,4,5,6,7,8]
                .map((sem) => (

                  <option
                    key={sem}
                    value={sem}
                  >
                    Semester {sem}
                  </option>

                ))}

            </select>

          </div>


          <div className="fee-form-group">

            <label>
              Fee Amount
            </label>

            <input
              value={
                amount
                  ? `₹${Number(
                      amount
                    ).toLocaleString(
                      "en-IN"
                    )}`
                  : ""
              }
              placeholder="Select course and semester"
              readOnly
            />

          </div>


          <div className="fee-form-group">

            <label>
              Payment Mode *
            </label>

            <select
              name="paymentMode"
              value={
                formData.paymentMode
              }
              onChange={handleChange}
              required
            >

              <option value="">
                Select Payment Mode
              </option>

              <option value="Cash">
                Cash
              </option>

              <option value="UPI">
                UPI
              </option>

              <option value="Card">
                Card
              </option>

              <option value="Net Banking">
                Net Banking
              </option>

            </select>

          </div>


          <div className="fee-form-group">

            <label>
              Payment Date *
            </label>

            <input
              type="date"
              name="paymentDate"
              value={
                formData.paymentDate
              }
              onChange={handleChange}
              required
            />

          </div>


          <div className="fee-form-group">

            <label>
              Transaction ID
            </label>

            <input
              name="transactionId"
              value={
                formData.transactionId
              }
              onChange={handleChange}
              placeholder="Optional for cash"
            />

          </div>

        </div>


        {message && (

          <div className="fee-success">
            ✓ {message}
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
            onClick={() => {

              setFormData(
                initialData
              );

              setAmount("");

              setMessage("");

              setError("");
            }}
          >
            Reset
          </button>


          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Processing..."
              : "Pay Fee"}

          </button>

        </div>

      </form>

    </div>
  );
}

export default StudentFee;