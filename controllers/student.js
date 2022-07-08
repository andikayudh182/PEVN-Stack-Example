const Student = require('../models').Student;
const Classroom = require('../models').Classroom;
const Course = require('../models').Course;

module.exports = {
  list(req, res) {
    return Student
      .findAll({
        include: [{
          model: Classroom,
          as: 'classroom'
        },{
          model: Course,
          as: 'courses'
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: Course, as: 'courses' }, 'createdAt', 'DESC'],
        ],
      })
      .then((student) => res.status(200).send(
        {
          message:`Get all student success`,
          data: student
        }))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Student
      .findByPk(req.params.id, {
        include: [{
          model: Classroom,
          as: 'classroom'
        },{
          model: Course,
          as: 'courses'
        }],
      })
      .then((student) => {
        if (!student) {
          return res.status(404).send({
            message: 'Student Not Found',
          });
        }
        return res.status(200).send({
          message:'Get student by ID success',
          data : student
        });
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Student
      .create({
        classroom_id: req.body.classroom_id,
        student_name: req.body.student_name,
      })
      .then((student) => res.status(201).send({
        message:'Add new student success',
        data : student
      }))
      .catch((error) => res.status(400).send(error));
  },

  addCourse(req, res) {
    return Student
      .findByPk(req.body.student_id, {
        include: [{
          model: Classroom,
          as: 'classroom'
        },{
          model: Course,
          as: 'courses'
        }],
      })
      .then((student) => {
        if (!student) {
          return res.status(404).send({
            message: 'Student Not Found',
          });
        }
        Course.findByPk(req.body.course_id).then((course) => {
          if (!course) {
            return res.status(404).send({
              message: 'Course Not Found',
            });
          }
          student.addCourse(course);
          return res.status(200).send({
            message: 'Add course student by id success',
            data : student
          });
        })
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Student
      .findByPk(req.params.id, {
        include: [{
          model: Classroom,
          as: 'classroom'
        },{
          model: Course,
          as: 'courses'
        }],
      })
      .then(student => {
        if (!student) {
          return res.status(404).send({
            message: 'Student Not Found',
          });
        }
        return student
          .update({
            student_name: req.body.student_name || student.student_name,
          })
          .then(() => res.status(200).send({
            message:`update student by id ${req.params.id} success`,
            data : student
          }))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Student
      .findByPk(req.params.id)
      .then(student => {
        if (!student) {
          return res.status(400).send({
            message: 'Student Not Found',
          });
        }
        return student
          .destroy().then(() => res.status(200).send({
            message: `Delete student with id ${req.params.id} success`,
          }))
          
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};