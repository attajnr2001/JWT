// models/CourseModel.js
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  coreSubjects: {
    type: [String],
    required: true,
  },
  electiveSubjects: {
    type: [String],
    required: true,
  }
} ,{
  timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
