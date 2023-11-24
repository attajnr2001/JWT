import Course from "../models/CourseModel.js";
import Class from "../models/classModel.js";
import User from "../models/userModel.js";
import Student from "../models/studentModel.js";

async function createCourse(
  name,
  coreSubjects,
  electiveSubjects,
  headOfDeptId
) {
  try {
    // Assuming headOfDeptId is the ObjectId of the head of department from the Users collection
    const newCourse = await Course.create({
      name,
      coreSubjects,
      electiveSubjects,
      headOfDeptId: headOfDeptId,
    });

    return newCourse;
  } catch (error) {
    // Handle error, e.g., log it or throw a custom error
    console.error("Error creating course:", error.message);
    throw new Error("Could not create course");
  }
}

async function createClass(courseId, className, teacherId) {
  try {
    // Check if the teacherId exists in the Teachers collection
    const teacherExists = await Teacher.exists({ _id: teacherId });
    if (!teacherExists) {
      throw new Error("Teacher not found");
    }

    // Check if the courseId exists in the Courses collection
    const courseExists = await Course.exists({ _id: courseId });
    if (!courseExists) {
      throw new Error("Course not found");
    }

    // Check if the teacher's selected course matches the courseId
    const teacher = await Teacher.findById(teacherId);
    if (!teacher || String(teacher.course) !== String(courseId)) {
      throw new Error(
        "Teacher's selected course does not match the provided courseId"
      );
    }

    // Create the class
    const newClass = await Class.create({
      courseId,
      className,
      teacherId,
    });

    return newClass;
  } catch (error) {
    // Handle error, e.g., log it or throw a custom error
    console.error("Error creating class:", error.message);
    throw new Error("Could not create class");
  }
}

async function addStudent(firstName, lastName, hall, classId, courseId, year) {
  try {
    // Check if the classId exists in the Classes collection
    const classExists = await Class.exists({ _id: classId });
    if (!classExists) {
      throw new Error("Class not found");
    }

    // Check if the courseId exists in the Courses collection
    const courseExists = await Course.exists({ _id: courseId });
    if (!courseExists) {
      throw new Error("Course not found");
    }

    // Check if the provided classId belongs to the provided courseId
    const classBelongsToCourse = await Class.exists({
      _id: classId,
      courseId: courseId,
    });
    if (!classBelongsToCourse) {
      throw new Error("Class does not belong to the provided course");
    }

    // Create the student
    const newStudent = await Student.create({
      firstName,
      lastName,
      hall,
      classId: classId,
      courseId: courseId,
      year,
    });

    return newStudent;
  } catch (error) {
    console.error("Error adding student:", error.message);
    throw new Error("Could not add student");
  }
}
export { createCourse, createClass, addStudent };
