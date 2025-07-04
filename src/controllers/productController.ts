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

export const getProductsByCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const [rows] = await db.query(
    'SELECT * FROM productos WHERE Categorias_id = ?',
    [categoryId]
  );
  res.json(rows);
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, description, categoryId }: Product = req.body;
  const [result] = await db.query('INSERT INTO productos (name, price, Categorias_id, description) VALUES (?, ?, ?, ?)', [name, price, categoryId,description]);
  res.status(201).json({ id: (result as any).insertId, name, price, categoryId });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { name, price, categoryId }: Product = req.body;
  await db.query('UPDATE productos SET name = ?, price = ?, Categorias_id = ? WHERE id = ?', [name, price, categoryId, req.params.id]);
  res.sendStatus(204);
};

export const deleteProduct = async (req: Request, res: Response) => {
  await db.query('DELETE FROM productos WHERE id = ?', [req.params.id]);
  res.sendStatus(204);
};
