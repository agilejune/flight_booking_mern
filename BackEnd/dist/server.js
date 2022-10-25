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
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("./config/config");
dotenv_1.default.config();
const path_1 = __importDefault(require("path"));
if (path_1.default.extname(__filename) === '.js') {
    require('module-alias/register');
}
const app_1 = require("./core/app");
const app_2 = __importDefault(require("./core/app"));
const apollo_1 = __importDefault(require("./core/apollo"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const port = config_1.Config.PORT;
    const server = yield (0, apollo_1.default)();
    yield server.start();
    server.applyMiddleware({ app: app_2.default, cors: true, path: '/booking', });
    yield new Promise((resolve) => app_1.httpServer.listen({ port }, resolve));
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}))().catch((error) => {
    console.log('Failed to start server', error);
});
