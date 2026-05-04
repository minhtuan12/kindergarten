import { connectToDatabase } from './_lib/mongodb.js';
import { TeacherMessage } from '../server/models/TeacherMessage.js';

export default async function handler(req, res) {
  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const messages = await TeacherMessage.find().sort({ createdAt: -1 }).limit(200).lean();
      return res.status(200).json(messages);
    }

    if (req.method === 'POST') {
      const { parentName, studentName, content } = req.body ?? {};
      if (!parentName || !studentName || !content) {
        return res.status(400).json({ message: 'parentName, studentName and content are required.' });
      }

      const message = await TeacherMessage.create({
        parentName: String(parentName).trim(),
        studentName: String(studentName).trim(),
        content: String(content).trim(),
      });
      return res.status(201).json(message);
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
