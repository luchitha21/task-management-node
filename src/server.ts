import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';
import usersRoutes from './routes/usersRoutes'

const app = express();
app.use(cors());
app.use(express.json());

app.use('/tasks', taskRoutes);
app.use('/users', usersRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
