import { connectToDatabase } from './_lib/mongodb.js';
import { CommunityPost } from '../server/models/CommunityPost.js';

export default async function handler(req, res) {
  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const posts = await CommunityPost.find().sort({ createdAt: -1 }).limit(200).lean();
      return res.status(200).json(posts);
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body ?? {});
      const { parentName, content } = body;
      if (!parentName || !content) {
        return res.status(400).json({ message: 'parentName and content are required.' });
      }

      const post = await CommunityPost.create({
        parentName: String(parentName).trim(),
        content: String(content).trim(),
      });
      return res.status(201).json(post);
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    if (error?.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    console.error('community-posts api error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
