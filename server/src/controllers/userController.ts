import { Request, Response } from 'express';

export const getUsers = (req: Request, res: Response) => {
  res.json([{ id: 1, name: 'Jovan' }, { id: 2, name: 'Bob' }, { id: 1, name: 'Cris' }, { id: 2, name: 'Marley' }]);
};

export const createUser = (req: Request, res: Response) => {
  const { name } = req.body;
  res.status(201).json({ id: Date.now(), name });
};
