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
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("../graphql/schema");
const config_1 = require("../config/config");
const authorizer_1 = require("../helpers/authorizer");
function default_1() {
    return __awaiter(this, void 0, void 0, function* () {
        return new apollo_server_express_1.ApolloServer({
            schema: schema_1.schemaWithMiddleware,
            introspection: config_1.Config.NODE_ENV !== 'production',
            context: ({ req }) => __awaiter(this, void 0, void 0, function* () {
                if (req.headers.authorization) {
                    const user = yield (0, authorizer_1.authorize)(req);
                    return { user: user === null || user === void 0 ? void 0 : user.user };
                }
                return { req };
            }),
        });
    });
}
exports.default = default_1;
