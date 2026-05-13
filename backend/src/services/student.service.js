const pool = require("../config/database");

const getStudents = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM students ORDER BY id DESC"
  );

  return rows;
};

const getStudentById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM students WHERE id = ?",
    [id]
  );

  return rows[0];
};

const createStudent = async (body) => {
  const {
    name,
    email,
    age,
    classroom,
    status,
  } = body;

  const [result] = await pool.query(
    `
    INSERT INTO students(name, email, age, classroom, status)
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      name,
      email,
      age,
      classroom,
      status,
    ]
  );

  return {
    id: result.insertId,
    ...body,
  };
};

const updateStudent = async (id, body) => {
  const {
  name,
  email,
  age,
  classroom,
  status,
} = body;

  await pool.query(
    `
    UPDATE students
   SET name = ?, email = ?, age = ?, classroom = ?, status = ?
    WHERE id = ?
    `,
    [
  name,
  email,
  age,
  classroom,
  status,
  id,
]
  );

  return {
    id,
    ...body,
  };
};

const deleteStudent = async (id) => {
  await pool.query(
    "DELETE FROM students WHERE id = ?",
    [id]
  );
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};