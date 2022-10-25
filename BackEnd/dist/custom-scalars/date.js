"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateResolver = void 0;
const graphql_1 = require("graphql");
const apollo_server_errors_1 = require("apollo-server-errors");
const validator_1 = __importDefault(require("validator"));
const language_1 = require("graphql/language");
const dateScalar = new graphql_1.GraphQLScalarType({
    name: 'Date',
    description: 'An ISO 8601-encoded UTC date string.',
    parseValue: (value) => {
        if (validator_1.default.isISO8601(value)) {
            return value;
        }
        throw new apollo_server_errors_1.ApolloError('DateTime must be a valid ISO 8601 Date string');
    },
    serialize: (value) => {
        if (typeof value !== 'string') {
            value = value.toISOString();
        }
        if (validator_1.default.isISO8601(value)) {
            return value;
        }
        throw new apollo_server_errors_1.ApolloError('DateTime must be a valid ISO 8601 Date string');
    },
    parseLiteral(ast) {
        if (ast.kind === language_1.Kind.INT) {
            return parseInt(ast.value, 10);
        }
        return null;
    },
});
exports.dateResolver = {
    Date: dateScalar,
};
