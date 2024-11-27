import express, { Request, Response } from 'express';
import users from '../data/users.json';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const userList = users.map(({ id, first_name, last_name, avatar }) => ({
    id,
    first_name,
    last_name,
    avatar,
  }));
  res.status(200).json(userList);
});

router.get('/:id', (req: Request, res: any) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === userId);
  console.log(user)

  if (!user) {
    return res.status(404).json({ error: 'User Not Found' });
  }

  res.status(200).json(user);
});

export default router;
