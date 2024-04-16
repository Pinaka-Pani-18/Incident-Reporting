import { useEffect, useState } from "react";
import styles from "./../css/reporting.module.css";
import {
  createReport,
  getReport,
  updateReport,
} from "../services/ReportService";
import { useNavigate, useParams } from "react-router";
import { FaArrowCircleLeft } from "react-icons/fa";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import { TiTick } from "react-icons/ti";

const ReportingPage = () => {
  const [irDate, setIrDate] = useState("");
  const [irTime, setIrTime] = useState("");
  const [department, setDepartment] = useState("");
  const [incidentType, setIncidentType] = useState("clinical");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("low");
  const [person, setPerson] = useState("");
  const [departmentResOrSolutionPro, setDepartmentResOrSolutionPro] =
    useState("");
  const [statusUser, setStatusUser] = useState("unassigned");

  const [content, setContent] = useState("");
  const [openSuccessPopUp, setOpenSuccessPopUp] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        console.log("entered");
        setContent(response.data);
      },
      (error) => {
        setContent(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        );

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
          console.log("logout");
          console.log(error.response, error.response.status);
        }
      }
    );
  }, []);

  useEffect(() => {
    if (id) {
      getReport(id)
        .then((response) => {
          setIrDate(response.data.irDate);
          setIrTime(response.data.irTime);
          setDepartment(response.data.department);
          setIncidentType(response.data.incidentType);
          setDescription(response.data.description);
          setLevel(response.data.level);
          setPerson(response.data.person);
          setDepartmentResOrSolutionPro(
            response.data.departmentResOrSolutionPro
          );
          setStatusUser(response.data.statusUser);
        })
        .catch((error) => console.log(error));
    }
  }, [id]);

  function saveReport(e) {
    e.preventDefault();

    const reportData = {
      irDate,
      irTime,
      department,
      incidentType,
      description,
      level,
      person,
      departmentResOrSolutionPro,
      statusUser,
    };

    console.log(reportData);

    if (id) {
      // Update report
      updateReport(id, reportData)
        .then((response) => {
          console.log(response);
          console.log("success");
          navigate("/department-head");
        })
        .catch((error) => {
          console.log("failed");
          console.error(error);
        });
    } else {
      // Create report
      createReport(reportData)
        .then((response) => {
          console.log(response.data);
          setOpenSuccessPopUp(true);
        })
        .catch((error) => console.error(error));
    }
  }

  function handleOk() {
    setOpenSuccessPopUp(false);
    window.location.reload();
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        {id ? "Update the Report" : "Incident reporting Page"}
      </h1>
      <div>
        <h2>{id ? "" : "Fill the below options to report an incident"}</h2>
        <form
          onSubmit={saveReport}
          className={`${styles.formContainer} grid grid-cols-2 gap-2`}
        >
          {id && (
            <>
              <div className={`${styles.formDiv} col-span-2`}>
                <label htmlFor="statusUser" className={styles.formHeading}>
                  Status
                </label>
                <select
                  name="statusUser"
                  id="statusUser"
                  className="w-full"
                  onChange={(e) => setStatusUser(e.target.value)}
                >
                  <option>Select</option>
                  <option value="unassigned">Unassigned</option>
                  <option value="assigned">Assigned</option>
                </select>
              </div>
            </>
          )}

          {!id && (
            <>
              <div className={`${styles.formDiv}`}>
                <label htmlFor="dateandtime" className={styles.formHeading}>
                  Date and Time
                </label>
                <div className="dateandtime">
                  <input
                    type="date"
                    name="irDate"
                    value={irDate}
                    onChange={(e) => setIrDate(e.target.value)}
                    required
                  />
                  <input
                    type="time"
                    name="irTime"
                    value={irTime}
                    onChange={(e) => setIrTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={styles.formDiv}>
                <label htmlFor="department" className={styles.formHeading}>
                  Department that incident occurred
                </label>
                <input
                  type="text"
                  name="department"
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                />
              </div>

              <div className={`${styles.formDiv} col-span-2`}>
                <label htmlFor="description" className={styles.formHeading}>
                  Detailed Description about the incident
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formDiv}>
                <label htmlFor="" className={styles.formHeading}>
                  Type of Incident
                </label>
                <div className="cncDiv">
                  <input
                    type="radio"
                    id="clinical"
                    name="incidentType"
                    value={"clinical"}
                    checked={incidentType === "clinical"}
                    onChange={(e) => setIncidentType(e.target.value)}
                  />
                  <label htmlFor="clinical">Clinical</label>
                  <input
                    type="radio"
                    id="nonclinical"
                    name="incidentType"
                    value={"nonclinical"}
                    checked={incidentType === "nonclinical"}
                    onChange={(e) => setIncidentType(e.target.value)}
                  />
                  <label htmlFor="nonclinical">Non Clinical</label>
                </div>
              </div>

              <div className={styles.formDiv}>
                <label htmlFor="level" className={styles.formHeading}>
                  Incident Priority Level
                </label>
                <select
                  name="level"
                  id="prioritylevel"
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className={styles.formDiv}>
                <label htmlFor="person" className={styles.formHeading}>
                  Mention a person who can provide more information (Optional)
                </label>
                <input
                  type="text"
                  name="person"
                  id="person"
                  value={person}
                  onChange={(e) => setPerson(e.target.value)}
                />
              </div>

              <div className={styles.formDiv}>
                <label
                  htmlFor="departmentResOrSolutionPro"
                  className={styles.formHeading}
                >
                  Department who are responsible for the incident or who can
                  provide the solution
                </label>
                <input
                  type="text"
                  name="departmentResOrSolutionPro"
                  id="responsible"
                  value={departmentResOrSolutionPro}
                  onChange={(e) =>
                    setDepartmentResOrSolutionPro(e.target.value)
                  }
                  required
                />
              </div>
            </>
          )}

          <button onSubmit={saveReport} type="submit" className="col-span-2">
            {id ? "Save" : "Submit"}
          </button>
        </form>
      </div>

      {openSuccessPopUp && (
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="w-[20rem] flex flex-col bg-violet-200 p-4 justify-center items-center gap-3 border rounded-lg">
            <TiTick />
            <p>Successfully submitted the report</p>
            <button
              onClick={handleOk}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportingPage;
