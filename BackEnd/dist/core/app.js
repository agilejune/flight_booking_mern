"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.httpServer = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dbHelpers_1 = require("../helpers/dbHelpers");
const config_1 = require("../config/config");
const paystack_1 = require("../service/paystack/paystack");
const io = __importStar(require("socket.io"));
const app = (0, express_1.default)();
let sockets = new Map();
exports.httpServer = http_1.default.createServer(app);
const socketServer = createSocketServer(exports.httpServer);
socketServer.listen(exports.httpServer);
socketServer.on("connection", (socket) => {
    console.log("New client connected");
    sockets.set(socket.id, socket);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        sockets.delete(socket.id);
    });
});
const dbHelper = new dbHelpers_1.DBHelper();
dbHelper.initiateDBConnection();
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
if (config_1.Config.NODE_ENV === 'development') {
    app.use((0, cors_1.default)({ origin: 'http://localhost:3001' }));
}
app.get('/api/payment/callback', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, paystack_1.verifyPayment)(String(req.query.trxref));
    sockets.forEach(socket => {
        socket.emit('REQ_PAYMENT_CONFIRMED', { reference: req.query.trxref });
        console.log('REQ_PAYMENT_CONFIRMED', req.query.trxref);
    });
}));
function createSocketServer(httpServer) {
    const opts = {
        pingInterval: 10000,
        pingTimeout: 5000,
        cors: {
            origin: '*',
            methods: ['GET', 'POST', 'OPTIONS'],
            credentials: true,
            allowedHeaders: ['Accept', 'X-Access-Token', 'X-Application-Name', 'X-Request-Sent-Time']
        }
    };
    return new io.Server(httpServer, opts);
}
exports.default = app;
