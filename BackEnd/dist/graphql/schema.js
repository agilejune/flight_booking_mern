"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaWithMiddleware = void 0;
const lodash_1 = require("lodash");
const graphql_tools_1 = require("graphql-tools");
const graphql_constraint_directive_1 = require("graphql-constraint-directive");
const graphql_middleware_1 = require("graphql-middleware");
const schedule_schema_1 = require("./schemas/schedule.schema");
const schedule_resolver_1 = require("./resolvers/schedule.resolver");
const book_schema_1 = require("./schemas/book.schema");
const book_resolver_1 = require("./resolvers/book.resolver");
const user_schema_1 = require("./schemas/user.schema");
const user_resolver_1 = require("./resolvers/user.resolver");
const permissions_1 = __importDefault(require("../middlewares/permissions"));
const schema = (0, graphql_constraint_directive_1.constraintDirective)()((0, graphql_tools_1.makeExecutableSchema)({
    typeDefs: [schedule_schema_1.scheduleTypes, book_schema_1.bookTypes, user_schema_1.userTypes, graphql_constraint_directive_1.constraintDirectiveTypeDefs],
    resolvers: (0, lodash_1.merge)(schedule_resolver_1.scheduleResolvers, user_resolver_1.userResolvers, book_resolver_1.bookResolvers),
}));
exports.schemaWithMiddleware = (0, graphql_middleware_1.applyMiddleware)(schema, permissions_1.default);
