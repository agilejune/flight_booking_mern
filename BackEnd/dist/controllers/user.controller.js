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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const jwt = require('jsonwebtoken');
const config_1 = require("../config/config");
const errors_constant_1 = require("../constants/errors.constant");
const success_constant_1 = require("../constants/success.constant");
const response_1 = require("../helpers/response");
const user_1 = __importDefault(require("../models/user"));
const bcrypt = require('bcrypt');
class UserController {
    static login(__, inputObject, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            try {
                user = yield user_1.default.findOne({
                    where: {
                        email: inputObject.input.email,
                        role: inputObject.input.role
                    },
                    attributes: [
                        "id",
                        "password",
                        "first_name",
                        "last_name",
                        "email",
                        "phone_number",
                        "birthday",
                        "role"
                    ]
                });
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            if (!user) {
                console.log(errors_constant_1.ErrorConstants.EMAIL_INVALID);
                return (0, response_1.resError)(errors_constant_1.ErrorConstants.EMAIL_INVALID, 409);
            }
            const isValidPassword = yield bcrypt.compare(inputObject.input.password, user.password);
            if (!isValidPassword) {
                console.log(errors_constant_1.ErrorConstants.PASSWORD_INVALID);
                return (0, response_1.resError)(errors_constant_1.ErrorConstants.PASSWORD_INVALID, 409);
            }
            const encryption = {
                id: user.id,
                phone_number: user.phone_number,
                role: 'user'
            };
            let token;
            try {
                token = yield jwt.sign({ user: encryption }, config_1.Config.SECRET_FOR_JWT, { expiresIn: '1d' });
            }
            catch (err) {
                console.log("Error: ", err);
                return (0, response_1.resError)(err.message, 500);
            }
            return (0, response_1.resSuccess)(success_constant_1.SuccessConstants.SUCCESS, 200, { token, user });
        });
    }
    static addUser(__, inputObject, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let new_user;
            const _a = inputObject.input, { password } = _a, other = __rest(_a, ["password"]);
            const salt = yield bcrypt.genSalt(6);
            const hashed = yield bcrypt.hash(password, salt);
            try {
                new_user = yield user_1.default.create(Object.assign(Object.assign({}, other), { password: hashed }));
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            return (0, response_1.resSuccess)(success_constant_1.SuccessConstants.SUCCESS, 200, {});
        });
    }
}
exports.UserController = UserController;
