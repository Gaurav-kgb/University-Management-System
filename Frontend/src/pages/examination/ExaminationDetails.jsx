import { useEffect, useState } from "react";
import "../../styles/Examination.css";

function ExaminationDetails() {
  const [marksList, setMarksList] = useState([]);
  const [searchRollno, setSearchRollno] = useState("");
  const [semester, setSemester] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================
  // FETCH MARKS FROM JAVA BACKEND
  // =====================================

  const fetchMarks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:8080/api/marks");

      if (!response.ok) {
        throw new Error("Unable to fetch marks");
      }

      const data = await response.json();

      setMarksList(data);
    } catch (error) {
      console.error("Error fetching marks:", error);

      setError("Unable to load examination details.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // LOAD DATA WHEN PAGE OPENS
  // =====================================

  useEffect(() => {
    fetchMarks();
  }, []);

  // =====================================
  // FILTER DATA
  // =====================================

  const filteredMarks = marksList.filter((item) => {
    const rollMatch = item.rollno
      .toLowerCase()
      .includes(searchRollno.toLowerCase());

    const semesterMatch = semester === "" || item.semester === semester;

    return rollMatch && semesterMatch;
  });

  // =====================================
  // RESULT STYLE
  // =====================================

  const getResultClass = (result) => {
    if (result === "Pass") {
      return "result-pass";
    }

    return "result-fail";
  };

  return (
    <div className="exam-page">
      {/* =================================
          PAGE HEADING
      ================================= */}

      <div className="exam-heading">
        <h1>Examination Details</h1>

        <p>View student examination marks and results</p>
      </div>

      {/* =================================
          SEARCH / FILTER
      ================================= */}

      <div className="exam-form-card">
        <div className="exam-section-title">Search Examination Records</div>

        <div className="exam-grid">
          {/* Roll Number Search */}

          <div className="exam-form-group">
            <label>Search Roll Number</label>

            <input
              type="text"
              value={searchRollno}
              onChange={(e) => setSearchRollno(e.target.value)}
              placeholder="Example: IT001"
            />
          </div>

          {/* Semester Filter */}

          <div className="exam-form-group">
            <label>Semester</label>

            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="">All Semesters</option>

              <option value="1">Semester 1</option>

              <option value="2">Semester 2</option>

              <option value="3">Semester 3</option>

              <option value="4">Semester 4</option>

              <option value="5">Semester 5</option>

              <option value="6">Semester 6</option>

              <option value="7">Semester 7</option>

              <option value="8">Semester 8</option>
            </select>
          </div>
        </div>
      </div>

      {/* =================================
          LOADING
      ================================= */}

      {loading && (
        <div className="exam-form-card">
          <p>Loading examination details...</p>
        </div>
      )}

      {/* =================================
          ERROR
      ================================= */}

      {error && <div className="exam-error">{error}</div>}

      {/* =================================
          TABLE
      ================================= */}

      {!loading && !error && (
        <div className="exam-form-card">
          <div className="exam-section-title">Examination Records</div>

          {filteredMarks.length === 0 ? (
            <p>No examination records found.</p>
          ) : (
            <div
              style={{
                overflowX: "auto",
              }}
            >
              <table className="exam-table">
                <thead>
                  <tr>
                    <th>Roll No</th>

                    <th>Semester</th>

                    <th>Subject 1</th>

                    <th>Subject 2</th>

                    <th>Subject 3</th>

                    <th>Subject 4</th>

                    <th>Subject 5</th>

                    <th>Total</th>

                    <th>Percentage</th>

                    <th>Result</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredMarks.map((item, index) => (
                    <tr key={`${item.rollno}-${item.semester}-${index}`}>
                      <td>{item.rollno}</td>

                      <td>Semester {item.semester}</td>

                      <td>
                        <strong>{item.subject1}</strong>
                        <br />
                        {item.marks1}/100
                      </td>

                      <td>
                        <strong>{item.subject2}</strong>
                        <br />
                        {item.marks2}/100
                      </td>

                      <td>
                        <strong>{item.subject3}</strong>
                        <br />
                        {item.marks3}/100
                      </td>

                      <td>
                        <strong>{item.subject4}</strong>
                        <br />
                        {item.marks4}/100
                      </td>

                      <td>
                        <strong>{item.subject5}</strong>
                        <br />
                        {item.marks5}/100
                      </td>

                      <td>
                        <strong>{item.total}/500</strong>
                      </td>

                      <td>
                        <strong>{Number(item.percentage).toFixed(2)}%</strong>
                      </td>

                      <td>
                        <span
                          className={
                            item.result === "Pass"
                              ? "result-pass"
                              : "result-fail"
                          }
                        >
                          {item.result}
                        </span>
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

export default ExaminationDetails;
