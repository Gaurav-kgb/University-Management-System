import { useEffect, useState } from "react";
import "../../styles/Fee.css";

function FeeStructure() {

  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    fetchFees();

  }, []);


  const fetchFees = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        "https://university-management-system-kx5w.onrender.com/api/fees"
      );

      if (!response.ok) {
        throw new Error(
          "Unable to fetch fee structure"
        );
      }

      const data = await response.json();

      setFees(data);

    } catch (error) {

      console.error(error);

      setError(
        "Unable to load fee structure."
      );

    } finally {

      setLoading(false);
    }
  };


  const displayFee = (amount) => {

    if (!amount) {
      return "-";
    }

    const number = Number(amount);

    if (Number.isNaN(number)) {
      return amount;
    }

    return `₹${number.toLocaleString("en-IN")}`;
  };


  return (

    <div className="fee-page">

      <div className="fee-heading">

        <h1>Fee Structure</h1>

        <p>
          University course-wise semester fee structure
        </p>

      </div>


      {loading && (

        <div className="fee-card">
          Loading fee structure...
        </div>

      )}


      {error && (

        <div className="fee-error">
          {error}
        </div>

      )}


      {!loading && !error && (

        <div className="fee-card">

          {fees.length === 0 ? (

            <p>
              No fee structure found.
            </p>

          ) : (

            <div
              style={{
                overflowX: "auto"
              }}
            >

              <table className="fee-table">

                <thead>

                  <tr>

                    <th>Course</th>

                    <th>Semester 1</th>
                    <th>Semester 2</th>
                    <th>Semester 3</th>
                    <th>Semester 4</th>
                    <th>Semester 5</th>
                    <th>Semester 6</th>
                    <th>Semester 7</th>
                    <th>Semester 8</th>

                  </tr>

                </thead>


                <tbody>

                  {fees.map((fee, index) => (

                    <tr
                      key={`${fee.course}-${index}`}
                    >

                      <td>
                        <strong>
                          {fee.course}
                        </strong>
                      </td>

                      <td>
                        {displayFee(
                          fee.semester1
                        )}
                      </td>

                      <td>
                        {displayFee(
                          fee.semester2
                        )}
                      </td>

                      <td>
                        {displayFee(
                          fee.semester3
                        )}
                      </td>

                      <td>
                        {displayFee(
                          fee.semester4
                        )}
                      </td>

                      <td>
                        {displayFee(
                          fee.semester5
                        )}
                      </td>

                      <td>
                        {displayFee(
                          fee.semester6
                        )}
                      </td>

                      <td>
                        {displayFee(
                          fee.semester7
                        )}
                      </td>

                      <td>
                        {displayFee(
                          fee.semester8
                        )}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      )}

    </div>
  );
}

export default FeeStructure;