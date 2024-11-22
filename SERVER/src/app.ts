import express from 'express';
import usersRoutes from './routes/users';
import cors from 'cors';


const app = express();

app.use(express.json());

app.use(cors());


app.use('/users', usersRoutes);

app.use('*', (req, res) => {
  res.redirect('/users');
});

export default app;
