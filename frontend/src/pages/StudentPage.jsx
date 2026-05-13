import { useEffect, useMemo, useState } from "react";

import {
  FaTrash,
  FaEdit,
  FaEye,
  FaPlus,
  FaSignOutAlt,
  FaUsers,
  FaSchool,
  FaChalkboardTeacher,
  FaChartLine,
  FaChartBar,
  FaCog,
  FaSearch,
  FaBell,
  FaBars,
  FaBookOpen,
  FaChevronDown,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import instance from "../api/axios.customize";

import "./students.css";

export default function Students() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [editingStudent, setEditingStudent] = useState(null);

  const [viewStudent, setViewStudent] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    classroom: "",
    status: "Active",
  });
  <select
    name="status"
    value={formData.status}
    onChange={(e) =>
      setFormData({
        ...formData,
        status: e.target.value,
      })
    }
  >
    <option value="Active">Active</option>
    <option value="Inactive">Inactive</option>
  </select>;
  const fetchStudents = async () => {
    try {
      setLoading(true);

      const res = await instance.get("/students");

      setStudents(res.data.data);
    } catch (error) {
      console.log(error);

      toast.error("Fetch students failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async () => {
    try {
      await instance.post("/students", {
        ...formData,
        age: Number(formData.age),
        status: formData.status,
      });

      toast.success("Student added successfully");

      setFormData({
        name: "",
        email: "",
        age: "",
        classroom: "",
        status: "Active",
      });

      fetchStudents();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Create failed");
    }
  };

  const handleView = (student) => {
    setViewStudent(student);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);

    setFormData({
      name: student.name,
      email: student.email,
      age: student.age,
      classroom: student.classroom,
      status: student.status,
    });
  };
  const handleUpdate = async () => {
    try {
      await instance.put(`/students/${editingStudent.id}`, {
        ...formData,
        age: Number(formData.age),
        status: formData.status,
      });

      toast.success("Update success");

      setEditingStudent(null);

      setFormData({
        name: "",
        email: "",
        age: "",
        classroom: "",
        status: "Active",
      });

      fetchStudents();
    } catch (error) {
      console.log(error);

      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this student?");

    if (!confirmDelete) return;

    try {
      await instance.delete(`/students/${id}`);

      toast.success("Delete success");

      fetchStudents();
    } catch (error) {
      console.log(error);

      toast.error("Delete failed");
    }
  };

  const handleToggleStatus = async (student) => {
    try {
      const newStatus = student.status === "Active" ? "Inactive" : "Active";

      await instance.put(`/students/${student.id}`, {
        ...student,
        status: newStatus,
      });

      toast.success("Status updated");

      fetchStudents();
    } catch (error) {
      console.log(error);

      toast.error("Update status failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/", { replace: true });
  };
  const filteredStudents = useMemo(() => {
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [students, search]);

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <div className={sidebarOpen ? "sidebar open" : "sidebar"}>
        <div>
          <div className="logo">
            <div className="logo-icon">🎓</div>

            <div>
              <h2>
                Student
                <br />
                Management
              </h2>
            </div>
          </div>

          <ul>
            <li className="active">
              <FaUsers />
              Dashboard
            </li>

            <li>
              <FaSchool />
              Students
            </li>

            <li>
              <FaPlus />
              Add Student
            </li>

            <li>
              <FaBookOpen />
              Classes
            </li>

            <li>
              <FaChartBar />
              Reports
            </li>

            <li>
              <FaCog />
              Settings
            </li>
          </ul>
        </div>

        <div className="bottom-sidebar">
          <div className="profile-box">
            <div className="profile-left">
              <div className="profile-avatar">F</div>

              <div>
                <h4>Fumio</h4>
                <p>Fumio@gmail.com</p>
              </div>
            </div>

            <FaChevronDown />
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className={sidebarOpen ? "main-content" : "main-content expanded"}>
        {/* TOPBAR */}
        <div className="topbar">
          <div className="menu-icon">
            <FaBars onClick={() => setSidebarOpen(!sidebarOpen)} />
          </div>
          <div>
            <h1>Dashboard</h1>

            <p>Welcome back 👋</p>
          </div>

          <div className="top-right">
            <div className="search-box">
              <FaSearch />

              <input
                type="text"
                placeholder="Search students..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="notification">
              <FaBell />
            </div>

            <div className="profile">F</div>
          </div>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card blue">
            <div className="stat-top">
              <div className="stat-icon blue-icon">
                <FaUsers />
              </div>

              <div>
                <h3>Total Students</h3>
                <h1>{students.length}</h1>
                <p>Registered students</p>
              </div>
            </div>
          </div>

          <div className="stat-card green">
            <div className="stat-top">
              <div className="stat-icon green-icon">
                <FaBookOpen />
              </div>

              <div>
                <h3>Classes</h3>
                <h1>12</h1>
                <p>Active classes</p>
              </div>
            </div>
          </div>

          <div className="stat-card purple">
            <div className="stat-top">
              <div className="stat-icon purple-icon">
                <FaChalkboardTeacher />
              </div>

              <div>
                <h3>Teachers</h3>
                <h1>8</h1>
                <p>Teaching staff</p>
              </div>
            </div>
          </div>

          <div className="stat-card orange">
            <div className="stat-top">
              <div className="stat-icon orange-icon">
                <FaChartLine />
              </div>

              <div>
                <h3>Attendance</h3>
                <h1>92%</h1>
                <p>Average attendance</p>
              </div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="form-card">
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
          />

          <input
            type="text"
            name="classroom"
            placeholder="Classroom"
            value={formData.classroom}
            onChange={handleChange}
          />

          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button
            className="add-btn"
            onClick={editingStudent ? handleUpdate : handleCreate}
          >
            <FaPlus />
            {editingStudent ? "Update" : "Add Student"}
          </button>
        </div>

        {/* TABLE */}
        <div className="table-card">
          <div className="table-header">
            <h2>Students List</h2>

            <div className="table-search">
              <FaSearch />

              <input
                type="text"
                placeholder="Search by name, email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="loading">Loading students...</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Classroom</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="empty">
                      No students found
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>{student.id}</td>

                      <td>
                        <div className="student-cell">
                          <div className="avatar">
                            {student.name.charAt(0).toUpperCase()}
                          </div>

                          {student.name}
                        </div>
                      </td>

                      <td>{student.email}</td>

                      <td>{student.age}</td>

                      <td>
                        <span className="class-badge">{student.classroom}</span>
                      </td>

                      <td>
                        <span
                          onClick={() => handleToggleStatus(student)}
                          className={
                            student.status === "Active"
                              ? "status active"
                              : "status inactive"
                          }
                        >
                          {student.status}
                        </span>
                      </td>

                      <td className="actions">
                        <button onClick={() => handleView(student)}>
                          <FaEye />
                        </button>

                        <button onClick={() => handleEdit(student)}>
                          <FaEdit />
                        </button>

                        <button onClick={() => handleDelete(student.id)}>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {viewStudent && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Student Details</h2>

            <p>
              <strong>Name:</strong> {viewStudent.name}
            </p>

            <p>
              <strong>Email:</strong> {viewStudent.email}
            </p>

            <p>
              <strong>Age:</strong> {viewStudent.age}
            </p>

            <p>
              <strong>Classroom:</strong> {viewStudent.classroom}
            </p>

            <button onClick={() => setViewStudent(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
