import express from 'express';
import { db } from '../config/db.js';
import { authenticateToken } from './authMiddleware.js';

const router = express.Router();

// Create Bingo Card
router.post('/', authenticateToken, async (req, res) => {
  const { name, goals } = req.body;
  const userId = req.user.id;

  if (!name || !goals || goals.length !== 25) {
    return res.status(400).json({ message: 'Invalid Bingo card data.' });
  }

  try {
    const connection = await db(); // ✅ Get the connection
    const query = 'INSERT INTO bingo_cards (user_id, name, goals) VALUES (?, ?, ?)';
    await connection.query(query, [userId, name, JSON.stringify(goals)]);
    res.status(201).json({ message: 'Bingo card saved.' });
  } catch (err) {
    console.error('Error saving Bingo card:', err);
    res.status(500).json({ message: 'Failed to save Bingo card.' });
  }
});

// Get all Bingo Cards for logged-in user
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const connection = await db(); // ✅ Get the connection
    const [rows] = await connection.query('SELECT * FROM bingo_cards WHERE user_id = ?', [userId]);
    const cards = rows.map(r => ({
      id: r.id,
      name: r.name,
      goals: JSON.parse(r.goals),
    }));
    res.json(cards);
  } catch (err) {
    console.error('Error fetching Bingo cards:', err);
    res.status(500).json({ message: 'Failed to fetch cards.' });
  }
});

// Delete Bingo Card
router.delete('/:id', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const cardId = req.params.id;
  try {
    const connection = await db(); // ✅ Get the connection
    await connection.query('DELETE FROM bingo_cards WHERE id = ? AND user_id = ?', [cardId, userId]);
    res.json({ message: 'Bingo card deleted.' });
  } catch (err) {
    console.error('Error deleting Bingo card:', err);
    res.status(500).json({ message: 'Failed to delete card.' });
  }
});

export default router;
