"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_shield_1 = require("graphql-shield");
const isAuthenticated = (0, graphql_shield_1.rule)()((__, ___, { user }) => {
    return true;
});
const isTangorUser = (0, graphql_shield_1.rule)()((__, ___, { user }) => {
    return true;
});
exports.default = (0, graphql_shield_1.shield)({
    Query: {
        "*": graphql_shield_1.allow
    },
    Mutation: {
        "*": graphql_shield_1.allow
    },
});
