"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookResolvers = void 0;
const book_controller_1 = require("../../controllers/book.controller");
exports.bookResolvers = {
    Query: {
        success: () => {
            return "Success";
        },
        customers: (__, inputObject, ctx) => {
            return book_controller_1.BookController.listAllCustomers(__, inputObject, ctx);
        },
        getBookedSeats: (__, inputObject, ctx) => {
            return book_controller_1.BookController.getBookedSeats(__, inputObject, ctx);
        },
        currentSeatPrice: (__, inputObject, ctx) => {
            return book_controller_1.BookController.calculateCurrentSeatPrice(__, inputObject, ctx);
        },
        customerBookedSeats: (__, inputObject, ctx) => {
            return book_controller_1.BookController.getMyBookedSeats(__, inputObject, ctx);
        },
        seatMap: (__, inputObject, ctx) => {
            return book_controller_1.BookController.getSeatMap(__, inputObject, ctx);
        },
        listPriceRulesBySeat: (__, inputObject, ctx) => {
            return book_controller_1.BookController.listPriceRulesBySeat(__, inputObject, ctx);
        },
        listPriceRulesByDate: (__, inputObject, ctx) => {
            return book_controller_1.BookController.listPriceRulesByDate(__, inputObject, ctx);
        },
        booklists: (__, inputObject, ctx) => {
            return book_controller_1.BookController.getBooklists(__, inputObject, ctx);
        },
        approvelists: (__, inputObject, ctx) => {
            return book_controller_1.BookController.getApprovelists(__, inputObject, ctx);
        },
    },
    Mutation: {
        success: () => {
            return "Success";
        },
        createCustomer: (__, inputObject, ctx) => {
            return book_controller_1.BookController.createCustomer(__, inputObject, ctx);
        },
        book: (__, inputObject, ctx) => {
            return book_controller_1.BookController.book(__, inputObject, ctx);
        },
        addApproveList: (__, inputObject, ctx) => {
            return book_controller_1.BookController.addApproveList(__, inputObject, ctx);
        },
        updatePriceRuleBySeat: (__, inputObject, ctx) => {
            return book_controller_1.BookController.updatePriceRuleBySeat(__, inputObject, ctx);
        },
        updatePriceRuleByDate: (__, inputObject, ctx) => {
            return book_controller_1.BookController.updatePriceRuleByDate(__, inputObject, ctx);
        },
        invokePayment: (__, inputObject, ctx) => {
            return book_controller_1.BookController.invokePayment(__, inputObject, ctx);
        },
    },
};
