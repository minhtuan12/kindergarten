import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { CommunityPost } from './models/CommunityPost.js';
import { TeacherMessage } from './models/TeacherMessage.js';

const app = express();
const port = Number(process.env.API_PORT || 3001);
const mongoUri = process.env.MONGODB_URI;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/community-posts', async (_req, res) => {
  try {
    const posts = await CommunityPost.find()
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch community posts.' });
  }
});

app.post('/api/community-posts', async (req, res) => {
  try {
    const { parentName, content } = req.body ?? {};

    if (!parentName || !content) {
      return res.status(400).json({ message: 'parentName and content are required.' });
    }

    const post = await CommunityPost.create({
      parentName: String(parentName).trim(),
      content: String(content).trim(),
    });

    return res.status(201).json(post);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to create community post.' });
  }
});

app.get('/api/teacher-messages', async (_req, res) => {
  try {
    const messages = await TeacherMessage.find()
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teacher messages.' });
  }
});

app.post('/api/teacher-messages', async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(400).json({ message: 'Failed to create teacher message.' });
  }
});

const start = async () => {
  if (!mongoUri) {
    throw new Error('Missing MONGODB_URI in environment variables.');
  }

  await mongoose.connect(mongoUri);
  app.listen(port, () => {
    console.log(`API server running on http://localhost:${port}`);
  });
};

start().catch((error) => {
  console.error('Server startup failed:', error.message);
  process.exit(1);
});
