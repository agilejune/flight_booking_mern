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
exports.BookController = void 0;
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const moment_1 = __importDefault(require("moment"));
const success_constant_1 = require("../constants/success.constant");
const response_1 = require("../helpers/response");
const approve_list_1 = __importDefault(require("../models/approve_list"));
const approve_seat_1 = __importDefault(require("../models/approve_seat"));
const booked_seat_1 = __importDefault(require("../models/booked_seat"));
const book_list_1 = __importDefault(require("../models/book_list"));
const customer_1 = __importDefault(require("../models/customer"));
const schedule_1 = __importDefault(require("../models/schedule"));
const seat_1 = __importDefault(require("../models/seat"));
const seatmap_1 = __importDefault(require("../models/seatmap"));
const seat_cost_by_date_1 = __importDefault(require("../models/seat_cost_by_date"));
const seat_cost_by_leftseats_1 = __importDefault(require("../models/seat_cost_by_leftseats"));
const ticket_1 = __importDefault(require("../models/ticket"));
const user_1 = __importDefault(require("../models/user"));
const paystack_1 = require("../service/paystack/paystack");
class BookController {
    static listAllCustomers(__, inputObject, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let customers;
            try {
                customers = yield customer_1.default.findAll({
                    attributes: [
                        "id",
                        "name",
                        "email",
                        "phone_number",
                        "birthday"
                    ],
                    raw: true
                });
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            return (0, response_1.resSuccess)(success_constant_1.SuccessConstants.SUCCESS, 200, customers);
        });
    }
    static createCustomer(__, inputObject, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let new_customer;
            try {
                new_customer = yield customer_1.default.create(inputObject.input);
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            return (0, response_1.resSuccess)(success_constant_1.SuccessConstants.SUCCESS, 200, new_customer);
        });
    }
    static generateBookingCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        const uniqueId = function () {
            let text = '';
            for (let i = 0; i < 6; i++) {
                text += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return text;
        };
        return uniqueId();
    }
    static addApproveList(__, inputObject, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let total_cost = [
                ...inputObject.input.outgo_seats,
                ...inputObject.input.return_seats
            ].reduce((total_cost, current) => total_cost + current.price, 0);
            let new_approve;
            try {
                new_approve = yield approve_list_1.default.create(Object.assign(Object.assign({}, inputObject.input), { total_cost }));
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            const seats = inputObject.input.outgo_seats;
            try {
                for (let i = 0; i < seats.length; ++i) {
                    yield approve_seat_1.default.create({
                        approve_id: new_approve.id,
                        seat_id: seats[i].seat_id,
                        schedule_id: new_approve.outgo_schedule_id,
                        seat_number: seats[i].seat_number,
                        price: seats[i].price,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    });
                }
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            if (!!inputObject.input.return_schedule_id) {
                const seats = inputObject.input.return_seats;
                try {
                    for (let i = 0; i < seats.length; ++i) {
                        yield approve_seat_1.default.create({
                            approve_id: new_approve.id,
                            seat_id: seats[i].seat_id,
                            schedule_id: new_approve.return_schedule_id,
                            seat_number: seats[i].seat_number,
                            price: seats[i].price,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        });
                    }
                }
                catch (err) {
                    console.log("Error:", err);
                    return (0, response_1.resError)(err.message, 500);
                }
            }
            return (0, response_1.resSuccess)(success_constant_1.SuccessConstants.SUCCESS, 200, {});
        });
    }
    static book(__, inputObject, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let total_cost = [
                ...inputObject.input.outgo_seats,
                ...inputObject.input.return_seats
            ].reduce((total_cost, current) => total_cost + current.price, 0);
            let code;
            let isCodeExisted = true;
            while (isCodeExisted) {
                code = this.generateBookingCode();
                try {
                    const count = yield book_list_1.default.count({
                        where: { code: code }
                    });
                    if (count === 0) {
                        isCodeExisted = false;
                    }
                }
                catch (err) {
                    console.log("Error:", err);
                    return (0, response_1.resError)(err.message, 500);
                }
            }
            let new_book;
            try {
                new_book = yield book_list_1.default.create(Object.assign(Object.assign({}, inputObject.input), { total_cost,
                    code }));
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            const seats = inputObject.input.outgo_seats;
            try {
                for (let i = 0; i < seats.length; ++i) {
                    yield booked_seat_1.default.create({
                        booklist_id: new_book.id,
                        seat_id: seats[i].seat_id,
                        schedule_id: new_book.outgo_schedule_id,
                        seat_number: seats[i].seat_number,
                        price: seats[i].price,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    });
                }
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            if (!!inputObject.input.return_schedule_id) {
                const seats = inputObject.input.return_seats;
                try {
                    for (let i = 0; i < seats.length; ++i) {
                        yield booked_seat_1.default.create({
                            booklist_id: new_book.id,
                            seat_id: seats[i].seat_id,
                            schedule_id: new_book.return_schedule_id,
                            seat_number: seats[i].seat_number,
                            price: seats[i].price,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        });
                    }
                }
                catch (err) {
                    console.log("Error:", err);
                    return (0, response_1.resError)(err.message, 500);
                }
            }
            return (0, response_1.resSuccess)(success_constant_1.SuccessConstants.SUCCESS, 200, {});
        });
    }
    static getMyBookedSeats(__, inputObject, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let booked_seats;
            where: Sequelize.and({
                name: 'a project'
            }, Sequelize.or({
                id: [1, 2, 3]
            }, {
                id: {
                    gt: 10
                }
            }));
            try {
                booked_seats = yield booked_seat_1.default.findAll({
                    include: [
                        {
                            model: book_list_1.default,
                            as: "booklists",
                            where: Sequelize.and({
                                customer_id: inputObject.input.customer_id
                            }, Sequelize.or({
                                outgo_schedule_id: inputObject.input.schedule_id
                            }, { return_schedule_id: inputObject.input.schedule_id }))
                        }
                    ],
                    where: {
                        "seat_id": inputObject.input.seat_id
                    },
                    attributes: ["seat_number"],
                    raw: true
                });
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            console.log(booked_seats);
            return (0, response_1.resSuccess)(success_constant_1.SuccessConstants.SUCCESS, 200, booked_seats);
        });
    }
    static getSeatMap(__, inputObject, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let schedule;
            try {
                schedule = yield schedule_1.default.findOne({
                    where: {
                        id: inputObject.input.schedule_id
                    }
                });
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            let seat_map;
            try {
                seat_map = yield seatmap_1.default.findOne({
                    where: {
                        aircraft_id: schedule === null || schedule === void 0 ? void 0 : schedule.aircraft_id,
                        seat_id: inputObject.input.seat_id
                    },
                    attributes: ["seatmap"]
                });
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            const { data: booked_seats } = yield this.getBookedSeats(__, inputObject, ctx);
            return (0, response_1.resSuccess)(success_constant_1.SuccessConstants.SUCCESS, 200, { seat_map, booked_seats });
        });
    }
    static getBookedSeats(__, inputObject, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let booked_seats;
            try {
                booked_seats = yield booked_seat_1.default.findAll({
                    where: {
                        seat_id: inputObject.input.seat_id,
                        schedule_id: inputObject.input.schedule_id
                    },
                    attributes: ["seat_number"],
                    raw: true
                });
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            console.log(booked_seats);
            return (0, response_1.resSuccess)(success_constant_1.SuccessConstants.SUCCESS, 200, booked_seats);
        });
    }
    static calculateCurrentSeatPrice(__, inputObject, ctx) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { data: booked_seats } = yield this.getBookedSeats(__, inputObject, ctx);
            const percent_by_seat = yield this.getPercentByLeftSeats(booked_seats.length, inputObject.input.seat_id);
            const percent_by_date = yield this.getPercentByLeftDates(inputObject.input.schedule_id);
            let default_cost;
            try {
                default_cost = (_a = (yield ticket_1.default.findOne({
                    where: {
                        schedule_id: inputObject.input.schedule_id,
                        seat_id: inputObject.input.seat_id
                    }
                }))) === null || _a === void 0 ? void 0 : _a.price;
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            const calculatedCost = Math.floor(default_cost * (percent_by_date / 100 + 1) * (percent_by_seat / 100 + 1));
            return (0, response_1.resSuccess)(success_constant_1.SuccessConstants.SUCCESS, 200, calculatedCost);
        });
    }
    static getPercentByLeftSeats(count, seat_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let rule;
            let percent;
            try {
                rule = yield seat_cost_by_leftseats_1.default.findOne({
                    where: {
                        status: 'ENABLE',
                        seat_id: seat_id,
                        greater_than: {
                            [Op.lt]: count
                        },
                        less_equal_than: {
                            [Op.gte]: count
                        }
                    }
                });
            }
            catch (err) {
                console.log("Error:", err);
            }
            if (!rule)
                percent = 0;
            else
                percent = rule.percentage;
            return percent;
        });
    }
    static getPercentByLeftDates(schedule_id) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let depart_time;
            try {
                depart_time = (_a = (yield schedule_1.default.findOne({
                    where: {
                        id: schedule_id
                    },
                    attributes: ["depart_time"]
                }))) === null || _a === void 0 ? void 0 : _a.depart_time;
            }
            catch (err) {
                console.log("Error:", err);
            }
            const left_date = Math.round(((0, moment_1.default)(depart_time, "YYYY-MM-DD HH:mm:ss").valueOf() - (0, moment_1.default)().valueOf()) / 24 / 60 / 60 / 1000);
            let percentage;
            try {
                percentage = (_b = (yield seat_cost_by_date_1.default.findOne({
                    where: {
                        status: 'ENABLE',
                        greater_than: {
                            [Op.lt]: left_date
                        },
                        less_equal_than: {
                            [Op.gte]: left_date
                        }
                    },
                    attributes: ["percentage"]
                }))) === null || _b === void 0 ? void 0 : _b.percentage;
            }
            catch (err) {
                console.log("Error:", err);
            }
            return percentage !== null && percentage !== void 0 ? percentage : 0;
        });
    }
    static listPriceRulesBySeat(__, inputObject, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let rules = [];
            let total;
            try {
                yield seat_cost_by_leftseats_1.default.findAll({
                    include: [
                        {
                            model: seat_1.default,
                            as: "seats",
                            attributes: ["type"]
                        }
                    ],
                    attributes: [
                        "id",
                        "greater_than",
                        "less_equal_than",
                        "percentage",
                        "status",
                        [
                            Sequelize.col('seats.type'), 'seat_type'
                        ]
                    ],
                    offset: (inputObject.input.current - 1) * inputObject.input.pageSize,
                    limit: inputObject.input.pageSize,
                    raw: true
                }).then(res => {
                    rules = res;
                });
            }
            catch (err) {
                console.log("Error:", err);
            }
            rules.map(rule => rule.less_equal_than = rule.less_equal_than === 1000 ? null : rule.less_equal_than);
            try {
                total = yield seat_cost_by_leftseats_1.default.count();
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            const data = {
                pagination: {
                    current: inputObject.input.current,
                    pageSize: inputObject.input.pageSize,
                    total: total
                },
                price_rules_by_seat: rules
            };
            return (0, response_1.resSuccess)(success_constant_1.SuccessConstants.SUCCESS, 200, data);
        });
    }
    static updatePriceRuleBySeat(__, inputObject, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield seat_cost_by_leftseats_1.default.update({
                    status: inputObject.input.value ? 'ENABLE' : 'DISABLE'
                }, {
                    where: {
                        id: inputObject.input.id
                    }
                });
            }
            catch (err) {
                console.log("Error:", err);
            }
            return (0, response_1.resSuccess)(success_constant_1.SuccessConstants.SUCCESS, 200, {});
        });
    }
    static listPriceRulesByDate(__, inputObject, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let rules = [];
            let total;
            try {
                yield seat_cost_by_date_1.default.findAll({
                    attributes: [
                        "id",
                        "greater_than",
                        "less_equal_than",
                        "percentage",
                        "status",
                    ],
                    offset: (inputObject.input.current - 1) * inputObject.input.pageSize,
                    limit: inputObject.input.pageSize,
                    raw: true
                }).then(res => {
                    rules = res;
                });
            }
            catch (err) {
                console.log("Error:", err);
            }
            try {
                total = yield seat_cost_by_date_1.default.count();
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            rules.map(rule => rule.less_equal_than = rule.less_equal_than === 1000 ? null : rule.less_equal_than);
            const data = {
                pagination: {
                    current: inputObject.input.current,
                    pageSize: inputObject.input.pageSize,
                    total: total
                },
                price_rules_by_date: rules
            };
            return (0, response_1.resSuccess)(success_constant_1.SuccessConstants.SUCCESS, 200, data);
        });
    }
    static updatePriceRuleByDate(__, inputObject, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield seat_cost_by_date_1.default.update({
                    status: inputObject.input.value ? 'ENABLE' : 'DISABLE'
                }, {
                    where: {
                        id: inputObject.input.id
                    }
                });
            }
            catch (err) {
                console.log("Error:", err);
            }
            return (0, response_1.resSuccess)(success_constant_1.SuccessConstants.SUCCESS, 200, {});
        });
    }
    static getBooklists(__, inputObject, ctx) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let total;
            try {
                total = yield book_list_1.default.count();
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            let booklists;
            try {
                booklists = yield book_list_1.default.findAll({
                    include: [
                        {
                            model: customer_1.default,
                            as: "customer"
                        },
                        {
                            model: user_1.default,
                            as: "user"
                        },
                        {
                            model: user_1.default,
                            as: "agent"
                        },
                        {
                            model: schedule_1.default,
                            as: "outgo_schedule",
                            attributes: [
                                "id",
                                "depart_airport_id",
                                "arrive_airport_id",
                                "aircraft_id",
                                "depart_time",
                                "arrive_time",
                            ]
                        },
                        {
                            model: schedule_1.default,
                            as: "return_schedule",
                            attributes: [
                                "id",
                                "depart_airport_id",
                                "arrive_airport_id",
                                "aircraft_id",
                                "depart_time",
                                "arrive_time",
                            ]
                        }
                    ],
                    attributes: [
                        "id",
                        "code",
                        "outgo_schedule_id",
                        "return_schedule_id",
                        "agent_id",
                        "user_id",
                        "customer_id",
                        "status",
                        "payment_type",
                        "payment_status",
                        "total_cost",
                        "createdAt",
                    ],
                    offset: (((_a = inputObject.input.current) !== null && _a !== void 0 ? _a : 1) - 1) * ((_b = inputObject.input.pageSize) !== null && _b !== void 0 ? _b : 0),
                    limit: (_c = inputObject.input.pageSize) !== null && _c !== void 0 ? _c : total,
                });
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            let data = {
                booklists: booklists
            };
            if (!!inputObject.input.current && !!inputObject.input.pageSize) {
                data = Object.assign(Object.assign({}, data), {
                    pagination: {
                        current: inputObject.input.current,
                        pageSize: inputObject.input.pageSize,
                        total: total
                    }
                });
            }
            console.log(booklists);
            return (0, response_1.resSuccess)(success_constant_1.SuccessConstants.SUCCESS, 200, data);
        });
    }
    static getApprovelists(__, inputObject, ctx) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let total;
            try {
                total = yield approve_list_1.default.count();
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            let approvelists;
            try {
                approvelists = yield approve_list_1.default.findAll({
                    include: [
                        {
                            model: customer_1.default,
                            as: "customer"
                        },
                        {
                            model: user_1.default,
                            as: "agent"
                        },
                        {
                            model: schedule_1.default,
                            as: "outgo_schedule",
                            attributes: [
                                "id",
                                "depart_airport_id",
                                "arrive_airport_id",
                                "aircraft_id",
                                "depart_time",
                                "arrive_time",
                            ]
                        },
                        {
                            model: schedule_1.default,
                            as: "return_schedule",
                            attributes: [
                                "id",
                                "depart_airport_id",
                                "arrive_airport_id",
                                "aircraft_id",
                                "depart_time",
                                "arrive_time",
                            ]
                        }
                    ],
                    attributes: [
                        "id",
                        "outgo_schedule_id",
                        "return_schedule_id",
                        "agent_id",
                        "customer_id",
                        "status",
                        "total_cost",
                        "createdAt",
                    ],
                    offset: (((_a = inputObject.input.current) !== null && _a !== void 0 ? _a : 1) - 1) * ((_b = inputObject.input.pageSize) !== null && _b !== void 0 ? _b : 0),
                    limit: (_c = inputObject.input.pageSize) !== null && _c !== void 0 ? _c : total,
                });
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            let data = {
                approvelists: approvelists
            };
            if (!!inputObject.input.current && !!inputObject.input.pageSize) {
                data = Object.assign(Object.assign({}, data), {
                    pagination: {
                        current: inputObject.input.current,
                        pageSize: inputObject.input.pageSize,
                        total: total
                    }
                });
            }
            return (0, response_1.resSuccess)(success_constant_1.SuccessConstants.SUCCESS, 200, data);
        });
    }
    static invokePayment(__, inputObject, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, paystack_1.initializeCardPayment)(inputObject.input.amount, inputObject.input.email);
            return data;
        });
    }
}
exports.BookController = BookController;
