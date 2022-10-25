"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customScalarResolvers = void 0;
const lodash_1 = __importDefault(require("lodash"));
const date_1 = require("./date");
exports.customScalarResolvers = lodash_1.default.merge(date_1.dateResolver);
