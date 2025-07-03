import type { Request, Response } from 'express';
import { db } from '../database/index.ts';
import type { Category } from '../models/category.ts';

export const getCategories = async (_req: Request, res: Response) => {
  const [rows] = await db.query('SELECT * FROM categories');
  res.json(rows);
};

export const getCategoryById = async (req: Request, res: Response) => {
  const [rows] = await db.query('SELECT * FROM categories WHERE id = ?', [req.params.id]) as [any[], any];
  res.json(rows[0]);
};

export const createCategory = async (req: Request, res: Response) => {
  const { name }: Category = req.body;
  const [result] = await db.query('INSERT INTO categories (name) VALUES (?)', [name]);
  res.status(201).json({ id: (result as any).insertId, name });
};

export const updateCategory = async (req: Request, res: Response) => {
  const { name }: Category = req.body;
  await db.query('UPDATE categories SET name = ? WHERE id = ?', [name, req.params.id]);
  res.sendStatus(204);
};

export const deleteCategory = async (req: Request, res: Response) => {
  await db.query('DELETE FROM categories WHERE id = ?', [req.params.id]);
  res.sendStatus(204);
};