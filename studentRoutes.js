const express = require("express");
const router = express.Router();
const students = require("../data/students");

const isValidId = (id) => Number.isInteger(Number(id)) && Number(id) > 0;

router.get("/", (req, res) => {
  res.status(200).json(students);
});

router.get("/:id", (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({
      error: "Student ID must be a positive integer"
    });
  }

  const id = Number(req.params.id);
  const student = students.find((item) => item.id === id);

  if (!student) {
    return res.status(404).json({
      error: "Student not found"
    });
  }

  res.status(200).json(student);
});

router.post("/", (req, res) => {
  const { name, course, age } = req.body;

  if (!name || !course || age === undefined) {
    return res.status(400).json({
      error: "name, course and age are required"
    });
  }

  if (typeof name !== "string" || typeof course !== "string") {
    return res.status(400).json({
      error: "name and course must be strings"
    });
  }

  const numericAge = Number(age);
  if (!Number.isInteger(numericAge) || numericAge < 1 || numericAge > 100) {
    return res.status(400).json({
      error: "age must be a valid integer between 1 and 100"
    });
  }

  const newStudent = {
    id: students.length ? Math.max(...students.map((item) => item.id)) + 1 : 1,
    name: name.trim(),
    course: course.trim(),
    age: numericAge
  };

  if (!newStudent.name || !newStudent.course) {
    return res.status(400).json({
      error: "name and course cannot be empty"
    });
  }

  students.push(newStudent);

  res.status(201).json({
    message: "Student created successfully",
    student: newStudent
  });
});

router.put("/:id", (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({
      error: "Student ID must be a positive integer"
    });
  }

  const id = Number(req.params.id);
  const studentIndex = students.findIndex((item) => item.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({
      error: "Student not found"
    });
  }

  const { name, course, age } = req.body;

  if (!name || !course || age === undefined) {
    return res.status(400).json({
      error: "name, course and age are required"
    });
  }

  if (typeof name !== "string" || typeof course !== "string") {
    return res.status(400).json({
      error: "name and course must be strings"
    });
  }

  const numericAge = Number(age);
  if (!Number.isInteger(numericAge) || numericAge < 1 || numericAge > 100) {
    return res.status(400).json({
      error: "age must be a valid integer between 1 and 100"
    });
  }

  const updatedStudent = {
    id,
    name: name.trim(),
    course: course.trim(),
    age: numericAge
  };

  if (!updatedStudent.name || !updatedStudent.course) {
    return res.status(400).json({
      error: "name and course cannot be empty"
    });
  }

  students[studentIndex] = updatedStudent;

  res.status(200).json({
    message: "Student updated successfully",
    student: updatedStudent
  });
});

router.delete("/:id", (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(400).json({
      error: "Student ID must be a positive integer"
    });
  }

  const id = Number(req.params.id);
  const studentIndex = students.findIndex((item) => item.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({
      error: "Student not found"
    });
  }

  const deletedStudent = students.splice(studentIndex, 1)[0];

  res.status(200).json({
    message: "Student deleted successfully",
    student: deletedStudent
  });
});

module.exports = router;
