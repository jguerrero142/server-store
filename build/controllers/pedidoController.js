"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class PedidoController {
    //Obtiene todos los PEDIDOS de un USUARIO.
    listPedidoUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const pedido = yield database_1.default.query("SELECT * FROM pedido  WHERE id_user = ?", [
                id,
            ]);
            res.json(pedido);
        });
    }
    //CRUD PEDIDOS
    // Obtiene todos los PEDIDOS
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pedido = yield database_1.default.query("SELECT * FROM pedido");
            res.json(pedido);
        });
    }
    // Obtiene PEDIDO x id
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const pedido = yield database_1.default.query("SELECT * FROM pedido WHERE id = ?", [id]);
            if (pedido.length > 0) {
                return res.json(pedido);
            }
            res.status(404).json({ text: "el pedido no existe" });
        });
    }
    //Crear el pedido y obtiene el ID
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("INSERT INTO pedido set ?", [req.body]);
            const id_pedido = yield database_1.default.query("SELECT id FROM pedido WHERE value_pedido = 1");
            yield database_1.default.query("UPDATE pedido set value_pedido = 0 WHERE value_pedido = 1");
            return res.json(id_pedido[0]);
        });
    }
    // Elimina los tickets y el pedido x id
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("DELETE FROM ticket WHERE id_pedido = ?", [id]);
            yield database_1.default.query("DELETE FROM pedido WHERE id = ?", [id]);
            res.json({ message: "the pedido was deleted" });
        });
    }
    //Actualiza el pedido x id
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("UPDATE pedido set ? WHERE id_user=?", [req.body, id]);
            res.json({ text: "el  pedido fue actualizado " });
        });
    }
}
const pedidoController = new PedidoController();
exports.default = pedidoController;
