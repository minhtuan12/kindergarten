import mongoose from 'mongoose';

const teacherMessageSchema = new mongoose.Schema(
  {
    parentName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 80,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const TeacherMessage = mongoose.model('TeacherMessage', teacherMessageSchema);
