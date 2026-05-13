const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../services/student.service");

const {
  successResponse,
  errorResponse,
} = require("../utils/response");

const getAll = async (req, res) => {
  try {
    const students = await getStudents();

    return successResponse(res, students);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

const getOne = async (req, res) => {
  try {
    const student = await getStudentById(
      req.params.id
    );

    return successResponse(res, student);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

const create = async (req, res) => {
  try {
    const student = await createStudent(req.body);

    return successResponse(
      res,
      student,
      "Create success"
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

const update = async (req, res) => {
  try {
    const student = await updateStudent(
      req.params.id,
      req.body
    );

    return successResponse(
      res,
      student,
      "Update success"
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

const remove = async (req, res) => {
  try {
    await deleteStudent(req.params.id);

    return successResponse(
      res,
      null,
      "Delete success"
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};