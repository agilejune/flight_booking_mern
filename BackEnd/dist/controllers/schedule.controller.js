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
exports.ScheduleController = void 0;
const Sequelize = require("sequelize");
const success_constant_1 = require("../constants/success.constant");
const response_1 = require("../helpers/response");
const aircraft_1 = __importDefault(require("../models/aircraft"));
const airport_1 = __importDefault(require("../models/airport"));
const schedule_1 = __importDefault(require("../models/schedule"));
const seat_1 = __importDefault(require("../models/seat"));
const seatmap_1 = __importDefault(require("../models/seatmap"));
const ticket_1 = __importDefault(require("../models/ticket"));
class ScheduleController {
    static airports(__, inputObject, ctx) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let airports;
            let total;
            try {
                total = yield airport_1.default.count();
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            try {
                airports = yield airport_1.default.findAll({
                    attributes: [
                        "id", "name", "city", "address"
                    ],
                    offset: (((_a = inputObject.input.current) !== null && _a !== void 0 ? _a : 1) - 1) * ((_b = inputObject.input.pageSize) !== null && _b !== void 0 ? _b : 0),
                    limit: (_c = inputObject.input.pageSize) !== null && _c !== void 0 ? _c : total,
                    raw: true
                });
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            let data = {
                airports: airports
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
            console.log(data);
            return (0, response_1.resSuccess)(success_constant_1.SuccessConstants.SUCCESS, 200, data);
        });
    }
    static aircrafts(__, inputObject, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let aircrafts;
            try {
                aircrafts = yield aircraft_1.default.findAll({
                    attributes: [
                        "id", "name",
                    ],
                    raw: true
                });
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            let data = [];
            try {
                for (let i = 0; i < aircrafts.length; ++i) {
                    const seats = yield seatmap_1.default.findAll({
                        where: {
                            aircraft_id: aircrafts[i].id
                        },
                        include: [
                            {
                                model: seat_1.default,
                                as: "seats",
                                attributes: ["type"]
                            }
                        ],
                        attributes: [
                            'seatmap',
                            [
                                Sequelize.col('seat_id'), 'id'
                            ],
                            [
                                Sequelize.col('seats.type'), 'seat_type'
                            ]
                        ],
                        raw: true
                    });
                    data.push(Object.assign(Object.assign({}, aircrafts[i]), { seats: seats }));
                }
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            return (0, response_1.resSuccess)(success_constant_1.SuccessConstants.SUCCESS, 200, data);
        });
    }
    static getAirport(airport_id, inputObject, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let airport;
            try {
                airport = yield airport_1.default.findOne({
                    where: {
                        id: airport_id
                    },
                    attributes: [
                        "id", "name", "city", "address"
                    ],
                    raw: true
                });
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            return airport;
        });
    }
    static getAircraft(aircraft_id, inputObject, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let aircraft;
            try {
                aircraft = yield aircraft_1.default.findOne({
                    where: {
                        id: aircraft_id
                    },
                    attributes: [
                        "id", "name",
                    ],
                    raw: true
                });
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            return aircraft;
        });
    }
    static schedules(__, inputObject, ctx) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let total;
            try {
                total = yield schedule_1.default.count();
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            let schedules;
            try {
                schedules = yield schedule_1.default.findAll({
                    attributes: [
                        "id",
                        "depart_time",
                        "arrive_time",
                        "depart_airport_id",
                        "arrive_airport_id",
                        "aircraft_id"
                    ],
                    offset: (((_a = inputObject.input.current) !== null && _a !== void 0 ? _a : 1) - 1) * ((_b = inputObject.input.pageSize) !== null && _b !== void 0 ? _b : 0),
                    limit: (_c = inputObject.input.pageSize) !== null && _c !== void 0 ? _c : total,
                    raw: true
                });
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            let data = {
                schedules: schedules
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
            console.log(schedules);
            return (0, response_1.resSuccess)(success_constant_1.SuccessConstants.SUCCESS, 200, data);
        });
    }
    static createSchedule(__, inputObject, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let new_schedule;
            const _a = inputObject.input, { seatsPrice } = _a, schedule = __rest(_a, ["seatsPrice"]);
            try {
                new_schedule = yield schedule_1.default.create(schedule);
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            let new_ticket;
            try {
                for (let i = 0; i < seatsPrice.length; ++i) {
                    new_ticket = yield ticket_1.default.create({ schedule_id: new_schedule.id, seat_id: seatsPrice[i].seat_id, price: seatsPrice[i].price });
                }
            }
            catch (err) {
                console.log("Error:", err);
                return (0, response_1.resError)(err.message, 500);
            }
            return (0, response_1.resSuccess)(success_constant_1.SuccessConstants.SUCCESS, 200, {});
        });
    }
}
exports.ScheduleController = ScheduleController;
