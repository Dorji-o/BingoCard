import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import {db} from './config/db.js';
import protectedRoutes from './routes/protectedRoutes.js';



const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

app.use('/api/protected', protectedRoutes);

// Connect to DB first, then start server
const PORT = process.env.PORT || 5001;
db().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
