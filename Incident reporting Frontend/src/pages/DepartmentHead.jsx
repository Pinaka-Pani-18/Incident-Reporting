import { useEffect, useState } from "react";
import {
  deleteReport,
  listAllTheReports,
  getReport,
} from "../services/ReportService";
import { useNavigate } from "react-router";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import { FaArrowCircleLeft, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaSearch } from "react-icons/fa";

const DepartmentHead = () => {
  const [reportsData, setReportsDate] = useState([]);
  const [singleReport, setSingleReport] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  // const [popUpDelete, setPopUpDelete] = useState(false);

  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
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
        }
      }
    );
  }, []);

  useEffect(() => {
    getAllReports();
  }, []);

  const navigate = useNavigate();

  function getAllReports() {
    listAllTheReports()
      .then((response) => {
        let filteredReports = response.data;

        if (dateFilter) {
          filteredReports = filteredReports.filter((report) =>
            report.irDate.includes(dateFilter)
          );
        }

        if (statusFilter === "assigned") {
          filteredReports = filteredReports.filter(
            (report) => report.statusUser !== "unassigned"
          );
        } else if (statusFilter === "unassigned") {
          filteredReports = filteredReports.filter(
            (report) => report.statusUser === "unassigned"
          );
        }

        setReportsDate(filteredReports);
      })
      .catch((error) => console.error(error));
  }

  function editStatus(id) {
    navigate(`/edit-report-status/${id}`);
  }

  function removeReport(id) {
    deleteReport(id)
      .then(() => {
        window.location.reload();
        const updatedReportsData = reportsData.filter(
          (report) => report.id !== id
        );
        navigate("/department-head");
        setReportsDate(updatedReportsData);
      })
      .catch((error) => console.log(error));
  }

  function getSingleReport(id) {
    setIsOpen(true);
    getReport(id)
      .then((res) => {
        setSingleReport(res.data);
      })
      .catch((error) => console.log(error));
  }

  // function handleDelete(id) {
  //   deleteReport(id)
  //     .then(() => {
  //       const updatedReportsData = reportsData.filter(
  //         (report) => report.id !== id
  //       );
  //       navigate("/department-head");
  //       setReportsDate(updatedReportsData);
  //     })
  //     .catch((error) => console.log(error));
  //   setPopUpDelete(false);
  //   window.location.reload();
  // }

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Department Head</h1>

      <div className="flex flex-row gap-4">
        <div className="flex flex-row gap-2 justify-center">
          <p className="text-lg font-semibold text-blue-700">Date:</p>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border border-blue-300 rounded px-4 mb-4"
          />
        </div>

        <div className="flex flex-row gap-2">
          <p className="text-lg text-blue-700 font-semibold ">Status:</p>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-blue-300 bg-white rounded p-1 mb-4"
          >
            <option value="">Select</option>
            <option value="assigned">Assigned</option>
            <option value="unassigned">Unassigned</option>
          </select>
        </div>

        <div>
          <button
            onClick={getAllReports}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-2 rounded mr-2"
          >
            <FaSearch />
          </button>
        </div>
      </div>

      <table className="w-[50rem] border-collapse border border-blue-700 rounded-md">
        <caption className="text-lg mb-2">
          All the incident reports of your department
          <p className="text-sm text-right font-semibold">
            Total No of Incidents: {reportsData.length}
          </p>
        </caption>
        <thead>
          <tr className="bg-blue-200">
            <th className="border border-blue-300 px-4 py-2 text-blue-700">
              ID
            </th>
            <th className="border border-blue-300 px-4 py-2 text-blue-700">
              Department
            </th>
            {/* <th className="border border-blue-300 px-4 py-2 text-blue-700">
            Responsible
          </th> */}
            <th className="border border-blue-300 px-4 py-2 text-blue-700">
              Description
            </th>
            {/* <th className="border border-blue-300 px-4 py-2 text-blue-700">
            Type
          </th> */}
            {/* <th className="border border-blue-300 px-4 py-2 text-blue-700">
            Person
          </th> */}
            <th className="border border-blue-300 px-4 py-2 text-blue-700">
              Level
            </th>
            <th className="border border-blue-300 px-4 py-2 text-blue-700">
              Date
            </th>
            {/* <th className="border border-blue-300 px-4 py-2 text-blue-700">
            Time
          </th> */}
            <th className="border border-blue-300 px-4 py-2 text-blue-700">
              Status
            </th>
            <th className="border border-blue-300 px-4 py-2 text-blue-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {reportsData.map((data) => {
            return (
              <tr key={data.id} className="bg-blue-100">
                <td className="border border-blue-300 px-4 py-2">{data.id}</td>
                <td className="border border-blue-300 px-4 py-2">
                  {data.department}
                </td>
                {/* <td className="border border-blue-300 px-4 py-2">
                {data.departmentResOrSolutionPro}
              </td> */}
                <td className="border border-blue-300 px-4 py-2">
                  {data.description}
                </td>
                {/* <td className="border border-blue-300 px-4 py-2">
                {data.incidentType}
              </td> */}
                {/* <td className="border border-blue-300 px-4 py-2">
                {data.person}
              </td> */}
                <td className="border border-blue-300 px-4 py-2">
                  {data.level}
                </td>
                <td className="border border-blue-300 px-4 py-2">
                  {data.irDate}
                </td>
                {/* <td className="border border-blue-300 px-4 py-2">
                  {data.irTime}
                </td> */}
                <td className="border border-blue-300 px-4 py-2">
                  {data.statusUser}
                </td>
                <td className="border border-blue-300 px-4 py-2">
                  <button
                    onClick={() => getSingleReport(data.id)}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold p-2 rounded mr-2"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => editStatus(data.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-2 rounded mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => removeReport(data.id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold p-2 rounded"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isOpen && singleReport && (
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-md max-w-2xl mx-auto p-6 border border-blue-400">
            <button
              className="absolute top-0 right-0 m-4 bg-red-600 hover:bg-red-700 text-white font-bold p-2 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <IoMdClose />
            </button>

            <h2 className="text-2xl text-blue-700 font-bold mb-4">
              Incident Details of ID:{" "}
              <span className="text-black">{singleReport.id}</span>
            </h2>

            <div className="mb-2">
              <div className="mb-2">
                <p className="font-bold text-blue-700 mb-1">
                  Date and Time of the Incident:
                </p>
                <p>
                  {singleReport.irDate} {singleReport.irTime}
                </p>
              </div>

              <div className="mb-2">
                <p className="font-bold text-blue-700 mb-1">Department:</p>
                <p>{singleReport.department}</p>
              </div>

              <div className="mb-2">
                <p className="font-bold text-blue-700 mb-1">Incident Type:</p>
                <p>
                  {singleReport.incidentType === "clinical"
                    ? "Clinical"
                    : "Non Clinical"}
                </p>
              </div>

              <div className="mb-2">
                <p className="font-bold text-blue-700 mb-1">Description:</p>
                <p>{singleReport.description}</p>
              </div>

              <div className="mb-2">
                <p className="font-bold text-blue-700 mb-1">Priority Level:</p>
                <p>{singleReport.level}</p>
              </div>

              <div className="mb-2">
                <p className="font-bold text-blue-700 mb-1">Person:</p>
                <p>{singleReport.person}</p>
              </div>

              <div className="mb-2">
                <p className="font-bold text-blue-700 mb-1">
                  Responsible Department/Solution Provider:
                </p>
                <p>{singleReport.departmentResOrSolutionPro}</p>
              </div>

              <div>
                <p className="font-bold text-blue-700 mb-1">Status:</p>
                <p>{singleReport.statusUser}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* {popUpDelete && (
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-md max-w-2xl mx-auto p-6 border border-blue-400"></div>
        </div>
      )} */}
    </div>
  );
};

export default DepartmentHead;
