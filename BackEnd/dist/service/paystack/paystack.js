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
exports.verifyPayment = exports.initializeCardPayment = exports.initializeMobileMoneyPayment = void 0;
const paystack_1 = __importDefault(require("paystack"));
const paystack = (0, paystack_1.default)("sk_test_342073fafb26070a73eb25be8c1b9bac70b954d5");
const callback_url = "http://127.0.0.1:3001/api/payment/callback";
const initializeMobileMoneyPayment = (amount, email, phone_number) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield paystack.transaction.initialize({
        name: "Transaction or product name",
        email: email,
        reference: '' + Math.floor((Math.random() * 1000000000) + 1),
        amount: amount * 100,
        currency: "GHS",
        quantity: "quantity of product just for reference purposes",
        callback_url: callback_url,
        mobile_money: {
            phone: phone_number,
            provider: "mtn"
        },
    });
    console.log(transaction);
    return transaction;
});
exports.initializeMobileMoneyPayment = initializeMobileMoneyPayment;
const initializeCardPayment = (amount, email) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield paystack.transaction.initialize({
        name: "Transaction or product name",
        email: email,
        reference: '' + Math.floor((Math.random() * 1000000000) + 1),
        amount: amount * 100,
        currency: "GHS",
        quantity: "quantity of product just for reference purposes",
        callback_url: callback_url,
    });
    console.log(transaction);
    return transaction;
});
exports.initializeCardPayment = initializeCardPayment;
const verifyPayment = (ref) => {
    paystack.transaction.verify(ref)
        .then(transaction => {
        console.log(transaction);
    });
};
exports.verifyPayment = verifyPayment;
