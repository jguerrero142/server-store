import { Request, Response } from "express";
import pool from "../database";

class PedidoController {
  //Obtiene todos los PEDIDOS de un USUARIO.
  public async listPedidoUser(req: Request, res: Response) {
    const { id } = req.params;
    const pedido = await pool.query("SELECT * FROM pedido  WHERE id_user = ?", [
      id,
    ]);
    res.json(pedido);
  }

  //CRUD PEDIDOS
  // Obtiene todos los PEDIDOS
  public async list(req: Request, res: Response) {
    const pedido = await pool.query("SELECT * FROM pedido");
    res.json(pedido);
  }

  // Obtiene PEDIDO x id
  public async getOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const pedido = await pool.query("SELECT * FROM pedido WHERE id = ?", [id]);
    if (pedido.length > 0) {
      return res.json(pedido);
    }
    res.status(404).json({ text: "el pedido no existe" });
  }

  //Crear el pedido y obtiene el ID
  public async create(req: Request, res: Response) {
    await pool.query("INSERT INTO pedido set ?", [req.body]);
    const id_pedido = await pool.query(
      "SELECT id FROM pedido WHERE value_pedido = 1"
    );
    await pool.query(
      "UPDATE pedido set value_pedido = 0 WHERE value_pedido = 1"
    );
    return res.json(id_pedido[0]);
  }

  // Elimina los tickets y el pedido x id
  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query("DELETE FROM ticket WHERE id_pedido = ?", [id]);
    await pool.query("DELETE FROM pedido WHERE id = ?", [id]);
    res.json({ message: "the pedido was deleted" });
  }

  //Actualiza el pedido x id
  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query("UPDATE pedido set ? WHERE id_user=?", [req.body, id]);
    res.json({ text: "el  pedido fue actualizado " });
  }
}

const pedidoController = new PedidoController();
export default pedidoController;
