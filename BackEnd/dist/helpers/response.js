"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resError = exports.resSuccess = void 0;
function resSuccess(message, status, data) {
    return {
        message,
        isSuccess: true,
        status,
        data: data
    };
}
exports.resSuccess = resSuccess;
;
function resError(message, status) {
    return {
        message,
        isSuccess: false,
        status,
        data: {}
    };
}
exports.resError = resError;
;
