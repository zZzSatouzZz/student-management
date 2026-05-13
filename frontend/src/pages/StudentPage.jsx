import { useEffect, useState } from "react";

import axios from "axios";

import {
  FaTrash,
  FaEdit,
  FaEye,
  FaPlus,
  FaSignOutAlt,
  FaUsers,
  FaSchool,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import "./students.css";

export default function Students() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [age, setAge] = useState("");

  const [classroom, setClassroom] = useState("");

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:8080/api/v1/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8080/api/v1/students",
        {
          name,
          email,
          age,
          classroom,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setName("");
      setEmail("");
      setAge("");
      setClassroom("");

      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:8080/api/v1/students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <div className="sidebar">
        <div>
          <h2>Student Management</h2>

          <ul>
            <li className="active">
              <FaUsers />
              Dashboard
            </li>

            <li>
              <FaSchool />
              Students
            </li>
          </ul>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div className="main-content">
        <div className="topbar">
          <div className="top-right">
            <input
              type="text"
              placeholder="Search students..."
              className="search-input"
            />

            <div className="profile">F</div>
          </div>
          <div>
            <h1>Dashboard</h1>

            <p>Welcome back 👋</p>
          </div>

          <button className="add-btn" onClick={handleCreate}>
            <FaPlus />
            Add Student
          </button>
        </div>

        {/* STATS */}

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Students</h3>
            <h1>{students.length}</h1>
            <p>Registered students</p>
          </div>

          <div className="stat-card green">
            <h3>Classes</h3>
            <h1>12</h1>
            <p>Active classes</p>
          </div>

          <div className="stat-card purple">
            <h3>Teachers</h3>
            <h1>8</h1>
            <p>Teaching staff</p>
          </div>

          <div className="stat-card orange">
            <h3>Attendance</h3>
            <h1>92%</h1>
            <p>Average attendance</p>
          </div>
        </div>

        {/* FORM */}
        <div className="form-card">
          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <input
            type="text"
            placeholder="Classroom"
            value={classroom}
            onChange={(e) => setClassroom(e.target.value)}
          />
        </div>

        {/* TABLE */}
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Classroom</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>

                  <td>{student.name}</td>
                  <td>{student.email}</td>

                  <td>{student.age}</td>

                  <td>
                    <span className="class-badge">{student.classroom}</span>
                  </td>

                  <td className="actions">
                    <button>
                      <FaEye />
                    </button>

                    <button>
                      <FaEdit />
                    </button>

                    <button onClick={() => handleDelete(student.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
