// routes/protectedRoutes.js
import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, this is your protected dashboard!` });
});

export default router;
