"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = void 0;
const user_controller_1 = require("../../controllers/user.controller");
exports.userResolvers = {
    Query: {
        success: () => {
            return "Success";
        },
        login: (__, inputObject, ctx) => {
            return user_controller_1.UserController.login(__, inputObject, ctx);
        },
    },
    Mutation: {
        success: () => {
            return "Success";
        },
        addUser: (__, inputObject, ctx) => {
            return user_controller_1.UserController.addUser(__, inputObject, ctx);
        },
    },
};
