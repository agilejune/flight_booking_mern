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
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleResolvers = void 0;
const schedule_controller_1 = require("../../controllers/schedule.controller");
exports.scheduleResolvers = {
    ScheduleData: {
        depart_airport: (parent, __, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            return schedule_controller_1.ScheduleController.getAirport(parent.depart_airport_id, __, ctx);
        }),
        arrive_airport: (parent, __, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            return schedule_controller_1.ScheduleController.getAirport(parent.arrive_airport_id, __, ctx);
        }),
        aircraft: (parent, __, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            return schedule_controller_1.ScheduleController.getAircraft(parent.aircraft_id, __, ctx);
        }),
    },
    Query: {
        success: () => {
            return "Success";
        },
        aircrafts: (__, inputObject, ctx) => {
            return schedule_controller_1.ScheduleController.aircrafts(__, inputObject, ctx);
        },
        airports: (__, inputObject, ctx) => {
            return schedule_controller_1.ScheduleController.airports(__, inputObject, ctx);
        },
        schedules: (__, inputObject, ctx) => {
            return schedule_controller_1.ScheduleController.schedules(__, inputObject, ctx);
        },
    },
    Mutation: {
        success: () => {
            return "Success";
        },
        createSchedule: (__, inputObject, ctx) => {
            return schedule_controller_1.ScheduleController.createSchedule(__, inputObject, ctx);
        },
    },
};
