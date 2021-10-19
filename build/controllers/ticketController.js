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
class TicketController {
    //Obtiene todos los TICKETS por usuario
    getTickets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const ticket = yield database_1.default.query("SELECT id_ticket, user_ticket,producto,ticket.create_at,id_pedido,estado,producto.name, producto.valor, producto.descripcion FROM ticket INNER JOIN producto ON producto.id = ticket.producto WHERE estado = 1 AND user_ticket =?", [id]);
            if (ticket.length > 0) {
                return res.json(ticket);
            }
            res.status(404).json({ text: "el pedido no tiene tickets" });
        });
    }
    //Crud Tickets
    //Obtiene todos los TICKETS
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield database_1.default.query("SELECT * FROM ticket");
            res.json(ticket);
        });
    }
    //Obtiene ONE TICKETS
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const ticket = yield database_1.default.query("SELECT * FROM ticket WHERE id_ticket =?", [
                id,
            ]);
            if (ticket.length > 0) {
                return res.json(ticket[0]);
            }
            res.status(404).json({ text: "el ticket no existe" });
        });
    }
    //Crea TICKETS
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("INSERT INTO ticket set ?", [req.body]);
            res.json({ message: "ticket guardados" });
        });
    }
    //Elimina TICKETS
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("DELETE FROM ticket WHERE id_ticket = ?", [id]);
            res.json({ message: "the ticket was deleted" });
        });
    }
    //Actualiza TICKETS
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("UPDATE ticket set ? WHERE id_ticket =?", [req.body, id]);
            res.json({ text: "el  ticket fue actualizado " });
        });
    }
}
const ticketController = new TicketController();
exports.default = ticketController;
