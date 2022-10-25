"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../custom-scalars/index");
const resolvers = {
    Query: {
        success: () => {
            return "Success";
        },
    },
    Mutation: {
        success: () => {
            return "Success";
        },
    },
    Date: index_1.customScalarResolvers
};
exports.default = resolvers;
