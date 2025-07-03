import type { Request, Response } from 'express';
import { db } from '../database/index.ts';
import type { Product } from '../models/products.ts';

export const getProducts = async (_req: Request, res: Response) => {
  const [rows] = await db.query('SELECT * FROM productos');
  res.json(rows);
};

export const getProductById = async (req: Request, res: Response) => {
  const [rows] = await db.query('SELECT * FROM productos WHERE id = ?', [req.params.id]) as [any[], any];
  res.json(rows[0]);
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, category_id }: Product = req.body;
  const [result] = await db.query('INSERT INTO productos (name, price, category_id) VALUES (?, ?, ?)', [name, price, category_id]);
  res.status(201).json({ id: (result as any).insertId, name, price, category_id });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { name, price, category_id }: Product = req.body;
  await db.query('UPDATE productos SET name = ?, price = ?, category_id = ? WHERE id = ?', [name, price, category_id, req.params.id]);
  res.sendStatus(204);
};

export const deleteProduct = async (req: Request, res: Response) => {
  await db.query('DELETE FROM productos WHERE id = ?', [req.params.id]);
  res.sendStatus(204);
};
